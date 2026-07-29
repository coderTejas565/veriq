import { z } from "zod";

export const sendMessageSchema = z.object({
  notebookId: z.string().min(1),
  question: z.string().min(1),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
