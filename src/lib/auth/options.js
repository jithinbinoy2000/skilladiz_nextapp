import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { verifyPassword } from "./password";
import { getUserByEmail, getUserById, upsertOAuthUser } from "./user-repo";
import { ROLES } from "./roles";

// Auth.js (NextAuth) config used by API route and middleware.
const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  }),
  CredentialsProvider({
    name: "Email + Password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;
      const user = await getUserByEmail(credentials.email);
      if (!user || !user.password_hash) return null;
      const isValid = await verifyPassword(credentials.password, user.password_hash);
      if (!isValid) return null;
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    },
  }),
];

// Note: Email (magic-link) auth requires an adapter; disabled until configured.

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers,
  callbacks: {
    async signIn({ user, account }) {
      // For Google OAuth, make sure the user exists in our DB.
      if (account?.provider === "google" && user?.email) {
        await upsertOAuthUser({
          name: user.name || "User",
          email: user.email,
          role: ROLES.USER,
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      // Attach role on first login or refresh from DB.
      if (user?.id) {
        token.id = user.id;
        token.role = user.role;
      }
      if (!token.id && token.sub) {
        token.id = token.sub;
      }
      if (!token.role && token.id) {
        const dbUser = await getUserById(token.id);
        token.role = dbUser?.role || ROLES.USER;
      }
      return token;
    },
    async session({ session, token }) {
      // Make role and id available client-side.
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
};
