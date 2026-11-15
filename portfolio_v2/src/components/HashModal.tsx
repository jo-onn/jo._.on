"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

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

// ── Phones: the dialog becomes a bottom sheet ───────────────────────────
const SHEET_QUERY = "(max-width: 767px)";
function subscribeSheet(cb: () => void) {
  const mq = window.matchMedia(SHEET_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getSheet = () => window.matchMedia(SHEET_QUERY).matches;
const getServerSheet = () => false;

/**
 * While open, size the overlay to the visual viewport so the sheet sits above
 * the on-screen keyboard (iOS Safari doesn't resize the layout viewport and
 * dvh ignores the keyboard). Written as CSS vars; falls back to 100dvh.
 */
function useVisualViewport(el: HTMLElement | null) {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!el || !vv) return;
    const apply = () => {
      el.style.setProperty("--vvh", `${vv.height}px`);
      el.style.setProperty("--vvt", `${vv.offsetTop}px`);
    };
    apply();
    vv.addEventListener("resize", apply);
    vv.addEventListener("scroll", apply);
    return () => {
      vv.removeEventListener("resize", apply);
      vv.removeEventListener("scroll", apply);
    };
  }, [el]);
}

/** Page regions made inert while a modal is open (keeps Tab inside the dialog). */
const BACKGROUND_SELECTOR = "[data-modal-background]";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  id: string;
  /** Two-tone title: first line plain, second line in the accent colour. */
  title: [string, string];
  /** Put both title words on one line ("WORK GALLERY") instead of stacking them. */
  inlineTitle?: boolean;
  /** Body fills the dialog and scrolls on its own (the chat keeps its input pinned). */
  fill?: boolean;
  children: ReactNode;
};

export function HashModal({ id, title, inlineTitle = false, fill = false, children }: Props) {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);
  const open = hash === id;
  const reduce = useReducedMotion();
  const sheet = useSyncExternalStore(subscribeSheet, getSheet, getServerSheet);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [overlay, setOverlay] = useState<HTMLDivElement | null>(null);
  const close = useCallback(() => closeHash(id), [id]);
  useVisualViewport(overlay);

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

  // Phones: a sheet that slides up from the bottom edge. Larger screens: scale
  // + fade. Reduced motion: nothing moves and changes are instant.
  const panel = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : sheet
      ? {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%", transition: { duration: 0.26, ease: [0.4, 0, 1, 1] as const } },
          transition: { type: "spring" as const, stiffness: 380, damping: 40, mass: 0.9 },
        }
      : {
          initial: { opacity: 0, y: 24, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.2, ease: EASE } },
          transition: { duration: 0.35, ease: EASE },
        };

  // Leave a strip of page visible above the sheet (and clear the notch).
  const sheetMax = "calc(100% - max(16px, env(safe-area-inset-top)))";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key={id}
          ref={setOverlay}
          style={{ top: "var(--vvt, 0px)", height: "var(--vvh, 100dvh)" }}
          className="fixed inset-x-0 z-[60] flex items-end justify-center md:items-center md:p-8"
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
            style={sheet ? (fill ? { height: sheetMax } : { maxHeight: sheetMax }) : undefined}
            className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-t-[28px] border border-b-0 border-line bg-card shadow-2xl md:max-h-[88vh] md:rounded-[40px] md:border-b"
            {...panel}
          >
            {/* Close stays put while the content below scrolls */}
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-card/80 text-fg outline-none backdrop-blur transition-[background-color,scale] hover:bg-fg/10 focus-visible:ring-2 focus-visible:ring-accent/50 active:scale-95 md:right-7 md:top-7 md:h-11 md:w-11"
            >
              <X className="h-6 w-6" />
            </button>

            <div
              className={`modal-body overscroll-contain px-5 pt-7 md:p-12 ${
                fill ? "flex min-h-0 flex-1 flex-col" : "overflow-y-auto"
              }`}
            >
              <h2
                id={titleId}
                className="mb-6 pr-14 text-[2.5rem] font-extrabold leading-[0.92] tracking-tight md:mb-10 md:text-6xl"
              >
                {title[0]}
                {inlineTitle ? " " : <br />}
                <span className="text-accent">{title[1]}</span>
              </h2>

              {fill ? <div className="flex min-h-0 flex-1 flex-col">{children}</div> : children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
