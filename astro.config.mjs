// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://jo-onn.github.io",
  base: "/jo._.on",
  vite: {
    plugins: [tailwindcss()],
  },
});
