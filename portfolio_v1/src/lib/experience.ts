import { siteConfig } from "../config";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// "Mar 2026" → { y: 2026, m: 3 }; "Current" / empty → null
function parse(s: string) {
  const t = s.trim();
  if (!t || /current|present|now/i.test(t)) return null;
  const [mon, yr] = t.split(/\s+/);
  const m = MONTHS.indexOf(mon);
  const y = parseInt(yr ?? mon);
  return isNaN(y) ? null : { y, m: m >= 0 ? m + 1 : 1 };
}
const fmt = (d: { y: number; m: number }) => `${d.y}.${String(d.m).padStart(2, "0")}`;

/** Experience entries, newest first, with display-ready periods. */
export function getExperience() {
  return (siteConfig.experience ?? [])
    .map((exp) => {
      const [startRaw = "", endRaw = ""] = exp.dateRange.split(/\s*[—–]\s*|\s+-\s+/);
      const start = parse(startRaw);
      const end = parse(endRaw);
      return {
        ...exp,
        isCurrent: !end,
        startYear: start?.y ?? null,
        startLabel: start ? fmt(start) : startRaw,
        endLabel: end ? fmt(end) : "Now",
        period: `${start ? fmt(start) : startRaw} — ${end ? fmt(end) : "Now"}`,
        sortKey: start ? start.y * 12 + start.m : 0,
      };
    })
    .sort((a, b) => b.sortKey - a.sortKey);
}
