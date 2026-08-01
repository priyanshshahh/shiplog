import type { Metadata } from "next";
import { builders, cohortLabel, enrolledCount } from "@/data/roster";
import { CohortGrid } from "@/components/CohortGrid";
import { Reveal } from "@/components/Reveal";
import { program } from "@/data/program";

export const metadata: Metadata = {
  title: "Cohort — shiplog",
  description: "Profiled roster of Summer Pilot 2026 builders.",
};

export default function CohortPage() {
  const publicBuilders = builders.filter((b) => b.privacy !== "private");
  const privateCount = builders.length - publicBuilders.length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <h1 className="font-term text-xs uppercase tracking-widest text-accent">the roster</h1>
        <p className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
          {publicBuilders.length} public profiles · {enrolledCount} enrolled in {cohortLabel}.
        </p>
        <p className="mt-3 max-w-2xl text-muted">
          Verified merged Project 3 submissions only — no filler names.{" "}
          {privateCount > 0 && (
            <>
              {privateCount} opt-out placeholder{privateCount === 1 ? "" : "s"} respected.{" "}
            </>
          )}
          Track reviews & votes on the{" "}
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
        <CohortGrid builders={publicBuilders} />
      </div>
    </div>
  );
}
