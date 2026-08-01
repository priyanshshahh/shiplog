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
  if (!builder) return { title: "Not found — shiplog" };
  return {
    title: `@${builder.handle} — shiplog`,
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
          ← back to roster
        </Link>
        <h1 className="mt-8 font-term text-2xl text-foreground">@{builder.handle}</h1>
        <p className="mt-4 text-muted">
          This participant opted out of the public hiring showcase. Details are withheld per
          program privacy policy.
        </p>
        <a
          href={program.officialSite + "/privacy"}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block font-term text-xs text-accent hover:underline"
        >
          privacy policy ↗
        </a>
      </div>
    );
  }

  const buildRepo = builder.buildRepo || builder.projects[0]?.repo || builder.prUrl;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/cohort" className="font-term text-xs text-muted hover:text-accent">
        ← back to roster
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
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-term text-2xl text-foreground">@{builder.handle}</h1>
            {builder.isMe && (
              <span className="font-term text-[11px] text-accent">that&apos;s me</span>
            )}
          </div>
        </div>
        {builder.name && <p className="mt-1 text-muted">{builder.name}</p>}
        {builder.location && (
          <p className="mt-0.5 text-sm text-muted/70">{builder.location}</p>
        )}
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground">
          {builder.bio}
        </p>
        <a
          href={builder.prUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block font-term text-xs text-accent hover:underline"
        >
          verified via merged PR ↗
        </a>
      </Reveal>

      <div className="mt-12 space-y-6">
        {builder.projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.05}>
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
                  production ↗
                </a>
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer" className="hover:text-accent">
                    source ↗
                  </a>
                )}
              </div>
              </div>
            </div>
          </Reveal>
        ))}

      <Reveal delay={0.2} className="mt-12 rounded-2xl border border-border bg-panel/60 p-6">
        <h2 className="font-term text-xs uppercase tracking-widest text-accent">
          peer review · Vote: up
        </h2>
        <p className="mt-2 text-sm text-muted">
          Winners are chosen by GitHub review upvotes — not on-site ballots. File a written
          review on this builder&apos;s repo; keep <code className="text-accent">Vote: up</code>{" "}
          to upvote or delete it to abstain.
        </p>
        <a
          href={reviewIssueUrl(buildRepo, "you", builder.handle)}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-lg border border-amber px-4 py-2 font-term text-xs text-amber hover:bg-amber/10"
        >
          ▲ open review issue on GitHub
        </a>
      </Reveal>

      <Reveal delay={0.25} className="mt-8 rounded-2xl border border-border bg-panel/60 p-6">
        <h2 className="font-term text-xs uppercase tracking-widest text-accent">
          partner intro
        </h2>
        <p className="mt-2 mb-4 text-sm text-muted">
          Hiring partners: request an intro to @{builder.handle} (routes to {program.placementEmail}).
        </p>
        <RequestIntroForm builders={builders} preselected={[builder.handle]} />
      </Reveal>

      </div>
    </div>
  );
}
