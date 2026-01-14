import { notes, type Note, type InsertNote } from "../shared/schema";
import { db } from "./db";
import { desc } from "drizzle-orm";

export class Storage {
  async getNotes(): Promise<Note[]> {
    return await db.select().from(notes).orderBy(desc(notes.createdAt));
  }

  async createNote(insertNote: InsertNote): Promise<Note> {
    const [note] = await db.insert(notes).values(insertNote).returning();
    return note;
  }
}

export const storage = new Storage();
