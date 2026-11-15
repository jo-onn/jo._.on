"use client";

import { useEffect, useState } from "react";

type Parts = { hm: string; s: string; ampm: string };

function format(timeZone: string): Parts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { hm: `${get("hour")}:${get("minute")}`, s: get("second"), ampm: get("dayPeriod") };
}

/** Live clock in a fixed time zone. Renders a placeholder on the server
 *  (current time can't be prerendered) and fills in after mount. */
export function SeoulClock({ timeZone, compact = false }: { timeZone: string; compact?: boolean }) {
  const [t, setT] = useState<Parts | null>(null);

  useEffect(() => {
    const tick = () => setT(format(timeZone));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <p className="flex flex-wrap items-baseline gap-x-2 font-semibold tracking-tight tabular-nums" aria-live="off">
      <span className={compact ? "text-5xl lg:text-[clamp(2rem,3vw,2.75rem)]" : "text-5xl md:text-6xl"}>{t?.hm ?? "--:--"}</span>
      {!compact && <span className="text-xl text-muted">{t?.s ?? "--"}</span>}
      <span className="text-sm">{t?.ampm ?? ""}</span>
    </p>
  );
}
