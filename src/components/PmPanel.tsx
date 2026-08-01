import { pmSnapshot } from "@/data/pm";

const statusColor: Record<string, string> = {
  done: "text-accent",
  "on-track": "text-accent",
  "at-risk": "text-amber",
  upcoming: "text-muted",
};

export function PmPanel() {
  return (
    <section className="rounded-2xl border border-border bg-panel/60 p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-term text-xs uppercase tracking-widest text-accent">
            cohort pm pulse
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Read-only snapshot from the cohort PM platform — not hardcoded lorem.
            Partners see real initiative status, the same data builders work against.
          </p>
        </div>
        <a
          href={pmSnapshot.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="font-term text-[11px] text-accent hover:underline"
        >
          {pmSnapshot.sourceLabel} ↗
        </a>
      </div>

      <ul className="mt-6 divide-y divide-border">
        {pmSnapshot.initiatives.map((i) => (
          <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
              <p className="text-sm text-foreground">{i.title}</p>
              <p className="mt-0.5 font-term text-[11px] text-muted">
                @{i.ownerHandle} · {i.doneTasks} done · {i.openTasks} open
              </p>
            </div>
            <span className={`font-term text-[11px] uppercase ${statusColor[i.status]}`}>
              {i.status}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-term text-[10px] text-muted/70">
        synced {new Date(pmSnapshot.syncedAt).toLocaleString("en-US", { timeZone: "America/New_York" })} ET
      </p>
    </section>
  );
}
