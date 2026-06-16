import { motion, AnimatePresence } from 'framer-motion'
import type { FeedbackState } from '../../types/game'

interface FeedbackToastProps {
  feedback: FeedbackState | null
  onDismiss?: () => void
}

const styles = {
  success: 'bg-success-light text-success border-success/30',
  error: 'bg-error-light text-error border-error/30',
  info: 'bg-lavender-light text-plum border-lavender/30',
  celebration: 'bg-amber-light text-plum border-amber/40',
}

const icons = {
  success: '✓',
  error: '✗',
  info: 'ℹ',
  celebration: '🎉',
}

export function FeedbackToast({ feedback, onDismiss }: FeedbackToastProps) {
  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={onDismiss}
          className={`
            fixed bottom-24 left-4 right-4 z-50 mx-auto max-w-sm
            px-5 py-4 rounded-2xl border-2 shadow-card
            ${styles[feedback.type]}
          `}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0">{icons[feedback.type]}</span>
            <div>
              <p className="font-semibold">{feedback.message}</p>
              {feedback.submessage && (
                <p className="text-sm opacity-80 mt-0.5">{feedback.submessage}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
