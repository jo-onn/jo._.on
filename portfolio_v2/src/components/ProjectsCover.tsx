"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const INTERVAL_MS = 1800;

/**
 * Cover for the Selected Projects tile: cycles through the project images with
 * a cross-fade + slow settle. Pauses while the tile is hovered or focused, while
 * the tab is hidden, and entirely under prefers-reduced-motion (first image only).
 */
export function ProjectsCover({ images, sizes }: { images: string[]; sizes: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // The text layer sits on top of the cover, so watch the whole tile.
  useEffect(() => {
    const tile = ref.current?.closest<HTMLElement>(".tile");
    if (!tile) return;
    const on = () => setPaused(true);
    const off = () => setPaused(false);
    tile.addEventListener("pointerenter", on);
    tile.addEventListener("pointerleave", off);
    tile.addEventListener("focusin", on);
    tile.addEventListener("focusout", off);
    return () => {
      tile.removeEventListener("pointerenter", on);
      tile.removeEventListener("pointerleave", off);
      tile.removeEventListener("focusin", on);
      tile.removeEventListener("focusout", off);
    };
  }, []);

  useEffect(() => {
    if (reduce || paused || images.length < 2) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % images.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, images.length]);

  const src = images[reduce ? 0 : i];

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.6, ease: "easeOut" }, scale: { duration: 2.2, ease: [0.22, 1, 0.36, 1] } }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            // Every frame sits above the fold in the same tile, so none may lazy-load
            // (Next warns when the LCP image is lazy).
            loading="eager"
            fetchPriority={src === images[0] ? "high" : "auto"}
            className="object-cover object-[50%_30%] opacity-80 transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
