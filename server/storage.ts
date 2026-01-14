import { notes, type Note, type InsertNote } from "../shared/schema";
import { db } from "./db";
import { desc, eq } from "drizzle-orm";

export class Storage {
  async getNotes(): Promise<Note[]> {
    return await db.select().from(notes).orderBy(desc(notes.createdAt));
  }

  async createNote(insertNote: InsertNote): Promise<Note> {
    const [note] = await db.insert(notes).values(insertNote).returning();
    return note;
  }

  async toggleNoteCompletion(id: number): Promise<Note | undefined> {
    const [note] = await db.select().from(notes).where(eq(notes.id, id));
    if (!note) return undefined;

    const [updatedNote] = await db
      .update(notes)
      .set({ completed: !note.completed })
      .where(eq(notes.id, id))
      .returning();
    return updatedNote;
  }

  async updateNote(id: number, update: Partial<InsertNote>): Promise<Note | undefined> {
    const [updatedNote] = await db
      .update(notes)
      .set(update)
      .where(eq(notes.id, id))
      .returning();
    return updatedNote;
  }
}

export const storage = new Storage();
