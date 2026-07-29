import { client } from "@/db/client";

import type { RetrievedChunk } from "../types";

export async function searchSimilarChunks(
  notebookId: string,
  embedding: number[],
  limit = 5,
): Promise<RetrievedChunk[]> {
  const rows = await client<RetrievedChunk[]>`
    SELECT
      id,
      content,
      source_id AS "sourceId",
      1 - (embedding <=> ${embedding}) AS similarity
    FROM chunks
    WHERE notebook_id = ${notebookId}
    ORDER BY embedding <=> ${embedding}
    LIMIT ${limit}
  `;

  return rows;
}
