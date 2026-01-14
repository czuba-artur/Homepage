import { getNotes, toggleNoteCompletion } from "./actions";
import NoteForm from "./components/NoteForm";

export default async function Home() {
  const notes = await getNotes();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-zinc-100/50 to-zinc-50 font-sans dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-8">
      <main className="flex w-full max-w-xl flex-col gap-8 bg-white/80 backdrop-blur-sm p-8 shadow-2xl rounded-2xl dark:bg-zinc-900/80 border border-zinc-200/50 dark:border-zinc-800/50">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-zinc-50 dark:via-zinc-200 dark:to-zinc-50 bg-clip-text text-transparent">Hello Replit...</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Keep track of your thoughts below.</p>
        </header>

        <NoteForm />

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Taksa</h2>
          {notes.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400 italic">No notes yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {notes.map((note) => (
                <li
                  key={note.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between gap-4 hover:shadow-lg hover:scale-[1.01] ${
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
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
