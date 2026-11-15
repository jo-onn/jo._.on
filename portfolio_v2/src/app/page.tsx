import Image from "next/image";
import { ArrowRight, ArrowUpRight, FileText, FlaskConical, Mail, PenLine, Route, Send } from "lucide-react";
import { site } from "@/data/site";
import { Tile } from "@/components/Tile";
import { SeoulClock } from "@/components/SeoulClock";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HashModal } from "@/components/HashModal";
import { StoryTimeline } from "@/components/StoryTimeline";
import { LangToggle } from "@/components/LangToggle";
import { T } from "@/components/T";
import { WorkGallery } from "@/components/projects/WorkGallery";

const eyebrow = "text-[11px] font-semibold tracking-[0.22em] uppercase";
const display = "font-extrabold tracking-tight leading-[0.92]";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 pb-10 pt-20 md:px-8 md:pt-24">
      <div className="fixed right-4 top-4 z-50 flex gap-2 md:right-6 md:top-6">
        <LangToggle />
        <ThemeToggle />
      </div>

      <div className="bento grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 md:gap-5">
        {/* ── Row 1 ─────────────────────────────────────────── */}

        {/* Name + one-liner — no card, type sits straight on the page */}
        <Tile plain index={0} className="md:col-span-2 lg:col-span-5 lg:min-h-[240px] flex items-stretch justify-between gap-6 lg:gap-8 px-1 py-2 lg:pr-4">
          <div className="flex min-w-0 flex-col justify-between">
          <h1 className="text-[56px] leading-[0.92] lg:text-[clamp(40px,3.9vw,58px)] lg:whitespace-nowrap">
            <span className="block font-extralight tracking-[0.02em]">{site.name.first}</span>
            <span className="block font-bold tracking-[0.02em]">{site.name.last}</span>
          </h1>
          <div className="mt-6">
            <p className={`flex items-start gap-3 text-muted ${eyebrow} tracking-[0.18em] leading-relaxed`}>
              <span className="mt-[0.7em] h-px w-10 shrink-0 bg-muted" />
              <T en={site.tagline} ko={site.taglineKo} />
            </p>
            <div className="mt-4 flex gap-2">
              <SocialLink href={site.social.github} label="GitHub">
                <GithubIcon />
              </SocialLink>
              <SocialLink href={site.social.linkedin} label="LinkedIn">
                <LinkedinIcon />
              </SocialLink>
              <SocialLink href={`mailto:${site.email}`} label="Email">
                <Mail className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>
          </div>
          <div className="flex w-24 shrink-0 flex-col items-center self-start sm:w-32 lg:w-[clamp(104px,9.5vw,150px)]">
            <div className="relative aspect-square w-full">
              <Image src={site.photo} alt={`${site.name.first} ${site.name.last}`} fill sizes="170px" className="object-contain" priority />
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-center text-xs leading-tight text-muted">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-live" />
              <span>
                <T
                  en={<>Now at <span className="font-semibold text-fg">{site.now.org}</span></>}
                  ko={<>현재 <span className="font-semibold text-fg">{site.now.orgKo}</span></>}
                />
              </span>
            </p>
          </div>
        </Tile>

        {/* Ask jo._.on — the v2 headline feature */}
        <Tile index={1} className="ask-tile md:col-span-2 lg:col-span-7 lg:min-h-[240px] flex flex-col justify-end">
          <div>
            <h2 className={`${display} text-4xl lg:text-[clamp(2rem,3.4vw,3rem)]`}>{site.chat.title}</h2>
            <div className="mt-5 flex items-center gap-2 rounded-full bg-white/55 py-2 pl-5 pr-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] backdrop-blur">
              <span className="flex-1 truncate text-sm opacity-55"><T en={site.chat.placeholder} ko={site.chat.placeholderKo} /></span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ask-ink text-white">
                <Send className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 hidden flex-wrap gap-2 md:flex">
              {site.chat.suggestions.map((s, i) => (
                <span key={s} className="rounded-full border border-ask-ink/15 bg-white/30 px-3 py-1 text-xs font-medium">
                  <T en={s} ko={site.chat.suggestionsKo[i]} />
                </span>
              ))}
            </div>
          </div>
        </Tile>

        {/* ── Row 2 ─────────────────────────────────────────── */}

        {/* Selected projects (tall, image cover) */}
        <Tile index={3} href="#projects" bare className="bg-card lg:col-span-3 lg:row-span-2 min-h-[360px] lg:min-h-[500px]">
          <Image
            src={site.projects.cover}
            alt=""
            fill
            sizes="(min-width: 768px) 25vw, 100vw"
            className="object-cover object-top opacity-60 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/10" />
          <div className="relative flex h-full flex-col justify-between p-6 md:p-7">
            <span className={`w-fit rounded-full bg-fg/10 px-3 py-1.5 backdrop-blur ${eyebrow} tracking-[0.16em]`}>
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-live align-middle" />
              <T en="Featured works" ko="대표 작업" />
            </span>
            <div>
              <p className="mb-2 text-sm text-muted"><T en={`${String(site.projects.list.length).padStart(2, "0")} projects`} ko={`프로젝트 ${site.projects.list.length}개`} /></p>
              <h2 className={`${display} text-5xl lg:text-[clamp(1.9rem,3.2vw,3rem)]`}>
                SELECTED
                <br />
                PROJECTS
              </h2>
            </div>
          </div>
        </Tile>

        {/* Résumé */}
        <Tile index={4} href={site.resume} external className="bg-warm text-warm-ink lg:col-span-3 lg:min-h-[240px] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-warm-ink text-warm">
              <FileText className="h-5 w-5" />
            </span>
            <ArrowUpRight className="h-5 w-5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <div>
            <h2 className={`${display} text-5xl lg:text-[clamp(1.9rem,3.2vw,3rem)]`}>RÉSUMÉ</h2>
            <p className={`mt-2 opacity-70 ${eyebrow} tracking-[0.16em]`}><T en="View PDF" ko="PDF 보기" /></p>
          </div>
        </Tile>

        {/* My journey (big) */}
        <Tile index={5} href="#journey" className="bg-card lg:col-span-4 lg:row-span-2 min-h-[360px] lg:min-h-[500px] flex flex-col">
          <div className="flex items-start justify-between">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-ink">
              <Route className="h-5 w-5" />
            </span>
            <span className={`rounded-full border border-line px-3 py-1 text-muted ${eyebrow} tracking-[0.16em]`}>
              <T en="Research → Strategy" ko="연구 → 전략" />
            </span>
          </div>
          <h2 className={`${display} mt-8 text-5xl lg:text-[clamp(2.4rem,4vw,3.75rem)]`}>
            MY
            <br />
            <span className="text-accent">JOURNEY</span>
          </h2>
          <JourneyCurve />
          <span className={`mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-line px-3 py-1.5 text-muted ${eyebrow} tracking-[0.16em]`}>
            <T en="Read story" ko="스토리 보기" /> <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Tile>

        {/* Blog (coming soon) */}
        <Tile index={6} href={site.social.tistory} external className="bg-card lg:col-span-2 lg:min-h-[240px] flex flex-col justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-line">
            <PenLine className="h-5 w-5" />
          </span>
          <div>
            <p className={`text-muted ${eyebrow}`}><T en="Coming soon" ko="준비 중" /></p>
            <h2 className={`${display} mt-1 text-4xl lg:text-[clamp(1.6rem,2.4vw,2.25rem)]`}>BLOG</h2>
            <p className="mt-2 inline-flex items-center gap-1 text-sm text-muted">
              Tistory <ArrowUpRight className="h-3.5 w-3.5" />
            </p>
          </div>
        </Tile>

        {/* Research */}
        <Tile index={7} href="#research" className="bg-card lg:col-span-3 lg:min-h-[240px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className={`flex items-center gap-2 text-muted ${eyebrow}`}>
              <FlaskConical className="h-4 w-4" /> <T en="Research" ko="연구" />
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <ul className="mt-4 space-y-3">
            {site.research.map((r) => (
              <li key={r.venue} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 rounded-md bg-fg/10 px-2 py-0.5 text-[11px] font-bold tabular-nums">
                  {r.venue}
                </span>
                <span className="text-sm leading-snug">
                  <T en={r.title} ko={r.titleKo} />
                  <span className="block text-xs text-muted"><T en={r.status} ko={r.statusKo} /></span>
                </span>
              </li>
            ))}
          </ul>
        </Tile>

        {/* Now + Seoul clock */}
        <Tile index={8} className="bg-card lg:col-span-2 lg:min-h-[240px] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className={`text-muted ${eyebrow}`}>{site.now.zoneLabel}</span>
            <span className="relative mt-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-50" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-live" />
            </span>
          </div>
          <SeoulClock timeZone={site.now.timeZone} compact />
        </Tile>

      </div>

      {/* ── Detail modals (opened via #hash links on the tiles) ── */}
      <HashModal id="projects" title={["WORK", "GALLERY"]} inlineTitle>
        <WorkGallery />
      </HashModal>

      <HashModal id="journey" title={["THE", "STORY"]}>
        <StoryTimeline items={site.story} />
      </HashModal>

      <HashModal id="research" title={["RESEARCH", "& PAPERS"]}>
        <div className="grid gap-4 md:grid-cols-2">
          {site.research.map((r) => (
            <a
              key={r.venue}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-[24px] border border-line bg-bg/40 p-6 transition-colors hover:border-accent/60"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-md bg-fg/10 px-2 py-0.5 font-bold tabular-nums">{r.venue}</span>
                <span className="text-muted"><T en={r.status} ko={r.statusKo} /></span>
              </div>
              <h3 className="mt-4 text-xl font-bold leading-snug"><T en={r.title} ko={r.titleKo} /></h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted"><T en={r.summary} ko={r.summaryKo} /></p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold">
                <T en={r.linkLabel} ko={r.linkLabelKo} /> <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </HashModal>
    </main>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const external = !href.startsWith("mailto:");
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-fg/40 hover:text-fg"
    >
      {children}
    </a>
  );
}

// Brand marks (lucide-react no longer ships brand icons).
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8h4.52v13H.24V8zm7.5 0h4.33v1.78h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V21h-4.52v-6.75c0-1.61-.03-3.68-2.24-3.68-2.24 0-2.58 1.75-2.58 3.56V21H7.74V8z" />
    </svg>
  );
}

/** Rising curve with the three career stages marked on it. */
function JourneyCurve() {
  // Exact points on the cubic Bézier below (t = 0.18, 0.55, 0.9), in viewBox units.
  const pts = [
    { x: 63.3, y: 201.3 },
    { x: 193.2, y: 154.6 },
    { x: 333.7, y: 59.1 },
  ];
  return (
    <div className="relative mt-6 flex-1 min-h-[180px]">
      <svg viewBox="0 0 380 220" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="journey-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 210 C 120 200, 220 160, 380 20 L 380 220 L 0 220 Z" fill="url(#journey-fill)" />
        <path d="M0 210 C 120 200, 220 160, 380 20" fill="none" stroke="var(--accent)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {site.journey.map((j, i) => (
        <div
          key={j.year}
          className="absolute"
          style={{ left: `${(pts[i].x / 380) * 100}%`, top: `${(pts[i].y / 220) * 100}%` }}
        >
          {/* dot centred on the curve */}
          <span className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-bg" />
          {/* label sits up-left of the dot, clear of the rising line */}
          <span className={`absolute bottom-3 ${i === 0 ? "-left-1 text-left" : "right-1 text-right"}`}>
            <span className="block text-[11px] font-bold tabular-nums text-muted">{j.year}</span>
            <span className="block whitespace-nowrap text-xs font-semibold"><T en={j.label} ko={j.labelKo} /></span>
          </span>
        </div>
      ))}
    </div>
  );
}
