import { motion } from 'framer-motion'
import { Button } from '../../../components/ui/Button'
import type { DayRitualInput } from '../types'

const lessons: Record<keyof DayRitualInput, { title: string; lines: [string, string] }> = {
  sleep: {
    title: 'Sleep is hormone repair time',
    lines: [
      'When sleep is steady, your body gets a chance to recalibrate.',
      'A simple anchor: dim lights 60 minutes before bed — same time each night.',
    ],
  },
  sunlight: {
    title: 'Morning light sets the clock',
    lines: [
      'Even 5–10 minutes outdoors helps your body time cortisol and melatonin.',
      'Tomorrow: step outside before checking your phone.',
    ],
  },
  movement: {
    title: 'Movement is a stress reset',
    lines: [
      'Your nervous system shifts when your muscles move — even gently.',
      'Tomorrow: choose the smallest version you can do consistently.',
    ],
  },
  foodSeeds: {
    title: 'Stable blood sugar = steadier moods',
    lines: [
      'Protein + fiber at meals helps prevent spikes that feel like anxiety.',
      'Tomorrow: add one “anchor” food (eggs, dal, tofu, yogurt, nuts).',
    ],
  },
  stress: {
    title: 'Stress is a hormone amplifier',
    lines: [
      'It doesn’t create everything — but it magnifies what’s already there.',
      'Try 60 seconds: inhale 4, exhale 6. Repeat 5 times.',
    ],
  },
}

export function MicroLessonScroll({
  weakestHabit,
  onDone,
}: {
  weakestHabit: keyof DayRitualInput | null
  onDone: () => void
}) {
  const key = weakestHabit ?? 'sleep'
  const lesson = lessons[key]

  return (
    <div className="max-w-xl mx-auto">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="relative mt-2"
      >
        <div className="rounded-3xl bg-cream border-2 border-amber/35 shadow-card overflow-hidden">
          <div className="px-5 py-4 bg-gradient-to-r from-amber/15 via-cream to-amber/10 border-b border-amber/25">
            <p className="text-xs font-semibold text-plum-light uppercase tracking-wider">Micro-lesson</p>
            <h2 className="font-display text-2xl text-plum mt-1">{lesson.title}</h2>
          </div>

          <div className="px-5 py-5">
            <p className="text-plum leading-relaxed">{lesson.lines[0]}</p>
            <p className="text-plum leading-relaxed mt-3">{lesson.lines[1]}</p>
          </div>
        </div>

        {/* Wax seal */}
        <motion.div
          initial={{ scale: 1, rotate: -8 }}
          animate={{ scale: [1, 1.05, 1], rotate: [-8, -5, -8] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 -right-2 w-14 h-14 rounded-full bg-coral shadow-card flex items-center justify-center text-white font-bold"
          title="Seal"
        >
          ✶
        </motion.div>
      </motion.div>

      <div className="mt-5 max-w-sm mx-auto">
        <Button fullWidth size="lg" onClick={onDone}>
          Back to my garden →
        </Button>
      </div>
    </div>
  )
}

