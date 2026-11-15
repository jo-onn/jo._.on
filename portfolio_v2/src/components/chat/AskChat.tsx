"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUp, CircleAlert, RotateCcw, Sparkles, Square, SquarePen } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { site } from "@/data/site";
import { useLang, type Lang } from "@/lib/lang";
import {
  MAX_INPUT,
  getChatServerSnapshot,
  getChatSnapshot,
  onQueuedQuestion,
  resetChat,
  retryLast,
  sendQuestion,
  stopStreaming,
  subscribeChat,
  takeQueuedQuestion,
  type ChatError,
  type ChatMessage,
} from "./store";

const COUNTER_FROM = 800;

const STRINGS = {
  en: {
    intro: "Ask about my research, projects, or career — answers come from this portfolio.",
    tryOne: "Try one of these",
    logLabel: "Conversation",
    inputLabel: "Your question",
    placeholder: "Ask anything…",
    send: "Send",
    stop: "Stop answering",
    newChat: "New chat",
    you: "You",
    bot: "jo._.on AI",
    thinking: "Thinking…",
    stopped: "Stopped",
    rateLimited: (n: number) =>
      n > 0 ? `Too many questions — try again in ${n} second${n === 1 ? "" : "s"}.` : "You can ask again now.",
    failed: "Something went wrong while answering.",
    retry: "Try again",
    disclaimer: "AI answers based on jo._.on's portfolio · may be imperfect",
    charCount: (n: number) => `${n} of ${MAX_INPUT} characters`,
  },
  ko: {
    intro: "연구, 프로젝트, 커리어에 대해 물어보세요. 이 포트폴리오를 바탕으로 답해 드려요.",
    tryOne: "이런 질문은 어때요",
    logLabel: "대화",
    inputLabel: "질문 입력",
    placeholder: "무엇이든 물어보세요…",
    send: "보내기",
    stop: "답변 중지",
    newChat: "새 대화",
    you: "나",
    bot: "jo._.on AI",
    thinking: "생각 중…",
    stopped: "중지됨",
    rateLimited: (n: number) =>
      n > 0 ? `질문이 너무 많아요 — ${n}초 후에 다시 시도해 주세요.` : "이제 다시 질문할 수 있어요.",
    failed: "답변을 가져오지 못했어요.",
    retry: "다시 시도",
    disclaimer: "jo._.on의 포트폴리오를 바탕으로 한 AI 답변 · 부정확할 수 있어요",
    charCount: (n: number) => `${MAX_INPUT}자 중 ${n}자`,
  },
} satisfies Record<Lang, unknown>;

type Strings = (typeof STRINGS)[Lang];

// site.chat may carry Korean variants (placeholderKo / suggestionsKo); fall back to English.
const chatCopy = site.chat as typeof site.chat & { placeholderKo?: string; suggestionsKo?: readonly string[] };
const suggestionsFor = (lang: Lang): readonly string[] =>
  (lang === "ko" && chatCopy.suggestionsKo?.length ? chatCopy.suggestionsKo : site.chat.suggestions);
const placeholderFor = (lang: Lang, fallback: string) =>
  lang === "ko" ? chatCopy.placeholderKo || fallback : site.chat.placeholder || fallback;

/** Read at call time so actions never use a stale language. */
const currentLang = (): Lang =>
  document.documentElement.getAttribute("data-lang") === "ko" ? "ko" : "en";

const ring = "outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-card";

/**
 * Chat body for the "Ask about jo._.on" modal:
 *   <HashModal id="ask" title={["ASK ABOUT", "JO._.ON"]}><AskChat /></HashModal>
 */
export function AskChat() {
  const { messages, streaming, error } = useSyncExternalStore(subscribeChat, getChatSnapshot, getChatServerSnapshot);
  const lang = useLang();
  const t = STRINGS[lang];
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(true);
  const inputId = useId();
  const hintId = useId();

  const rateWait = useRateLimitSeconds(error);
  const rateBlocked = error?.kind === "rate_limited" && rateWait > 0;
  const canSend = draft.trim().length > 0 && !streaming && !rateBlocked;

  // Send a question queued by <AskTrigger> (now, and if one arrives while open).
  useEffect(() => {
    const pick = () => {
      const q = takeQueuedQuestion();
      if (q) {
        stickToBottom.current = true;
        sendQuestion(q, currentLang());
      }
    };
    pick();
    return onQueuedQuestion(pick);
  }, []);

  // Focus the input on open for mouse/trackpad users (HashModal focuses its
  // close button in the same commit, so wait a tick). Skipped on touch so the
  // keyboard doesn't jump up over the conversation.
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const id = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
    return () => window.clearTimeout(id);
  }, []);

  // Keep the newest message in view unless the reader scrolled up.
  useEffect(() => {
    const el = logRef.current;
    if (el && stickToBottom.current) el.scrollTop = el.scrollHeight;
  }, [messages, streaming, error]);

  const onScroll = () => {
    const el = logRef.current;
    if (el) stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  const ask = (text: string) => {
    stickToBottom.current = true;
    return sendQuestion(text, currentLang());
  };

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!canSend) return;
    if (ask(draft)) setDraft("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter is a newline; ignore Enter that confirms IME (Korean) composition.
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault();
      submit();
    }
  };

  const newChat = () => {
    resetChat();
    setDraft("");
    inputRef.current?.focus();
  };

  const empty = messages.length === 0;
  const last = messages[messages.length - 1];

  return (
    // Phones: fills the bottom sheet (input pinned to the bottom, above the
    // keyboard). Larger screens: a fixed-height panel as before.
    <div className="flex min-h-0 flex-1 flex-col md:h-[min(60vh,600px)] md:min-h-[360px] md:flex-none">
      {!empty && (
        <div className="-mt-2 mb-3 flex justify-end md:-mt-6">
          <button
            type="button"
            onClick={newChat}
            className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-fg/30 hover:text-fg active:bg-fg/5 md:min-h-0 ${ring}`}
          >
            <SquarePen className="h-3.5 w-3.5" aria-hidden="true" />
            {t.newChat}
          </button>
        </div>
      )}

      <div
        ref={logRef}
        onScroll={onScroll}
        role="log"
        aria-live="polite"
        aria-busy={streaming}
        aria-label={t.logLabel}
        tabIndex={empty ? -1 : 0}
        className={`-mx-2 flex-1 overflow-y-auto overscroll-contain rounded-[20px] px-2 ${ring}`}
      >
        {empty ? (
          <EmptyState t={t} suggestions={suggestionsFor(lang)} onPick={ask} />
        ) : (
          <ul className="flex flex-col gap-4 pb-2">
            {messages.map((m) => (
              <Bubble key={m.id} m={m} t={t} live={streaming && m === last} />
            ))}
          </ul>
        )}
        {error && (
          <ErrorNotice
            t={t}
            error={error}
            wait={rateWait}
            onRetry={() => {
              stickToBottom.current = true;
              retryLast(currentLang());
            }}
          />
        )}
      </div>

      <form onSubmit={submit} className="mt-4">
        <div className="flex items-end gap-2 rounded-[26px] border border-line bg-bg/60 py-1.5 pl-5 pr-1.5 transition-[border-color,box-shadow] focus-within:border-accent/60 focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_14%,transparent)] md:py-2 md:pr-2">
          <label htmlFor={inputId} className="sr-only">
            {t.inputLabel}
          </label>
          <textarea
            id={inputId}
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, MAX_INPUT))}
            onKeyDown={onKeyDown}
            maxLength={MAX_INPUT}
            rows={1}
            placeholder={placeholderFor(lang, t.placeholder)}
            aria-describedby={hintId}
            className="field-sizing-content max-h-40 min-h-11 flex-1 resize-none bg-transparent py-2.5 text-base leading-6 text-fg outline-none placeholder:text-muted md:min-h-10 md:py-2 md:text-[15px]"
          />
          {streaming ? (
            <button
              type="button"
              onClick={stopStreaming}
              aria-label={t.stop}
              title={t.stop}
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-card text-fg transition-[background-color,scale] hover:bg-card-hover active:scale-95 md:h-10 md:w-10 ${ring}`}
            >
              <Square className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canSend}
              aria-label={t.send}
              title={t.send}
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition-[opacity,scale] enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 md:h-10 md:w-10 ${ring}`}
            >
              <ArrowUp className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
          )}
        </div>
        <div id={hintId} className="mt-2 flex items-start justify-between gap-3 px-2 text-[11px] leading-snug text-muted">
          <p>{t.disclaimer}</p>
          {draft.length >= COUNTER_FROM && (
            <p
              aria-label={t.charCount(draft.length)}
              className={`shrink-0 tabular-nums ${draft.length >= MAX_INPUT ? "font-semibold text-[#e5484d]" : ""}`}
            >
              {draft.length}/{MAX_INPUT}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

// ── pieces ──────────────────────────────────────────────────────────────

function EmptyState({ t, suggestions, onPick }: { t: Strings; suggestions: readonly string[]; onPick: (q: string) => void }) {
  return (
    <div className="flex min-h-full flex-col items-start justify-end gap-5 pb-2">
      <span className="ask-tile grid h-12 w-12 place-items-center rounded-2xl" aria-hidden="true">
        <Sparkles className="h-5 w-5" />
      </span>
      <p className="max-w-md text-lg leading-snug text-fg md:text-xl">{t.intro}</p>
      <div>
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">{t.tryOne}</p>
        <ul className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => onPick(s)}
                className={`min-h-11 rounded-full border border-line bg-bg/40 px-4 py-2 text-sm font-medium text-fg transition-[border-color,background-color,scale] hover:border-accent/60 hover:bg-card-hover active:scale-[0.97] md:min-h-0 ${ring}`}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Bubble({ m, t, live }: { m: ChatMessage; t: Strings; live: boolean }) {
  const reduce = useReducedMotion();
  // Messages rise in from their own side; reduced motion shows them as-is.
  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 10, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      };

  if (m.role === "user") {
    return (
      <motion.li className="flex origin-bottom-right justify-end" {...anim}>
        <span className="sr-only">{t.you}: </span>
        <p className="max-w-[85%] whitespace-pre-wrap break-words break-keep rounded-[22px] rounded-br-md bg-accent px-4 py-2.5 text-[15px] leading-relaxed text-accent-ink">
          {m.content}
        </p>
      </motion.li>
    );
  }

  const waiting = live && !m.content;
  return (
    <motion.li className="flex origin-top-left items-start gap-2.5" {...anim}>
      <span className="ask-tile mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full" aria-hidden="true">
        <Sparkles className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 max-w-[85%] rounded-[22px] rounded-tl-md border border-line bg-bg/50 px-4 py-2.5 text-[15px] leading-relaxed text-fg">
        <span className="sr-only">{t.bot}: </span>
        {waiting ? (
          <span className="flex h-6 items-center gap-1" role="status">
            <span className="sr-only">{t.thinking}</span>
            {[0, 150, 300].map((d) => (
              <span
                key={d}
                aria-hidden="true"
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted motion-reduce:animate-none"
                style={{ animationDelay: `${d}ms` }}
              />
            ))}
          </span>
        ) : (
          <p className="whitespace-pre-wrap break-words break-keep">
            {m.content}
            {live && (
              <span
                aria-hidden="true"
                className="chat-caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] rounded-full bg-accent motion-reduce:animate-none"
              />
            )}
          </p>
        )}
        {m.stopped && (
          <p className={`text-xs italic text-muted ${m.content ? "mt-1.5" : ""}`}>{t.stopped}</p>
        )}
      </div>
    </motion.li>
  );
}

function ErrorNotice({ t, error, wait, onRetry }: { t: Strings; error: ChatError; wait: number; onRetry: () => void }) {
  const rate = error.kind === "rate_limited";
  return (
    <div
      role="alert"
      className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[20px] border border-[#e5484d]/35 bg-[#e5484d]/10 px-4 py-3 text-sm text-fg"
    >
      <CircleAlert className="h-4 w-4 shrink-0 text-[#e5484d]" aria-hidden="true" />
      <p className="min-w-0 flex-1">{rate ? t.rateLimited(wait) : t.failed}</p>
      <button
        type="button"
        onClick={onRetry}
        disabled={rate && wait > 0}
        className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-semibold text-fg transition-colors hover:bg-card-hover disabled:cursor-not-allowed disabled:opacity-40 ${ring}`}
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        {t.retry}
      </button>
    </div>
  );
}

// ── rate-limit countdown ────────────────────────────────────────────────

function subscribeTick(cb: () => void) {
  const id = window.setInterval(cb, 250);
  return () => window.clearInterval(id);
}
// Quantised so the snapshot is stable between ticks.
const nowTick = () => Math.floor(Date.now() / 250) * 250;
const noSubscribe = () => () => {};
const zero = () => 0;

/** Seconds left before a rate-limited question may be retried (0 otherwise). */
function useRateLimitSeconds(error: ChatError | null): number {
  const limited = error?.kind === "rate_limited";
  const now = useSyncExternalStore(limited ? subscribeTick : noSubscribe, limited ? nowTick : zero, zero);
  if (!limited) return 0;
  return Math.max(0, Math.ceil((error.retryAt - now) / 1000));
}
