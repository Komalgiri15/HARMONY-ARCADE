import { motion } from 'framer-motion'
import type { DayResult } from '../types'

const glyphs = [
  { k: 'sleep', g: '🌙' },
  { k: 'sunlight', g: '☀️' },
  { k: 'movement', g: '🏃‍♀️' },
  { k: 'foodSeeds', g: '🌱' },
  { k: 'stress', g: '🧘‍♀️' },
] as const

export function StreakTimeline({
  days,
  selectedDay,
  onPickDay,
}: {
  days: DayResult[]
  selectedDay: number
  onPickDay: (i: number) => void
}) {
  const sealedCount = days.filter((d) => d.sealed).length

  return (
    <div className="rounded-3xl bg-white/70 backdrop-blur-sm border border-plum/10 p-4 shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-plum">Your 7‑day timeline</p>
        <div className="flex items-center gap-2">
          <Flame stage={sealedCount} />
          <span className="text-xs text-plum-light">{sealedCount}/7</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        {days.map((d, i) => {
          const isSelected = i === selectedDay
          const glyph = d.sealed ? pickGlyph(d) : null

          return (
            <button
              key={i}
              onClick={() => onPickDay(i)}
              className="flex-1"
              title={d.sealed ? `Day ${i + 1}: sealed` : `Day ${i + 1}: come back tomorrow`}
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`mx-auto w-11 h-11 rounded-full border-2 flex items-center justify-center ${
                  d.sealed ? 'bg-sage/15 border-sage/35' : 'bg-transparent border-cream-dark'
                } ${isSelected ? 'ring-4 ring-coral/15' : ''}`}
              >
                <span className="text-lg">{glyph ?? '○'}</span>
              </motion.div>
              <p className={`text-[11px] mt-1 ${isSelected ? 'text-plum font-semibold' : 'text-plum-light'}`}>
                D{i + 1}
              </p>
            </button>
          )
        })}
      </div>

      <div className="mt-3 text-xs text-plum-light/80 text-center">
        {sealedCount === 0
          ? 'Seal Day 1 to start the bloom.'
          : sealedCount < 7
            ? 'No penalties. If you miss a day, the garden simply pauses.'
            : 'Week complete — your garden is in full bloom.'}
      </div>
    </div>
  )
}

function pickGlyph(day: DayResult) {
  // Use weakest habit as a gentle “what to watch tomorrow”
  const k = day.weakestHabit ?? 'sleep'
  return glyphs.find((x) => x.k === k)?.g ?? '✓'
}

function Flame({ stage }: { stage: number }) {
  if (stage < 3) return <span className="text-lg opacity-30">🔥</span>
  if (stage < 5) return <span className="text-lg opacity-70">🔥</span>
  if (stage < 7)
    return (
      <motion.span
        className="text-lg"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🔥
      </motion.span>
    )
  return (
    <motion.span
      className="text-lg"
      animate={{ scale: [1, 1.25, 1], rotate: [0, -6, 6, 0] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
    >
      🔥
    </motion.span>
  )
}

