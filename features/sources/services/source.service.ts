import { createId } from "@paralleldrive/cuid2";

import {
  createSource,
  updateSource,
  updateSourceStatus,
} from "../repositories/source.repository";

import { ingestSource } from "./ingestion.service";

import type { SourceType } from "../types";

interface CreateSourceInput {
  notebookId: string;
  type: SourceType;
  source: string;
}

export async function createSourceService(input: CreateSourceInput) {
  // 1. Create processing record
  const created = await createSource({
    id: createId(),
    notebookId: input.notebookId,
    type: input.type,
    title: "Processing...",
  });

  try {
    // 2. Complete extraction + chunking + embeddings
    const result = await ingestSource({
      sourceId: created.id,
      notebookId: input.notebookId,
      type: input.type,
      source: input.source,
    });

    // 3. Mark source ready
    return await updateSource(created.id, {
      title: result.title,
      metadata: result.metadata ?? null,
      status: "READY",
    });
  } catch (error) {
    await updateSourceStatus(created.id, "FAILED");

    throw error;
  }
}
