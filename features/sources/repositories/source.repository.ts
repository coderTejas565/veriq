import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { sources } from "@/db/schema";

import type { SourceStatus, SourceType } from "../types";

export async function createSource(data: {
  id: string;
  notebookId: string;
  title: string;
  type: SourceType;
  status?: SourceStatus;
  metadata?: Record<string, unknown> | null;
}) {
  const [source] = await db
    .insert(sources)
    .values({
      id: data.id,
      notebookId: data.notebookId,
      title: data.title,
      type: data.type,
      status: data.status ?? "PROCESSING",
      metadata: data.metadata,
    })
    .returning();

  return source;
}

export async function updateSourceStatus(id: string, status: SourceStatus) {
  const [source] = await db
    .update(sources)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(sources.id, id))
    .returning();

  return source;
}

export async function getSourceById(id: string) {
  return db.query.sources.findFirst({
    where: eq(sources.id, id),
  });
}

export async function getNotebookSources(notebookId: string) {
  return db.query.sources.findMany({
    where: eq(sources.notebookId, notebookId),
    orderBy: (sources, { desc }) => [desc(sources.createdAt)],
  });
}

export async function deleteSource(id: string, notebookId: string) {
  const [deleted] = await db
    .delete(sources)
    .where(and(eq(sources.id, id), eq(sources.notebookId, notebookId)))
    .returning();

  return deleted;
}

export async function updateSource(
  id: string,
  data: {
    title?: string;
    status?: SourceStatus;
    metadata?: Record<string, unknown> | null;
  },
) {
  const [source] = await db
    .update(sources)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(sources.id, id))
    .returning();

  return source;
}
