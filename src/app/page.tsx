import Link from "next/link";
import { cohortLabel, enrolledCount } from "@/data/roster";
import { getBuilders } from "@/lib/roster";
import { GoLiveBanner } from "@/components/GoLiveBanner";
import { StatBar } from "@/components/StatBar";
import { Reveal } from "@/components/Reveal";
import { Hero } from "@/components/Hero";
import { ActivityTicker } from "@/components/ActivityTicker";
import { BuilderCard } from "@/components/BuilderCard";
import { PmPanel } from "@/components/PmPanel";
import { ContributorWall } from "@/components/ContributorWall";

export const dynamic = "force-dynamic";

export default async function Home() {
  const builders = await getBuilders();
  const publicBuilders = builders.filter((b) => b.privacy !== "private");
  const featured = publicBuilders.slice(0, 6);
  const totalShips = builders.reduce((n, b) => n + b.projects.length, 0);

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6">
        <Hero />
      </div>
      <ActivityTicker />
      <div className="mx-auto max-w-6xl px-6">
        <section className="pb-8 pt-10">
          <StatBar
            stats={[
              { label: "enrolled", value: String(enrolledCount), hint: cohortLabel },
              { label: "on this roster", value: String(publicBuilders.length), hint: "verified ships" },
              { label: "live deploys", value: String(totalShips), hint: "open and use them" },
              { label: "reviews", value: "on GitHub", hint: "Vote: up in issues" },
            ]}
          />
        </section>

        <section className="py-6"><GoLiveBanner /></section>

        <section id="roster" className="py-16">
          <Reveal className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-term text-xs uppercase tracking-widest text-accent">
                recent ships
              </h2>
              <p className="mt-2 max-w-xl text-muted">
                Every card opens a live deploy, source, and profile. Request an intro to anyone
                from their page or Partners.
              </p>
            </div>
            <Link
              href="/cohort"
              className="hidden shrink-0 font-term text-sm text-accent hover:underline sm:block"
            >
              full roster
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((b, i) => (
              <BuilderCard key={b.handle} builder={b} index={i} />
            ))}
          </div>

          <Link
            href="/cohort"
            className="mt-6 block text-center font-term text-sm text-accent hover:underline sm:hidden"
          >
            full roster
          </Link>
        </section>

        <section className="py-10">
          <PmPanel />
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
                  Browse builders, open their live apps, then request an intro to the people you
                  want to meet.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <Link
                  href="/partners"
                  className="w-full rounded-lg bg-accent px-5 py-3 text-center font-term text-sm font-medium text-[var(--accent-ink)] sm:w-auto"
                >
                  request an intro
                </Link>
                <Link
                  href="/cohort"
                  className="w-full rounded-lg border border-border px-5 py-3 text-center font-term text-sm text-muted hover:text-foreground sm:w-auto"
                >
                  browse the roster
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
