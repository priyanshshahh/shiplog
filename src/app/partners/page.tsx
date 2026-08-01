import type { Metadata } from "next";
import { builders, cohortLabel, enrolledCount } from "@/data/roster";
import { program } from "@/data/program";
import { Reveal } from "@/components/Reveal";
import { PartnersClient } from "@/components/PartnersClient";

export const metadata: Metadata = {
  title: "Partners",
  description: "Request intros to Summer Pilot 2026 builders.",
};

export default async function PartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ with?: string }>;
}) {
  const sp = await searchParams;
  const preselected = sp.with ? [sp.with] : [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h1 className="font-term text-xs uppercase tracking-widest text-accent">for partners</h1>
        <p className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground">
          {cohortLabel}: builders shipping live products every week.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {enrolledCount} enrolled. Pick who you want to meet. Intros go to{" "}
          {program.placementEmail}.
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Hire",
            body: "Every profile links a merged PR and a live deploy you can use today.",
          },
          {
            title: "Sponsor",
            body: "Back a prize track or project for the next contest week.",
          },
          {
            title: "Mentor",
            body: "Office hours or a note in a public GitHub review issue.",
          },
        ].map((e) => (
          <div key={e.title} className="rounded-xl border border-border bg-panel/60 p-5">
            <h3 className="font-term text-sm text-accent">{e.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{e.body}</p>
          </div>
        ))}
      </Reveal>

      <Reveal delay={0.08} className="mt-12 rounded-2xl border border-border bg-panel/60 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-foreground">Request an intro</h2>
        <p className="mt-2 text-sm text-muted">
          Select one or more builders. Placement follows up from {program.placementEmail}.
        </p>
        <div className="mt-6">
          <PartnersClient builders={builders} preselected={preselected} />
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 rounded-2xl border border-border bg-panel/40 p-6">
        <h2 className="font-term text-xs uppercase tracking-widest text-accent">
          hiring showcase event
        </h2>
        <p className="mt-2 text-sm text-muted">
          End of pilot meetup for partners and builders. Leave your details if you want a seat.
        </p>
        <a href="/rsvp" className="mt-4 inline-block font-term text-sm text-accent hover:underline">
          RSVP for the event
        </a>
      </Reveal>
    </div>
  );
}
