import { useCallback, useState } from 'react'
import type { Choice, Game1State } from '../types'
import { MOMENTS, STARTING_METER, METER_MIN, METER_MAX } from '../data/scenes'

const TOTAL_STEPS = MOMENTS.length * 3 // scene phases per moment

function clampMeter(value: number): number {
  return Math.max(METER_MIN, Math.min(METER_MAX, value))
}

export function useMeerasDay() {
  const [state, setState] = useState<Game1State>({
    phase: 'intro',
    momentIndex: 0,
    meter: STARTING_METER,
    selectedChoice: null,
    collectedLessons: [],
    goodStreak: 0,
    pulseKey: 0,
  })

  const currentMoment = MOMENTS[state.momentIndex]
  const isLastMoment = state.momentIndex >= MOMENTS.length - 1

  const startGame = useCallback(() => {
    setState({
      phase: 'scene',
      momentIndex: 0,
      meter: STARTING_METER,
      selectedChoice: null,
      collectedLessons: [],
      goodStreak: 0,
      pulseKey: 0,
    })
  }, [])

  const selectChoice = useCallback((choice: Choice) => {
    setState((prev) => {
      const newMeter = clampMeter(prev.meter + choice.meterDelta)
      const goodStreak =
        choice.nature === 'harmonizer' ? prev.goodStreak + 1 : 0

      return {
        ...prev,
        phase: 'consequence',
        selectedChoice: choice,
        meter: newMeter,
        goodStreak,
        pulseKey: prev.pulseKey + 1,
      }
    })
  }, [])

  const continueFromConsequence = useCallback(() => {
    setState((prev) => ({ ...prev, phase: 'chest' }))
  }, [])

  const collectLesson = useCallback(() => {
    setState((prev) => {
      const lesson = MOMENTS[prev.momentIndex].lesson
      const alreadyCollected = prev.collectedLessons.some((l) => l.id === lesson.id)
      const newLessons = alreadyCollected
        ? prev.collectedLessons
        : [...prev.collectedLessons, lesson]

      if (prev.momentIndex >= MOMENTS.length - 1) {
        return {
          ...prev,
          phase: 'ending',
          collectedLessons: newLessons,
        }
      }

      return {
        ...prev,
        phase: 'scene',
        momentIndex: prev.momentIndex + 1,
        selectedChoice: null,
        collectedLessons: newLessons,
      }
    })
  }, [])

  const replay = useCallback(() => {
    startGame()
  }, [startGame])

  const currentStep =
    state.phase === 'intro'
      ? 0
      : state.phase === 'ending'
        ? TOTAL_STEPS
        : state.momentIndex * 3 + (state.phase === 'scene' ? 1 : state.phase === 'consequence' ? 2 : 3)

  return {
    state,
    currentMoment,
    isLastMoment,
    totalMoments: MOMENTS.length,
    currentStep,
    totalSteps: TOTAL_STEPS,
    startGame,
    selectChoice,
    continueFromConsequence,
    collectLesson,
    replay,
  }
}

export type MeerasDayGame = ReturnType<typeof useMeerasDay>
