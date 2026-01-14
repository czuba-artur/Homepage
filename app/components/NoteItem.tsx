'use client';

import { useState } from 'react';
import { toggleNoteCompletion } from '../actions';
import EditNoteForm from './EditNoteForm';

interface NoteItemProps {
  note: {
    id: number;
    content: string;
    completed: boolean;
    dueDate: Date | null;
    createdAt: Date;
  };
}

export default function NoteItem({ note }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <li
        className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between gap-4 hover:shadow-lg group ${
          note.completed
            ? "bg-zinc-50/50 dark:bg-zinc-800/30 border-zinc-200 dark:border-zinc-700 opacity-60"
            : "bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 shadow-sm"
        }`}
      >
        <div className="flex-1 min-w-0">
          <p className={`text-zinc-800 dark:text-zinc-200 break-words ${note.completed ? "line-through" : ""}`}>
            {note.content}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            <span className="text-xs text-zinc-400 block">
              Utworzono: {new Date(note.createdAt).toLocaleString()}
            </span>
            {note.dueDate && (
              <span className={`text-xs font-medium block ${
                new Date(note.dueDate) < new Date() && !note.completed
                  ? "text-red-500 animate-pulse"
                  : "text-blue-500"
              }`}>
                Termin: {new Date(note.dueDate).toLocaleString()}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!note.completed && (
            <button
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all opacity-0 group-hover:opacity-100"
              title="Edytuj"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
              </svg>
            </button>
          )}
          
          <form action={toggleNoteCompletion.bind(null, note.id)}>
            <button
              type="submit"
              className={`h-7 w-7 rounded-lg border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${
                note.completed
                  ? "bg-gradient-to-br from-green-500 to-green-600 border-green-600 text-white shadow-lg shadow-green-500/30"
                  : "bg-white dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 hover:border-green-500 dark:hover:border-green-500"
              }`}
            >
              {note.completed && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </form>
        </div>
      </li>

      {isEditing && (
        <EditNoteForm note={note} onClose={() => setIsEditing(false)} />
      )}
    </>
  );
}
