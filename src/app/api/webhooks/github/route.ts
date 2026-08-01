import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { applyMergedPrFromWebhook } from "@/lib/github-sync";
import { hasDatabase } from "@/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function verifySignature(raw: string, signature: string | null, secret: string) {
  if (!signature?.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const got = signature.slice("sha256=".length);
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(got));
  } catch {
    return false;
  }
}

/** GitHub webhook: pull_request closed+merged → GO LIVE. */
export async function POST(req: Request) {
  if (!hasDatabase()) {
    return NextResponse.json({ ok: false, error: "no database" }, { status: 503 });
  }

  const raw = await req.text();
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (secret) {
    const sig = req.headers.get("x-hub-signature-256");
    if (!verifySignature(raw, sig, secret)) {
      return NextResponse.json({ ok: false, error: "bad signature" }, { status: 401 });
    }
  }

  const event = req.headers.get("x-github-event");
  if (event === "ping") {
    return NextResponse.json({ ok: true, pong: true });
  }
  if (event !== "pull_request") {
    return NextResponse.json({ ok: true, ignored: event });
  }

  const payload = JSON.parse(raw) as {
    action?: string;
    pull_request?: {
      number: number;
      title: string;
      body: string | null;
      html_url: string;
      merged_at: string | null;
      merged: boolean;
      user: { login: string } | null;
      head: { ref: string; user: { login: string } | null };
      base: { ref: string };
    };
  };

  if (payload.action !== "closed" || !payload.pull_request?.merged) {
    return NextResponse.json({ ok: true, ignored: "not a merge" });
  }

  const status = await applyMergedPrFromWebhook(payload.pull_request);
  return NextResponse.json({ ok: true, status });
}
