import { addNote, getNotes } from "./actions";

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
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
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
                  className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700"
                >
                  <p className="text-zinc-800 dark:text-zinc-200">{note.content}</p>
                  <span className="text-xs text-zinc-400 mt-2 block">
                    {new Date(note.createdAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
