"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton({ enabled }: { enabled: boolean }) {
  const { data, status } = useSession();

  if (!enabled) return null;

  if (status === "loading") {
    return <span className="px-3 py-1.5 font-term text-xs text-muted">…</span>;
  }

  if (data?.user?.login) {
    return (
      <div className="flex items-center gap-1">
        <Link
          href="/me"
          className="rounded-md px-3 py-1.5 font-term text-sm text-muted hover:text-accent"
        >
          @{data.user.login}
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-md px-2 py-1.5 font-term text-xs text-muted hover:text-foreground"
        >
          out
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn("github", { callbackUrl: "/me" })}
      className="rounded-md px-3 py-1.5 font-term text-sm text-accent hover:bg-accent-dim/25"
    >
      sign in
    </button>
  );
}
