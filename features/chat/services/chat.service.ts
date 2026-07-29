import { createId } from "@paralleldrive/cuid2";

import { gemini } from "@/lib/modules/gemini/client";

import { createMessage } from "../repositories/message.repository";

import { retrieveRelevantChunks } from "./retrieval.service";
import { buildContext } from "./context.service";

import { buildChatPrompt } from "../prompts/chat.prompt";

export async function chatWithNotebook(notebookId: string, question: string) {
  // 1. Store user message
  await createMessage({
    id: createId(),
    notebookId,
    role: "USER",
    content: question,
  });

  // 2. Retrieve relevant notebook chunks
  const chunks = await retrieveRelevantChunks(notebookId, question);

  // 3. Build context
  const context = buildContext(chunks);

  // 4. Build LLM prompt
  const prompt = buildChatPrompt({
    context,
    question,
  });

  // 5. Generate answer
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const answer = response.text?.trim() ?? "I couldn't generate a response.";

  // 6. Store assistant message
  await createMessage({
    id: createId(),
    notebookId,
    role: "ASSISTANT",
    content: answer,
  });

  // 7. Return response
  return {
    answer,
    chunks,
  };
}
