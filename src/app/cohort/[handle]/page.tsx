import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { avatarUrl, builders } from "@/data/roster";
import { reviewIssueUrl, program } from "@/data/program";
import { RequestIntroForm } from "@/components/RequestIntroForm";
import { Tag } from "@/components/Tag";
import { Reveal } from "@/components/Reveal";
import { BrowserFrame } from "@/components/BrowserFrame";

export function generateStaticParams() {
  return builders.map((b) => ({ handle: b.handle }));
}

function findBuilder(handle: string) {
  return builders.find((b) => b.handle.toLowerCase() === handle.toLowerCase());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const builder = findBuilder(handle);
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
  const builder = findBuilder(handle);
  if (!builder) notFound();

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
            src={avatarUrl(builder.handle)}
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
          </div>
        </div>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground">{builder.bio}</p>
        <div className="mt-4 flex flex-wrap gap-4 font-term text-xs">
          <a
            href={builder.prUrl}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            merged PR
          </a>
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
        </div>
      </Reveal>

      <div className="mt-12 space-y-6">
        {builder.projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.04}>
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
                  <h2 className="text-xl font-semibold text-foreground">{p.name}</h2>
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
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15} className="mt-12 rounded-2xl border border-border bg-panel/60 p-6">
        <h2 className="font-term text-xs uppercase tracking-widest text-accent">
          contact @{builder.handle}
        </h2>
        <p className="mt-2 mb-4 text-sm text-muted">
          Partners: request an intro. Placement at {program.placementEmail} will follow up.
        </p>
        <RequestIntroForm builders={builders} preselected={[builder.handle]} />
      </Reveal>
    </div>
  );
}
