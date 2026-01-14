# replit.md

## Overview

This is a Next.js 16 notes application that allows users to create and view notes. The application uses a PostgreSQL database with Drizzle ORM for data persistence. It features a simple, clean UI built with Tailwind CSS v4 and supports dark mode.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 16 with App Router
- **Rendering**: Server-side rendering with React Server Components
- **Styling**: Tailwind CSS v4 with CSS variables for theming (light/dark mode support)
- **Fonts**: Geist font family (sans and mono) loaded via next/font
- **Form Handling**: Server Actions for form submissions with `revalidatePath` for cache invalidation

### Backend Architecture
- **API Pattern**: No separate API routes - uses Next.js Server Actions (`"use server"`) for data mutations
- **Data Access**: Storage class pattern in `server/storage.ts` abstracts database operations
- **Database Connection**: Connection pool managed in `server/db.ts`

### Project Structure
```
app/           → Next.js App Router pages and actions
server/        → Server-side database and storage logic
shared/        → Shared schema definitions (used by both server and drizzle-kit)
migrations/    → Drizzle migration files (output directory)
```

### Path Aliases
- `@/*` → Root directory
- `@shared/*` → `./shared/*`

### Database Schema
Single `notes` table with:
- `id`: Auto-incrementing primary key
- `content`: Text field for note content
- `createdAt`: Timestamp with default to current time

### Key Commands
- `npm run dev` - Start development server
- `npm run db:push` - Push schema changes to database

## External Dependencies

### Database
- **PostgreSQL**: Primary data store
- **Drizzle ORM**: Type-safe database queries and schema management
- **Drizzle Kit**: Database migrations and schema push
- **pg**: PostgreSQL client for Node.js

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string (required for both app and migrations)

### Validation
- **Zod**: Schema validation
- **drizzle-zod**: Generates Zod schemas from Drizzle table definitions