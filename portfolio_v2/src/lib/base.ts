// The site is exported statically and served from a sub-path on GitHub Pages
// (e.g. https://jo-onn.github.io/jo._.on/). next/link adds basePath on its
// own, but next/image `src` and plain <a href> to files in /public do not, so
// route those through withBase(). Set via PAGES_BASE_PATH in next.config.ts.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative public path ("/resume.pdf") with the base path. External URLs pass through. */
export function withBase(path: string): string {
  return path.startsWith("/") && !path.startsWith("//") ? `${BASE_PATH}${path}` : path;
}
