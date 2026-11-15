"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useSyncExternalStore, type ReactNode } from "react";

// ── URL hash as the single source of truth ──────────────────────────────
// Tiles are plain <a href="#id"> links, so opening needs no JS, the URL is
// shareable, and the browser Back button closes the modal.

// True once any in-page hash navigation has happened (a tile click).
// A modal open on first load without one is a deep link.
let sawHashChange = false;

function subscribe(cb: () => void) {
  const onChange = () => {
    sawHashChange = true;
    cb();
  };
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

function closeHash(id: string) {
  // Opened by an in-page click → step back so history has no duplicate entry.
  if (history.state?.__modal === id) {
    history.back();
    return;
  }
  // Deep link → drop the hash without adding a history entry, then notify
  // listeners (replaceState doesn't fire hashchange on its own).
  history.replaceState(null, "", window.location.pathname + window.location.search);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

/** Page regions made inert while a modal is open (keeps Tab inside the dialog). */
const BACKGROUND_SELECTOR = "[data-modal-background]";

type Props = {
  id: string;
  /** Two-tone title: first line plain, second line in the accent colour. */
  title: [string, string];
  /** Put both title words on one line ("WORK GALLERY") instead of stacking them. */
  inlineTitle?: boolean;
  children: ReactNode;
};

export function HashModal({ id, title, inlineTitle = false, children }: Props) {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);
  const open = hash === id;
  const reduce = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => closeHash(id), [id]);

  useEffect(() => {
    if (!open) return;
    // Remember how we were opened (see closeHash).
    if (sawHashChange && history.state?.__modal !== id) {
      history.replaceState({ ...(history.state ?? {}), __modal: id }, "");
    }
    const opener = document.activeElement instanceof HTMLElement && document.activeElement !== document.body
      ? document.activeElement
      : null;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = Array.from(document.querySelectorAll<HTMLElement>(BACKGROUND_SELECTOR));
    background.forEach((el) => el.setAttribute("inert", ""));
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      background.forEach((el) => el.removeAttribute("inert"));
      // Return focus to whatever opened the modal (or the tile linking to it).
      const target = opener ?? document.querySelector<HTMLElement>(`a[href="#${id}"]`);
      target?.focus({ preventScroll: true });
    };
  }, [open, close, id]);

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
            className="relative flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-line bg-card shadow-2xl md:rounded-[40px]"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close stays put while the content below scrolls */}
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-card/80 text-fg outline-none backdrop-blur transition-colors hover:bg-fg/10 focus-visible:ring-2 focus-visible:ring-accent/50 md:right-7 md:top-7"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="overflow-y-auto overscroll-contain p-6 md:p-12">
              <h2 id={titleId} className="mb-8 pr-12 text-5xl font-extrabold leading-[0.92] tracking-tight md:mb-10 md:text-6xl">
                {title[0]}
                {inlineTitle ? " " : <br />}
                <span className="text-accent">{title[1]}</span>
              </h2>

              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
