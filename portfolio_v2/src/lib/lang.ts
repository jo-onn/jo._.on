"use client";

import { useSyncExternalStore } from "react";

// Site language lives on <html data-lang="en|ko">, set before first paint by
// the inline script in layout.tsx (saved in localStorage "lang").
// Static copy switches with CSS: [data-lang-en] / [data-lang-ko] (globals.css).
// Client components that need the value in JS use useLang().

export type Lang = "en" | "ko";
export const LANG_STORAGE_KEY = "lang";

function read(): Lang {
  return document.documentElement.getAttribute("data-lang") === "ko" ? "ko" : "en";
}

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
  return () => mo.disconnect();
}

/** Current site language; re-renders when the toggle changes it. */
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, read, () => "en");
}

export function setLang(lang: Lang) {
  document.documentElement.setAttribute("data-lang", lang);
  document.documentElement.setAttribute("lang", lang);
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {}
}
