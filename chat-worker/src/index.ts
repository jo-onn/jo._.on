// Cloudflare Worker for the portfolio's "Ask about jo._.on" chat.
//
// Contract (unchanged from the former Next.js /api/chat route):
//   POST / (or /api/chat), JSON { messages: [{role, content}], lang?: "en"|"ko" }
//   200 text/plain stream of answer text | 400 invalid_request
//   | 429 rate_limited (+Retry-After) | 502 upstream_error | 500 server_error.
// Worker-only additions: 403 forbidden_origin, 413 payload_too_large,
//   404 not_found, 405 method_not_allowed.
//
// Shared logic is imported straight from portfolio_v2 (wrangler's esbuild
// bundles it), so the site content in portfolio_v2/src/data/site.ts remains
// the single source of truth for the system prompt.

import Anthropic from "@anthropic-ai/sdk";
import { mockAnswer } from "../../portfolio_v2/src/lib/chat/mock";
import { MAX_BODY_BYTES, parseChatRequest } from "../../portfolio_v2/src/lib/chat/validate";
import { claudeAnswer } from "./claude";
import { IpRateLimiter, limiterKey } from "./ipLimiter";

// The Durable Object class must be exported from the Worker entry module.
export { IpRateLimiter };

export interface Env {
  /** Secret. Unset → mock mode. */
  ANTHROPIC_API_KEY?: string;
  /** "1" → mock mode (no model call). */
  CHAT_MOCK?: string;
  /** Comma-separated list of exact origins allowed to call this Worker. */
  ALLOWED_ORIGINS?: string;
  /** Durable Object namespace: one strict counter per client IP (see ipLimiter.ts). */
  IP_LIMITER?: DurableObjectNamespace<IpRateLimiter>;
  /** Per-IP limits (strings from wrangler.jsonc vars). */
  RATE_LIMIT_PER_MINUTE?: string;
  RATE_LIMIT_PER_DAY?: string;
}

const DEFAULT_ALLOWED_ORIGINS = "https://jo-onn.github.io,http://localhost:3000,http://127.0.0.1:3000";
const DEFAULT_PER_MINUTE = 10;
const DEFAULT_PER_DAY = 50;
const CHAT_PATHS = new Set(["/", "/api/chat"]);

const encoder = new TextEncoder();

function allowedOrigins(env: Env): Set<string> {
  return new Set(
    (env.ALLOWED_ORIGINS ?? DEFAULT_ALLOWED_ORIGINS)
      .split(",")
      .map((o) => o.trim().replace(/\/+$/, ""))
      .filter(Boolean),
  );
}

function corsHeaders(origin: string | null): Record<string, string> {
  const h: Record<string, string> = { Vary: "Origin" };
  if (origin) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Access-Control-Expose-Headers"] = "Retry-After";
  }
  return h;
}

function jsonError(status: number, error: string, origin: string | null, extra?: Record<string, string>): Response {
  return Response.json(
    { error },
    { status, headers: { "Cache-Control": "no-store", ...corsHeaders(origin), ...extra } },
  );
}

function isMockMode(env: Env): boolean {
  return env.CHAT_MOCK === "1" || !env.ANTHROPIC_API_KEY;
}

/**
 * Reads the body as text, refusing anything over maxBytes without buffering it
 * all (Content-Length may be absent for chunked uploads). Returns null if too large.
 */
async function readBodyCapped(request: Request, maxBytes: number): Promise<string | null> {
  const declared = Number(request.headers.get("Content-Length"));
  if (Number.isFinite(declared) && declared > maxBytes) return null;
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const buf = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    buf.set(c, offset);
    offset += c.byteLength;
  }
  return new TextDecoder().decode(buf);
}

const positiveInt = (v: string | undefined, fallback: number) => {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : fallback;
};

/**
 * Exact per-IP limit via the IP_LIMITER Durable Object. Returns null when
 * allowed, or the Retry-After seconds when the IP is over its limit.
 * If the binding is missing or the call fails, the request is allowed and the
 * failure is logged (the Anthropic workspace spend limit is the hard backstop).
 */
async function rateLimited(env: Env, ip: string): Promise<number | null> {
  if (!env.IP_LIMITER) {
    console.error("[chat] IP_LIMITER binding missing, allowing request");
    return null;
  }
  try {
    const stub = env.IP_LIMITER.getByName(limiterKey(ip));
    const res = await stub.hit(
      positiveInt(env.RATE_LIMIT_PER_MINUTE, DEFAULT_PER_MINUTE),
      positiveInt(env.RATE_LIMIT_PER_DAY, DEFAULT_PER_DAY),
    );
    return res.allowed ? null : res.retryAfterSec;
  } catch (err) {
    console.error("[chat] rate limiter unavailable, allowing request", err);
    return null;
  }
}

async function handleChat(request: Request, env: Env, origin: string): Promise<Response> {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const retryAfter = await rateLimited(env, ip);
  if (retryAfter !== null) {
    return jsonError(429, "rate_limited", origin, { "Retry-After": String(retryAfter) });
  }

  let raw: string | null;
  try {
    raw = await readBodyCapped(request, MAX_BODY_BYTES);
  } catch {
    return jsonError(400, "invalid_request", origin);
  }
  if (raw === null) return jsonError(413, "payload_too_large", origin);

  const parsed = parseChatRequest(raw);
  if (!parsed) return jsonError(400, "invalid_request", origin);

  const { messages, lang } = parsed;
  const upstream = new AbortController();
  // Stop generating (and paying for) tokens if the visitor goes away.
  request.signal?.addEventListener("abort", () => upstream.abort());

  const answer = isMockMode(env)
    ? mockAnswer(messages[messages.length - 1].content, lang, upstream.signal)
    : claudeAnswer(env.ANTHROPIC_API_KEY!, messages, lang, upstream.signal);

  // Pull the first chunk before committing to a 200 so connection/auth/
  // rate-limit errors from the API still surface as a proper 502.
  let first: IteratorResult<string>;
  try {
    first = await answer.next();
  } catch (err) {
    logError(err);
    return err instanceof Anthropic.APIError
      ? jsonError(502, "upstream_error", origin)
      : jsonError(500, "server_error", origin);
  }

  // Set once the stream is closed, errored or cancelled by the client. A pull()
  // that was already awaiting the next chunk when the visitor left must not
  // touch the controller afterwards ("This ReadableStream is closed").
  let finished = false;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      if (first.done) {
        finished = true;
        controller.close();
      } else controller.enqueue(encoder.encode(first.value));
    },
    async pull(controller) {
      try {
        const { value, done } = await answer.next();
        if (finished) return;
        if (done) {
          finished = true;
          controller.close();
        } else controller.enqueue(encoder.encode(value));
      } catch (err) {
        if (finished) return; // client already gone; nothing to report
        finished = true;
        // Headers already sent; error the body so the client sees a failed read.
        logError(err);
        controller.error(new Error("upstream_error"));
      }
    },
    async cancel() {
      finished = true;
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
      ...corsHeaders(origin),
    },
  });
}

function logError(err: unknown) {
  // Worker log only — never forwarded to the client.
  if (err instanceof Anthropic.APIError) {
    console.error(`[chat] Anthropic API error ${err.status ?? "(no status)"}: ${err.name}`);
  } else {
    console.error("[chat] unexpected error", err);
  }
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const requestOrigin = request.headers.get("Origin");
    const origin = requestOrigin && allowedOrigins(env).has(requestOrigin) ? requestOrigin : null;

    // CORS gate first, before any parsing or model call. Requests without an
    // allowed Origin header (other sites, curl without -H Origin) are refused.
    if (!origin) return jsonError(403, "forbidden_origin", null);

    if (!CHAT_PATHS.has(url.pathname)) return jsonError(404, "not_found", origin);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          ...corsHeaders(origin),
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    if (request.method !== "POST") {
      return jsonError(405, "method_not_allowed", origin, { Allow: "POST, OPTIONS" });
    }

    try {
      return await handleChat(request, env, origin);
    } catch (err) {
      logError(err);
      return jsonError(500, "server_error", origin);
    }
  },
} satisfies ExportedHandler<Env>;
