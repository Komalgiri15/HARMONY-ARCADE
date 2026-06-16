import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Choice } from '../types'

interface ConsequenceViewProps {
  choice: Choice
  meterDelta: number
  onContinue: () => void
}

function GreenParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-success"
          style={{
            left: `${40 + Math.random() * 20}%`,
            top: '50%',
          }}
          initial={{ opacity: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: -80 - Math.random() * 60,
            x: (Math.random() - 0.5) * 80,
            scale: [0, 1, 0.5],
          }}
          transition={{ duration: 1.2, delay: i * 0.06, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function RedEdgePulse() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0] }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 border-[6px] border-error/50 rounded-none" />
      <div className="absolute inset-0 bg-error/10" />
    </motion.div>
  )
}

function AmberEdgePulse() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.4, 0] }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 border-[4px] border-amber/40" />
    </motion.div>
  )
}

export function ConsequenceView({ choice, meterDelta, onContinue }: ConsequenceViewProps) {
  const [expanded, setExpanded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 600)
    return () => clearTimeout(timer)
  }, [])

  const isGood = choice.nature === 'harmonizer'
  const isBad = choice.nature === 'disruptor'

  return (
    <>
      {isGood && <GreenParticles />}
      {isBad && meterDelta <= -12 && <RedEdgePulse />}
      {isBad && meterDelta > -12 && <AmberEdgePulse />}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
        className="relative mt-4"
      >
        <motion.div
          layout
          className={`
            rounded-3xl p-6 shadow-card border-2
            ${isGood ? 'bg-success-light/60 border-success/30' : isBad ? 'bg-error-light/40 border-error/20' : 'bg-lavender-light/60 border-lavender/30'}
          `}
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, delay: 0.2 }}
              className="text-5xl"
            >
              {choice.icon}
            </motion.span>
            <div>
              <p className="font-display text-lg text-plum">{choice.label}</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`text-sm font-bold mt-1 ${meterDelta > 0 ? 'text-success' : 'text-error'}`}
              >
                {meterDelta > 0 ? '+' : ''}{meterDelta} Hormone Balance
              </motion.p>
            </div>
          </div>

          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-plum-light">
                    Affected
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/70 text-xs font-semibold text-plum">
                    {choice.hormone}
                  </span>
                </div>

                <p className="text-plum leading-relaxed mb-4">{choice.consequence}</p>

                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 text-sm font-semibold text-coral"
                >
                  <span>{expanded ? '▼' : '▶'}</span>
                  What this means
                </button>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-plum-light leading-relaxed mt-3 pt-3 border-t border-plum/10">
                        {choice.deepDive}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <button
                onClick={onContinue}
                className="w-full py-4 rounded-2xl bg-coral text-white font-semibold shadow-soft active:scale-[0.98] transition-transform"
              >
                Continue →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
