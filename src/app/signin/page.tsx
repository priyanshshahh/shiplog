import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, hasAuthConfig, signIn } from "@/auth";

export const metadata: Metadata = { title: "Sign in" };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const dest = callbackUrl || "/me";

  if (!hasAuthConfig()) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-term text-xl text-foreground">sign in unavailable</h1>
        <p className="mt-3 text-sm text-muted">
          Configure GitHub OAuth env vars to enable Sign in with GitHub.
        </p>
      </div>
    );
  }

  const session = await auth();
  if (session?.user?.login) redirect(dest);

  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <h1 className="font-term text-xl text-foreground">claim with GitHub</h1>
      <p className="mt-3 text-sm text-muted">
        Your GitHub handle becomes your shiplog identity. After a cohort PR merges, ships GO LIVE
        on your profile.
      </p>
      <form
        className="mt-8"
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: dest });
        }}
      >
        <button
          type="submit"
          className="rounded-md bg-accent px-6 py-3 font-term text-sm text-background"
        >
          Sign in with GitHub
        </button>
      </form>
    </div>
  );
}
