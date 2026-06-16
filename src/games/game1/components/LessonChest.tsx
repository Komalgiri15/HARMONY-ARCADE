import { motion } from 'framer-motion'
import type { LessonCard } from '../types'

interface LessonChestProps {
  lesson: LessonCard
  momentLabel: string
  onCollect: () => void
}

export function LessonChest({ lesson, momentLabel, onCollect }: LessonChestProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[50dvh] text-center px-4"
    >
      <p className="text-sm font-medium text-plum-light mb-6">
        {momentLabel} complete — you earned a lesson!
      </p>

      <motion.button
        onClick={onCollect}
        animate={{
          y: [0, -8, 0],
          rotate: [0, -3, 3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileTap={{ scale: 0.92 }}
        className="relative mb-6"
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(242, 184, 75, 0.4)',
              '0 0 0 16px rgba(242, 184, 75, 0)',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-28 h-28 rounded-3xl bg-gradient-to-br from-amber to-amber-light flex items-center justify-center text-6xl shadow-card border-4 border-amber-light"
        >
          🎁
        </motion.div>
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold text-amber whitespace-nowrap"
        >
          Tap to open
        </motion.span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-xs"
      >
        <p className="text-xs uppercase tracking-wider text-plum-light mb-1">Preview</p>
        <p className="font-display text-lg text-plum">{lesson.title}</p>
      </motion.div>
    </motion.div>
  )
}

interface LessonCardRevealProps {
  lesson: LessonCard
}

export function LessonCardReveal({ lesson }: LessonCardRevealProps) {
  return (
    <motion.div
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="bg-white rounded-2xl p-4 shadow-card border-2 border-amber/30 w-36 shrink-0"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="text-3xl mb-2 text-center">{lesson.icon}</div>
      <p className="font-display text-sm text-plum text-center leading-snug">{lesson.title}</p>
    </motion.div>
  )
}
