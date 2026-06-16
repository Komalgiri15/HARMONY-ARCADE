import { motion, AnimatePresence } from 'framer-motion'

export function ArcadeOverlay({
  show,
  text,
  tone = 'amber',
}: {
  show: boolean
  text: string
  tone?: 'amber' | 'sage' | 'coral'
}) {
  const toneClass =
    tone === 'sage'
      ? 'from-sage/35 via-white/85 to-sage/20'
      : tone === 'coral'
        ? 'from-coral/35 via-white/85 to-coral/20'
        : 'from-amber/35 via-white/85 to-amber/20'

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${toneClass}`} />
          <motion.div
            initial={{ scale: 0.6, rotate: -6, y: 20, opacity: 0 }}
            animate={{ scale: [0.6, 1.08, 1], rotate: [-6, 2, 0], y: [20, -6, 0], opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 240, damping: 16 }}
            className="relative px-8 py-6 rounded-3xl bg-white/85 border-2 border-plum/10 shadow-card"
          >
            <motion.div
              className="absolute -inset-2 rounded-[1.75rem] blur-xl bg-amber/20"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div
              className="relative font-game text-6xl sm:text-7xl text-plum"
              style={{
                WebkitTextStroke: '2px rgba(61,44,62,0.18)',
                textShadow: '0 14px 30px rgba(61,44,62,0.14)',
              }}
            >
              {text}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

