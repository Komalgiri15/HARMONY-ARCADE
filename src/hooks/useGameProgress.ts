import { useState, useEffect, useCallback } from 'react'
import type { GameId, GameProgress } from '../types/game'
import { getProgress, updateProgress, markStepComplete, resetProgress } from '../utils/progressStorage'

export function useGameProgress(gameId: GameId) {
  const [progress, setProgress] = useState<GameProgress>(() => getProgress(gameId))

  useEffect(() => {
    setProgress(getProgress(gameId))
  }, [gameId])

  const advance = useCallback(
    (step: number) => {
      const updated = markStepComplete(gameId, step)
      setProgress(updated)
      return updated
    },
    [gameId],
  )

  const setStep = useCallback(
    (step: number) => {
      const updated = updateProgress(gameId, { currentStep: step, status: 'in-progress' })
      setProgress(updated)
      return updated
    },
    [gameId],
  )

  const setTotalSteps = useCallback(
    (total: number) => {
      const updated = updateProgress(gameId, { totalSteps: total })
      setProgress(updated)
      return updated
    },
    [gameId],
  )

  const reset = useCallback(() => {
    const updated = resetProgress(gameId)
    setProgress(updated)
    return updated
  }, [gameId])

  const percentComplete = progress.totalSteps > 0
    ? Math.round((progress.currentStep / progress.totalSteps) * 100)
    : 0

  return { progress, advance, setStep, setTotalSteps, reset, percentComplete }
}
