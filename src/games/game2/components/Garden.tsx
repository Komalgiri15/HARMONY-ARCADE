import { motion } from 'framer-motion'

export function Garden({ dayCount }: { dayCount: number }) {
  const stage = Math.max(0, Math.min(7, dayCount))

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-sage/20 bg-gradient-to-br from-sky-50 via-cream to-amber-50 shadow-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-plum-light uppercase tracking-wider">Harmony Garden</p>
          <h2 className="font-display text-2xl text-plum mt-1">
            Day {Math.max(1, stage || 1)} of 7
          </h2>
          <p className="text-sm text-plum-light mt-1">
            {stage === 0 ? 'A single bud. Ready to grow.' : 'Watch it bloom with each ritual you seal.'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-plum-light/70">Bloom</p>
          <p className="text-sm font-bold text-sage">{stage}/7</p>
        </div>
      </div>

      {/* Sky / sun */}
      <motion.div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full"
        style={{
          background:
            stage >= 5
              ? 'radial-gradient(circle, rgba(242,184,75,0.9) 0%, rgba(242,184,75,0.0) 70%)'
              : 'radial-gradient(circle, rgba(242,184,75,0.55) 0%, rgba(242,184,75,0.0) 70%)',
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Garden bed */}
      <div className="relative mt-6 rounded-3xl bg-white/70 backdrop-blur-sm border border-plum/10 p-4 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-sage/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-amber/15 to-transparent" />

        <div className="relative h-40 flex items-end justify-center gap-3">
          <Bud visible={stage >= 0} />
          <Flower visible={stage >= 1} delay={0.1} emoji="🌷" />
          <Flower visible={stage >= 2} delay={0.2} emoji="🌸" />
          <Flower visible={stage >= 3} delay={0.3} emoji="🌼" />
          <Flower visible={stage >= 4} delay={0.4} emoji="🪷" />
          <Flower visible={stage >= 5} delay={0.5} emoji="🌺" />
          <Flower visible={stage >= 6} delay={0.6} emoji="🌻" />
          <Sparkles visible={stage >= 7} />
        </div>
      </div>
    </div>
  )
}

function Bud({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.7 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-5xl"
    >
      🌱
    </motion.div>
  )
}

function Flower({ visible, delay, emoji }: { visible: boolean; delay: number; emoji: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, scale: 0.6, rotate: -6 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : { opacity: 0 }}
      transition={{ duration: 0.7, delay, type: 'spring', stiffness: 220, damping: 18 }}
      className="text-5xl"
    >
      <motion.span
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        {emoji}
      </motion.span>
    </motion.div>
  )
}

function Sparkles({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 pointer-events-none"
    >
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 70}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.2, 0.9] }}
          transition={{ duration: 1.6 + Math.random(), repeat: Infinity, ease: 'easeInOut' }}
        >
          ✨
        </motion.div>
      ))}
    </motion.div>
  )
}

