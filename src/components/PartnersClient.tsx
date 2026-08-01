"use client";

import type { Builder } from "@/data/roster";
import { RequestIntroForm } from "@/components/RequestIntroForm";

export function PartnersClient({
  builders,
  preselected,
}: {
  builders: Builder[];
  preselected: string[];
}) {
  return <RequestIntroForm builders={builders} preselected={preselected} />;
}
