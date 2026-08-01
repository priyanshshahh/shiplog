import { pmSnapshot } from "@/data/pm";

const statusLabel: Record<string, string> = {
  live: "live",
  active: "this week",
  upcoming: "upcoming",
};

export function PmPanel() {
  return (
    <section className="rounded-2xl border border-border bg-panel/60 p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-term text-xs uppercase tracking-widest text-accent">
            cohort platforms
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Shared surfaces the whole cohort uses. Open any link to inspect the live product.
          </p>
        </div>
        <a
          href={pmSnapshot.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="font-term text-[11px] text-accent hover:underline"
        >
          program overview
        </a>
      </div>

      <ul className="mt-6 divide-y divide-border">
        {pmSnapshot.initiatives.map((i) => (
          <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
              <a
                href={i.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-foreground hover:text-accent"
              >
                {i.title}
              </a>
              <p className="mt-0.5 text-[13px] text-muted">{i.detail}</p>
            </div>
            <span className="font-term text-[11px] uppercase text-accent">
              {statusLabel[i.status]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
