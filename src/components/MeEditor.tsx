"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Builder, Project } from "@/data/roster";

export function MeEditor({
  builder,
  login,
  dbReady,
}: {
  builder: Builder | null;
  login: string;
  dbReady: boolean;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const [name, setName] = useState(builder?.name || "");
  const [bio, setBio] = useState(builder?.bio || "");
  const [location, setLocation] = useState(builder?.location || "");
  const [campus, setCampus] = useState(builder?.campus || "");
  const [privacy, setPrivacy] = useState<"public" | "private">(
    builder?.privacy === "private" ? "private" : "public",
  );
  const [buildRepo, setBuildRepo] = useState(builder?.buildRepo || "");
  const [projects, setProjects] = useState<Project[]>(builder?.projects || []);

  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newOneLiner, setNewOneLiner] = useState("");
  const [newTags, setNewTags] = useState("vibe-marketing, hiring-showcase");

  if (!dbReady) {
    return (
      <p className="mt-6 text-muted">
        Database not configured yet. Set <code className="font-term text-accent">DATABASE_URL</code>{" "}
        (Neon) to enable profile and project edits. Public roster still works from the static seed.
      </p>
    );
  }

  function saveProfile() {
    start(async () => {
      setErr(null);
      setMsg(null);
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          bio,
          location,
          campus,
          privacy,
          buildRepo: buildRepo || null,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setErr(data.error || "save failed");
        return;
      }
      setMsg("profile saved");
      router.refresh();
    });
  }

  function saveProject(p: Project) {
    if (!p.id) {
      setErr("project has no id yet — run sync or add a new ship");
      return;
    }
    start(async () => {
      setErr(null);
      setMsg(null);
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: p.id,
          name: p.name,
          oneLiner: p.oneLiner,
          url: p.url,
          repo: p.repo || null,
          tags: [...p.tags],
          shot: p.shot || null,
          media: p.media || [],
          sortOrder: projects.findIndex((x) => x.id === p.id),
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setErr(data.error || "project save failed");
        return;
      }
      setMsg(`saved ${p.name}`);
      router.refresh();
    });
  }

  function addProject() {
    start(async () => {
      setErr(null);
      const tags = newTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 4);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          url: newUrl,
          oneLiner: newOneLiner,
          tags,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setErr(data.error || "create failed");
        return;
      }
      setNewName("");
      setNewUrl("");
      setNewOneLiner("");
      setMsg("ship added");
      router.refresh();
    });
  }

  async function uploadShot(projectId: string | undefined, file: File) {
    if (!projectId) return;
    const form = new FormData();
    form.set("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    if (!data.ok) {
      setErr(data.error || "upload failed");
      return;
    }
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, shot: data.url, media: [...(p.media || []), data.url] }
          : p,
      ),
    );
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= projects.length) return;
    const next = [...projects];
    const tmp = next[i];
    next[i] = next[j];
    next[j] = tmp;
    setProjects(next);
  }

  return (
    <div className="mt-8 space-y-10">
      <section className="rounded-xl border border-border bg-panel/50 p-6">
        <h2 className="font-term text-xs uppercase tracking-widest text-accent">
          profile · @{login}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-muted">display name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted">location</span>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted">campus</span>
            <input
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted">privacy</span>
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value as "public" | "private")}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
            >
              <option value="public">public</option>
              <option value="private">private (opt out)</option>
            </select>
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted">bio</span>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
            />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted">build repo (for peer reviews)</span>
            <input
              value={buildRepo}
              onChange={(e) => setBuildRepo(e.target.value)}
              placeholder="https://github.com/you/repo"
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
            />
          </label>
        </div>
        <button
          type="button"
          disabled={pending}
          onClick={saveProfile}
          className="mt-4 rounded-md bg-accent px-4 py-2 font-term text-sm text-background disabled:opacity-50"
        >
          save profile
        </button>
      </section>

      <section className="space-y-4">
        <h2 className="font-term text-xs uppercase tracking-widest text-accent">
          your ships
        </h2>
        <p className="text-sm text-muted">
          Merge-sourced ships lock production URL evidence. You can edit tagline, tags, media,
          and order.
        </p>
        {projects.map((p, i) => (
          <div key={p.id || p.name} className="rounded-xl border border-border bg-panel/50 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-term text-xs text-muted">
                {p.fromMerge ? "from merge · locked URL" : "manual"}
                {p.phase ? ` · ${p.phase}` : ""}
              </p>
              <div className="flex gap-2 font-term text-xs">
                <button type="button" onClick={() => move(i, -1)} className="text-muted hover:text-accent">
                  up
                </button>
                <button type="button" onClick={() => move(i, 1)} className="text-muted hover:text-accent">
                  down
                </button>
              </div>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="block text-sm sm:col-span-2">
                <span className="text-muted">name</span>
                <input
                  value={p.name}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((x, idx) => (idx === i ? { ...x, name: e.target.value } : x)),
                    )
                  }
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-muted">tagline</span>
                <textarea
                  value={p.oneLiner}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((x, idx) =>
                        idx === i ? { ...x, oneLiner: e.target.value } : x,
                      ),
                    )
                  }
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-muted">
                  deploy URL {p.fromMerge ? "(locked from merge)" : ""}
                </span>
                <input
                  value={p.url}
                  disabled={Boolean(p.fromMerge)}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((x, idx) => (idx === i ? { ...x, url: e.target.value } : x)),
                    )
                  }
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 disabled:opacity-60"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-muted">tags (comma)</span>
                <input
                  value={p.tags.join(", ")}
                  onChange={(e) => {
                    const tags = e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                      .slice(0, 4);
                    const pair: [string, string] = [tags[0] || "ship", tags[1] || "cohort"];
                    setProjects((prev) =>
                      prev.map((x, idx) => (idx === i ? { ...x, tags: pair } : x)),
                    );
                  }}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-muted">screenshot / media</span>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-1 block w-full text-sm"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadShot(p.id, f);
                  }}
                />
                {p.shot && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.shot} alt="" className="mt-2 max-h-40 rounded-lg border border-border" />
                )}
              </label>
            </div>
            <button
              type="button"
              disabled={pending}
              onClick={() => saveProject(p)}
              className="mt-4 rounded-md border border-border px-4 py-2 font-term text-sm text-foreground hover:border-accent hover:text-accent disabled:opacity-50"
            >
              save ship
            </button>
          </div>
        ))}

        <div className="rounded-xl border border-dashed border-border p-5">
          <h3 className="font-term text-xs text-muted">add ship (manual)</h3>
          <div className="mt-3 grid gap-3">
            <input
              placeholder="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <input
              placeholder="https://… deploy"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <input
              placeholder="one-liner"
              value={newOneLiner}
              onChange={(e) => setNewOneLiner(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <input
              placeholder="tags"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <button
              type="button"
              disabled={pending || !newName || !newUrl}
              onClick={addProject}
              className="rounded-md bg-accent px-4 py-2 font-term text-sm text-background disabled:opacity-50"
            >
              add
            </button>
          </div>
        </div>
      </section>

      {(msg || err) && (
        <p className={`font-term text-sm ${err ? "text-amber" : "text-accent"}`}>
          {err || msg}
        </p>
      )}
    </div>
  );
}
