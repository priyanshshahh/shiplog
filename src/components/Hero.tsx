"use client";

import { motion } from "framer-motion";
import { program } from "@/data/program";

const word = "shiplog";

export function Hero() {
  return (
    <section className="relative flex min-h-[70vh] flex-col justify-center py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="font-term text-xs uppercase tracking-[0.3em] text-accent"
      >
        summer pilot 2026 · week 3 · vibe marketing
      </motion.div>

      <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-7xl">
        {word.split("").map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {ch}
          </motion.span>
        ))}
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * word.length, duration: 0.4 }}
          className="block text-3xl font-normal text-muted sm:text-4xl"
        >
          proof of work, not a portfolio.
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
      >
        shiplog is the public launchpad for {program.cohortLabel}: {program.enrolledCount}{" "}
        enrolled builders shipping on a weekly clock. Every card links a live deploy, a source
        repo, and the merged pull request that proves it shipped. Partners browse like an
        OpenAI-grade gallery; peers review and{" "}
        <span className="text-foreground">Vote: up on GitHub</span> like Debut — tallies stay
        off this site by program rule. Official progress lives on{" "}
        <a
          href={program.dashboard}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          cohorts.algorithmacy.org/dashboard
        </a>
        .
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="mt-4 max-w-2xl text-sm leading-relaxed text-muted/90"
      >
        This is not a dry directory. Activity pulses from real merges and review issues. The
        contributor wall mirrors the cohort program repo. Request intros route to{" "}
        {program.placementEmail}. RSVP for the end-of-pilot hiring showcase. PM pulse reads from
        Keel so partners see initiative status — the same evidence the curriculum requires for
        ballot eligibility. Inspect the source. Hire the people who shipped it.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="mt-10 flex flex-wrap gap-3"
      >
        <a
          href="#launches"
          className="rounded-lg bg-accent px-5 py-3 font-term text-sm font-medium text-[#04140b] transition-transform hover:scale-[1.02]"
        >
          browse launches ↓
        </a>
        <a
          href="/partners"
          className="rounded-lg border border-border px-5 py-3 font-term text-sm text-foreground transition-colors hover:border-accent-dim"
        >
          request intro
        </a>
        <a
          href="/rsvp"
          className="rounded-lg border border-border px-5 py-3 font-term text-sm text-muted transition-colors hover:text-foreground"
        >
          showcase RSVP
        </a>
      </motion.div>
    </section>
  );
}
