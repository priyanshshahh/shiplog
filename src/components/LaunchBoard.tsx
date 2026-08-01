"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { avatarUrl, type Builder } from "@/data/roster";
import { reviewIssueUrl } from "@/data/program";
import { Tag } from "@/components/Tag";

type Sort = "new" | "alpha" | "ships";

export function LaunchBoard({ builders }: { builders: Builder[] }) {
  const [sort, setSort] = useState<Sort>("new");
  const [tag, setTag] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const publicBuilders = builders.filter((b) => b.privacy !== "private");

  const tags = useMemo(() => {
    const set = new Set<string>();
    publicBuilders.forEach((b) => b.projects.forEach((p) => p.tags.forEach((t) => set.add(t))));
    return Array.from(set).sort();
  }, [publicBuilders]);

  const rows = useMemo(() => {
    let list = [...publicBuilders];
    if (tag) list = list.filter((b) => b.projects.some((p) => p.tags.includes(tag)));
    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter(
        (b) =>
          b.handle.toLowerCase().includes(needle) ||
          b.bio.toLowerCase().includes(needle) ||
          b.projects.some(
            (p) =>
              p.name.toLowerCase().includes(needle) ||
              p.oneLiner.toLowerCase().includes(needle),
          ),
      );
    }
    if (sort === "alpha") list.sort((a, b) => a.handle.localeCompare(b.handle));
    else if (sort === "ships")
      list.sort((a, b) => b.projects.length - a.projects.length);
    // "new" keeps roster insertion order (newest ships first in our data)
    return list;
  }, [publicBuilders, sort, tag, q]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {(["new", "ships", "alpha"] as Sort[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSort(s)}
            className={`rounded-full border px-3 py-1.5 font-term text-[11px] uppercase transition-colors ${
              sort === s
                ? "border-accent bg-accent-dim/20 text-accent"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search builders / tags…"
          className="ml-auto min-w-[180px] flex-1 rounded-lg border border-border bg-panel/60 px-3 py-1.5 font-term text-xs text-foreground outline-none placeholder:text-muted focus:border-accent-dim sm:max-w-xs"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTag(null)}
          className={`rounded-full border px-3 py-1 font-term text-[11px] ${
            tag === null
              ? "border-accent bg-accent-dim/20 text-accent"
              : "border-border text-muted"
          }`}
        >
          all
        </button>
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(t === tag ? null : t)}
            className={`rounded-full border px-3 py-1 font-term text-[11px] ${
              tag === t
                ? "border-accent bg-accent-dim/20 text-accent"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-panel/40">
        <AnimatePresence mode="popLayout">
          {rows.map((b, i) => (
            <LaunchRow key={b.handle} builder={b} rank={i + 1} />
          ))}
        </AnimatePresence>
        {rows.length === 0 && (
          <p className="p-6 font-term text-sm text-muted">No launches match.</p>
        )}
      </div>
    </div>
  );
}

function LaunchRow({ builder, rank }: { builder: Builder; rank: number }) {
  const lead = builder.projects[0];
  const repo = builder.buildRepo || lead.repo || builder.prUrl;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="group flex flex-col gap-4 p-4 transition-colors hover:bg-accent-dim/5 sm:flex-row sm:items-center"
    >
      <div className="flex shrink-0 items-center gap-3 sm:w-14 sm:flex-col sm:gap-1">
        <span className="font-term text-xs text-muted">#{rank}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl(builder.handle)}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border border-border"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <Link
            href={`/cohort/${builder.handle}`}
            className="text-lg font-semibold text-foreground hover:text-accent"
          >
            {lead.name}
          </Link>
          <span className="font-term text-[11px] text-muted">@{builder.handle}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{lead.oneLiner}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Tag>{lead.tags[0]}</Tag>
          <Tag>{lead.tags[1]}</Tag>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-stretch">
        <a
          href={lead.url}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-accent px-3 py-2 text-center font-term text-[11px] font-medium text-[#04140b]"
        >
          open deploy
        </a>
        <a
          href={reviewIssueUrl(repo, "you", builder.handle)}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-border px-3 py-2 text-center font-term text-[11px] text-amber hover:border-amber"
          title="File a GitHub review issue with optional Vote: up"
        >
          ▲ review / Vote: up
        </a>
      </div>
    </motion.article>
  );
}
