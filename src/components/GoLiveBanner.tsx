import Link from "next/link";

const GO_LIVE_URL =
  "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/compare/projects/summer26/phase-1-project-3...participants/summer26/phase-1-project-3/YOUR_HANDLE?expand=1";

export function GoLiveBanner() {
  return (
    <div className="rounded-xl border border-accent/30 bg-accent-dim/10 px-5 py-4">
      <p className="font-term text-xs uppercase tracking-widest text-accent">go live</p>
      <p className="mt-2 text-sm text-muted">
        Ships appear here when your submission PR merges into the cohort repo. Edit your
        profile and media after you claim with GitHub.
      </p>
      <div className="mt-3 flex flex-wrap gap-3 font-term text-xs">
        <a
          href={GO_LIVE_URL}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          open merge PR template
        </a>
        <Link href="/me" className="text-muted hover:text-accent">
          claim / edit profile
        </Link>
        <a
          href="https://cohorts.algorithmacy.org/program/phase-1-project-3"
          target="_blank"
          rel="noreferrer"
          className="text-muted hover:text-accent"
        >
          week 3 brief
        </a>
      </div>
    </div>
  );
}
