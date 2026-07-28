import { db } from "@/db";
import { chunks } from "@/db/schema";

export async function createChunks(
  data: {
    id: string;
    sourceId: string;
    notebookId: string;
    content: string;
    embedding: number[];
    chunkIndex: number;
  }[],
) {
  return db.insert(chunks).values(data).returning();
}
