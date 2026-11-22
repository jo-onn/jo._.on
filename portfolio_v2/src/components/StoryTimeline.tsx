"use client";

import Image from "next/image";
import { useState } from "react";
import { Activity, ArrowDownUp, Bot, Handshake, Microscope, ShoppingBag, Trophy, Users, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/lang";
import { withBase } from "@/lib/base";

const ICONS: Record<string, LucideIcon> = {
  bot: Bot,
  activity: Activity,
  microscope: Microscope,
  handshake: Handshake,
  users: Users,
  trophy: Trophy,
  shopping: ShoppingBag,
};

export type StoryItem = {
  year: string;
  icon: string;
  headline: string;
  headlineKo?: string;
  body: readonly string[];
  bodyKo?: readonly string[];
  /** Where / when / as what — shown under the headline. */
  meta?: { org: string; orgKo?: string; period: string; periodKo?: string; role?: string; roleKo?: string };
  /** Short, concrete facts (numbers, awards) shown as chips under the text. */
  highlights?: readonly { en: string; ko: string }[];
  /** Still going on — gets a "Now" badge. */
  current?: boolean;
  image?: string;
  logo?: { light: string; dark: string; alt: string };
};

/** "The Story" timeline: year markers on a rail, one card per chapter. */
export function StoryTimeline({ items }: { items: readonly StoryItem[] }) {
  const [oldestFirst, setOldestFirst] = useState(true);
  const ko = useLang() === "ko";
  const ordered = oldestFirst ? items : [...items].reverse();
  // The latest year is "where I am now": its chapters get the aurora ring.
  const latestYear = items.reduce((y, s) => (s.year > y ? s.year : y), "");

  return (
    <div>
      <div className="-mt-4 mb-8 flex justify-end border-b border-line pb-6 md:-mt-20 md:mb-10">
        <button
          type="button"
          onClick={() => setOldestFirst((v) => !v)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-fg/5 active:bg-fg/10 md:min-h-0"
        >
          <ArrowDownUp className="h-3.5 w-3.5" />
          {ko ? (oldestFirst ? "오래된 순" : "최신 순") : oldestFirst ? "Oldest first" : "Newest first"}
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
                  <span className="absolute left-0 top-3 h-[19px] w-[19px] rounded-full bg-accent-grad md:h-6 md:w-6" />
                  <p className="mb-5 flex items-baseline gap-3 text-4xl font-extrabold tabular-nums tracking-tight md:text-5xl">
                    <span className="text-accent-grad">{s.year}</span>
                    {s.year === latestYear && (
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">{ko ? "지금" : "Now"}</span>
                    )}
                  </p>
                </>
              )}
              <article className={`rounded-[24px] border border-line p-5 md:p-8 ${s.year === latestYear ? "story-now" : ""}`}>
                {s.current && (
                  <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
                    </span>
                    {ko ? "현재 진행 중" : "Now"}
                  </p>
                )}
                <h3 className="flex items-center gap-4 text-lg font-extrabold uppercase leading-tight tracking-tight md:text-2xl">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent md:h-12 md:w-12">
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </span>
                  {ko && s.headlineKo ? s.headlineKo : s.headline}
                </h3>
                {s.meta && (
                  <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-snug">
                    {/* Phones: one line each (no separators), so no dot dangles at a line edge. */}
                    <span className="basis-full font-semibold text-fg sm:basis-auto">{ko && s.meta.orgKo ? s.meta.orgKo : s.meta.org}</span>
                    {s.meta.role && (
                      <>
                        <span className="hidden text-muted/60 sm:inline" aria-hidden="true">·</span>
                        <span className="basis-full text-muted sm:basis-auto">{ko && s.meta.roleKo ? s.meta.roleKo : s.meta.role}</span>
                      </>
                    )}
                    <span className="hidden text-muted/60 sm:inline" aria-hidden="true">·</span>
                    <span className="basis-full whitespace-nowrap tabular-nums text-muted sm:basis-auto">{ko && s.meta.periodKo ? s.meta.periodKo : s.meta.period}</span>
                  </p>
                )}
                <div className={`mt-5 grid gap-6 ${s.image || s.logo ? "md:grid-cols-[1fr_260px]" : ""}`}>
                  <div className="space-y-4 text-[15px] leading-relaxed text-muted md:text-base">
                    {(ko && s.bodyKo ? s.bodyKo : s.body).map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                    {s.highlights && (
                      <ul className="flex flex-wrap gap-2 pt-1">
                        {s.highlights.map((h) => (
                          <li key={h.en} className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-fg">
                            {ko ? h.ko : h.en}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {s.image && (
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-fg/5">
                      {/* Same files the Projects cover slideshow already loads eagerly (cache hit). Lazy here
                          would make Next flag the cover as a lazy LCP image, since it tracks images by src. */}
                      <Image src={withBase(s.image)} alt="" fill sizes="260px" loading="eager" className="object-cover object-top" />
                    </div>
                  )}
                  {s.logo && (
                    <div className="grid aspect-[4/3] place-items-center rounded-2xl border border-line bg-fg/[0.03] p-6 md:aspect-square md:p-8">
                      <Image src={withBase(s.logo.light)} alt={s.logo.alt} width={672} height={182} sizes="220px" className="only-light h-auto w-full max-w-[220px]" />
                      <Image src={withBase(s.logo.dark)} alt={s.logo.alt} width={672} height={182} sizes="220px" className="only-dark h-auto w-full max-w-[220px]" />
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
