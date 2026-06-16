import { useState, useCallback } from 'react'
import type { FeedbackState } from '../types/game'

export function useFeedback() {
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)

  const show = useCallback((state: FeedbackState, duration = 2000) => {
    setFeedback(state)
    if (duration > 0) {
      setTimeout(() => setFeedback(null), duration)
    }
  }, [])

  const showSuccess = useCallback(
    (message: string, submessage?: string) => {
      show({ type: 'success', message, submessage })
    },
    [show],
  )

  const showError = useCallback(
    (message: string, submessage?: string) => {
      show({ type: 'error', message, submessage })
    },
    [show],
  )

  const showCelebration = useCallback(
    (message: string, submessage?: string) => {
      show({ type: 'celebration', message, submessage }, 3000)
    },
    [show],
  )

  const dismiss = useCallback(() => setFeedback(null), [])

  return { feedback, show, showSuccess, showError, showCelebration, dismiss }
}
