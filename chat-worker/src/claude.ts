// Worker version of portfolio_v2/src/lib/chat/claude.ts.
//
// Why a copy: the shared module reads process.env.ANTHROPIC_API_KEY (Node-only
// without nodejs_compat) and would resolve @anthropic-ai/sdk from
// portfolio_v2/node_modules. In a Worker the key comes from `env`, so it is
// passed in. The request itself (model, effort, max_tokens, cached system
// prompt, refusal handling) is kept identical to the shared module; the prompt
// text and helpers are imported from it, so site.ts stays the single source.

import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, languageHint, refusalMessage, type ChatLang } from "../../portfolio_v2/src/lib/chat/systemPrompt";
import type { ChatMessage } from "../../portfolio_v2/src/lib/chat/validate";

export const MODEL = "claude-haiku-5-5";

// Same budget as the Next route: ample for a 2–5 sentence answer (Korean too),
// caps worst-case cost; adaptive thinking tokens count toward it.
const MAX_TOKENS = 1024;

let client: Anthropic | null = null;
let clientKey: string | null = null;
function getClient(apiKey: string): Anthropic {
  if (!client || clientKey !== apiKey) {
    client = new Anthropic({ apiKey, maxRetries: 1 });
    clientKey = apiKey;
  }
  return client;
}

/**
 * Streams only the visible answer text (text_delta). Thinking blocks are
 * ignored. On stop_reason "refusal" a fixed polite message is yielded/appended.
 * SDK errors propagate; the Worker maps Anthropic.APIError to 502.
 */
export async function* claudeAnswer(
  apiKey: string,
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

  const stream = getClient(apiKey).messages.stream(
    {
      model: MODEL,
      max_tokens: MAX_TOKENS,
      // Haiku 5.5: adaptive thinking on by default, effort defaults to
      // "medium"; a short factual chat reply only needs "low".
      // No temperature/top_p (400 on Haiku 5.5), no assistant prefill.
      output_config: { effort: "low" },
      system: [
        // Stable prefix (rules + facts) — cached.
        { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
        // Per-request language hint after the breakpoint so it never invalidates the cache.
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
