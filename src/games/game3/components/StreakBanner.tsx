import { motion, AnimatePresence } from 'framer-motion'

export function StreakBanner({
  show,
  multiplier,
  streak,
}: {
  show: boolean
  multiplier: number
  streak: number
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="fixed top-14 left-0 right-0 z-50 flex justify-center pointer-events-none"
        >
          <div className="px-5 py-3 rounded-2xl bg-white/80 border border-amber/40 shadow-glow backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber/25 border border-amber/35 flex items-center justify-center">
                <motion.span
                  animate={{ scale: [1, 1.18, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-lg"
                >
                  ⚡
                </motion.span>
              </div>
              <div className="text-left">
                <p className="font-game text-2xl leading-none text-plum">STREAK ×{streak}</p>
                <p className="text-sm text-plum-light">
                  Multiplier <span className="font-bold text-plum">{multiplier}×</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

