import type { Metadata } from "next";
import { myBuilder } from "@/data/roster";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Status — shiplog",
  description: "Live links into this builder's earlier Cohort 67 deliverables.",
};

export default function StatusPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h1 className="font-term text-xs uppercase tracking-widest text-accent">
          prior ships, this cohort
        </h1>
        <p className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
          Weeks 1 and 2 didn&apos;t disappear when week 3 started.
        </p>
        <p className="mt-4 max-w-xl text-muted">
          shiplog is the third merged pull request from{" "}
          <span className="text-foreground">@{myBuilder.handle}</span> this pilot.
          The first two are still live — click through and use them.
        </p>
      </Reveal>

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
                  {i === 0 ? "week 1" : "week 2"} · {p.name}
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

        <Reveal delay={0.15}>
          <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted">
            <span className="font-term text-accent">week 4+</span> — Ludwitt
            learning app and phase 2 venture work are still ahead. This page
            updates as those pull requests merge.
          </div>
        </Reveal>
      </div>
    </div>
  );
}
