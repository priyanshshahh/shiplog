"use client";

import { useState } from "react";

export function RsvpForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const field =
    "rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent-dim";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      org: String(form.get("org") || ""),
      notes: String(form.get("notes") || ""),
    };
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "RSVP failed");
      }
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "RSVP failed");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 font-term text-[11px] text-muted">
          Name
          <input name="name" required className={field} />
        </label>
        <label className="flex flex-col gap-1.5 font-term text-[11px] text-muted">
          Email
          <input name="email" type="email" required className={field} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 font-term text-[11px] text-muted">
        Organization
        <input name="org" className={field} />
      </label>
      <label className="flex flex-col gap-1.5 font-term text-[11px] text-muted">
        Notes
        <textarea name="notes" rows={3} className={field} placeholder="Dietary, guests, roles of interest…" />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-accent px-5 py-3 font-term text-sm font-medium text-[#04140b] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Confirm RSVP"}
      </button>
      {status === "ok" && (
        <p className="text-sm text-accent">Saved. Placement will follow up.</p>
      )}
      {status === "error" && <p className="text-sm text-amber">{error}</p>}
    </form>
  );
}
