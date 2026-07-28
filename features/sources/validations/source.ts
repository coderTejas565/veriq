import z from "zod";

export const addSourceSchema = z.object({
  notebookId: z.string().min(1),
  type: z.enum(["TEXT", "PDF", "WEBSITE", "YOUTUBE", "MARKDOWN"]),
  source: z.string().min(1),
});
