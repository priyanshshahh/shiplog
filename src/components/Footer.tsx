import Link from "next/link";
import { program } from "@/data/program";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/80 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 font-term text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          shiplog — public marketing surface for{" "}
          <span className="text-accent">{program.cohortLabel}</span>. Votes live on GitHub.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href={program.dashboard} target="_blank" rel="noreferrer" className="hover:text-foreground">
            official dashboard
          </a>
          <Link href="/partners" className="hover:text-foreground">
            request intro
          </Link>
          <a href={program.repo} target="_blank" rel="noreferrer" className="hover:text-foreground">
            program source
          </a>
          <a href={`mailto:${program.placementEmail}`} className="hover:text-foreground">
            {program.placementEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
