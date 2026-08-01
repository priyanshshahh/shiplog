import { program } from "@/data/program";

export function ReviewCta() {
  return (
    <section className="rounded-2xl border border-accent/30 bg-accent-dim/10 p-6 sm:p-8">
      <h2 className="font-term text-xs uppercase tracking-widest text-accent">
        how winners are chosen
      </h2>
      <p className="mt-3 max-w-2xl text-lg leading-snug text-foreground">
        {program.voteRule}
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted marker:text-accent">
        <li>
          Open the peer&apos;s <span className="text-foreground">build repo</span> (linked on every
          launch card).
        </li>
        <li>
          File a written issue titled{" "}
          <code className="font-term text-accent">Review by @you: @peer</code>.
        </li>
        <li>
          Keep <code className="font-term text-accent">Vote: up</code> in the body to upvote .  or
          delete that section to abstain. No downvotes. No on-site ballots.
        </li>
      </ol>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={program.programPage}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-accent px-4 py-2.5 font-term text-sm font-medium text-[#04140b]"
        >
          open week 3 brief ↗
        </a>
        <a
          href={program.dashboard}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-border px-4 py-2.5 font-term text-sm text-foreground hover:border-accent-dim"
        >
          official dashboard ↗
        </a>
        <a
          href={program.winningGuide}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-border px-4 py-2.5 font-term text-sm text-muted hover:text-foreground"
        >
          winning guide ↗
        </a>
      </div>
      <p className="mt-4 font-term text-[10px] text-muted/70">
        Review deadline {program.reviewDeadline} · tallies never rendered on this site
      </p>
    </section>
  );
}
