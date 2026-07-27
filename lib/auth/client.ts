import { createAuthClient } from "better-auth/react";
import { clientEnv } from "@/lib/config/client-env";

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL,
});
