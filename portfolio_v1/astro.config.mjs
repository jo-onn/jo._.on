// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { remarkWikiImages } from "./src/plugins/remark-wiki-images.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://jo-onn.github.io",
  // v2 now owns /jo._.on; CI builds v1 into /jo._.on/v1 (override with ASTRO_BASE).
  base: process.env.ASTRO_BASE ?? "/jo._.on",
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkMath, remarkWikiImages],
    rehypePlugins: [rehypeKatex],
  },
});
