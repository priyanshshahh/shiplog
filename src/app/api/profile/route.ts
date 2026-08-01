import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb, hasDatabase } from "@/db";
import { members } from "@/db/schema";

export const runtime = "nodejs";

export async function PATCH(req: Request) {
  const session = await auth();
  const login = session?.user?.login;
  if (!login) {
    return NextResponse.json({ ok: false, error: "signin required" }, { status: 401 });
  }
  if (!hasDatabase()) {
    return NextResponse.json({ ok: false, error: "DATABASE_URL required" }, { status: 503 });
  }

  const body = (await req.json()) as {
    name?: string;
    bio?: string;
    location?: string;
    campus?: string;
    privacy?: "public" | "private";
    avatarUrl?: string | null;
    buildRepo?: string | null;
  };

  const db = getDb();
  const existing = await db
    .select()
    .from(members)
    .where(eq(members.handle, login))
    .limit(1);

  const values = {
    name: body.name?.slice(0, 120) ?? existing[0]?.name,
    bio: body.bio?.slice(0, 2000) ?? existing[0]?.bio,
    location: body.location?.slice(0, 120) ?? existing[0]?.location,
    campus: body.campus?.slice(0, 80) ?? existing[0]?.campus,
    privacy: body.privacy === "private" ? "private" : "public",
    avatarUrl:
      body.avatarUrl === null
        ? null
        : body.avatarUrl?.slice(0, 500) ?? existing[0]?.avatarUrl,
    buildRepo:
      body.buildRepo === null
        ? null
        : body.buildRepo?.slice(0, 300) ?? existing[0]?.buildRepo,
    claimedAt: existing[0]?.claimedAt || new Date(),
    updatedAt: new Date(),
  };

  if (existing.length === 0) {
    await db.insert(members).values({ handle: login, ...values });
  } else {
    await db.update(members).set(values).where(eq(members.handle, login));
  }

  return NextResponse.json({ ok: true });
}
