import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { RitualTileShell } from './RitualTileShell'

export function RitualTileSunlight({
  value,
  onChange,
}: {
  value: boolean | null
  onChange: (next: boolean) => void
}) {
  const [burst, setBurst] = useState(0)

  const setYes = () => {
    onChange(true)
    setBurst((b) => b + 1)
  }

  return (
    <RitualTileShell title="Sunlight" icon="☀️" tone="sun">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-plum-light">Did you get morning light today?</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange(false)}
            className={`px-4 py-2 rounded-2xl border-2 font-semibold ${
              value === false ? 'border-amber bg-amber/10 text-plum' : 'border-cream-dark bg-white/70 text-plum-light'
            }`}
          >
            No
          </button>
          <button
            onClick={setYes}
            className={`px-4 py-2 rounded-2xl border-2 font-semibold ${
              value === true ? 'border-amber bg-amber/15 text-plum' : 'border-cream-dark bg-white/70 text-plum-light'
            }`}
          >
            Yes
          </button>
        </div>
      </div>

      <div className="relative mt-4 h-10">
        <AnimatePresence>
          {value === true && (
            <motion.div
              key={burst}
              initial={{ opacity: 0, scale: 0.6, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="absolute left-0 right-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-3xl"
              >
                ☀️
              </motion.div>
              <motion.div
                className="ml-3 text-sm font-semibold text-plum"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Nice. Your body clock loves this.
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RitualTileShell>
  )
}

