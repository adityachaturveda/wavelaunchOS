import NextAuth from "next-auth";
import type { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/prisma";
import { authorizeWithCredentials, credentialsSchema } from "./auth/credentials";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        return authorizeWithCredentials({ prisma }, parsed.data);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? token.email;
        token.role = (user as { role?: string }).role ?? token.role;
        token.status = (user as { status?: string }).status ?? token.status;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) ?? session.user.id;
        session.user.email = (token.email as string) ?? session.user.email ?? "";
        session.user.role = (token.role as "ADMIN" | "FOUNDER" | "TEAM_MEMBER") ?? session.user.role;
        session.user.status = (token.status as "ACTIVE" | "DEACTIVATED") ?? session.user.status;
      }
      return session;
    },
  },
});
