"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";

type Comment = {
  id: string;
  authorHandle: string;
  body: string;
  parentId: string | null;
  createdAt: string;
};

export function CommentThread({
  targetType,
  targetId,
  signedInHandle,
}: {
  targetType: "profile" | "project";
  targetId: string;
  signedInHandle?: string;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  async function load() {
    const res = await fetch(
      `/api/comments?targetType=${targetType}&targetId=${encodeURIComponent(targetId)}`,
    );
    const data = await res.json();
    if (data.ok) setComments(data.comments);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetType, targetId]);

  function submit() {
    if (!body.trim()) return;
    start(async () => {
      setError(null);
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType,
          targetId,
          body,
          parentId: replyTo,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "failed");
        return;
      }
      setBody("");
      setReplyTo(null);
      await load();
    });
  }

  const roots = comments.filter((c) => !c.parentId);
  const replies = (id: string) => comments.filter((c) => c.parentId === id);

  return (
    <section className="mt-10 rounded-xl border border-border bg-panel/40 p-5">
      <h3 className="font-term text-xs uppercase tracking-widest text-accent">
        conversation
      </h3>
      <p className="mt-1 text-sm text-muted">
        On-site chat for partners and peers. Contest votes stay on GitHub (
        <span className="font-term text-amber">Vote: up</span>).
      </p>

      <ul className="mt-5 space-y-4">
        {roots.length === 0 && (
          <li className="text-sm text-muted">No comments yet. Start the thread.</li>
        )}
        {roots.map((c) => (
          <li key={c.id} className="border-b border-border/60 pb-4">
            <div className="flex items-baseline gap-2">
              <Link
                href={`/cohort/${c.authorHandle}`}
                className="font-term text-sm text-accent hover:underline"
              >
                @{c.authorHandle}
              </Link>
              <time className="text-xs text-muted">
                {new Date(c.createdAt).toLocaleString()}
              </time>
            </div>
            <p className="mt-1 whitespace-pre-wrap text-sm text-foreground">{c.body}</p>
            {signedInHandle && (
              <button
                type="button"
                onClick={() => setReplyTo(c.id)}
                className="mt-2 font-term text-xs text-muted hover:text-accent"
              >
                reply
              </button>
            )}
            <ul className="mt-3 space-y-3 border-l border-border pl-4">
              {replies(c.id).map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/cohort/${r.authorHandle}`}
                    className="font-term text-xs text-accent hover:underline"
                  >
                    @{r.authorHandle}
                  </Link>
                  <p className="mt-0.5 whitespace-pre-wrap text-sm text-foreground">
                    {r.body}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {signedInHandle ? (
        <div className="mt-5 space-y-2">
          {replyTo && (
            <p className="font-term text-xs text-muted">
              replying ·{" "}
              <button
                type="button"
                className="text-accent"
                onClick={() => setReplyTo(null)}
              >
                cancel
              </button>
            </p>
          )}
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder="say something useful…"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
          {error && <p className="text-sm text-amber">{error}</p>}
          <button
            type="button"
            disabled={pending || !body.trim()}
            onClick={submit}
            className="rounded-md bg-accent px-4 py-2 font-term text-sm text-background disabled:opacity-50"
          >
            {pending ? "posting…" : "post"}
          </button>
        </div>
      ) : (
        <p className="mt-4 font-term text-sm text-muted">
          <Link href="/signin" className="text-accent hover:underline">
            Sign in with GitHub
          </Link>{" "}
          to comment.
        </p>
      )}
    </section>
  );
}
