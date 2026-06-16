import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { SleepInput } from '../../types'
import { RitualTileShell } from './RitualTileShell'

export function RitualTileSleep({
  value,
  onChange,
}: {
  value: SleepInput
  onChange: (next: SleepInput) => void
}) {
  const bed = value.bedTime ?? ''
  const wake = value.wakeTime ?? ''

  const arc = useMemo(() => {
    if (!value.bedTime || !value.wakeTime) return 0
    const [bh, bm] = value.bedTime.split(':').map(Number)
    const [wh, wm] = value.wakeTime.split(':').map(Number)
    const bedM = bh * 60 + bm
    const wakeM = wh * 60 + wm
    const dur = wakeM >= bedM ? wakeM - bedM : wakeM + 24 * 60 - bedM
    return Math.max(0, Math.min(1, dur / (10 * 60)))
  }, [value.bedTime, value.wakeTime])

  const radius = 26
  const circ = 2 * Math.PI * radius
  const dash = circ * arc

  return (
    <RitualTileShell title="Sleep" icon="🌙" tone="sleep">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
        <label className="block">
          <span className="text-xs font-semibold text-plum-light uppercase tracking-wider">Bed</span>
          <input
            type="time"
            value={bed}
            onChange={(e) => onChange({ ...value, bedTime: e.target.value || null })}
            className="mt-1 w-full px-3 py-2 rounded-2xl bg-white/80 border border-plum/10 focus:outline-none focus:border-indigo-300"
          />
        </label>

        <div className="flex items-center justify-center">
          <div className="relative w-16 h-16">
            <svg viewBox="0 0 80 80" className="w-16 h-16">
              <circle cx="40" cy="40" r={radius} stroke="rgba(61,44,62,0.12)" strokeWidth="8" fill="none" />
              <motion.circle
                cx="40"
                cy="40"
                r={radius}
                stroke="rgba(79,70,229,0.65)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circ}`}
                transform="rotate(-90 40 40)"
                initial={false}
                animate={{ strokeDasharray: `${dash} ${circ}` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-plum">
              {value.bedTime && value.wakeTime ? `${Math.round(arc * 10)}h` : '—'}
            </div>
          </div>
        </div>

        <label className="block">
          <span className="text-xs font-semibold text-plum-light uppercase tracking-wider">Wake</span>
          <input
            type="time"
            value={wake}
            onChange={(e) => onChange({ ...value, wakeTime: e.target.value || null })}
            className="mt-1 w-full px-3 py-2 rounded-2xl bg-white/80 border border-plum/10 focus:outline-none focus:border-indigo-300"
          />
        </label>
      </div>
      <p className="text-xs text-plum-light mt-3">
        Ideal window: <span className="font-semibold">10:00pm–6:00am</span> (but we meet you where you are).
      </p>
    </RitualTileShell>
  )
}

