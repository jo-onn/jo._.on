"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ComponentType } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Bot, FlaskConical, LayoutGrid, Package, Sparkles } from "lucide-react";
import { T } from "@/components/T";
import { categoryLabel, projectHref, projects, type Category, type Project } from "./data";
import { withBase } from "@/lib/base";

type TabId = "picks" | "all" | Category;

const tabs: { id: TabId; en: string; ko: string; Icon: ComponentType<{ className?: string }> }[] = [
  { id: "picks", en: "Picks", ko: "추천", Icon: Sparkles },
  { id: "all", en: "All", ko: "전체", Icon: LayoutGrid },
  { id: "research", ...categoryLabel.research, Icon: FlaskConical },
  { id: "product", ...categoryLabel.product, Icon: Package },
  { id: "ai-agent", ...categoryLabel["ai-agent"], Icon: Bot },
];

function matches(p: Project, tab: TabId) {
  if (tab === "all") return true;
  if (tab === "picks") return p.featured;
  return p.category === tab;
}

export function WorkGallery() {
  const [tab, setTab] = useState<TabId>("picks");
  const reduce = useReducedMotion();
  const visible = projects.filter((p) => matches(p, tab));
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 380, damping: 34 };

  return (
    <LayoutGroup id="work-gallery">
      <div role="tablist" aria-label="Filter projects" className="-mx-1 mb-8 flex flex-wrap gap-1.5 md:mb-10">
        {tabs.map(({ id, en, ko, Icon }) => {
          const active = id === tab;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(id)}
              className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 ${
                active ? "text-accent-ink" : "text-muted hover:text-fg"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="work-gallery-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={spring}
                  aria-hidden="true"
                />
              )}
              <Icon className="relative h-4 w-4" />
              <span className="relative">
                <T en={en} ko={ko} />
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul layout={!reduce} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.li
              key={p.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.94 }}
              transition={reduce ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <GalleryCard p={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
}

function GalleryCard({ p }: { p: Project }) {
  return (
    <Link
      href={projectHref(p)}
      className="group flex h-full flex-col rounded-[28px] border border-line bg-bg/40 p-3 outline-none transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_50px_-14px_color-mix(in_oklab,var(--accent)_35%,transparent)] focus-visible:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-fg/5">
        <Image
          src={withBase(p.image)}
          alt=""
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-1 items-end justify-between gap-3 px-2 pb-2 pt-4">
        <div className="min-w-0">
          <p className="text-xs tabular-nums text-muted">
            {p.year} · <T en={categoryLabel[p.category].en} ko={categoryLabel[p.category].ko} />
          </p>
          <h3 className="mt-1 text-lg font-extrabold uppercase leading-tight tracking-tight">
            <T en={p.headline.join(" ")} ko={p.headlineKo.join(" ")} />
          </h3>
        </div>
        <ArrowUpRight className="mb-0.5 h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
      </div>
    </Link>
  );
}
