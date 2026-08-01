"use client";

import { motion } from "framer-motion";

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
        cohort 67 · summer pilot 2026 · week 3
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
        className="mt-6 max-w-xl text-lg text-muted"
      >
        Every build on this page is a merged GitHub pull request with a live
        production URL. No lorem ipsum, no placeholder logos — inspect the source
        yourself.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.6 }}
        className="mt-10 flex flex-wrap gap-3"
      >
        <a
          href="#recent-ships"
          className="rounded-lg bg-accent px-5 py-3 font-term text-sm font-medium text-[#04140b] transition-transform hover:scale-[1.02]"
        >
          see the ships ↓
        </a>
        <a
          href="/partners"
          className="rounded-lg border border-border px-5 py-3 font-term text-sm text-foreground transition-colors hover:border-accent-dim"
        >
          for hiring partners
        </a>
      </motion.div>
    </section>
  );
}
