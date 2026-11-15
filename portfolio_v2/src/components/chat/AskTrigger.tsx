"use client";

import type { MouseEvent, ReactNode } from "react";
import { queueQuestion } from "./store";

/** id of the HashModal that hosts <AskChat /> (opened when location.hash === "#ask"). */
export const ASK_MODAL_ID = "ask";

/**
 * Open the Ask modal from code, optionally with a question that AskChat sends
 * once it is open. Prefer <AskTrigger> in markup (it works without JS too).
 */
export function openAsk(question?: string) {
  const q = question?.trim();
  if (q) queueQuestion(q);
  if (window.location.hash !== `#${ASK_MODAL_ID}`) window.location.hash = ASK_MODAL_ID;
}

type Props = {
  /** Sent automatically once the chat opens. Omit to just open the chat. */
  question?: string;
  className?: string;
  /** Accessible name when the children aren't descriptive text. */
  "aria-label"?: string;
  children: ReactNode;
};

/**
 * A plain <a href="#ask"> link, so HashModal (hash = source of truth) opens the
 * chat through normal navigation. On a primary click it first queues
 * `question`, which AskChat picks up and sends on mount.
 */
export function AskTrigger({ question, className, children, ...rest }: Props) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Modifier/middle clicks open a new tab: don't queue anything for this one.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const q = question?.trim();
    if (q) queueQuestion(q);
  };
  return (
    <a href={`#${ASK_MODAL_ID}`} onClick={onClick} className={className} aria-label={rest["aria-label"]}>
      {children}
    </a>
  );
}
