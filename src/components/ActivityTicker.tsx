"use client";

import { activity } from "@/data/roster";

function relativeTime(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 60) return `${Math.max(mins, 0)}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

function Row({ e }: { e: (typeof activity)[number] }) {
  return (
    <a
      href={e.url}
      target="_blank"
      rel="noreferrer"
      className="mx-3 inline-flex items-center gap-2 whitespace-nowrap font-term text-xs text-muted hover:text-accent"
    >
      <span className={e.action === "merged" ? "text-accent" : "text-amber"}>
        {e.action === "merged" ? "●" : "○"}
      </span>
      <span className="text-foreground">@{e.handle}</span>
      {e.action === "merged" ? "merged" : "opened"}
      <span className="text-foreground">{e.project}</span>
      <span className="text-muted/60">· #{e.prNumber} · {relativeTime(e.at)}</span>
    </a>
  );
}

export function ActivityTicker() {
  // Duplicate the track once for a seamless CSS-driven marquee loop.
  const track = [...activity, ...activity];

  return (
    <div
      className="group relative overflow-hidden border-y border-border bg-panel/40 py-2.5"
      aria-label="Recent cohort activity"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-[marquee_38s_linear_infinite] group-hover:[animation-play-state:paused]">
        {track.map((e, i) => (
          <Row key={`${e.prNumber}-${e.action}-${i}`} e={e} />
        ))}
      </div>
    </div>
  );
}
