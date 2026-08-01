"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { avatarUrl, type Builder } from "@/data/roster";
import { Tag } from "@/components/Tag";
import { BrowserFrame } from "@/components/BrowserFrame";

export function BuilderCard({ builder, index = 0 }: { builder: Builder; index?: number }) {
  const lead = builder.projects[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: Math.min(index, 6) * 0.04 }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-panel/60 transition-colors hover:border-accent-dim"
    >
      {lead.shot && (
        <BrowserFrame
          src={lead.shot}
          alt={`${lead.name} screenshot`}
          url={lead.url}
          className="rounded-none border-0"
        />
      )}

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl(builder.handle)}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-full border border-border"
              loading="lazy"
            />
            <div>
              <Link
                href={`/cohort/${builder.handle}`}
                className="font-term text-sm text-foreground hover:text-accent"
              >
                @{builder.handle}
              </Link>
              <p className="mt-0.5 text-sm font-medium text-foreground">{lead.name}</p>
            </div>
          </div>
          <span className="font-term text-[10px] text-muted">
            {builder.projects.length > 1 ? `${builder.projects.length} ships` : "1 ship"}
          </span>
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-muted">{lead.oneLiner}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <Tag>{lead.tags[0]}</Tag>
          <Tag>{lead.tags[1]}</Tag>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-3 font-term text-[11px] text-muted">
          <a href={lead.url} target="_blank" rel="noreferrer" className="hover:text-accent">
            deploy
          </a>
          {lead.repo && (
            <a href={lead.repo} target="_blank" rel="noreferrer" className="hover:text-accent">
              repo
            </a>
          )}
          <Link href={`/cohort/${builder.handle}`} className="hover:text-accent">
            profile
          </Link>
          <Link
            href={`/partners?with=${encodeURIComponent(builder.handle)}`}
            className="ml-auto text-accent hover:underline"
          >
            request intro
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
