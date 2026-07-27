import { db } from "@/db";
import { notebooks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createNotebook(data: {
  id: string;
  title: string;
  description: string | null;
  visibility?: "PRIVATE" | "PUBLIC";
  userId: string;
}) {
  const [notebook] = await db
    .insert(notebooks)
    .values({
      id: data.id,
      title: data.title,
      description: data.description,
      visibility: data.visibility ?? "PRIVATE",
      userId: data.userId,
    })
    .returning();

  return notebook;
}

export async function getUserNotebooks(userId: string) {
  return db.query.notebooks.findMany({
    where: eq(notebooks.userId, userId),
    orderBy: (notebooks, { desc }) => [desc(notebooks.createdAt)],
  });
}

export async function getNotebookById(
  notebookId: string,
  userId: string
) {
  const notebook =
    await db.query.notebooks.findFirst({
      where: (notebooks, { and, eq }) =>
        and(
          eq(notebooks.id, notebookId),
          eq(notebooks.userId, userId)
        ),
    });

  return notebook ?? null;
}