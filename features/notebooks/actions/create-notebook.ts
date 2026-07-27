"use server";

import { requireUser } from "@/features/auth/session";

import { createNotebookSchema } from "../validation/notebook";
import { createNotebookService } from "../services/notebook.service";

export async function createNotebookAction(input: unknown) {
  const user = await requireUser();
  const data = createNotebookSchema.parse(input);

  return createNotebookService(data, user.id);
}
