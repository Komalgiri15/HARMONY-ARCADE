import { motion } from 'framer-motion'
import { RitualTileShell } from './RitualTileShell'

export function RitualTileFood({
  value,
  onChange,
}: {
  value: 1 | 2 | 3 | 4 | 5 | null
  onChange: (next: 1 | 2 | 3 | 4 | 5) => void
}) {
  const selected = value ?? 0

  return (
    <RitualTileShell title="Food" icon="🥗" tone="food">
      <p className="text-sm text-plum-light mb-3">How nourishing did today feel?</p>
      <div className="flex items-end justify-between gap-2">
        {([1, 2, 3, 4, 5] as const).map((n) => {
          const on = n <= selected
          return (
            <motion.button
              key={n}
              whileTap={{ scale: 0.92 }}
              onClick={() => onChange(n)}
              className={`flex-1 rounded-2xl border-2 bg-white/80 py-3 flex flex-col items-center justify-center ${
                on ? 'border-sage/50' : 'border-cream-dark'
              }`}
            >
              <motion.div
                animate={on ? { y: [2, -4, 2], scale: [1, 1.05, 1] } : { y: 0, scale: 1 }}
                transition={on ? { duration: 0.8, ease: 'easeInOut' } : undefined}
                className="text-2xl"
              >
                {on ? '🌱' : '•'}
              </motion.div>
              <span className={`text-[11px] mt-1 ${on ? 'text-sage font-semibold' : 'text-plum-light'}`}>{n}</span>
            </motion.button>
          )
        })}
      </div>
      <p className="text-xs text-plum-light mt-2">Seeds “sprout” as you rate.</p>
    </RitualTileShell>
  )
}

