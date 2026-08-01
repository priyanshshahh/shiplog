import type { Metadata } from "next";
import { builders, cohortLabel, enrolledCount } from "@/data/roster";
import { CohortGrid } from "@/components/CohortGrid";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Cohort — shiplog",
  description: "The full profiled roster of Cohort 67 builders.",
};

export default function CohortPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <h1 className="font-term text-xs uppercase tracking-widest text-accent">
          the roster
        </h1>
        <p className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
          {builders.length} profiled builders, {enrolledCount} enrolled in {cohortLabel}.
        </p>
        <p className="mt-3 max-w-2xl text-muted">
          This wall only lists people with a merged, verifiable Project 3 submission —
          no filler names. The rest of the roster is still shipping; check back as
          more pull requests merge.
        </p>
      </Reveal>

      <div className="mt-10">
        <CohortGrid builders={builders} />
      </div>
    </div>
  );
}
