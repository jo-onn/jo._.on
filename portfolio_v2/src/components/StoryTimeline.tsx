"use client";

import Image from "next/image";
import { useState } from "react";
import { Activity, ArrowDownUp, Bot, Handshake, Microscope, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  bot: Bot,
  activity: Activity,
  microscope: Microscope,
  handshake: Handshake,
};

export type StoryItem = {
  year: string;
  icon: string;
  headline: string;
  body: readonly string[];
  image?: string;
};

/** "The Story" timeline: year markers on a rail, one card per chapter. */
export function StoryTimeline({ items }: { items: readonly StoryItem[] }) {
  const [oldestFirst, setOldestFirst] = useState(true);
  const ordered = oldestFirst ? items : [...items].reverse();

  return (
    <div>
      <div className="-mt-4 mb-8 flex justify-end border-b border-line pb-6 md:-mt-20 md:mb-10">
        <button
          type="button"
          onClick={() => setOldestFirst((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-fg/5"
        >
          <ArrowDownUp className="h-3.5 w-3.5" />
          {oldestFirst ? "Oldest first" : "Newest first"}
        </button>
      </div>

      <ol className="relative">
        {/* rail */}
        <span className="absolute bottom-0 left-[9px] top-3 w-px bg-line md:left-[11px]" aria-hidden="true" />
        {ordered.map((s, i) => {
          const Icon = ICONS[s.icon] ?? Bot;
          const showYear = i === 0 || ordered[i - 1].year !== s.year;
          return (
            <li key={s.headline} className="relative pb-10 pl-10 last:pb-0 md:pl-16">
              {showYear && (
                <>
                  <span className="absolute left-0 top-3 h-[19px] w-[19px] rounded-full bg-accent md:h-6 md:w-6" />
                  <p className="mb-5 text-4xl font-extrabold tabular-nums tracking-tight text-accent md:text-5xl">{s.year}</p>
                </>
              )}
              <article className="rounded-[24px] border border-line p-5 md:p-8">
                <h3 className="flex items-center gap-4 text-lg font-extrabold uppercase leading-tight tracking-tight md:text-2xl">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent md:h-12 md:w-12">
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </span>
                  {s.headline}
                </h3>
                <div className={`mt-5 grid gap-6 ${s.image ? "md:grid-cols-[1fr_260px]" : ""}`}>
                  <div className="space-y-4 text-[15px] leading-relaxed text-muted md:text-base">
                    {s.body.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                  {s.image && (
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-fg/5">
                      <Image src={s.image} alt="" fill sizes="260px" className="object-cover object-top" />
                    </div>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
