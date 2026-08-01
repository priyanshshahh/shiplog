import Link from "next/link";
import { builders, cohortLabel, enrolledCount } from "@/data/roster";
import { BuilderCard } from "@/components/BuilderCard";
import { StatBar } from "@/components/StatBar";
import { Reveal } from "@/components/Reveal";
import { Hero } from "@/components/Hero";

export default function Home() {
  const totalShips = builders.reduce((n, b) => n + b.projects.length, 0);
  const featured = builders.slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-6">
      <Hero />

      <section className="pb-8">
        <StatBar
          stats={[
            { label: "enrolled", value: String(enrolledCount), hint: cohortLabel },
            { label: "profiled here", value: String(builders.length), hint: "verified, PR-linked" },
            { label: "live deploys", value: String(totalShips), hint: "not screenshots" },
            { label: "review week", value: "GitHub-native", hint: "no on-site tallies" },
          ]}
        />
      </section>

      <section id="recent-ships" className="py-16">
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-term text-xs uppercase tracking-widest text-accent">
              recent ships
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Every card links to a live deploy, a source repo, and the merged pull
              request that proves it shipped. Nothing here is a mockup.
            </p>
          </div>
          <Link
            href="/cohort"
            className="hidden shrink-0 font-term text-sm text-accent hover:underline sm:block"
          >
            view full roster →
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
          view full roster →
        </Link>
      </section>

      <section className="py-16">
        <Reveal className="rounded-2xl border border-border bg-panel/60 p-8 sm:p-12">
          <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr] sm:items-center">
            <div>
              <h2 className="font-term text-xs uppercase tracking-widest text-accent">
                for hiring partners
              </h2>
              <p className="mt-3 max-w-xl text-xl leading-snug text-foreground">
                Every profile here is a merged pull request, a production URL, and a
                person you can hire this week — not a portfolio someone meant to
                finish.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <Link
                href="/partners"
                className="w-full rounded-lg bg-accent px-5 py-3 text-center font-term text-sm font-medium text-[#04140b] transition-transform hover:scale-[1.02] sm:w-auto"
              >
                partner with the cohort →
              </Link>
              <a
                href="https://github.com/rogerSuperBuilderAlpha/hult-cohort-program"
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-lg border border-border px-5 py-3 text-center font-term text-sm text-muted transition-colors hover:text-foreground sm:w-auto"
              >
                inspect the program repo ↗
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
