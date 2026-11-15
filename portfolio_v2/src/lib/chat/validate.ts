import type { ChatLang } from "./systemPrompt";

export const MAX_MESSAGES = 12;
export const MAX_CONTENT_CHARS = 1000;
/** Hard cap on the raw request body, checked before JSON.parse. */
export const MAX_BODY_BYTES = 12 * MAX_CONTENT_CHARS * 4 + 4096;

export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ChatRequest = { messages: ChatMessage[]; lang: ChatLang };

/**
 * Validates the POST /api/chat body. Returns null when invalid; the route then
 * answers 400 { error: "invalid_request" } without saying which rule failed.
 */
export function parseChatRequest(raw: string): ChatRequest | null {
  if (raw.length > MAX_BODY_BYTES) return null;

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) return null;

  const { messages, lang } = body as { messages?: unknown; lang?: unknown };
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) return null;

  const out: ChatMessage[] = [];
  for (let i = 0; i < messages.length; i++) {
    const m = messages[i] as { role?: unknown; content?: unknown } | null;
    if (typeof m !== "object" || m === null) return null;
    if (m.role !== "user" && m.role !== "assistant") return null;
    if (typeof m.content !== "string") return null;
    const content = m.content.trim();
    if (content.length === 0 || m.content.length > MAX_CONTENT_CHARS) return null;
    // Roles must alternate.
    if (i > 0 && out[i - 1].role === m.role) return null;
    out.push({ role: m.role, content });
  }
  if (out[out.length - 1].role !== "user") return null;

  return { messages: out, lang: lang === "ko" ? "ko" : "en" };
}
