'use client';

import { useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { addNote } from '../actions';

export default function NoteForm() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Create a dedicated canvas for confetti with high z-index
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    canvas.style.isolation = 'isolate';
    document.body.appendChild(canvas);
    confettiCanvasRef.current = canvas;

    return () => {
      if (confettiCanvasRef.current) {
        document.body.removeChild(confettiCanvasRef.current);
      }
    };
  }, []);

  const getCaretCoordinates = () => {
    const textarea = textareaRef.current;
    const mirror = mirrorRef.current;
    
    if (!textarea || !mirror) return null;

    const rect = textarea.getBoundingClientRect();
    const scrollTop = textarea.scrollTop;
    const caretPos = textarea.selectionStart;
    
    // Copy text up to caret position
    const textBeforeCaret = textarea.value.substring(0, caretPos);
    mirror.textContent = textBeforeCaret;
    
    // Add a span at the end to measure
    const span = document.createElement('span');
    span.textContent = '|';
    mirror.appendChild(span);
    
    const spanRect = span.getBoundingClientRect();
    
    // Calculate position relative to viewport
    const x = spanRect.left / window.innerWidth;
    const y = spanRect.top / window.innerHeight;
    
    return { x, y };
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Only trigger on actual character input (not special keys)
    if (e.key.length === 1) {
      // Small delay to let the character be added first
      setTimeout(() => {
        const coords = getCaretCoordinates();
        if (coords && confettiCanvasRef.current) {
          const myConfetti = confetti.create(confettiCanvasRef.current, {
            resize: true,
            useWorker: true,
          });
          
          myConfetti({
            particleCount: 3,
            spread: 40,
            origin: coords,
            colors: ['#e40014', '#3080ff', '#00c758', '#fafafa', '#9f9fa9'],
            gravity: 1.2,
            scalar: 0.7,
            ticks: 60,
            disableForReducedMotion: true,
          });
        }
      }, 0);
    }
  };

  return (
    <form action={addNote} className="flex flex-col gap-4">
      <div className="relative">
        {/* Mirror div for caret position calculation */}
        <div
          ref={mirrorRef}
          className="absolute top-0 left-0 w-full min-h-[120px] p-4 rounded-xl border-2 border-transparent whitespace-pre-wrap break-words pointer-events-none opacity-0 -z-10"
          style={{
            font: 'inherit',
            lineHeight: 'inherit',
            letterSpacing: 'inherit',
            wordSpacing: 'inherit',
          }}
          aria-hidden="true"
        />
        <textarea
          ref={textareaRef}
          name="content"
          placeholder="Write a note..."
          onKeyDown={handleKeyPress}
          className="w-full min-h-[120px] p-4 rounded-xl border-2 border-zinc-200 bg-white dark:bg-zinc-800/50 dark:border-zinc-700 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 resize-none hover:border-zinc-300 dark:hover:border-zinc-600 shadow-sm hover:shadow-md"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98]"
      >
        Save Note
      </button>
    </form>
  );
}
