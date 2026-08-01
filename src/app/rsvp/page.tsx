import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { RsvpForm } from "@/components/RsvpForm";
import { program } from "@/data/program";

export const metadata: Metadata = {
  title: "Event RSVP",
  description: "RSVP for the Summer Pilot 2026 hiring showcase event.",
};

export default function RsvpPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <Reveal>
        <h1 className="font-term text-xs uppercase tracking-widest text-accent">
          hiring showcase event
        </h1>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Meet builders and partners at the end of the pilot.
        </p>
        <p className="mt-4 text-muted">
          Confirmations go to {program.placementEmail}. This is an event signup, not a job
          application.
        </p>
      </Reveal>
      <div className="mt-10 rounded-2xl border border-border bg-panel/60 p-6">
        <RsvpForm />
      </div>
    </div>
  );
}
