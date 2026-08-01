"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/#roster", label: "roster", match: "/" },
  { href: "/cohort", label: "cohort", match: "/cohort" },
  { href: "/status", label: "status", match: "/status" },
  { href: "/partners", label: "partners", match: "/partners" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-term text-sm tracking-tight text-foreground">
          <span className="text-accent">$</span> shiplog{" "}
          <span className="text-muted">summer26</span>
        </Link>
        <nav className="flex items-center gap-1 font-term text-sm">
          {links.map((l) => {
            const active =
              l.match === "/"
                ? pathname === "/"
                : pathname === l.match || pathname.startsWith(l.match + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  active
                    ? "bg-accent-dim/25 text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
