import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/80 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 font-term text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          shiplog — built in the open for{" "}
          <span className="text-accent">Cohort 67</span>, Summer Pilot 2026.
        </p>
        <div className="flex gap-4">
          <Link href="/partners" className="hover:text-foreground">
            partner with us
          </Link>
          <a
            href="https://github.com/rogerSuperBuilderAlpha/hult-cohort-program"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            program source
          </a>
        </div>
      </div>
    </footer>
  );
}
