import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, hasAuthConfig } from "@/auth";
import { hasDatabase } from "@/db";
import { getBuilder } from "@/lib/roster";
import { MeEditor } from "@/components/MeEditor";
import { GoLiveBanner } from "@/components/GoLiveBanner";

export const metadata: Metadata = {
  title: "Edit profile",
};

export const dynamic = "force-dynamic";

export default async function MePage() {
  if (!hasAuthConfig()) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-term text-2xl text-foreground">claim your profile</h1>
        <p className="mt-4 text-muted">
          GitHub OAuth is not configured. Set{" "}
          <code className="font-term text-accent">AUTH_SECRET</code>,{" "}
          <code className="font-term text-accent">AUTH_GITHUB_ID</code>, and{" "}
          <code className="font-term text-accent">AUTH_GITHUB_SECRET</code>.
        </p>
        <GoLiveBanner />
      </div>
    );
  }

  const session = await auth();
  const login = session?.user?.login;
  if (!login) redirect("/signin?callbackUrl=/me");

  const builder = (await getBuilder(login)) || null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href={`/cohort/${login}`} className="font-term text-xs text-muted hover:text-accent">
        view public profile
      </Link>
      <h1 className="mt-4 font-term text-2xl text-foreground">your shiplog</h1>
      <p className="mt-2 text-muted">
        Edit bio and ships. Merged cohort PRs auto-publish as GO LIVE evidence.
      </p>
      <div className="mt-6">
        <GoLiveBanner />
      </div>
      <MeEditor builder={builder} login={login} dbReady={hasDatabase()} />
    </div>
  );
}
