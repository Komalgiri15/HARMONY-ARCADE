import type { GameId, GameProgress } from '../types/game'
import { createDefaultProgress } from '../data/course'

const STORAGE_KEY = 'hormonal-harmony-progress'

type ProgressStore = Record<GameId, GameProgress>

function loadStore(): ProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as ProgressStore
  } catch {
    // Corrupted storage — start fresh
  }
  return {
    game1: createDefaultProgress('game1'),
    game2: createDefaultProgress('game2'),
    game3: createDefaultProgress('game3'),
  }
}

function saveStore(store: ProgressStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function getProgress(gameId: GameId): GameProgress {
  return loadStore()[gameId]
}

export function getAllProgress(): ProgressStore {
  return loadStore()
}

export function updateProgress(gameId: GameId, updates: Partial<GameProgress>): GameProgress {
  const store = loadStore()
  store[gameId] = { ...store[gameId], ...updates }
  saveStore(store)
  return store[gameId]
}

export function markStepComplete(gameId: GameId, step: number): GameProgress {
  const current = getProgress(gameId)
  const newStep = Math.max(current.currentStep, step + 1)
  const status = newStep >= current.totalSteps ? 'completed' : 'in-progress'

  return updateProgress(gameId, {
    currentStep: newStep,
    status,
    completedAt: status === 'completed' ? new Date().toISOString() : undefined,
  })
}

export function resetProgress(gameId: GameId): GameProgress {
  return updateProgress(gameId, createDefaultProgress(gameId))
}

export function resetAllProgress(): void {
  localStorage.removeItem(STORAGE_KEY)
}
