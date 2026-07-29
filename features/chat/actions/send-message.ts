"use server";

import { requireNotebookOwner } from "@/features/notebooks/session";

import { chatWithNotebook } from "../services/chat.service";
import { sendMessageSchema } from "../validation/chat";

export async function sendMessageAction(input: unknown) {
  // 1. Validate request
  const data = sendMessageSchema.parse(input);

  // 2. Ensure the notebook belongs to the user
  const { notebook } = await requireNotebookOwner(data.notebookId);

  // 3. Generate the answer
  return chatWithNotebook(notebook.id, data.question);
}
