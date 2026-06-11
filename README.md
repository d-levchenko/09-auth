# NoteHub

NoteHub is a modern Next.js note management application built with
authentication, private note access, search/filter capabilities, and server-side
API integration.

## Overview

- Framework: **Next.js 16**
- UI: **React 19**
- Style: CSS modules
- Data fetching: **Axios** + **React Query**
- State: **Zustand**
- Auth/session handling: **cookie** + Next.js route handlers
- TypeScript support enabled

## Key Features

- User authentication and session handling via Next.js API routes
- Protected note pages and authenticated access to private data
- Note creation and detailed note view pages
- Note listing with server-side pagination and filtering by tag
- Search support for note content
- Global layout with header, footer, and modal support
- Reusable UI components for notes, pagination, search, and previews

## Project Structure

- `app/` - Next.js App Router pages and layouts
  - `app/(auth routes)/` - authentication route structure
  - `app/(private routes)/notes/` - protected note pages, filters, and detail
    pages
  - `app/api/` - route handlers for auth, notes, and session APIs
- `components/` - reusable UI components like `Header`, `Footer`, `NoteForm`,
  `NoteList`, and `Modal`
- `hooks/` - custom hooks for note creation and modal state
- `lib/api/` - API helpers for client and server requests
- `types/` - shared TypeScript types for notes and users

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open the application:

Visit `http://localhost:3000`

## Available Scripts

- `npm run dev` - start the Next.js development server
- `npm run build` - build the application for production
- `npm run start` - run the production build
- `npm run lint` - run ESLint checks

## Dependencies

- `next`
- `react`
- `react-dom`
- `axios`
- `@tanstack/react-query`
- `zustand`
- `react-paginate`
- `cookie`
- `use-debounce`
- `modern-normalize`

## Notes

- The app uses Next.js API route handlers and cookies to manage authentication
  and session state.
- The root layout includes a global `Header`, `Footer`, and React Query provider
  via `TanStackProvider`.
- Metadata is configured for SEO and social sharing across pages.
