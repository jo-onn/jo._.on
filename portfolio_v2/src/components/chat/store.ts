// Chat state lives at module level, not in AskChat, because HashModal unmounts
// its children when it closes. Keeping it here means closing and reopening the
// modal keeps the conversation (and an in-flight answer keeps streaming).
// Messages are mirrored to sessionStorage so a reload in the same tab keeps them.

import type { Lang } from "@/lib/lang";

/** The chat API endpoint (contract: POST { messages, lang } → streamed text/plain). */
// Static site → the chat runs on a separate Cloudflare Worker (see /chat-worker).
// Set NEXT_PUBLIC_CHAT_ENDPOINT at build time; "/api/chat" is only a dev fallback.
export const CHAT_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_ENDPOINT || "/api/chat";
/** Max characters per question (enforced in the input). */
export const MAX_INPUT = 1000;
/** Max messages sent to the API per request. */
export const MAX_HISTORY = 12;
const STORAGE_KEY = "ask-chat:v1";
const DEFAULT_RETRY_SECONDS = 30;

export type Role = "user" | "assistant";
export type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  /** Assistant answer cut short by the Stop button. */
  stopped?: boolean;
};
export type ChatError =
  | { kind: "rate_limited"; retryAt: number }
  | { kind: "failed" };
export type ChatState = {
  messages: ChatMessage[];
  streaming: boolean;
  error: ChatError | null;
};

const EMPTY: ChatState = { messages: [], streaming: false, error: null };
let state: ChatState = EMPTY;
let loaded = false;
let controller: AbortController | null = null;
const listeners = new Set<() => void>();

// ── external-store plumbing (for useSyncExternalStore) ──────────────────

export function subscribeChat(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function getChatSnapshot(): ChatState {
  if (!loaded) load();
  return state;
}

export function getChatServerSnapshot(): ChatState {
  return EMPTY;
}

function set(patch: Partial<ChatState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

function load() {
  loaded = true;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    const messages = parsed.filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        typeof m.id === "string" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string",
    );
    state = { ...EMPTY, messages };
  } catch {}
}

function persist() {
  try {
    if (state.messages.length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages));
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
}

let seq = 0;
const uid = () => `${Date.now().toString(36)}-${(seq++).toString(36)}`;

// ── request building ────────────────────────────────────────────────────

type ApiMessage = { role: Role; content: string };

/**
 * Last MAX_HISTORY messages, strictly alternating and starting with a user
 * turn. Empty answers (stopped before any text) are skipped; if that leaves
 * two user turns in a row, the newer one wins (the older went unanswered).
 */
export function buildHistory(messages: ChatMessage[]): ApiMessage[] {
  const out: ApiMessage[] = [];
  for (const m of messages) {
    const content = m.content.trim();
    if (!content) continue;
    const last = out[out.length - 1];
    if (last && last.role === m.role) out[out.length - 1] = { role: m.role, content };
    else out.push({ role: m.role, content });
  }
  let h = out.slice(-MAX_HISTORY);
  while (h.length && h[0].role !== "user") h = h.slice(1);
  return h;
}

function parseRetryAfter(value: string | null): number {
  if (!value) return DEFAULT_RETRY_SECONDS;
  const secs = Number(value);
  if (Number.isFinite(secs) && secs >= 0) return Math.ceil(secs);
  const date = Date.parse(value);
  if (!Number.isNaN(date)) return Math.max(1, Math.ceil((date - Date.now()) / 1000));
  return DEFAULT_RETRY_SECONDS;
}

// ── actions ─────────────────────────────────────────────────────────────

async function run(lang: Lang) {
  const history = buildHistory(state.messages);
  if (!history.length || history[history.length - 1].role !== "user") return;

  controller?.abort();
  const ctrl = new AbortController();
  controller = ctrl;
  const aid = uid();
  set({
    messages: [...state.messages, { id: aid, role: "assistant", content: "" }],
    streaming: true,
    error: null,
  });

  const append = (text: string) =>
    set({ messages: state.messages.map((m) => (m.id === aid ? { ...m, content: m.content + text } : m)) });
  const answer = () => state.messages.find((m) => m.id === aid);
  const fail = (error: ChatError) => {
    // Drop an empty placeholder; keep partial text from a stream that broke midway.
    const keep = answer()?.content.trim();
    set({
      messages: keep ? state.messages : state.messages.filter((m) => m.id !== aid),
      streaming: false,
      error,
    });
  };

  try {
    const res = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history, lang }),
      signal: ctrl.signal,
    });

    if (res.status === 429) {
      fail({ kind: "rate_limited", retryAt: Date.now() + parseRetryAfter(res.headers.get("Retry-After")) * 1000 });
      return;
    }
    if (!res.ok || !res.body) {
      fail({ kind: "failed" });
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = decoder.decode(value, { stream: true });
      if (text) append(text);
    }
    const tail = decoder.decode();
    if (tail) append(tail);

    if (!answer()?.content.trim()) fail({ kind: "failed" });
    else set({ streaming: false });
  } catch {
    // Aborted by stop()/reset(): they already updated the state.
    if (ctrl.signal.aborted) return;
    fail({ kind: "failed" });
  } finally {
    if (controller === ctrl) controller = null;
    persist();
  }
}

/** Send a new question. Returns false if it was ignored (empty or busy). */
export function sendQuestion(text: string, lang: Lang): boolean {
  const content = text.trim().slice(0, MAX_INPUT);
  if (!content || state.streaming) return false;
  set({ messages: [...state.messages, { id: uid(), role: "user", content }], error: null });
  persist();
  void run(lang);
  return true;
}

/** Re-ask the last question after an error. */
export function retryLast(lang: Lang) {
  if (state.streaming) return;
  const messages = [...state.messages];
  while (messages.length && messages[messages.length - 1].role === "assistant") messages.pop();
  if (!messages.length) return;
  set({ messages, error: null });
  void run(lang);
}

/** Stop the answer that is streaming; keeps whatever text has arrived. */
export function stopStreaming() {
  if (!state.streaming) return;
  const last = state.messages[state.messages.length - 1];
  set({
    messages:
      last?.role === "assistant"
        ? [...state.messages.slice(0, -1), { ...last, stopped: true }]
        : state.messages,
    streaming: false,
  });
  controller?.abort();
  controller = null;
  persist();
}

/** Start over: abort anything in flight and clear the conversation. */
export function resetChat() {
  controller?.abort();
  controller = null;
  set({ messages: [], streaming: false, error: null });
  persist();
}

// ── hand-off from AskTrigger: a question to send once the modal opens ───

let pendingQuestion: string | null = null;
const pendingListeners = new Set<() => void>();

export function queueQuestion(question: string) {
  pendingQuestion = question;
  pendingListeners.forEach((l) => l());
}

/** Read and clear the queued question (so it is sent exactly once). */
export function takeQueuedQuestion(): string | null {
  const q = pendingQuestion;
  pendingQuestion = null;
  return q;
}

export function onQueuedQuestion(cb: () => void) {
  pendingListeners.add(cb);
  return () => {
    pendingListeners.delete(cb);
  };
}
