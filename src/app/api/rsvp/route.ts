import { NextResponse } from "next/server";
import { program } from "@/data/program";

type Body = {
  name?: string;
  email?: string;
  org?: string;
  notes?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 120);
  const email = (body.email ?? "").trim().slice(0, 160);
  const org = (body.org ?? "").trim().slice(0, 120);
  const notes = (body.notes ?? "").trim().slice(0, 1000);

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const payload = {
    type: "showcase-rsvp",
    to: process.env.PLACEMENT_LEAD_EMAIL || program.placementEmail,
    name,
    email,
    org,
    notes,
    event: "End-of-pilot hiring showcase",
    receivedAt: new Date().toISOString(),
  };

  console.info("[shiplog:rsvp]", JSON.stringify(payload));
  return NextResponse.json({ ok: true, routedTo: payload.to });
}
