"use client";

import { setLang } from "@/lib/lang";

/** EN ⇄ KO switch. The label is CSS-driven (data-lang on <html>), so it is
 *  correct on first paint without waiting for hydration. */
export function LangToggle() {
  const toggle = () => {
    const isKo = document.documentElement.getAttribute("data-lang") === "ko";
    setLang(isKo ? "en" : "ko");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch language / 언어 전환"
      className="grid h-11 w-11 place-items-center rounded-full border border-line bg-card text-[12px] font-bold tracking-[0.06em] text-fg transition-[background-color,scale] hover:bg-card-hover active:scale-95"
    >
      {/* Shows the language you'd switch TO */}
      <span data-lang-en="">KO</span>
      <span data-lang-ko="">EN</span>
    </button>
  );
}
