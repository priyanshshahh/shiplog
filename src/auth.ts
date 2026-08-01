import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import { hasDatabase, getDb } from "@/db";
import { members } from "@/db/schema";
import { eq } from "drizzle-orm";

export function hasAuthConfig() {
  return Boolean(
    process.env.AUTH_SECRET?.trim() &&
      process.env.AUTH_GITHUB_ID?.trim() &&
      process.env.AUTH_GITHUB_SECRET?.trim(),
  );
}

const config: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          login: profile.login,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const login =
          (profile as { login?: string }).login ||
          (token as { login?: string }).login;
        if (login) {
          token.login = login;
          token.picture =
            (profile as { avatar_url?: string }).avatar_url || token.picture;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.login) {
        session.user.login = String(token.login);
        if (token.picture) session.user.image = String(token.picture);
      }
      return session;
    },
    async signIn({ profile }) {
      const login = (profile as { login?: string } | undefined)?.login;
      if (!login) return false;
      if (!hasDatabase()) return true;
      try {
        const db = getDb();
        const existing = await db
          .select()
          .from(members)
          .where(eq(members.handle, login))
          .limit(1);
        if (existing.length === 0) {
          await db.insert(members).values({
            handle: login,
            name: (profile as { name?: string })?.name || login,
            avatarUrl: (profile as { avatar_url?: string })?.avatar_url,
            claimedAt: new Date(),
            privacy: "public",
          });
        } else if (!existing[0].claimedAt) {
          await db
            .update(members)
            .set({
              claimedAt: new Date(),
              avatarUrl:
                existing[0].avatarUrl ||
                (profile as { avatar_url?: string })?.avatar_url,
              updatedAt: new Date(),
            })
            .where(eq(members.handle, login));
        }
      } catch (err) {
        console.error("[auth] member upsert failed", err);
      }
      return true;
    },
  },
  trustHost: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
