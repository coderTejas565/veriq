import { requireUser } from "@/features/auth/session";

import { getNotebookById } from "./repositories/notebook.repository";

export async function requireNotebookOwner(
  notebookId: string,
) {
  const user = await requireUser();

  const notebook = await getNotebookById(
    notebookId,
    user.id,
  );

  if (!notebook) {
    throw new Error("Notebook not found");
  }

  return {
    user,
    notebook,
  };
}