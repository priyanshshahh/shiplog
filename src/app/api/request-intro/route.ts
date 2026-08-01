import { NextResponse } from "next/server";
import { program } from "@/data/program";
import { getBuilders } from "@/lib/roster";

type Body = {
  partnerName?: string;
  company?: string;
  email?: string;
  interest?: string;
  studentHandles?: string[];
  message?: string;
};

const INTERESTS = new Set(["hire", "sponsor", "mentor", "other"]);

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const partnerName = (body.partnerName ?? "").trim().slice(0, 120);
  const company = (body.company ?? "").trim().slice(0, 120);
  const email = (body.email ?? "").trim().slice(0, 160);
  const interest = (body.interest ?? "").trim();
  const message = (body.message ?? "").trim().slice(0, 2000);
  const studentHandles = Array.isArray(body.studentHandles)
    ? body.studentHandles.map(String).map((h) => h.trim()).filter(Boolean).slice(0, 8)
    : [];

  if (!partnerName || !company || !email || !message) {
    return NextResponse.json(
      { error: "Name, company, email, and message are required." },
      { status: 400 },
    );
  }
  if (!INTERESTS.has(interest)) {
    return NextResponse.json({ error: "Select a type of interest." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  if (studentHandles.length === 0) {
    return NextResponse.json({ error: "Select at least one builder." }, { status: 400 });
  }
  const builders = await getBuilders();
  for (const handle of studentHandles) {
    const b = builders.find((x) => x.handle.toLowerCase() === handle.toLowerCase());
    if (!b || b.privacy === "private") {
      return NextResponse.json(
        { error: `Builder not available for intro: ${handle}` },
        { status: 400 },
      );
    }
  }

  const payload = {
    type: "request-intro",
    to: process.env.PLACEMENT_LEAD_EMAIL || program.placementEmail,
    partnerName,
    company,
    email,
    interest,
    studentHandles,
    message,
    receivedAt: new Date().toISOString(),
  };

  console.info("[shiplog:request-intro]", JSON.stringify(payload));

  return NextResponse.json({ ok: true, routedTo: payload.to });
}
