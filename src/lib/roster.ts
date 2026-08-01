import {
  builders as seedBuilders,
  activity as seedActivity,
  type Builder,
  type Project,
  type ActivityEvent,
  avatarUrl as githubAvatar,
} from "@/data/roster";
import { hasDatabase, getDb } from "@/db";
import { members, projects } from "@/db/schema";

function normalizeTags(tags: string[] | null | undefined): [string, string] {
  const t = (tags || []).filter(Boolean);
  return [t[0] || "ship", t[1] || "cohort"];
}

function mergeBuilder(
  seed: Builder | undefined,
  member: typeof members.$inferSelect | undefined,
  memberProjects: (typeof projects.$inferSelect)[],
): Builder | null {
  if (!seed && !member) return null;

  const handle = member?.handle || seed!.handle;
  const sorted = [...memberProjects].sort((a, b) => a.sortOrder - b.sortOrder);

  const fromDb: Project[] = sorted.map((p) => ({
    id: p.id,
    name: p.name,
    oneLiner: p.oneLiner,
    url: p.url,
    repo: p.repo || undefined,
    tags: normalizeTags(p.tags),
    shot: p.shot || undefined,
    media: p.media?.length ? p.media : undefined,
    fromMerge: p.fromMerge,
    phase: p.phase || undefined,
    prUrl: p.prUrl || undefined,
  }));

  const projectList =
    fromDb.length > 0
      ? fromDb
      : (seed?.projects || []).map((p) => ({ ...p }));

  return {
    handle,
    name: member?.name ?? seed?.name,
    isMe: seed?.isMe,
    bio: member?.bio ?? seed?.bio ?? "",
    location: member?.location ?? seed?.location,
    campus: member?.campus ?? seed?.campus,
    prUrl: seed?.prUrl || memberProjects.find((p) => p.prUrl)?.prUrl || "",
    buildRepo: member?.buildRepo ?? seed?.buildRepo,
    privacy: (member?.privacy as "public" | "private") || seed?.privacy || "public",
    avatarOverride: member?.avatarUrl || undefined,
    claimed: Boolean(member?.claimedAt),
    projects: projectList,
  };
}

/** Resolve builders: static seed + DB overlays when DATABASE_URL is set. */
export async function getBuilders(): Promise<Builder[]> {
  if (!hasDatabase()) {
    return seedBuilders.map((b) => ({ ...b, projects: [...b.projects] }));
  }

  try {
    const db = getDb();
    const allMembers = await db.select().from(members);
    const allProjects = await db.select().from(projects);

    const byHandle = new Map<string, (typeof allMembers)[0]>();
    for (const m of allMembers) byHandle.set(m.handle.toLowerCase(), m);

    const projectsByHandle = new Map<string, typeof allProjects>();
    for (const p of allProjects) {
      const key = p.handle.toLowerCase();
      const list = projectsByHandle.get(key) || [];
      list.push(p);
      projectsByHandle.set(key, list);
    }

    const seedByHandle = new Map(
      seedBuilders.map((b) => [b.handle.toLowerCase(), b]),
    );

    const handles = new Set([...seedByHandle.keys(), ...byHandle.keys()]);

    const result: Builder[] = [];
    for (const key of handles) {
      const merged = mergeBuilder(
        seedByHandle.get(key),
        byHandle.get(key),
        projectsByHandle.get(key) || [],
      );
      if (merged) result.push(merged);
    }

    result.sort((a, b) => {
      const ai = seedBuilders.findIndex(
        (s) => s.handle.toLowerCase() === a.handle.toLowerCase(),
      );
      const bi = seedBuilders.findIndex(
        (s) => s.handle.toLowerCase() === b.handle.toLowerCase(),
      );
      if (ai === -1 && bi === -1) return a.handle.localeCompare(b.handle);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

    return result;
  } catch (err) {
    console.error("[roster] DB merge failed, using seed", err);
    return seedBuilders.map((b) => ({ ...b, projects: [...b.projects] }));
  }
}

export async function getBuilder(handle: string): Promise<Builder | undefined> {
  const all = await getBuilders();
  return all.find((b) => b.handle.toLowerCase() === handle.toLowerCase());
}

export async function getActivity(): Promise<ActivityEvent[]> {
  return seedActivity;
}

export function resolveAvatar(builder: Builder, size = 64) {
  return builder.avatarOverride || githubAvatar(builder.handle, size);
}

export { githubAvatar as avatarUrl };
