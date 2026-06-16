import { motion } from 'framer-motion'
import type { MovementType } from '../../types'
import { RitualTileShell } from './RitualTileShell'

const options: { id: MovementType; label: string; icon: string }[] = [
  { id: 'strength', label: 'Strength', icon: '🏋️‍♀️' },
  { id: 'yoga', label: 'Yoga', icon: '🧘‍♀️' },
  { id: 'walk', label: 'Walk', icon: '🚶‍♀️' },
  { id: 'rest', label: 'Rest', icon: '🌿' },
  { id: 'none', label: 'None', icon: '—' },
]

export function RitualTileMovement({
  value,
  onChange,
}: {
  value: MovementType | null
  onChange: (next: MovementType) => void
}) {
  return (
    <RitualTileShell title="Movement" icon="🏃‍♀️" tone="move">
      <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <div className="flex gap-2 min-w-max">
          {options.map((o) => {
            const active = value === o.id
            return (
              <motion.button
                key={o.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => onChange(o.id)}
                className={`px-4 py-2 rounded-full border-2 flex items-center gap-2 font-semibold ${
                  active
                    ? 'bg-sage text-white border-sage shadow-soft'
                    : 'bg-white/80 text-plum border-cream-dark'
                }`}
              >
                <span className="text-base">{o.icon}</span>
                <span className="text-sm">{o.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
      <p className="text-xs text-plum-light mt-2">Pick one. Even a short walk counts.</p>
    </RitualTileShell>
  )
}

