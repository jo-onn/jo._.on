import type { ReactNode } from "react";

/** Bilingual text: both versions are server-rendered and CSS shows the one
 *  matching <html data-lang> (see globals.css), so switching never flashes. */
export function T({ en, ko }: { en: ReactNode; ko?: ReactNode }) {
  if (ko === undefined) return <>{en}</>;
  return (
    <>
      <span data-lang-en="">{en}</span>
      <span data-lang-ko="">{ko}</span>
    </>
  );
}
