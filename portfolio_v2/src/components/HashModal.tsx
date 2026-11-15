"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useSyncExternalStore, type ReactNode } from "react";

// ── URL hash as the single source of truth ──────────────────────────────
// Tiles are plain <a href="#id"> links, so opening needs no JS, the URL is
// shareable, and the browser Back button closes the modal.

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

function closeHash() {
  // Drop the hash without adding a history entry, then notify listeners
  // (replaceState doesn't fire hashchange on its own).
  history.replaceState(null, "", window.location.pathname + window.location.search);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

type Props = {
  id: string;
  /** Two-tone title: first line plain, second line in the accent colour. */
  title: [string, string];
  children: ReactNode;
};

export function HashModal({ id, title, children }: Props) {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);
  const open = hash === id;
  const reduce = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => closeHash(), []);

  // Esc to close, lock page scroll, move focus into the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key={id}
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
        >
          {/* Backdrop: dims and blurs the bento behind */}
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-[32px] border border-line bg-card p-6 shadow-2xl md:rounded-[40px] md:p-12"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full text-fg outline-none transition-colors hover:bg-fg/10 focus-visible:ring-2 focus-visible:ring-accent/50 md:right-8 md:top-8"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 id={titleId} className="mb-8 pr-12 text-5xl font-extrabold leading-[0.92] tracking-tight md:mb-10 md:text-6xl">
              {title[0]}
              <br />
              <span className="text-accent">{title[1]}</span>
            </h2>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
