import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PmPanel } from "@/components/PmPanel";
import { program } from "@/data/program";

export const metadata: Metadata = {
  title: "Status",
  description: "Shared cohort platforms for Summer Pilot 2026.",
};

export default function StatusPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h1 className="font-term text-xs uppercase tracking-widest text-accent">
          status
        </h1>
        <p className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
          One place to open the tools the whole cohort shares.
        </p>
        <p className="mt-4 max-w-xl text-muted">
          For enrollment and review progress, use the{" "}
          <a
            href={program.dashboard}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            official dashboard
          </a>
          .
        </p>
      </Reveal>

      <div className="mt-10">
        <PmPanel />
      </div>
    </div>
  );
}
