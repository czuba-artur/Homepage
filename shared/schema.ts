import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNoteSchema = createInsertSchema(notes);
export const selectNoteSchema = createSelectSchema(notes);
export type Note = typeof notes.$inferSelect;
export type InsertNote = typeof notes.$inferInsert;
