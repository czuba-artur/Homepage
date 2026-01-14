import { getNotes } from "./actions";
import NoteForm from "./components/NoteForm";
import NoteItem from "./components/NoteItem";

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
                <NoteItem key={note.id} note={note} />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
