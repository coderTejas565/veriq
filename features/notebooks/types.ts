import type { notebooks } from "@/db/schema";

export type NotebookDTO = typeof notebooks.$inferSelect;