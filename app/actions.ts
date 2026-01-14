"use server";

import { storage } from "@/server/storage";
import { revalidatePath } from "next/cache";

export async function addNote(formData: FormData) {
  const content = formData.get("content") as string;
  if (!content) return;

  await storage.createNote({ content });
  revalidatePath("/");
}

export async function getNotes() {
  return await storage.getNotes();
}

export async function toggleNoteCompletion(id: number) {
  await storage.toggleNoteCompletion(id);
  revalidatePath("/");
}
