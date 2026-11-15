import { site } from "@/data/site";

export const projects = site.projects.list;
export type Project = (typeof projects)[number];
export type Category = Project["category"];

export const projectHref = (p: Project) => `/projects/${p.slug}`;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const categoryLabel: Record<Category, { en: string; ko: string }> = {
  research: { en: "Research", ko: "연구" },
  product: { en: "Product", ko: "프로덕트" },
  "ai-agent": { en: "AI Agent", ko: "AI 에이전트" },
};
