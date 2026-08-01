import { avatarUrl } from "@/data/roster";
import {
  contributorCount,
  contributors,
  repoUrl,
  totalContributions,
} from "@/data/contributors";

export function ContributorWall({ limit = 24 }: { limit?: number }) {
  const shown = contributors.slice(0, limit);
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-term text-xs uppercase tracking-widest text-accent">
            active contributors
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            {contributorCount} public contributors · {totalContributions} commits on the
            cohort program repo — the same surface partners inspect.
          </p>
        </div>
        <a
          href={`${repoUrl}/graphs/contributors`}
          target="_blank"
          rel="noreferrer"
          className="font-term text-[11px] text-accent hover:underline"
        >
          github contributors ↗
        </a>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {shown.map((c) => (
          <a
            key={c.handle}
            href={`https://github.com/${c.handle}`}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 rounded-full border border-border bg-panel/50 py-1.5 pr-3 pl-1.5 transition-colors hover:border-accent-dim"
            title={`${c.contributions} contributions`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl(c.handle)}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 rounded-full"
              loading="lazy"
            />
            <span className="font-term text-[11px] text-muted group-hover:text-foreground">
              @{c.handle}
            </span>
            <span className="font-term text-[10px] text-accent/80">{c.contributions}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
