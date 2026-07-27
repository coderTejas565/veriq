import { z } from "zod";

export const createNotebookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title too long"),

  description: z
    .string()
    .trim()
    .max(500, "Description too long")
    .nullable()
    .optional(),

  visibility: z.enum(["PRIVATE", "PUBLIC"]).default("PRIVATE"),
});

export type CreateNotebookInput = z.infer<typeof createNotebookSchema>;
