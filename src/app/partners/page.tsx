import type { Metadata } from "next";
import Link from "next/link";
import { builders, cohortLabel, enrolledCount } from "@/data/roster";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Partners — shiplog",
  description: "Why hiring and investment partners should engage with Cohort 67.",
};

const engagements = [
  {
    title: "Hire",
    body: "Every builder here has a merged pull request, a peer-reviewed submission, and a live production deploy from this week alone. Skip the take-home — the take-home is already public.",
  },
  {
    title: "Sponsor",
    body: "Back a project or a prize track for the next contest week. Sponsorship gets a permanent credit on the winning submission's partner page.",
  },
  {
    title: "Mentor",
    body: "Office hours, code review, or a single async note in a peer's GitHub review issue — the same channel the cohort already uses to review each other.",
  },
];

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h1 className="font-term text-xs uppercase tracking-widest text-accent">
          for partners
        </h1>
        <p className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground">
          {cohortLabel}: engineers shipping products, in the open, on a weekly clock.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {enrolledCount} participants in the Summer Pilot 2026 complete eight
          tracked deliverables on GitHub — every submission is a pull request,
          every review is a public GitHub issue, and every winner is decided by
          peer upvote, not a vendor scoreboard. This page is one participant&apos;s
          entry in that program.
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-10 grid gap-4 sm:grid-cols-3">
        {engagements.map((e) => (
          <div
            key={e.title}
            className="rounded-xl border border-border bg-panel/60 p-5"
          >
            <h3 className="font-term text-sm text-accent">{e.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{e.body}</p>
          </div>
        ))}
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <h2 className="font-term text-xs uppercase tracking-widest text-accent">
          how to verify this isn&apos;t marketing copy
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted marker:font-term marker:text-accent">
          <li>
            Open any profile in the{" "}
            <Link href="/cohort" className="text-foreground underline underline-offset-2">
              roster
            </Link>{" "}
            and click through to the merged pull request — it&apos;s the same
            repository the whole cohort ships against.
          </li>
          <li>
            Read the program&apos;s own contributor guide,{" "}
            <a
              href="https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/blob/main/AGENTS.md"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-2"
            >
              AGENTS.md
            </a>
            , to see exactly how submissions and reviews are graded.
          </li>
          <li>
            Every deploy linked from this site is live right now — click one and
            use it.
          </li>
        </ol>
      </Reveal>

      <Reveal delay={0.15} className="mt-12 rounded-2xl border border-border bg-panel/60 p-8">
        <h2 className="text-xl font-semibold text-foreground">Reach a builder</h2>
        <p className="mt-2 max-w-xl text-muted">
          Every profile page links a merged PR you can comment on directly, and
          most builders link a production app with their own contact or intro
          flow. There is no gatekeeping form here — go straight to the source.
        </p>
        <p className="mt-4 font-term text-xs text-muted">
          {builders.length} builders profiled today · {enrolledCount} enrolled
          in {cohortLabel}
        </p>
      </Reveal>
    </div>
  );
}
