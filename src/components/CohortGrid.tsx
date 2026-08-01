"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Builder } from "@/data/roster";
import { BuilderCard } from "@/components/BuilderCard";

export function CohortGrid({ builders }: { builders: Builder[] }) {
  const [active, setActive] = useState<string | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    builders.forEach((b) => b.projects.forEach((p) => p.tags.forEach((t) => set.add(t))));
    return Array.from(set).sort();
  }, [builders]);

  const filtered = active
    ? builders.filter((b) => b.projects.some((p) => p.tags.includes(active)))
    : builders;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive(null)}
          className={`font-term text-[11px] rounded-full border px-3 py-1.5 transition-colors ${
            active === null
              ? "border-accent bg-accent-dim/20 text-accent"
              : "border-border text-muted hover:text-foreground"
          }`}
        >
          all
        </button>
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t === active ? null : t)}
            className={`font-term text-[11px] rounded-full border px-3 py-1.5 transition-colors ${
              active === t
                ? "border-accent bg-accent-dim/20 text-accent"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((b, i) => (
            <motion.div
              key={b.handle}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <BuilderCard builder={b} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-8 font-term text-sm text-muted">
          No profiled builder tagged &ldquo;{active}&rdquo; yet.
        </p>
      )}
    </div>
  );
}
