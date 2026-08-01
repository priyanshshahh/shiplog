import { NextResponse } from "next/server";
import { syncMergedPullRequests } from "@/lib/github-sync";
import { hasDatabase } from "@/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Manual / cron sync of merged cohort PRs → GO LIVE cards. */
export async function POST(req: Request) {
  if (!hasDatabase()) {
    return NextResponse.json(
      { ok: false, error: "DATABASE_URL not configured" },
      { status: 503 },
    );
  }

  const secret = process.env.SYNC_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    const url = new URL(req.url);
    const q = url.searchParams.get("secret");
    const isCron = req.headers.get("x-vercel-cron") === "1";
    if (!isCron && auth !== `Bearer ${secret}` && q !== secret) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }

  const result = await syncMergedPullRequests();
  return NextResponse.json({ ok: true, ...result });
}

export async function GET(req: Request) {
  return POST(req);
}
