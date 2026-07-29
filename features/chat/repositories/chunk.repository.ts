import { client } from "@/db/client";

import type { RetrievedChunk } from "../types";

export async function searchSimilarChunks(
  notebookId: string,
  embedding: number[],
  limit = 5,
): Promise<RetrievedChunk[]> {
  const vector = `[${embedding.join(",")}]`;

  const rows = await client<RetrievedChunk[]>`
    SELECT
      id,
      content,
      source_id AS "sourceId",
      1 - (embedding <=> ${vector}::vector) AS similarity
    FROM chunks
    WHERE notebook_id = ${notebookId}
    ORDER BY embedding <=> ${vector}::vector
    LIMIT ${limit}
  `;

  return rows;
}
