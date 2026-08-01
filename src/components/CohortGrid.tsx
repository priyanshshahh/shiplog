"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Builder } from "@/data/roster";
import { BuilderCard } from "@/components/BuilderCard";

/** High-level facets only. Avoids a 20+ tag cloud. */
const FACETS: { id: string; label: string; match: (b: Builder) => boolean }[] = [
  { id: "all", label: "all", match: () => true },
  {
    id: "showcase",
    label: "showcase",
    match: (b) =>
      b.projects.some((p) =>
        p.tags.some((t) =>
          ["hiring-showcase", "vibe-marketing", "partnerships", "editorial", "branding", "transparency"].includes(t),
        ),
      ),
  },
  {
    id: "tools",
    label: "tools",
    match: (b) =>
      b.projects.some((p) =>
        p.tags.some((t) =>
          ["productivity", "pm-tracking", "internal-tools", "realtime-comms", "creator-tools", "ai-studio", "admin-cms"].includes(t),
        ),
      ),
  },
  {
    id: "infra",
    label: "infra",
    match: (b) =>
      b.projects.some((p) =>
        p.tags.some((t) =>
          ["infra", "auto-sync-directory", "suite-integration", "community", "self-serve-wall"].includes(t),
        ),
      ),
  },
];

export function CohortGrid({ builders }: { builders: Builder[] }) {
  const [facet, setFacet] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const f = FACETS.find((x) => x.id === facet) ?? FACETS[0];
    let list = builders.filter(f.match);
    if (q.trim()) {
      const n = q.toLowerCase();
      list = list.filter(
        (b) =>
          b.handle.toLowerCase().includes(n) ||
          (b.name?.toLowerCase().includes(n) ?? false) ||
          b.projects.some(
            (p) => p.name.toLowerCase().includes(n) || p.oneLiner.toLowerCase().includes(n),
          ),
      );
    }
    return list;
  }, [builders, facet, q]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {FACETS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFacet(f.id)}
            className={`rounded-full border px-3 py-1.5 font-term text-[11px] transition-colors ${
              facet === f.id
                ? "border-accent bg-accent-dim/20 text-accent"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search people or projects"
          className="ml-auto min-w-[160px] flex-1 rounded-lg border border-border bg-panel/60 px-3 py-1.5 font-term text-xs text-foreground outline-none placeholder:text-muted focus:border-accent-dim sm:max-w-xs"
        />
      </div>

      <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((b, i) => (
            <motion.div
              key={b.handle}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <BuilderCard builder={b} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-8 font-term text-sm text-muted">No builders match that search.</p>
      )}
    </div>
  );
}
