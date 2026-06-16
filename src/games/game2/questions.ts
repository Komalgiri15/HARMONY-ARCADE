import type { Game2Profile } from './types'

export const WHY_OPTIONS: { id: Game2Profile['whyHere']; label: string; sub?: string }[] = [
  { id: 'energy', label: 'I want more energy', sub: 'To feel steady through the day' },
  { id: 'sleep', label: 'I want better sleep', sub: 'To wake up feeling restored' },
  { id: 'mood', label: 'I want calmer moods', sub: 'Less overwhelm, more ease' },
  { id: 'weight', label: 'I want body balance', sub: 'Support healthy weight & cravings' },
  { id: 'hot-flashes', label: 'I want fewer flare-ups', sub: 'Hot flashes, sweats, dips' },
  { id: 'strength', label: 'I want strength back', sub: 'Muscle, stamina, confidence' },
  { id: 'curiosity', label: 'I’m curious', sub: 'I want to understand my body better' },
]

export const STRUGGLE_OPTIONS: { id: Game2Profile['biggestStruggle']; label: string; sub?: string }[] = [
  { id: 'stress', label: 'Stress runs the show', sub: 'My mind doesn’t switch off' },
  { id: 'sleep', label: 'Sleep is unpredictable', sub: 'I can’t keep a rhythm' },
  { id: 'consistency', label: 'I start… then stop', sub: 'Habits don’t stick' },
  { id: 'food-cravings', label: 'Cravings & snacking', sub: 'I’m hungry at odd times' },
  { id: 'low-energy', label: 'Low energy most days', sub: 'I’m tired even after rest' },
]

