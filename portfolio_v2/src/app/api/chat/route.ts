import Anthropic from "@anthropic-ai/sdk";
import { claudeAnswer } from "@/lib/chat/claude";
import { mockAnswer } from "@/lib/chat/mock";
import { checkRateLimit, clientKey } from "@/lib/chat/rateLimit";
import { parseChatRequest } from "@/lib/chat/validate";

// POST /api/chat — "Ask about jo._.on".
// Contract (shared with the chat UI):
//   200 text/plain stream of answer text | 400 invalid_request | 429 rate_limited (+Retry-After)
//   | 502 upstream_error | 500 server_error.
//
// With cacheComponents enabled, `runtime`/`dynamic` segment configs are not
// allowed (Node.js runtime is the default) and non-GET handlers are never
// prerendered or cached, so this handler always runs at request time.
// maxDuration is still a supported segment option.
export const maxDuration = 30;

const encoder = new TextEncoder();

function jsonError(status: number, error: string, headers?: Record<string, string>) {
  return Response.json({ error }, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function isMockMode(): boolean {
  return process.env.CHAT_MOCK === "1" || !process.env.ANTHROPIC_API_KEY;
}

export async function POST(request: Request) {
  const limit = checkRateLimit(clientKey(request.headers));
  if (!limit.ok) {
    return jsonError(429, "rate_limited", { "Retry-After": String(limit.retryAfterSec) });
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return jsonError(400, "invalid_request");
  }
  const parsed = parseChatRequest(raw);
  if (!parsed) return jsonError(400, "invalid_request");

  const { messages, lang } = parsed;
  const upstream = new AbortController();
  // Stop generating (and paying for) tokens if the visitor closes the chat.
  request.signal.addEventListener("abort", () => upstream.abort());

  const answer = isMockMode()
    ? mockAnswer(messages[messages.length - 1].content, lang, upstream.signal)
    : claudeAnswer(messages, lang, upstream.signal);

  // Pull the first chunk before committing to a 200 so that connection/auth/
  // rate-limit errors from the API still surface as a proper 502.
  let first: IteratorResult<string>;
  try {
    first = await answer.next();
  } catch (err) {
    return upstreamFailure(err);
  }

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      if (first.done) controller.close();
      else controller.enqueue(encoder.encode(first.value));
    },
    async pull(controller) {
      try {
        const { value, done } = await answer.next();
        if (done) controller.close();
        else controller.enqueue(encoder.encode(value));
      } catch (err) {
        // Headers are already sent; abort the body so the client sees a failed read.
        logError(err);
        controller.error(new Error("upstream_error"));
      }
    },
    async cancel() {
      upstream.abort();
      await answer.return(undefined);
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function upstreamFailure(err: unknown) {
  logError(err);
  if (err instanceof Anthropic.APIError) return jsonError(502, "upstream_error");
  return jsonError(500, "server_error");
}

function logError(err: unknown) {
  // Server log only — never forwarded to the client.
  if (err instanceof Anthropic.APIError) {
    console.error(`[api/chat] Anthropic API error ${err.status ?? "(no status)"}: ${err.name}`);
  } else {
    console.error("[api/chat] unexpected error", err);
  }
}
