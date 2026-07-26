import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

import { notebooks } from "./notebooks.schema";
import { chunks } from "./chunks.schema";

export const sourceTypeEnum = pgEnum("source_type", [
  "PDF",
  "YOUTUBE",
  "WEBSITE",
  "TEXT",
  "MARKDOWN",
]);

export const sourceStatusEnum = pgEnum("source_status", [
  "PROCESSING",
  "READY",
  "FAILED",
]);

export const sources = pgTable(
  "sources",
  {
    id: text("id").primaryKey(),

    notebookId: text("notebook_id")
      .notNull()
      .references(() => notebooks.id, {
        onDelete: "cascade",
      }),

    type: sourceTypeEnum("type").notNull(),

    title: text("title").notNull(),

    status: sourceStatusEnum("status").default("PROCESSING").notNull(),

    metadata: jsonb("metadata").$type<Record<string, unknown>>(),

    createdAt: timestamp("created_at", {
      mode: "date",
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      mode: "date",
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("source_notebook_idx").on(table.notebookId),
    index("source_status_idx").on(table.status),
  ],
);

export const sourceRelations = relations(sources, ({ one, many }) => ({
  notebook: one(notebooks, {
    fields: [sources.notebookId],
    references: [notebooks.id],
  }),

  chunks: many(chunks),
}));
