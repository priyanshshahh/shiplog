"use client";

import { activity } from "@/data/roster";
import { reviewPulse } from "@/data/program";

type Pulse =
  | { kind: "ship"; handle: string; project: string; action: string; url: string; at: string }
  | { kind: "review"; handle: string; project: string; action: string; url: string; at: string };

function items(): Pulse[] {
  const ships: Pulse[] = activity.map((e) => ({
    kind: "ship",
    handle: e.handle,
    project: e.project,
    action: e.action === "merged" ? "merged" : "opened",
    url: e.url,
    at: e.at,
  }));
  const reviews: Pulse[] = reviewPulse.map((r) => ({
    kind: "review",
    handle: r.reviewer,
    project: r.subject,
    action: r.hasUpvote ? "reviewed + Vote: up" : "reviewed",
    url: r.url,
    at: r.at,
  }));
  return [...ships, ...reviews].sort(
    (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime(),
  );
}

export function SocialPulse() {
  const track = items();
  const loop = [...track, ...track];

  return (
    <div
      className="group relative overflow-hidden border-y border-border bg-panel/40 py-2.5"
      aria-label="Live cohort pulse"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-[marquee_42s_linear_infinite] group-hover:[animation-play-state:paused]">
        {loop.map((e, i) => (
          <a
            key={`${e.kind}-${e.handle}-${e.project}-${i}`}
            href={e.url}
            target="_blank"
            rel="noreferrer"
            className="mx-3 inline-flex items-center gap-2 whitespace-nowrap font-term text-xs text-muted hover:text-accent"
          >
            <span className={e.kind === "review" ? "text-amber" : "text-accent"}>
              {e.kind === "review" ? "▲" : "●"}
            </span>
            <span className="text-foreground">@{e.handle}</span>
            {e.action}
            <span className="text-foreground">{e.project}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
