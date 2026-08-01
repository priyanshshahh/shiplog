import Link from "next/link";
import { builders, cohortLabel, enrolledCount } from "@/data/roster";
import { contributorCount, totalContributions } from "@/data/contributors";
import { program } from "@/data/program";
import { StatBar } from "@/components/StatBar";
import { Reveal } from "@/components/Reveal";
import { Hero } from "@/components/Hero";
import { SocialPulse } from "@/components/SocialPulse";
import { LaunchBoard } from "@/components/LaunchBoard";
import { PmPanel } from "@/components/PmPanel";
import { ContributorWall } from "@/components/ContributorWall";
import { ReviewCta } from "@/components/ReviewCta";

export default function Home() {
  const publicCount = builders.filter((b) => b.privacy !== "private").length;
  const totalShips = builders.reduce((n, b) => n + b.projects.length, 0);

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6">
        <Hero />
      </div>
      <SocialPulse />
      <div className="mx-auto max-w-6xl px-6">
        <section className="pb-8 pt-10">
          <StatBar
            stats={[
              { label: "enrolled", value: String(enrolledCount), hint: cohortLabel },
              { label: "profiled", value: String(publicCount), hint: "PR-linked · verified" },
              { label: "live deploys", value: String(totalShips), hint: "not screenshots" },
              {
                label: "repo commits",
                value: String(totalContributions),
                hint: `${contributorCount} contributors`,
              },
            ]}
          />
        </section>

        <section id="launches" className="py-16">
          <Reveal>
            <h2 className="font-term text-xs uppercase tracking-widest text-accent">
              launch board
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              Debut-dense feed: sort, search, micro-tags. Upvotes happen on GitHub review issues —
              use ▲ review / Vote: up on each row. Tallies never render here.
            </p>
          </Reveal>
          <div className="mt-8">
            <LaunchBoard builders={builders} />
          </div>
        </section>

        <section className="py-10">
          <PmPanel />
        </section>

        <section className="py-10">
          <ReviewCta />
        </section>

        <section className="py-16">
          <ContributorWall />
        </section>

        <section className="py-16">
          <Reveal className="rounded-2xl border border-border bg-panel/60 p-8 sm:p-12">
            <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr] sm:items-center">
              <div>
                <h2 className="font-term text-xs uppercase tracking-widest text-accent">
                  for hiring partners
                </h2>
                <p className="mt-3 max-w-xl text-xl leading-snug text-foreground">
                  Every profile is a merged pull request, a production URL, and a person you can
                  hire — not a portfolio someone meant to finish.
                </p>
                <p className="mt-3 text-sm text-muted">
                  Official cohort ops:{" "}
                  <a
                    href={program.officialSite}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline"
                  >
                    {program.officialSite.replace("https://", "")}
                  </a>
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <Link
                  href="/partners"
                  className="w-full rounded-lg bg-accent px-5 py-3 text-center font-term text-sm font-medium text-[#04140b] transition-transform hover:scale-[1.02] sm:w-auto"
                >
                  request intro →
                </Link>
                <Link
                  href="/rsvp"
                  className="w-full rounded-lg border border-border px-5 py-3 text-center font-term text-sm text-muted transition-colors hover:text-foreground sm:w-auto"
                >
                  RSVP hiring showcase
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
