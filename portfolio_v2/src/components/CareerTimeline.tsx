import type { ReactNode } from "react";
import { Briefcase, Download, FlaskConical, GraduationCap, Trophy, Users, type LucideIcon } from "lucide-react";
import { site } from "@/data/site";
import { T } from "@/components/T";
import { withBase } from "@/lib/base";

// "Résumé at a glance" modal (#resume): the résumé as a page.
// Kept deliberately light: just where / what / when. Details live in the PDF.
// Left: timelines (education / experience / research). Right: awards and activities.
// Server component — bilingual text goes through <T>, so it renders without JS.

const sectionTitle = "text-sm font-extrabold uppercase tracking-[0.2em] md:text-base";

/** Header badges shown above the modal title. */
export function CareerTimelineEyebrow() {
  return (
    <div className="mb-5 flex flex-wrap gap-2 pr-14 text-[11px] font-bold uppercase tracking-[0.18em]">
      <span className="rounded-md bg-accent-grad px-3 py-1.5 text-accent-ink">
        <T en="Career summary" ko="이력 요약" />
      </span>
      <span className="rounded-md border border-line px-3 py-1.5 text-muted">
        <T en={`Last updated: ${site.resumeUpdated.en}`} ko={`최종 업데이트 ${site.resumeUpdated.ko}`} />
      </span>
    </div>
  );
}

export function CareerTimeline() {
  const work = site.experience.filter((e) => e.kind === "work");
  const research = site.experience.filter((e) => e.kind === "research");

  return (
    // break-keep: Korean wraps between words, not inside them.
    <div className="break-keep">
      {/* Download sits beside the title on desktop (pulled up into the title's row). */}
      <div className="mb-10 flex border-b border-line pb-8 md:-mt-[4.75rem] md:mb-12 md:justify-end md:pb-10">
        <a
          href={withBase(site.resume)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-accent-grad px-6 text-xs font-bold uppercase tracking-[0.18em] text-accent-ink shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          <T en="Download CV" ko="이력서 PDF" />
        </a>
      </div>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
        <div className="space-y-12">
          <Section icon={GraduationCap} title={<T en="Education" ko="학력" />}>
            {site.education.map((e, i) => (
              <Entry
                key={e.school}
                first={i === 0}
                title={<T en={e.school} ko={e.schoolKo} />}
                period={e.years}
                sub={<T en={e.degree} ko={e.degreeKo} />}
              />
            ))}
          </Section>

          <Section icon={Briefcase} title={<T en="Experience" ko="경력" />}>
            {work.map((e, i) => (
              <Entry
                key={e.company}
                first={i === 0}
                title={<T en={e.company} ko={e.companyKo} />}
                period={"periodKo" in e ? <T en={e.period} ko={e.periodKo} /> : e.period}
                sub={<T en={e.role} ko={e.roleKo} />}
              />
            ))}
          </Section>

          <Section icon={FlaskConical} title={<T en="Research" ko="연구 경험" />}>
            {research.map((e, i) => (
              <Entry
                key={e.company}
                first={i === 0}
                title={<T en={e.company} ko={e.companyKo} />}
                period={e.period}
                sub={<T en={e.role} ko={e.roleKo} />}
              />
            ))}
          </Section>
        </div>

        {/* Compact rows — just what, where, when. */}
        <aside className="h-fit space-y-9 rounded-[28px] border border-line p-5 md:p-7">
          <AsideSection icon={Trophy} title={<T en="Awards" ko="수상" />}>
            {site.awards.map((a) => (
              <Row key={a.title} title={<T en={a.label} ko={a.labelKo} />} sub={<T en={a.event} ko={a.eventKo} />} date={a.date} />
            ))}
          </AsideSection>

          <AsideSection icon={Users} title={<T en="Activities" ko="대외활동" />}>
            {site.activities.map((a) => (
              <Row key={a.name} title={<T en={a.name} ko={a.nameKo} />} sub={<T en={a.role} ko={a.roleKo} />} date={a.period} />
            ))}
          </AsideSection>
        </aside>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: LucideIcon; title: ReactNode; children: ReactNode }) {
  return (
    <section>
      <h3 className={`flex items-center gap-4 ${sectionTitle}`}>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line text-accent md:h-14 md:w-14">
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </span>
        {title}
      </h3>
      <ol className="relative mt-7 space-y-7">
        {/* rail */}
        <span className="absolute bottom-1 left-[6px] top-2 w-px bg-line" aria-hidden="true" />
        {children}
      </ol>
    </section>
  );
}

function Entry({ first, title, period, sub }: { first: boolean; title: ReactNode; period: ReactNode; sub: ReactNode }) {
  return (
    <li className="relative pl-9 md:pl-11">
      <span
        className={`absolute left-0 top-[0.4rem] h-[13px] w-[13px] rounded-full ${
          first ? "bg-accent-grad ring-4 ring-accent/20" : "bg-fg/70"
        }`}
        aria-hidden="true"
      />
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <h4 className="min-w-0 text-lg font-extrabold leading-tight tracking-tight md:text-xl">{title}</h4>
        <span
          className={`shrink-0 rounded-md px-2.5 py-1 text-[11px] font-bold tabular-nums tracking-[0.1em] ${
            first ? "bg-accent-grad text-accent-ink" : "border border-line text-muted"
          }`}
        >
          {period}
        </span>
      </div>
      <p className="mt-1.5 text-[15px] font-medium leading-snug text-muted">{sub}</p>
    </li>
  );
}

/** One line in the side panel: title + date, with a muted line under it. */
function Row({ title, sub, date }: { title: ReactNode; sub: ReactNode; date: string }) {
  return (
    <li className="border-b border-line pb-3 last:border-b-0 last:pb-0">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[15px] font-bold leading-snug">{title}</p>
        <span className="shrink-0 text-[11px] font-semibold tabular-nums text-muted">{date}</span>
      </div>
      <p className="mt-0.5 text-sm leading-snug text-muted">{sub}</p>
    </li>
  );
}

function AsideSection({ icon: Icon, title, children }: { icon: LucideIcon; title: ReactNode; children: ReactNode }) {
  return (
    <section>
      <h3 className={`flex items-center gap-3 ${sectionTitle}`}>
        <Icon className="h-5 w-5 text-accent" />
        {title}
      </h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </section>
  );
}
