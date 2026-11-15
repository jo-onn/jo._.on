import type { NextConfig } from "next";

// Static export for GitHub Pages. The site lives under a sub-path there
// (https://jo-onn.github.io/jo._.on/), so CI sets PAGES_BASE_PATH=/jo._.on.
// Locally it's unset and the site runs at the root.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Pages serves folders as /path/index.html
  trailingSlash: true,
  // No image optimizer on a static host; images are served as-is (pre-compressed).
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // cacheComponents / partial prefetching need a server (PPR) and can't be
  // used with output: "export"; everything here is static anyway.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
