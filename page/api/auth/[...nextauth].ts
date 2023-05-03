import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "@/app/lib/prismadb";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "eamil", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password)
          throw new Error("Invalid credentials");
        const user = await client.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.hashedPassword)
          throw new Error("Invalid credentials");
        const hassedPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!hassedPassword) throw new Error("Invalid email or password");
        return user;
      },
    }),
  ],
  pages: { signIn: "/" },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
