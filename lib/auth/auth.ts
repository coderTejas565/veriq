import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import { env } from "@/lib/config/env";

const baseURL =
  process.env.NODE_ENV === "production"
    ? env.BETTER_AUTH_URL
    : "http://localhost:3000";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  secret: env.BETTER_AUTH_SECRET,

  baseURL,

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: ["http://localhost:3000", "https://veriq-two.vercel.app"],
});
