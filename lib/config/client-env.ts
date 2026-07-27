import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url(),
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});
