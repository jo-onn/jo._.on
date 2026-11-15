import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, languageHint, refusalMessage, type ChatLang } from "./systemPrompt";
import type { ChatMessage } from "./validate";

export const MODEL = "claude-haiku-5-5";

// A chat bubble answer is 2–5 sentences by instruction; 1024 output tokens is
// ample headroom for a longer "tell me more" answer (in Korean too) while
// capping the worst-case cost of a single request. Adaptive thinking tokens
// count toward this budget as well, and effort "low" keeps them small.
const MAX_TOKENS = 1024;

let client: Anthropic | null = null;
function getClient(): Anthropic {
  // Key is read from process.env.ANTHROPIC_API_KEY on the server only.
  client ??= new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 1 });
  return client;
}

/**
 * Streams only the visible answer text (text_delta) from Claude. Thinking
 * blocks are ignored. If the model refuses (stop_reason "refusal" — Haiku 5.5
 * has no server-side fallback), a fixed polite message is yielded instead /
 * appended. SDK errors propagate to the caller; the route maps them to 502.
 */
export async function* claudeAnswer(
  messages: ChatMessage[],
  lang: ChatLang,
  signal?: AbortSignal,
): AsyncGenerator<string> {
  // The API requires the first turn to be a user turn; drop any leading
  // assistant greeting the UI may have kept in its history.
  const firstUser = messages.findIndex((m) => m.role === "user");
  const history: Anthropic.MessageParam[] = messages
    .slice(firstUser)
    .map((m) => ({ role: m.role, content: m.content }));

  const stream = getClient().messages.stream(
    {
      model: MODEL,
      max_tokens: MAX_TOKENS,
      // Haiku 5.5: adaptive thinking is on by default and effort defaults to
      // "medium"; a short factual chat reply only needs "low".
      // Do not send temperature/top_p (400 on Haiku 5.5) or an assistant prefill.
      output_config: { effort: "low" },
      system: [
        // Stable prefix (rules + facts) — cached.
        { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
        // Per-request language hint sits after the breakpoint so it never invalidates the cache.
        { type: "text", text: languageHint(lang) },
      ],
      messages: history,
    },
    { signal },
  );

  let emitted = false;
  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta" && event.delta.text) {
      emitted = true;
      yield event.delta.text;
    }
  }

  const final = await stream.finalMessage();
  if (final.stop_reason === "refusal") {
    yield (emitted ? "\n\n" : "") + refusalMessage(lang);
  }
}
