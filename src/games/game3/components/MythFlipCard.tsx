import { motion } from 'framer-motion'
import type { MythCard, Verdict } from '../types'
import { CountdownRing } from './CountdownRing'

export function MythFlipCard({
  card,
  isFlipped,
  verdict,
  picked,
  secondsLeft,
  onPick,
  disabled,
}: {
  card: MythCard
  isFlipped: boolean
  verdict: Verdict | null
  picked: boolean | null
  secondsLeft: number
  onPick: (value: boolean) => void
  disabled: boolean
}) {
  const totalSeconds = 10
  const busted = verdict === 'correct'
  const missed = verdict === 'wrong' || verdict === 'timeout'

  return (
    <div className="relative w-full max-w-2xl mx-auto [perspective:1200px]">
      <CountdownRing secondsLeft={secondsLeft} totalSeconds={totalSeconds} />

      <motion.div
        className="relative w-full min-h-[340px] rounded-3xl"
        animate={isFlipped ? { rotateY: 180 } : { rotateY: 0 }}
        transition={{ duration: 0.4, ease: [0.18, 0.9, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-3xl bg-white border-2 border-plum/10 shadow-card overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white via-cream to-cream-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(242,184,75,0.20),transparent_40%),radial-gradient(circle_at_80%_100%,rgba(129,160,139,0.16),transparent_42%)]" />
          <div className="absolute inset-0 flex items-center justify-center text-[220px] font-display opacity-[0.035] select-none">
            ?
          </div>

          <div className="relative p-6 sm:p-8 flex flex-col min-h-[340px]">
            <p className="text-xs font-semibold text-plum-light uppercase tracking-wider">Myth</p>
            <h2 className="font-display text-3xl sm:text-4xl text-plum leading-tight mt-3">
              {card.myth}
            </h2>

            <div className="mt-auto pt-6">
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileTap={disabled ? undefined : { scale: 0.95, rotate: -0.6 }}
                  whileHover={disabled ? undefined : { scale: 1.01 }}
                  onClick={() => onPick(false)}
                  disabled={disabled}
                  className={`w-full py-4 rounded-2xl border-2 font-bold text-lg transition ${
                    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  } bg-coral/10 border-coral/30 text-plum hover:bg-coral/15 shadow-soft hover:shadow-card`}
                >
                  FALSE
                </motion.button>
                <motion.button
                  whileTap={disabled ? undefined : { scale: 0.95, rotate: 0.6 }}
                  whileHover={disabled ? undefined : { scale: 1.01 }}
                  onClick={() => onPick(true)}
                  disabled={disabled}
                  className={`w-full py-4 rounded-2xl border-2 font-bold text-lg transition ${
                    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  } bg-sage/15 border-sage/35 text-plum hover:bg-sage/20 shadow-soft hover:shadow-card`}
                >
                  TRUE
                </motion.button>
              </div>
              <p className="text-xs text-plum-light/70 text-center mt-3">
                Answer fast — your detective clock is ticking.
              </p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-3xl border-2 shadow-card overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div
            className={`absolute inset-0 ${
              busted ? 'bg-sage/15 border-sage/30' : 'bg-coral/10 border-coral/25'
            }`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.08),transparent_45%),radial-gradient(circle_at_90%_100%,rgba(0,0,0,0.06),transparent_45%)]" />
          <div className="relative p-6 sm:p-8 min-h-[340px] flex flex-col">
            <div className="flex items-center justify-between">
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${busted ? 'bg-sage text-white' : 'bg-coral text-white'}`}>
                {busted ? '✓ Busted!' : '✗ Missed'}
              </div>
              <div className="text-xs text-plum-light">
                Correct answer: <span className="font-bold text-plum">{card.answer ? 'TRUE' : 'FALSE'}</span>
              </div>
            </div>

            <h3 className="font-display text-2xl text-plum mt-5">
              {missed && picked === null ? 'Time’s up.' : busted ? 'Nice catch.' : 'Close — here’s the truth.'}
            </h3>
            <p className="text-plum-light leading-relaxed mt-3">{card.explanation}</p>

            <div className="mt-auto pt-6 flex items-center justify-between gap-3">
              <span className="text-xs px-3 py-1 rounded-full bg-white/70 border border-plum/10 text-plum-light">
                {card.sourceTag}
              </span>
              <span className="text-xs text-plum-light/70">
                Tap next…
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

