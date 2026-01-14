import { addNote, getNotes, toggleNoteCompletion } from "./actions";

export default async function Home() {
  const notes = await getNotes();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <main className="flex w-full max-w-xl flex-col gap-8 bg-white p-8 shadow-sm rounded-xl dark:bg-zinc-900">
        <header>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Hello Replit!</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Keep track of your thoughts below.</p>
        </header>

        <form action={addNote} className="flex flex-col gap-3">
          <textarea
            name="content"
            placeholder="Write a note..."
            className="w-full min-h-[100px] p-3 rounded-lg border border-zinc-200 bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Save Note
          </button>
        </form>

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Recent Notes</h2>
          {notes.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400 italic">No notes yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {notes.map((note) => (
                <li
                  key={note.id}
                  className={`p-4 rounded-lg border transition-all flex items-center justify-between gap-4 ${
                    note.completed
                      ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 opacity-60"
                      : "bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className={`text-zinc-800 dark:text-zinc-200 break-words ${note.completed ? "line-through" : ""}`}>
                      {note.content}
                    </p>
                    <span className="text-xs text-zinc-400 mt-2 block">
                      {new Date(note.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <form action={toggleNoteCompletion.bind(null, note.id)}>
                    <button
                      type="submit"
                      className={`h-6 w-6 rounded-md border flex items-center justify-center transition-colors ${
                        note.completed
                          ? "bg-green-500 border-green-600 text-white"
                          : "bg-white dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600"
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
