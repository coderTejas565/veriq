import { createId } from "@paralleldrive/cuid2";

import { createNotebook } from "../repositories/notebook.repository";

import type { CreateNotebookInput } from "../validation/notebook";

export async function createNotebookService(
  input: CreateNotebookInput,
  userId: string,
) {
  return createNotebook({
    id: createId(),
    title: input.title,
    description: input.description || null,
    visibility: input.visibility,
    userId,
  });
}
