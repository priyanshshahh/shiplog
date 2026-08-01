import type { Metadata } from "next";
import { myBuilder } from "@/data/roster";
import { program } from "@/data/program";
import { Reveal } from "@/components/Reveal";
import { PmPanel } from "@/components/PmPanel";

export const metadata: Metadata = {
  title: "Status — shiplog",
  description: "PM pulse and prior Summer Pilot 2026 ships from @priyanshshahh.",
};

export default function StatusPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h1 className="font-term text-xs uppercase tracking-widest text-accent">
          status · ecosystem
        </h1>
        <p className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
          Weeks 1–3 didn&apos;t disappear when the contest clock flipped.
        </p>
        <p className="mt-4 max-w-xl text-muted">
          shiplog integrates read-only PM status (ballot requirement) and surfaces prior ships
          from{" "}
          <span className="text-foreground">@{myBuilder.handle}</span>. Official enrollment
          progress:{" "}
          <a
            href={program.dashboard}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            cohort dashboard
          </a>
          .
        </p>
      </Reveal>

      <div className="mt-10">
        <PmPanel />
      </div>

      <div className="mt-10 space-y-5">
        {myBuilder.projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-xl border border-border bg-panel/60 p-6 transition-colors hover:border-accent-dim"
            >
              <div className="flex items-center justify-between">
                <span className="font-term text-sm text-accent">
                  ship · {p.name}
                </span>
                <span className="font-term text-xs text-muted transition-colors group-hover:text-accent">
                  open live ↗
                </span>
              </div>
              <p className="mt-2 text-muted">{p.oneLiner}</p>
              <p className="mt-3 font-term text-xs text-muted/70">{p.url}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
