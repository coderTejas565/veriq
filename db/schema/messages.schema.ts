import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core";

import { notebooks } from "./notebooks.schema";

export const messageRoleEnum = pgEnum("message_role", [
  "USER",
  "ASSISTANT",
  "SYSTEM",
]);

export const messages = pgTable(
  "messages",
  {
    id: text("id").primaryKey(),

    notebookId: text("notebook_id")
      .notNull()
      .references(() => notebooks.id, {
        onDelete: "cascade",
      }),

    role: messageRoleEnum("role").notNull(),

    content: text("content").notNull(),

    createdAt: timestamp("created_at", {
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("messages_notebook_created_idx").on(
      table.notebookId,
      table.createdAt,
    ),
  ],
);

export const messageRelations = relations(messages, ({ one }) => ({
  notebook: one(notebooks, {
    fields: [messages.notebookId],
    references: [notebooks.id],
  }),
}));
