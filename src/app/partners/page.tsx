import type { Metadata } from "next";
import Link from "next/link";
import { builders, cohortLabel, enrolledCount } from "@/data/roster";
import { program } from "@/data/program";
import { Reveal } from "@/components/Reveal";
import { RequestIntroForm } from "@/components/RequestIntroForm";

export const metadata: Metadata = {
  title: "Partners — shiplog",
  description:
    "Hire, sponsor, or mentor Summer Pilot 2026 builders. Request intros to cohort@hult.edu.",
  openGraph: {
    title: "Partners — shiplog",
    description: "Request intros to Summer Pilot 2026 builders.",
    type: "website",
  },
};

const engagements = [
  {
    title: "Hire",
    body: "Every builder here has a merged pull request, peer review surface, and live production deploy. Skip the take-home — the take-home is already public.",
  },
  {
    title: "Sponsor",
    body: "Back a project or prize track for the next contest week. Sponsorship credits land on the partner page of the winning submission.",
  },
  {
    title: "Mentor",
    body: "Office hours, code review, or a note in a peer GitHub review issue — the same channel the cohort already uses.",
  },
];

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h1 className="font-term text-xs uppercase tracking-widest text-accent">for partners</h1>
        <p className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground">
          {cohortLabel}: engineers shipping products, in the open, on a weekly clock.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {enrolledCount} participants complete tracked deliverables on GitHub — every submission
          is a pull request, every review is a public GitHub issue, and every winner is decided by
          peer <span className="text-foreground">Vote: up</span>, not a vendor scoreboard. Track
          official progress on{" "}
          <a
            href={program.dashboard}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            the cohort dashboard
          </a>
          .
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-10 grid gap-4 sm:grid-cols-3">
        {engagements.map((e) => (
          <div key={e.title} className="rounded-xl border border-border bg-panel/60 p-5">
            <h3 className="font-term text-sm text-accent">{e.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{e.body}</p>
          </div>
        ))}
      </Reveal>

      <Reveal delay={0.08} className="mt-12">
        <h2 className="font-term text-xs uppercase tracking-widest text-accent">
          fee model (summary)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Placement follows the program hiring pipeline: showcase → async portfolio review → intro
          requests via placement lead → your interview process → hire → referral fee on start date.
          Details live in the cohort{" "}
          <a
            href="https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/blob/main/partnerships/hiring-partners.md"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            hiring-partners.md
          </a>
          . Contact {program.placementEmail}.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 rounded-2xl border border-border bg-panel/60 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-foreground">Request an intro</h2>
        <p className="mt-2 text-sm text-muted">
          Routes to placement ({program.placementEmail}). Select the builders you want to meet.
        </p>
        <div className="mt-6">
          <RequestIntroForm builders={builders} />
        </div>
      </Reveal>

      <Reveal delay={0.12} className="mt-10">
        <Link href="/rsvp" className="font-term text-sm text-accent hover:underline">
          Prefer the end-of-pilot showcase? RSVP here →
        </Link>
      </Reveal>
    </div>
  );
}
