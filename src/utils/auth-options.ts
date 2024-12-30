import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { db } from "./db";
import { credentialsSchema, jwtUserSchema } from "@/types/auth_options_types";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { data, error, success } =
          credentialsSchema.safeParse(credentials);
        if (error || !success) return null;
        const { email, password } = data;

        if (!email || !password) return null;
        const existingUser = await db.user.findUnique({
          where: {
            email: email,
          },
        });
        if (!existingUser) return null;
        const isValid = await bcrypt.compare(password, existingUser.password);
        if (!isValid) return null;
        return {
          id: existingUser.id,
          email: existingUser.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      const { data, success, error } = jwtUserSchema.safeParse(user);
      if (error || !success) return token;
      const { id, email } = data;
      token.user = { id, email };

      return token;
    },
    async session({ session, token }) {
      const user = token.user as { id: string; email: string };
      session.user = { id: user.id, email: user.email };
      return session;
    },
  },
};
