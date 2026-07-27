"use server";

import { requireNotebookOwner } from "@/features/notebooks/session";

import { createSourceService } from "../services/source.service";
import { addSourceSchema } from "../validations/source";

export async function addSourceAction(input: unknown) {
  const data = addSourceSchema.parse(input);

  const { notebook } = await requireNotebookOwner(
    data.notebookId,
  );

  return createSourceService({
    notebookId: notebook.id,
    type: data.type,
    source: data.source,
  });
}