import { NextResponse } from "next/server";
import { and, asc, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb, hasDatabase } from "@/db";
import { comments } from "@/db/schema";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!hasDatabase()) {
    return NextResponse.json({ ok: true, comments: [] });
  }
  const { searchParams } = new URL(req.url);
  const targetType = searchParams.get("targetType");
  const targetId = searchParams.get("targetId");
  if (!targetType || !targetId) {
    return NextResponse.json({ ok: false, error: "target required" }, { status: 400 });
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(comments)
    .where(and(eq(comments.targetType, targetType), eq(comments.targetId, targetId)))
    .orderBy(asc(comments.createdAt));

  return NextResponse.json({ ok: true, comments: rows });
}

export async function POST(req: Request) {
  const session = await auth();
  const login = session?.user?.login;
  if (!login) {
    return NextResponse.json({ ok: false, error: "signin required" }, { status: 401 });
  }
  if (!hasDatabase()) {
    return NextResponse.json({ ok: false, error: "DATABASE_URL required" }, { status: 503 });
  }

  const body = (await req.json()) as {
    targetType?: string;
    targetId?: string;
    body?: string;
    parentId?: string | null;
  };

  if (
    !body.targetType ||
    !body.targetId ||
    !body.body?.trim() ||
    !["profile", "project"].includes(body.targetType)
  ) {
    return NextResponse.json({ ok: false, error: "invalid payload" }, { status: 400 });
  }

  const db = getDb();
  if (body.parentId) {
    const parent = await db
      .select()
      .from(comments)
      .where(eq(comments.id, body.parentId))
      .limit(1);
    if (!parent.length) {
      return NextResponse.json({ ok: false, error: "parent not found" }, { status: 404 });
    }
  }

  const [row] = await db
    .insert(comments)
    .values({
      targetType: body.targetType,
      targetId: body.targetId,
      authorHandle: login,
      body: body.body.trim().slice(0, 2000),
      parentId: body.parentId || null,
    })
    .returning();

  return NextResponse.json({ ok: true, comment: row });
}
