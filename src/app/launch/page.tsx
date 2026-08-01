import type { Metadata } from "next";
import { builders } from "@/data/roster";
import { LaunchBoard } from "@/components/LaunchBoard";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Launches — shiplog",
  description: "Debut-style launch board for Summer Pilot 2026 ships.",
};

export default function LaunchPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <h1 className="font-term text-xs uppercase tracking-widest text-accent">launches</h1>
        <p className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight">
          Fresh ships. GitHub-native Vote: up.
        </p>
      </Reveal>
      <div className="mt-10">
        <LaunchBoard builders={builders} />
      </div>
    </div>
  );
}
