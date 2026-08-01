import { eq, and } from "drizzle-orm";
import { getDb, hasDatabase } from "@/db";
import { members, projects, syncEvents } from "@/db/schema";
import { builders as seedBuilders } from "@/data/roster";

export const COHORT_REPO = "rogerSuperBuilderAlpha/hult-cohort-program";

export const PHASES = [
  {
    slug: "phase-1-project-1",
    base: "projects/summer26/phase-1-project-1",
    label: "PM",
    week: 1,
  },
  {
    slug: "phase-1-project-2",
    base: "projects/summer26/phase-1-project-2",
    label: "Comms",
    week: 2,
  },
  {
    slug: "phase-1-project-3",
    base: "projects/summer26/phase-1-project-3",
    label: "Vibe marketing",
    week: 3,
  },
] as const;

type GhPr = {
  number: number;
  title: string;
  body: string | null;
  html_url: string;
  merged_at: string | null;
  user: { login: string } | null;
  head: { ref: string; user: { login: string } | null };
};

function ghHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "shiplog-sync",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchMergedPrs(base: string): Promise<GhPr[]> {
  const out: GhPr[] = [];
  for (let page = 1; page <= 5; page++) {
    const url = `https://api.github.com/repos/${COHORT_REPO}/pulls?state=closed&base=${encodeURIComponent(base)}&per_page=100&page=${page}`;
    const res = await fetch(url, { headers: ghHeaders(), next: { revalidate: 0 } });
    if (!res.ok) {
      console.error("[sync] list PRs failed", base, res.status, await res.text());
      break;
    }
    const batch = (await res.json()) as GhPr[];
    if (!batch.length) break;
    for (const pr of batch) {
      if (pr.merged_at) out.push(pr);
    }
    if (batch.length < 100) break;
  }
  return out;
}

function extractHandle(pr: GhPr): string {
  const fromBranch = pr.head?.ref?.match(
    /participants\/summer26\/[^/]+\/([^/]+)/i,
  );
  if (fromBranch?.[1]) return fromBranch[1];
  const fromTitle = pr.title.match(/Submission\s*[—–-]\s*(\S+)/i);
  if (fromTitle?.[1]) return fromTitle[1].replace(/^@/, "");
  return pr.user?.login || pr.head?.user?.login || "unknown";
}

function extractSection(body: string, heading: string): string {
  const re = new RegExp(
    `##\\s*${heading}\\s*\\n([\\s\\S]*?)(?=\\n##\\s|$)`,
    "i",
  );
  const m = body.match(re);
  return (m?.[1] || "").trim();
}

function firstHttpsUrl(text: string): string | null {
  const m = text.match(/https:\/\/[^\s)>\]]+/i);
  if (!m) return null;
  return m[0]
    .replace(/[.,;:*]+$/g, "")
    .replace(/\*+$/g, "")
    .replace(/:$/, "");
}

function extractProjectName(body: string, handle: string, phase: string): string {
  const summary = extractSection(body, "Summary");
  const bold = summary.match(/\*\*([^*]+)\*\*/);
  if (bold?.[1]) return bold[1].split(/[—–-]/)[0].trim().slice(0, 80);
  const firstLine = summary.split("\n").find((l) => l.trim());
  if (firstLine) return firstLine.replace(/\*\*/g, "").slice(0, 80);
  const week = PHASES.find((p) => p.slug === phase)?.label || "ship";
  return `${handle} · ${week}`;
}

function extractOneLiner(body: string): string {
  const vibe = extractSection(body, "Vibe / positioning notes");
  const one = vibe.match(/\*\*One-liner:\*\*\s*(.+)/i);
  if (one?.[1]) return one[1].replace(/\*\*/g, "").slice(0, 280);
  const summary = extractSection(body, "Summary");
  const line = summary.split("\n").find((l) => l.trim() && !l.startsWith("#"));
  return (line || "Merged cohort submission.").replace(/\*\*/g, "").slice(0, 280);
}

function extractRepo(body: string, _productionUrl: string): string | undefined {
  const m = body.match(/https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/);
  if (m) return m[0].replace(/\.git$/, "");
  return undefined;
}

function phaseTags(phase: string): string[] {
  if (phase.includes("project-1")) return ["productivity", "pm-tracking"];
  if (phase.includes("project-2")) return ["internal-tools", "realtime-comms"];
  return ["vibe-marketing", "hiring-showcase"];
}

export type SyncResult = {
  scanned: number;
  created: number;
  updated: number;
  skipped: number;
  errors: string[];
};

async function ensureMember(handle: string) {
  const db = getDb();
  const existing = await db
    .select()
    .from(members)
    .where(eq(members.handle, handle))
    .limit(1);
  if (existing.length) return;
  const seed = seedBuilders.find(
    (b) => b.handle.toLowerCase() === handle.toLowerCase(),
  );
  await db.insert(members).values({
    handle,
    name: seed?.name,
    bio:
      seed?.bio ||
      `Cohort builder @${handle}. Profile claimable via Sign in with GitHub.`,
    location: seed?.location,
    campus: seed?.campus,
    privacy: seed?.privacy || "public",
    buildRepo: seed?.buildRepo,
  });
}

async function upsertMergedProject(
  pr: GhPr,
  phase: string,
): Promise<"created" | "updated" | "skipped"> {
  const db = getDb();
  const handle = extractHandle(pr);
  if (!handle || handle === "unknown") return "skipped";

  const body = pr.body || "";
  const prodSection = extractSection(body, "Production URL");
  const url =
    firstHttpsUrl(prodSection) ||
    firstHttpsUrl(body) ||
    `https://github.com/${COHORT_REPO}/pull/${pr.number}`;

  const name = extractProjectName(body, handle, phase);
  const oneLiner = extractOneLiner(body);
  const repo = extractRepo(body, url);
  const tags = phaseTags(phase);

  await ensureMember(handle);

  const already = await db
    .select()
    .from(syncEvents)
    .where(and(eq(syncEvents.prNumber, pr.number), eq(syncEvents.phase, phase)))
    .limit(1);

  const byPr = await db
    .select()
    .from(projects)
    .where(and(eq(projects.handle, handle), eq(projects.prNumber, pr.number)))
    .limit(1);

  if (byPr.length === 0) {
    const count = await db
      .select()
      .from(projects)
      .where(eq(projects.handle, handle));
    try {
      await db.insert(projects).values({
        handle,
        name,
        oneLiner,
        url,
        repo,
        tags,
        sortOrder: count.length,
        phase,
        prNumber: pr.number,
        prUrl: pr.html_url,
        fromMerge: true,
      });
    } catch (e) {
      // Unique (handle, phase, name) collision — attach PR evidence to existing row
      const sameName = await db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.handle, handle),
            eq(projects.phase, phase),
            eq(projects.name, name),
          ),
        )
        .limit(1);
      if (sameName.length) {
        await db
          .update(projects)
          .set({
            url: sameName[0].fromMerge ? url : sameName[0].url,
            repo: repo || sameName[0].repo,
            prNumber: pr.number,
            prUrl: pr.html_url,
            fromMerge: true,
            updatedAt: new Date(),
          })
          .where(eq(projects.id, sameName[0].id));
      } else {
        throw e;
      }
    }
  } else {
    await db
      .update(projects)
      .set({
        url: byPr[0].fromMerge ? url : byPr[0].url,
        repo: repo || byPr[0].repo,
        prUrl: pr.html_url,
        phase,
        fromMerge: true,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, byPr[0].id));
  }

  if (!already.length) {
    await db.insert(syncEvents).values({
      prNumber: pr.number,
      phase,
      handle,
      prUrl: pr.html_url,
      mergedAt: pr.merged_at ? new Date(pr.merged_at) : null,
      payload: { title: pr.title, url },
    });
    return "created";
  }
  return "updated";
}

/** Seed static roster builders into members/projects if empty. */
export async function seedFromStaticRoster(): Promise<number> {
  if (!hasDatabase()) return 0;
  const db = getDb();
  let n = 0;
  for (const b of seedBuilders) {
    if (b.handle === "opt-out-placeholder") continue;
    await ensureMember(b.handle);
    const existing = await db
      .select()
      .from(projects)
      .where(eq(projects.handle, b.handle));
    if (existing.length) continue;
    for (let i = 0; i < b.projects.length; i++) {
      const p = b.projects[i];
      const phaseGuess =
        p.tags[0] === "productivity"
          ? "phase-1-project-1"
          : p.tags[0] === "internal-tools"
            ? "phase-1-project-2"
            : "phase-1-project-3";
      await db.insert(projects).values({
        handle: b.handle,
        name: p.name,
        oneLiner: p.oneLiner,
        url: p.url,
        repo: p.repo,
        tags: [...p.tags],
        shot: p.shot,
        sortOrder: i,
        phase: phaseGuess,
        prUrl: b.prUrl,
        fromMerge: true,
      });
      n++;
    }
  }
  return n;
}

export async function syncMergedPullRequests(options?: {
  phases?: string[];
}): Promise<SyncResult> {
  if (!hasDatabase()) {
    return {
      scanned: 0,
      created: 0,
      updated: 0,
      skipped: 0,
      errors: ["DATABASE_URL not configured"],
    };
  }

  await seedFromStaticRoster();

  const result: SyncResult = {
    scanned: 0,
    created: 0,
    updated: 0,
    skipped: 0,
    errors: [],
  };

  const phases = PHASES.filter(
    (p) => !options?.phases || options.phases.includes(p.slug),
  );

  for (const phase of phases) {
    try {
      const prs = await fetchMergedPrs(phase.base);
      for (const pr of prs) {
        result.scanned++;
        try {
          const status = await upsertMergedProject(pr, phase.slug);
          if (status === "created") result.created++;
          else if (status === "updated") result.updated++;
          else result.skipped++;
        } catch (e) {
          result.errors.push(
            `PR #${pr.number}: ${e instanceof Error ? e.message : String(e)}`,
          );
        }
      }
    } catch (e) {
      result.errors.push(
        `${phase.slug}: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
  }

  return result;
}

export async function applyMergedPrFromWebhook(pr: {
  number: number;
  title: string;
  body: string | null;
  html_url: string;
  merged_at: string | null;
  user: { login: string } | null;
  head: { ref: string; user: { login: string } | null };
  base: { ref: string };
}): Promise<"created" | "updated" | "skipped" | "ignored"> {
  if (!hasDatabase()) return "ignored";
  const phase = PHASES.find((p) => p.base === pr.base.ref);
  if (!phase || !pr.merged_at) return "ignored";
  return upsertMergedProject(pr as GhPr, phase.slug);
}
