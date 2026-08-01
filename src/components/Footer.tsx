import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/80 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 font-term text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          shiplog — built in the open for the Hult Cohort Program&apos;s{" "}
          <span className="text-accent">Summer Pilot 2026</span>.
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
