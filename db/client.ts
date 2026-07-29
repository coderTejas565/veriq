import postgres from "postgres";

import { env } from "@/lib/config/env";

export const client = postgres(env.DATABASE_URL, {
  prepare: false,
  max: 5,
  idle_timeout: 20,
  connect_timeout: 10,
});
