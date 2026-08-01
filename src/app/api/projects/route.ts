import { NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb, hasDatabase } from "@/db";
import { members, projects } from "@/db/schema";

export const runtime = "nodejs";

async function requireOwner() {
  const session = await auth();
  const login = session?.user?.login;
  if (!login) {
    return {
      error: NextResponse.json({ ok: false, error: "signin required" }, { status: 401 }),
    };
  }
  if (!hasDatabase()) {
    return {
      error: NextResponse.json({ ok: false, error: "DATABASE_URL required" }, { status: 503 }),
    };
  }
  return { login, db: getDb() };
}

async function ensureMember(db: ReturnType<typeof getDb>, handle: string) {
  const rows = await db
    .select()
    .from(members)
    .where(sql`lower(${members.handle}) = lower(${handle})`)
    .limit(1);
  if (!rows.length) {
    await db.insert(members).values({ handle, claimedAt: new Date(), privacy: "public" });
    return handle;
  }
  return rows[0].handle;
}

async function findOwnedProject(
  db: ReturnType<typeof getDb>,
  login: string,
  id: string,
) {
  return db
    .select()
    .from(projects)
    .where(
      and(eq(projects.id, id), sql`lower(${projects.handle}) = lower(${login})`),
    )
    .limit(1);
}

export async function POST(req: Request) {
  const gate = await requireOwner();
  if ("error" in gate && gate.error) return gate.error;
  const { login, db } = gate as { login: string; db: ReturnType<typeof getDb> };

  const body = (await req.json()) as {
    name?: string;
    oneLiner?: string;
    url?: string;
    repo?: string;
    tags?: string[];
    shot?: string;
    media?: string[];
    phase?: string;
  };

  if (!body.name?.trim() || !body.url?.trim()) {
    return NextResponse.json({ ok: false, error: "name and url required" }, { status: 400 });
  }

  const handle = await ensureMember(db, login);
  const existing = await db
    .select()
    .from(projects)
    .where(sql`lower(${projects.handle}) = lower(${login})`);
  const [row] = await db
    .insert(projects)
    .values({
      handle,
      name: body.name.trim().slice(0, 120),
      oneLiner: (body.oneLiner || "").slice(0, 400),
      url: body.url.trim().slice(0, 500),
      repo: body.repo?.slice(0, 300),
      tags: (body.tags || []).slice(0, 4),
      shot: body.shot,
      media: body.media || [],
      sortOrder: existing.length,
      phase: body.phase,
      fromMerge: false,
    })
    .returning();

  return NextResponse.json({ ok: true, project: row });
}

export async function PATCH(req: Request) {
  const gate = await requireOwner();
  if ("error" in gate && gate.error) return gate.error;
  const { login, db } = gate as { login: string; db: ReturnType<typeof getDb> };

  const body = (await req.json()) as {
    id?: string;
    name?: string;
    oneLiner?: string;
    url?: string;
    repo?: string | null;
    tags?: string[];
    shot?: string | null;
    media?: string[];
    sortOrder?: number;
  };

  if (!body.id) {
    return NextResponse.json({ ok: false, error: "id required" }, { status: 400 });
  }

  const rows = await findOwnedProject(db, login, body.id);
  if (!rows.length) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }

  const current = rows[0];
  const nextUrl = current.fromMerge ? current.url : body.url?.trim() || current.url;
  const nextRepo =
    current.fromMerge ? current.repo : body.repo === null ? null : body.repo ?? current.repo;

  const [updated] = await db
    .update(projects)
    .set({
      name: body.name?.trim().slice(0, 120) ?? current.name,
      oneLiner: body.oneLiner?.slice(0, 400) ?? current.oneLiner,
      url: nextUrl,
      repo: nextRepo,
      tags: body.tags ? body.tags.slice(0, 4) : current.tags,
      shot: body.shot === null ? null : body.shot ?? current.shot,
      media: body.media ?? current.media,
      sortOrder: body.sortOrder ?? current.sortOrder,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, body.id))
    .returning();

  return NextResponse.json({ ok: true, project: updated });
}

export async function DELETE(req: Request) {
  const gate = await requireOwner();
  if ("error" in gate && gate.error) return gate.error;
  const { login, db } = gate as { login: string; db: ReturnType<typeof getDb> };

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "id required" }, { status: 400 });
  }

  const rows = await findOwnedProject(db, login, id);
  if (!rows.length) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }
  if (rows[0].fromMerge) {
    return NextResponse.json(
      { ok: false, error: "merge-sourced ships cannot be deleted" },
      { status: 400 },
    );
  }

  await db.delete(projects).where(eq(projects.id, id));
  return NextResponse.json({ ok: true });
}
