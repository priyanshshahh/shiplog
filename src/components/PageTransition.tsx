import type { ReactNode } from "react";

/** Instant navigation. Heavy AnimatePresence was slowing page switches. */
export function PageTransition({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
