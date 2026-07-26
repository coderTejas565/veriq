import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgTable,
  text,
  vector,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { notebooks } from "./notebooks.schema";

import { sources } from "./sources.schema";

export const chunks = pgTable(
  "chunks",
  {
    id: text("id").primaryKey(),

    sourceId: text("source_id")
      .notNull()
      .references(() => sources.id, {
        onDelete: "cascade",
      }),

    content: text("content").notNull(),

    embedding: vector("embedding", {
      dimensions: 768,
    }).notNull(),

    chunkIndex: integer("chunk_index").notNull(),

    metadata: jsonb("metadata").$type<Record<string, unknown>>(),

    notebookId: text("notebook_id")
      .notNull()
      .references(() => notebooks.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at", {
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("chunks_source_chunk_idx").on(table.sourceId, table.chunkIndex),

    index("chunks_notebook_idx").on(table.notebookId),
  ],
);

export const chunkRelations = relations(chunks, ({ one }) => ({
  source: one(sources, {
    fields: [chunks.sourceId],
    references: [sources.id],
  }),

  notebook: one(notebooks, {
    fields: [chunks.notebookId],
    references: [notebooks.id],
  }),
}));
