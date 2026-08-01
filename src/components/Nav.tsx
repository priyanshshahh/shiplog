"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

const links = [
  { href: "/cohort", label: "cohort/" },
  { href: "/status", label: "status/" },
  { href: "/partners", label: "partners/" },
];

export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  // Liquid-glass nav: transparency, blur, and border all adapt to scroll depth
  // instead of snapping between two fixed states.
  const bgAlpha = useTransform(scrollY, [0, 120], [0.35, 0.88]);
  const blur = useTransform(scrollY, [0, 120], [6, 16]);
  const borderAlpha = useTransform(scrollY, [0, 120], [0, 0.8]);
  const background = useMotionTemplate`rgba(8, 9, 10, ${bgAlpha})`;
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  const borderColor = useMotionTemplate`rgba(29, 35, 30, ${borderAlpha})`;

  return (
    <motion.header
      style={{ background, backdropFilter, borderColor }}
      className="sticky top-0 z-30 border-b"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-term text-sm tracking-tight text-foreground">
          <span className="text-accent">$</span> shiplog{" "}
          <span className="text-muted">— summer26</span>
          <motion.span
            className="ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-accent align-middle"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          />
        </Link>
        <nav className="flex items-center gap-1 font-term text-sm">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  active
                    ? "text-accent bg-accent-dim/15"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
