import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import sharp from "sharp";
import { auth } from "@/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.login) {
      return NextResponse.json(
        { ok: false, error: "signin required — sign out and back in" },
        { status: 401 },
      );
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "BLOB_READ_WRITE_TOKEN not configured" },
        { status: 503 },
      );
    }

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "file required" }, { status: 400 });
    }
    if (file.size > 4_500_000) {
      return NextResponse.json({ ok: false, error: "max 4.5mb" }, { status: 400 });
    }

    const input = Buffer.from(await file.arrayBuffer());
    const optimized = await sharp(input)
      .rotate()
      .resize({ width: 1280, height: 1280, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 72 })
      .toBuffer();

    const baseName = file.name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9._-]/g, "_");
    const blob = await put(
      `shiplog/${session.user.login}/${Date.now()}-${baseName}.webp`,
      optimized,
      {
        access: "public",
        contentType: "image/webp",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      },
    );

    return NextResponse.json({ ok: true, url: blob.url });
  } catch (err) {
    console.error("[upload]", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "upload failed" },
      { status: 500 },
    );
  }
}
