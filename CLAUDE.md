# CLAUDE.md — Homepage (czuba-artur)

## Co to jest
Prywatna strona główna Artura Czuby. Next.js App Router z Tailwind CSS. Minimalistyczny projekt bootstrapped z `create-next-app`.

## Stack
- Next.js 16, React 19, TypeScript
- Tailwind CSS v4
- ESLint (eslint-config-next)

## Uruchamianie
```bash
npm install
npm run dev       # dev server na http://localhost:3000
npm run build     # produkcyjny build
npm start         # uruchom po buildzie
npm run lint      # ESLint
```

## Struktura
```
app/              # Next.js App Router
  layout.tsx      # root layout
  page.tsx        # strona główna
public/           # statyczne pliki
```

## Konwencje
- Używamy Next.js **App Router** (nie Pages Router)
- Server Components domyślnie; `"use client"` tylko gdy konieczne
- Tailwind v4 (PostCSS plugin, nie config file)
- TypeScript strict mode

## Skills / wskazówki dla Claude Code
- To projekt Next.js App Router — używaj `app/` directory
- Tailwind v4: konfiguracja przez PostCSS, nie `tailwind.config.js`
- React 19: możesz używać nowych hooków (useFormState, useOptimistic)
- Deploy na Vercel lub przez Docker
