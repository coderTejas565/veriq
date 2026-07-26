import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core";

import { user } from "./auth-schema";
import { sources } from "./sources.schema";
import { messages } from "./messages.schema";

export const notebookVisibilityEnum = pgEnum("notebook_visibility", [
  "PRIVATE",
  "PUBLIC",
]);

export const notebooks = pgTable(
  "notebooks",
  {
    id: text("id").primaryKey(),

    title: text("title").notNull(),

    description: text("description"),

    visibility: notebookVisibilityEnum("visibility")
      .default("PRIVATE")
      .notNull(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

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
    index("notebooks_user_idx").on(table.userId),
    index("notebooks_created_at_idx").on(table.createdAt),
  ],
);

export const notebookRelations = relations(notebooks, ({ one, many }) => ({
  user: one(user, {
    fields: [notebooks.userId],
    references: [user.id],
  }),

  sources: many(sources),

  messages: many(messages),
}));
