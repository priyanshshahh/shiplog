"use client";

import { useState } from "react";
import type { Builder } from "@/data/roster";

const INTERESTS = [
  { value: "hire", label: "Hire" },
  { value: "sponsor", label: "Sponsor" },
  { value: "mentor", label: "Mentor" },
  { value: "other", label: "Other" },
] as const;

export function RequestIntroForm({
  builders,
  preselected = [],
}: {
  builders: Builder[];
  preselected?: string[];
}) {
  const candidates = builders.filter((b) => b.privacy !== "private");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = {
      partnerName: String(form.get("partnerName") || ""),
      company: String(form.get("company") || ""),
      email: String(form.get("email") || ""),
      interest: String(form.get("interest") || ""),
      studentHandles: form.getAll("students").map(String),
      message: String(form.get("message") || ""),
    };
    try {
      const res = await fetch("/api/request-intro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Request failed");
      }
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Request failed");
    }
  }

  const field =
    "rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent-dim";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 font-term text-[11px] text-muted">
          Your name
          <input name="partnerName" required maxLength={120} className={field} />
        </label>
        <label className="flex flex-col gap-1.5 font-term text-[11px] text-muted">
          Company
          <input name="company" required maxLength={120} className={field} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 font-term text-[11px] text-muted">
        Work email
        <input name="email" type="email" required maxLength={160} className={field} />
      </label>
      <label className="flex flex-col gap-1.5 font-term text-[11px] text-muted">
        Interest
        <select name="interest" required defaultValue="" className={field}>
          <option value="" disabled>
            Select one…
          </option>
          {INTERESTS.map((i) => (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>
      </label>
      <fieldset>
        <legend className="mb-2 font-term text-[11px] text-muted">Builders to meet</legend>
        <div className="grid max-h-48 gap-2 overflow-y-auto rounded-lg border border-border bg-background p-3 sm:grid-cols-2">
          {candidates.map((b) => (
            <label key={b.handle} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="students"
                value={b.handle}
                defaultChecked={preselected.includes(b.handle)}
                className="accent-[var(--accent)]"
              />
              <span className="text-foreground">@{b.handle}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex flex-col gap-1.5 font-term text-[11px] text-muted">
        Message
        <textarea
          name="message"
          required
          rows={4}
          maxLength={2000}
          placeholder="Roles, timeline, anything useful for cohort@hult.edu…"
          className={field}
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-accent px-5 py-3 font-term text-sm font-medium text-[#04140b] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request intro →"}
      </button>
      {status === "ok" && (
        <p className="text-sm text-accent">
          Sent. Placement lead ({`cohort@hult.edu`}) will follow up.
        </p>
      )}
      {status === "error" && <p className="text-sm text-amber">{error}</p>}
    </form>
  );
}
