"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="grid h-11 w-11 place-items-center rounded-full border border-line bg-card text-fg transition-[background-color,scale] hover:bg-card-hover active:scale-95"
    >
      <Moon className="icon-moon h-[18px] w-[18px]" />
      <Sun className="icon-sun h-[18px] w-[18px]" />
    </button>
  );
}
