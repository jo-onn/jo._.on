"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Order in the stagger-in animation. */
  index?: number;
  href?: string;
  external?: boolean;
  /** Drop the default padding (for full-bleed image tiles). */
  bare?: boolean;
  /** No card chrome at all: no background, border or hover lift (e.g. the name block). */
  plain?: boolean;
};

export function Tile({ children, className = "", index = 0, href, external, bare, plain }: Props) {
  const base = plain
    ? "tile tile-plain group relative"
    : `tile group relative overflow-hidden rounded-[28px] border border-line${bare ? "" : " p-6 md:p-7"}`;
  const reduce = useReducedMotion();
  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] as const },
        ...(plain ? {} : { whileHover: { y: -3 } }),
      };

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
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
