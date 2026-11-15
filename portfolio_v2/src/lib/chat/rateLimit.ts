// Simple in-memory sliding-window rate limiter, keyed by client IP.
//
// NOTE: this state lives in the memory of a single server process. On
// serverless hosts (Vercel etc.) every function instance has its own Map and
// instances are recycled, so the effective limit is "per instance", not
// global — a determined client can exceed it. For a hard global cap use a
// shared store (e.g. Upstash Redis / Vercel KV) and a provider-side spend
// limit on the Anthropic workspace.

export const RATE_LIMIT = 10;
export const RATE_WINDOW_MS = 5 * 60 * 1000;
const MAX_TRACKED_KEYS = 5000;

const hits = new Map<string, number[]>();

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSec: number };

export function checkRateLimit(key: string, now: number = Date.now()): RateLimitResult {
  const windowStart = now - RATE_WINDOW_MS;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);

  if (recent.length >= RATE_LIMIT) {
    hits.set(key, recent);
    const retryAfterSec = Math.max(1, Math.ceil((recent[0] + RATE_WINDOW_MS - now) / 1000));
    return { ok: false, retryAfterSec };
  }

  recent.push(now);
  hits.set(key, recent);
  if (hits.size > MAX_TRACKED_KEYS) prune(windowStart);
  return { ok: true };
}

function prune(windowStart: number) {
  for (const [key, times] of hits) {
    if (times.length === 0 || times[times.length - 1] <= windowStart) hits.delete(key);
  }
  // Still too many distinct keys inside the window: drop the oldest entries (Map keeps insertion order).
  for (const key of hits.keys()) {
    if (hits.size <= MAX_TRACKED_KEYS) break;
    hits.delete(key);
  }
}

/**
 * Best-effort client IP from proxy headers. On Vercel/most hosts the platform
 * sets x-forwarded-for / x-real-ip; when the app is exposed directly these
 * headers are client-controlled and can be spoofed.
 */
export function clientKey(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}
