import type { Metadata } from "next";
import { cohortLabel, enrolledCount } from "@/data/roster";
import { getBuilders } from "@/lib/roster";
import { CohortGrid } from "@/components/CohortGrid";
import { Reveal } from "@/components/Reveal";
import { GoLiveBanner } from "@/components/GoLiveBanner";

export const metadata: Metadata = {
  title: "Roster",
  description: "Profiled builders in Summer Pilot 2026.",
};

export const dynamic = "force-dynamic";

export default async function CohortPage() {
  const builders = await getBuilders();
  const publicBuilders = builders.filter((b) => b.privacy !== "private");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <h1 className="font-term text-xs uppercase tracking-widest text-accent">roster</h1>
        <p className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
          {publicBuilders.length} builders on the roster · {enrolledCount} enrolled in{" "}
          {cohortLabel}.
        </p>
        <p className="mt-3 max-w-2xl text-muted">
          Search or filter, open a profile, then request an intro to anyone you want to meet.
          Ships GO LIVE when submission PRs merge.
        </p>
      </Reveal>

      <div className="mt-8">
        <GoLiveBanner />
      </div>

      <div className="mt-10">
        <CohortGrid builders={publicBuilders} />
      </div>
    </div>
  );
}
