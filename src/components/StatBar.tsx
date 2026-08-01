"use client";

import { motion } from "framer-motion";

type Stat = { label: string; value: string; hint?: string };

export function StatBar({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="bg-panel px-5 py-4"
        >
          <div className="font-term text-2xl text-accent">{s.value}</div>
          <div className="mt-1 font-term text-[11px] uppercase tracking-wide text-muted">
            {s.label}
          </div>
          {s.hint && <div className="mt-0.5 text-[11px] text-muted">{s.hint}</div>}
        </motion.div>
      ))}
    </div>
  );
}
