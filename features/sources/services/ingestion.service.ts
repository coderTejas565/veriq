import { createId } from "@paralleldrive/cuid2";

import { getExtractor } from "../extractors/extractor.registry";

import { splitIntoChunks } from "../chunking/chunker";

import { generateEmbedding } 
from "../embeddings/embedding.service";

import { createChunks } from "../repositories/chunk.repository";

import type { SourceType } from "../types";

interface IngestSourceInput {
  sourceId: string;
  notebookId: string;
  type: SourceType;
  source: string;
}

export async function ingestSource({
  sourceId,
  notebookId,
  type,
  source,
}: IngestSourceInput) {
  const extractor = getExtractor(type);

  const extracted = await extractor.extract({
    source,
  });

  const textChunks = splitIntoChunks(extracted.content);

  const chunkRecords = await Promise.all(
    textChunks.map(async (content, index) => ({
      id: createId(),

      sourceId,

      notebookId,

      content,

      embedding: await generateEmbedding(content),

      chunkIndex: index,
    })),
  );

  await createChunks(chunkRecords);

  return {
    title: extracted.title,

    metadata: extracted.metadata ?? null,

    chunkCount: chunkRecords.length,
  };
}
