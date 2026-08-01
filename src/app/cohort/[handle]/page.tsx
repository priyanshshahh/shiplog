import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { builders as seedBuilders } from "@/data/roster";
import { getBuilder, getBuilders, resolveAvatar } from "@/lib/roster";
import { reviewIssueUrl, program } from "@/data/program";
import { RequestIntroForm } from "@/components/RequestIntroForm";
import { Tag } from "@/components/Tag";
import { Reveal } from "@/components/Reveal";
import { BrowserFrame } from "@/components/BrowserFrame";
import { CommentThread } from "@/components/CommentThread";
import { auth, hasAuthConfig } from "@/auth";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return seedBuilders.map((b) => ({ handle: b.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const builder = await getBuilder(handle);
  if (!builder) return { title: "Not found" };
  return {
    title: `@${builder.handle}`,
    description: builder.bio,
  };
}

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const builder = await getBuilder(handle);
  if (!builder) notFound();

  const session = hasAuthConfig() ? await auth() : null;
  const signedIn = session?.user?.login;
  const allBuilders = await getBuilders();

  if (builder.privacy === "private") {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/cohort" className="font-term text-xs text-muted hover:text-accent">
          back to roster
        </Link>
        <h1 className="mt-8 font-term text-2xl text-foreground">@{builder.handle}</h1>
        <p className="mt-4 text-muted">
          This participant opted out of the public roster. Details are withheld.
        </p>
      </div>
    );
  }

  const buildRepo = builder.buildRepo || builder.projects[0]?.repo || builder.prUrl;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/cohort" className="font-term text-xs text-muted hover:text-accent">
        back to roster
      </Link>

      <Reveal className="mt-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveAvatar(builder)}
            alt=""
            width={64}
            height={64}
            className="h-16 w-16 rounded-full border border-border"
          />
          <div>
            <h1 className="font-term text-2xl text-foreground">@{builder.handle}</h1>
            {builder.name && <p className="mt-1 text-muted">{builder.name}</p>}
            {builder.location && (
              <p className="mt-0.5 text-sm text-muted/70">{builder.location}</p>
            )}
            {builder.claimed && (
              <p className="mt-1 font-term text-xs text-accent">claimed profile</p>
            )}
          </div>
        </div>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground">{builder.bio}</p>
        <div className="mt-4 flex flex-wrap gap-4 font-term text-xs">
          {builder.prUrl && (
            <a
              href={builder.prUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              submission PR
            </a>
          )}
          <a
            href={`https://github.com/${builder.handle}`}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={reviewIssueUrl(buildRepo, "you", builder.handle)}
            target="_blank"
            rel="noreferrer"
            className="text-amber hover:underline"
          >
            leave a review on GitHub
          </a>
          {signedIn?.toLowerCase() === builder.handle.toLowerCase() && (
            <Link href="/me" className="text-muted hover:text-accent">
              edit
            </Link>
          )}
        </div>
      </Reveal>

      <div className="mt-12 space-y-6">
        {builder.projects.map((p, i) => (
          <Reveal key={p.id || p.name} delay={i * 0.04}>
            <div className="overflow-hidden rounded-xl border border-border bg-panel/60">
              {p.shot && (
                <BrowserFrame
                  src={p.shot}
                  alt={`${p.name} screenshot`}
                  url={p.url}
                  className="rounded-none border-0"
                />
              )}
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">{p.name}</h2>
                    {p.fromMerge && (
                      <p className="mt-1 font-term text-xs text-accent">GO LIVE · from merge</p>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <Tag>{p.tags[0]}</Tag>
                    <Tag>{p.tags[1]}</Tag>
                  </div>
                </div>
                <p className="mt-3 text-muted">{p.oneLiner}</p>
                <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-4 font-term text-xs text-muted">
                  <a href={p.url} target="_blank" rel="noreferrer" className="hover:text-accent">
                    production
                  </a>
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="hover:text-accent">
                      source
                    </a>
                  )}
                  {p.prUrl && (
                    <a href={p.prUrl} target="_blank" rel="noreferrer" className="hover:text-accent">
                      merged PR
                    </a>
                  )}
                </div>
                {p.id && (
                  <CommentThread
                    targetType="project"
                    targetId={p.id}
                    signedInHandle={signedIn}
                  />
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <CommentThread
        targetType="profile"
        targetId={builder.handle}
        signedInHandle={signedIn}
      />

      <Reveal delay={0.15} className="mt-12 rounded-2xl border border-border bg-panel/60 p-6">
        <h2 className="font-term text-xs uppercase tracking-widest text-accent">
          contact @{builder.handle}
        </h2>
        <p className="mt-2 mb-4 text-sm text-muted">
          Partners: request an intro. Placement at {program.placementEmail} will follow up.
        </p>
        <RequestIntroForm builders={allBuilders} preselected={[builder.handle]} />
      </Reveal>
    </div>
  );
}
