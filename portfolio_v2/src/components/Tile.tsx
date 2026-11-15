"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Order in the stagger-in animation. */
  index?: number;
  href?: string;
  external?: boolean;
  /** Short accessible name for link tiles (their visible text can be long). */
  ariaLabel?: string;
  /** Drop the default padding (for full-bleed image tiles). */
  bare?: boolean;
  /** No card chrome at all: no background, border or hover lift (e.g. the name block). */
  plain?: boolean;
};

export function Tile({ children, className = "", index = 0, href, external, ariaLabel, bare, plain }: Props) {
  const base = plain
    ? "tile tile-plain group relative"
    : `tile group relative overflow-hidden rounded-[28px] border border-line${bare ? "" : " p-6 md:p-7"}`;
  const reduce = useReducedMotion();
  // Once the entrance has played, hover/press use a short transition without
  // the stagger delay (otherwise the last tiles reacted ~0.5s late).
  const [entered, setEntered] = useState(false);
  // Always pass the same initial/animate so server HTML and hydration agree;
  // reduced motion only shortens the transition to zero (otherwise tiles would
  // stay at the server-rendered opacity:0 when the user prefers reduced motion).
  const anim = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: reduce
      ? { duration: 0 }
      : entered
        ? { type: "spring" as const, stiffness: 420, damping: 30, mass: 0.6 }
        : { duration: 0.55, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] as const },
    onAnimationComplete: () => setEntered(true),
    // Hover lift for pointers; a slight press on tap (touch) for link tiles.
    ...(plain || reduce ? {} : { whileHover: { y: -3 } }),
    ...(href && !plain && !reduce ? { whileTap: { scale: 0.985 } } : {}),
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        className={`${base} block ${className}`}
        {...anim}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.div className={`${base} ${className}`} {...anim}>
      {children}
    </motion.div>
  );
}
