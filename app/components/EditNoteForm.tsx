'use client';

import { useState } from 'react';
import { updateNote } from '../actions';

interface EditNoteFormProps {
  note: {
    id: number;
    content: string;
    dueDate: Date | null;
  };
  onClose: () => void;
}

export default function EditNoteForm({ note, onClose }: EditNoteFormProps) {
  const [content, setContent] = useState(note.content);
  const [dueDate, setDueDate] = useState(
    note.dueDate ? new Date(note.dueDate).toISOString().slice(0, 16) : ''
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">Edytuj zadanie</h3>
        
        <form
          action={async (formData) => {
            await updateNote(note.id, formData);
            onClose();
          }}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Treść zadania</label>
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[120px] p-4 rounded-xl border-2 border-zinc-200 bg-white dark:bg-zinc-800/50 dark:border-zinc-700 dark:text-zinc-50 focus:outline-none focus:border-blue-500 transition-all resize-none shadow-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Termin wykonania</label>
            <input
              type="datetime-local"
              name="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-zinc-200 bg-white dark:bg-zinc-800/50 dark:border-zinc-700 dark:text-zinc-50 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold py-3 px-6 rounded-xl transition-all"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/25"
            >
              Zapisz zmiany
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
