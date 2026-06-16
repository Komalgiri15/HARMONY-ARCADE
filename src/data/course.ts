import type { GameId, GameMeta, GameProgress } from '../types/game'

export const COURSE_TITLE = 'Redefining Menopause'
export const COURSE_SUBTITLE = 'Your Guide to Rebuilding Strength & Hormonal Harmony'

export const GAMES: GameMeta[] = [
  {
    id: 'game1',
    title: "Meera's Day",
    subtitle: 'Narrative simulation',
    description: 'Live inside one woman\'s day. Every choice ripples through her hormone balance.',
    accentColor: 'coral',
    estimatedMinutes: 5,
  },
  {
    id: 'game2',
    title: 'Hormone Harmony Habit Tracker',
    subtitle: '7‑day streak RPG',
    description: 'Tend your Harmony Garden with daily rituals. Watch it bloom as your habits grow.',
    accentColor: 'sage',
    estimatedMinutes: 7,
  },
  {
    id: 'game3',
    title: 'Menopause Myth Busters',
    subtitle: 'Card-flip arcade',
    description: 'Flip through myths fast. Bust bad info with streaks, combos, and satisfying reveals.',
    accentColor: 'amber',
    estimatedMinutes: 5,
  },
]

export function getGameMeta(id: GameId): GameMeta {
  const game = GAMES.find((g) => g.id === id)
  if (!game) throw new Error(`Unknown game: ${id}`)
  return game
}

export function createDefaultProgress(gameId: GameId, totalSteps = 10): GameProgress {
  return {
    gameId,
    status: 'available',
    currentStep: 0,
    totalSteps,
  }
}
