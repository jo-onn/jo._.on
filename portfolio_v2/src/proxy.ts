import { NextResponse, type NextRequest } from "next/server";
import { site } from "@/data/site";

// With Cache Components, an unknown /projects/<slug> would stream the shell
// first (status 200) and only then render notFound(). Checking the slug here,
// before rendering starts, lets it answer with a real 404 status.
const slugs = new Set<string>(site.projects.list.map((p) => p.slug));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  // public/projects/* holds the project images and PDFs — let files through.
  if (!slug || slug.includes(".")) return;
  if (!slugs.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  }
}

export const config = {
  matcher: "/projects/:slug",
};
