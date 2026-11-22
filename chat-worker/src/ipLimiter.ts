// Strict per-IP rate limiting with a Durable Object.
//
// The Workers Rate Limiting binding is approximate (local, eventually consistent
// counts) and in practice let everything through on workers.dev. A Durable
// Object processes one request at a time, so counts here are exact.
//
// One object per client IP (IPv6 grouped by /64, since a single user can rotate
// addresses inside their /64). Two fixed windows: per minute and per 24 hours.
// Storage is wiped by an alarm once the 24h window ends, so nothing piles up.

import { DurableObject } from "cloudflare:workers";

const MINUTE_MS = 60_000;
const DAY_MS = 86_400_000;

type Counts = { minStart: number; minCount: number; dayStart: number; dayCount: number };

export type LimitResult = { allowed: true } | { allowed: false; retryAfterSec: number };

export class IpRateLimiter extends DurableObject {
  /** Count one request; deny (without counting) if either window is full. */
  async hit(perMinute: number, perDay: number): Promise<LimitResult> {
    const now = Date.now();
    const c: Counts = (await this.ctx.storage.get<Counts>("c")) ?? {
      minStart: now,
      minCount: 0,
      dayStart: now,
      dayCount: 0,
    };

    if (now - c.minStart >= MINUTE_MS) {
      c.minStart = now;
      c.minCount = 0;
    }
    if (now - c.dayStart >= DAY_MS) {
      c.dayStart = now;
      c.dayCount = 0;
    }

    if (c.dayCount >= perDay) {
      return { allowed: false, retryAfterSec: Math.ceil((c.dayStart + DAY_MS - now) / 1000) };
    }
    if (c.minCount >= perMinute) {
      return { allowed: false, retryAfterSec: Math.ceil((c.minStart + MINUTE_MS - now) / 1000) };
    }

    c.minCount += 1;
    c.dayCount += 1;
    await this.ctx.storage.put("c", c);
    // Clean up after the day window (re-armed whenever a new day window starts).
    await this.ctx.storage.setAlarm(c.dayStart + DAY_MS);
    return { allowed: true };
  }

  async alarm(): Promise<void> {
    await this.ctx.storage.deleteAll();
  }
}

/** Rate-limit key for a client IP: IPv4 as-is, IPv6 reduced to its /64 prefix. */
export function limiterKey(ip: string): string {
  if (!ip.includes(":")) return ip;
  // Expand "::" so we can take the first four hextets.
  const [head, tail = ""] = ip.split("::");
  const h = head ? head.split(":") : [];
  const t = tail ? tail.split(":") : [];
  const full = [...h, ...Array(Math.max(0, 8 - h.length - t.length)).fill("0"), ...t];
  return `${full.slice(0, 4).map((x) => x.toLowerCase()).join(":")}::/64`;
}
