import { motion, AnimatePresence } from 'framer-motion'
import type { Verdict } from '../types'

export function EdgeFlash({ verdict }: { verdict: Verdict | null }) {
  const tone =
    verdict === 'correct'
      ? 'rgba(129,160,139,0.55)'
      : verdict === 'wrong' || verdict === 'timeout'
        ? 'rgba(224,122,95,0.55)'
        : null

  return (
    <AnimatePresence>
      {tone && (
        <motion.div
          className="fixed inset-0 z-[55] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 10px ${tone}` }} />
          <div className="absolute inset-0" style={{ background: tone, opacity: 0.12 }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

