import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText, Globe, Play } from "lucide-react";
import { site } from "@/data/site";
import { T } from "@/components/T";
import { LangToggle } from "@/components/LangToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { categoryLabel, getProject, projectHref, projects } from "@/components/projects/data";
import { withBase } from "@/lib/base";

// Every project is prerendered at build time (static export). Unlisted slugs
// have no file on the host, which then serves the exported 404 page.

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: `Not found — ${site.handle}` };
  return {
    title: `${p.name} — ${site.handle}`,
    description: p.description,
  };
}

const eyebrow = "text-[11px] font-semibold tracking-[0.22em] uppercase";

const linkKo: Record<string, string> = { Paper: "논문", Demo: "데모 영상", Report: "보고서", Poster: "포스터" };

function linkIcon(href: string) {
  if (href.endsWith(".pdf")) return FileText;
  if (href.includes("youtube.com") || href.includes("youtu.be")) return Play;
  return Globe;
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  // Optional facts (TODO fields in site.ts) — shown only once filled in.
  const facts = [
    { label: "Role", labelKo: "역할", value: p.role as string | null, valueKo: p.roleKo as string | null },
    { label: "Team", labelKo: "팀", value: p.team as string | null, valueKo: p.teamKo as string | null },
    { label: "Period", labelKo: "기간", value: p.period as string | null, valueKo: null },
  ].filter((f) => f.value);

  return (
    <main className="safe-x mx-auto max-w-4xl pb-16 pt-20 md:pt-24">
      {/* Phones: scrolls away with the page instead of covering the text. */}
      <div className="safe-corner absolute z-50 flex gap-2 md:fixed">
        <LangToggle />
        <ThemeToggle />
      </div>

      <Link
        href="/#projects"
        className={`group inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 py-2 text-muted transition-colors hover:border-accent/60 hover:text-fg active:bg-fg/5 ${eyebrow} tracking-[0.16em]`}
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        <T en="Work Gallery" ko="작업 갤러리" />
      </Link>

      <header className="mt-10 md:mt-14">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold tabular-nums text-muted">{p.year}</span>
          <span className="text-muted">·</span>
          <span className="rounded-full border border-line px-2.5 py-0.5 font-semibold text-muted">
            <T en={categoryLabel[p.category].en} ko={categoryLabel[p.category].ko} />
          </span>
          {p.badges.map((b) => (
            <span key={b} className="rounded-full bg-accent/15 px-2.5 py-0.5 font-semibold text-accent">
              {b}
            </span>
          ))}
        </div>
        <h1 className="mt-5 text-[clamp(2.75rem,9vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight">
          <T
            en={<>{p.headline[0]}<br /><span className="text-accent-grad">{p.headline[1]}</span></>}
            ko={<>{p.headlineKo[0]}<br /><span className="text-accent-grad">{p.headlineKo[1]}</span></>}
          />
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-snug text-muted md:text-xl">
          <T en={p.name} ko={p.nameKo} />
        </p>
      </header>

      <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[28px] border border-line bg-card md:mt-12">
        <Image src={withBase(p.image)} alt="" fill priority sizes="(min-width: 896px) 832px, 100vw" className="object-cover object-top" />
      </div>

      <section className="mt-12 md:mt-16">
        <p className="text-lg leading-relaxed md:text-xl">
          <T en={p.description} ko={p.descriptionKo} />
        </p>

        <dl className="mt-10 divide-y divide-line border-y border-line">
          {p.sections.map((s) => (
            <div key={s.heading} className="grid gap-2 py-6 md:grid-cols-[180px_1fr] md:gap-8">
              <dt className={`text-muted ${eyebrow} md:pt-1`}>
                <T en={s.heading} ko={s.headingKo} />
              </dt>
              <dd className="leading-relaxed">
                <T en={s.body} ko={s.bodyKo} />
              </dd>
            </div>
          ))}
          {facts.map((f) => (
            <div key={f.label} className="grid gap-2 py-6 md:grid-cols-[180px_1fr] md:gap-8">
              <dt className={`text-muted ${eyebrow} md:pt-1`}>
                <T en={f.label} ko={f.labelKo} />
              </dt>
              <dd className="leading-relaxed">
                <T en={f.value} ko={f.valueKo ?? f.value} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10 grid gap-3 md:grid-cols-[180px_1fr] md:gap-8">
        <h2 className={`text-muted ${eyebrow} md:pt-1.5`}>
          <T en="Skills" ko="기술" />
        </h2>
        <ul className="flex flex-wrap gap-2">
          {p.skills.map((sk) => (
            <li key={sk} className="rounded-full border border-line bg-card px-3 py-1 text-sm">
              {sk}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        {p.links.map((l, i) => {
          const Icon = linkIcon(l.href);
          return (
            <a
              key={l.label}
              href={withBase(l.href)}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-[color,background-color,border-color,opacity,scale] active:scale-[0.97] ${
                i === 0
                  ? "bg-accent text-accent-ink hover:opacity-90"
                  : "border border-line bg-card hover:border-accent/60"
              }`}
            >
              <Icon className="h-4 w-4" />
              <T en={l.label} ko={linkKo[l.label] ?? l.label} />
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          );
        })}
      </div>

      {next.slug !== p.slug && (
        <Link
          href={projectHref(next)}
          className="group mt-16 flex items-center justify-between gap-4 rounded-[28px] border border-line bg-card p-6 transition-[border-color,scale] hover:border-accent/60 active:scale-[0.99] md:p-8"
        >
          <span>
            <span className={`block text-muted ${eyebrow}`}>
              <T en="Next project" ko="다음 프로젝트" />
            </span>
            <span className="mt-2 block text-2xl font-extrabold uppercase leading-tight tracking-tight md:text-3xl">
              <T en={next.headline.join(" ")} ko={next.headlineKo.join(" ")} />
            </span>
          </span>
          <ArrowRight className="h-6 w-6 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-fg" />
        </Link>
      )}
    </main>
  );
}
