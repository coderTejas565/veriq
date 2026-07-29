import { generateEmbedding } from "@/features/sources/embeddings/embedding.service";

import { searchSimilarChunks } from "../repositories/chunk.repository";

export async function retrieveRelevantChunks(
  notebookId: string,
  query: string,
) {
  // 1. Convert the user's question into an embedding
  const embedding = await generateEmbedding(query);

  // 2. Perform vector similarity search
  return searchSimilarChunks(
    notebookId,
    embedding,
    5,
  );
}