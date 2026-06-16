import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Badge, LessonCard } from '../types'
import { HormoneMeter } from './HormoneMeter'
import { LessonCardReveal } from './LessonChest'
import { Button } from '../../../components/ui/Button'

interface EndScreenProps {
  meter: number
  badge: Badge
  lessons: LessonCard[]
  onReplay: () => void
}

function playMeterSound(meter: number) {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    const isHigh = meter >= 70
    osc.frequency.setValueAtTime(isHigh ? 523 : meter >= 40 ? 392 : 262, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(
      isHigh ? 784 : meter >= 40 ? 440 : 196,
      ctx.currentTime + 0.6,
    )

    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.8)
  } catch {
    // Audio not available — silent fallback
  }
}

export function EndScreen({ meter, badge, lessons, onReplay }: EndScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => playMeterSound(meter), 800)
    return () => clearTimeout(timer)
  }, [meter])

  return (
    <div className="flex flex-col items-center text-center px-2 py-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm font-medium text-plum-light mb-4"
      >
        Meera&apos;s day is complete
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm mb-8"
      >
        <HormoneMeter value={meter} pulseKey={999} showLabel size="lg" />
      </motion.div>

      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: -3 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.6 }}
        className="relative mb-6"
      >
        <div className="bg-white rounded-2xl px-8 py-5 shadow-card border-4 border-dashed border-coral/40">
          <span className="text-4xl block mb-2">{badge.emoji}</span>
          <h2 className="font-display text-2xl text-plum">{badge.title}</h2>
          <p className="text-sm text-plum-light mt-2 max-w-xs">{badge.description}</p>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-coral rounded-full flex items-center justify-center text-white text-xs font-bold rotate-12">
          ✓
        </div>
      </motion.div>

      {lessons.length > 0 && (
        <div className="w-full mb-8">
          <p className="text-sm font-semibold text-plum-light mb-4">Your collected lessons</p>
          <div className="flex justify-center items-end gap-2 px-2">
            {lessons.map((lesson, i) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: (i - 1) * 8,
                }}
                transition={{ delay: 1 + i * 0.15, type: 'spring' }}
                style={{ zIndex: lessons.length - i }}
              >
                <LessonCardReveal lesson={lesson} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="w-full max-w-xs space-y-3"
      >
        <Button fullWidth size="lg" onClick={onReplay}>
          Play Again — Choose Differently
        </Button>
      </motion.div>
    </div>
  )
}
