# Hormonal Harmony Games

Interactive educational games for **Redefining Menopause: Your Guide to Rebuilding Strength & Hormonal Harmony** by Luke Coutinho.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** — warm, mobile-first design system
- **Framer Motion** — animations and transitions
- **React Router** — navigation between hub and games

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) on your phone or browser.

## Project Structure

```
src/
├── components/
│   ├── layout/       # AppLayout, GameShell
│   └── ui/           # Button, Card, ProgressBar, FeedbackToast, PageTransition
├── data/             # Course metadata, game definitions
├── games/
│   ├── game1/        # Game 1 (awaiting flow)
│   ├── game2/        # Game 2 (awaiting flow)
│   └── game3/        # Game 3 (awaiting flow)
├── hooks/            # useGameProgress, useFeedback
├── pages/            # Hub (game selector)
├── types/            # Shared TypeScript types
└── utils/            # Progress persistence (localStorage)
```

## Design System

| Token | Value | Use |
|-------|-------|-----|
| Cream | `#FDF6F0` | Background |
| Coral | `#E07A5F` | Primary actions |
| Sage | `#81A08B` | Success, Game 2 accent |
| Amber | `#F2B84B` | Celebration, Game 3 accent |
| Plum | `#3D2C3E` | Text |

Fonts: **Fraunces** (display headings), **DM Sans** (body).

## Shared Game Infrastructure

- `GameShell` — header with back nav + progress bar
- `useGameProgress` — step tracking with localStorage persistence
- `useFeedback` — success/error/celebration toast system
- `FeedbackToast` — animated feedback overlay
- `PageTransition` / `StaggerChildren` — enter animations

## Build

```bash
npm run build
npm run preview
```
