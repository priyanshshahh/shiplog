"use client";

import { motion } from "framer-motion";

const word = "shiplog";

export function Hero() {
  return (
    <section className="relative flex min-h-[58vh] flex-col justify-center py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="font-term text-xs uppercase tracking-[0.3em] text-accent"
      >
        summer pilot 2026 · vibe marketing
      </motion.div>

      <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-7xl">
        {word.split("").map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i, duration: 0.3 }}
            className="inline-block"
          >
            {ch}
          </motion.span>
        ))}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 * word.length, duration: 0.3 }}
          className="block text-3xl font-normal text-muted sm:text-4xl"
        >
          proof of work, not a portfolio.
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="mt-6 max-w-xl text-lg text-muted"
      >
        The public roster for the Hult cohort. Live deploys, real profiles, and a clear path for
        partners to request intros.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="mt-10 flex flex-wrap gap-3"
      >
        <a
          href="#roster"
          className="rounded-lg bg-accent px-5 py-3 font-term text-sm font-medium text-[var(--accent-ink)] transition-transform hover:scale-[1.02]"
        >
          see the ships
        </a>
        <a
          href="/partners"
          className="rounded-lg border border-border px-5 py-3 font-term text-sm text-foreground transition-colors hover:border-accent-dim"
        >
          for partners
        </a>
      </motion.div>
    </section>
  );
}
