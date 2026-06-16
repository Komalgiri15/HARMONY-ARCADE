import { motion } from 'framer-motion'
import type { StressInput } from '../../types'
import { RitualTileShell } from './RitualTileShell'

function colorFor(level: number) {
  if (level <= 2) return 'rgba(107,163,104,0.9)'
  if (level === 3) return 'rgba(242,184,75,0.9)'
  return 'rgba(212,91,91,0.9)'
}

export function RitualTileStress({
  value,
  onChange,
}: {
  value: StressInput
  onChange: (next: StressInput) => void
}) {
  const level = value.level
  const stroke = colorFor(level)
  const radius = 26
  const circ = 2 * Math.PI * radius
  const pct = (level - 1) / 4
  const dash = circ * pct

  return (
    <RitualTileShell title="Stress" icon="🧘‍♀️" tone="stress">
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 80 80" className="w-20 h-20">
            <circle cx="40" cy="40" r={radius} stroke="rgba(61,44,62,0.12)" strokeWidth="8" fill="none" />
            <motion.circle
              cx="40"
              cy="40"
              r={radius}
              stroke={stroke}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              transform="rotate(-90 40 40)"
              initial={false}
              animate={{ strokeDasharray: `${dash} ${circ}` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-xl text-plum">{level}</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-plum-light mb-2">
            Turn the dial: <span className="font-semibold text-plum">1 calm</span> → <span className="font-semibold text-plum">5 overwhelmed</span>
          </p>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={level}
            onChange={(e) => onChange({ ...value, level: Number(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
            className="w-full accent-[var(--color-coral)]"
          />

          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="text-sm text-plum-light">Did you practice mindfulness?</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onChange({ ...value, mindfulness: false })}
                className={`px-4 py-2 rounded-2xl border-2 font-semibold ${
                  value.mindfulness === false ? 'border-lavender bg-lavender/20 text-plum' : 'border-cream-dark bg-white/70 text-plum-light'
                }`}
              >
                No
              </button>
              <button
                onClick={() => onChange({ ...value, mindfulness: true })}
                className={`px-4 py-2 rounded-2xl border-2 font-semibold ${
                  value.mindfulness === true ? 'border-lavender bg-lavender/25 text-plum' : 'border-cream-dark bg-white/70 text-plum-light'
                }`}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </RitualTileShell>
  )
}

