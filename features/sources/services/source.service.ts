import { createId } from "@paralleldrive/cuid2";

import { getExtractor } from "../extractors/extractor.registry";

import {
  createSource,
  updateSource,
  updateSourceStatus,
} from "../repositories/source.repository";

import type { SourceType } from "../types";

interface CreateSourceInput {
  notebookId: string;
  type: SourceType;
  source: string;
}

export async function createSourceService(
  input: CreateSourceInput,
) {
  // 1. Create processing record
  const created = await createSource({
    id: createId(),
    notebookId: input.notebookId,
    type: input.type,
    title: "Processing...",
  });

  try {
    // 2. Select extractor
    const extractor = getExtractor(input.type);

    // 3. Extract content
    const extracted = await extractor.extract({
      source: input.source,
    });

    // TODO:
    // chunkService(...)
    // embeddingService(...)
    // chunkRepository(...)

    // 4. Update source
    return await updateSource(created.id, {
      title: extracted.title,
      metadata: extracted.metadata ?? null,
      status: "READY",
    });

  } catch (error) {

    await updateSourceStatus(
      created.id,
      "FAILED",
    );

    throw error;
  }
}