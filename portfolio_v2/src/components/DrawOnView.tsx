"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Adds `in-view` to its wrapper the first time it scrolls into view. CSS keyed
 * on `.js .draw-on-view:not(.in-view)` hides the not-yet-drawn state, so the
 * content is fully visible without JS and there's no flash before hydration.
 */
export function DrawOnView({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("in-view");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`draw-on-view ${className}`}>
      {children}
    </div>
  );
}
