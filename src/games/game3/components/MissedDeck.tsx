import { motion } from 'framer-motion'
import type { MythResult } from '../types'

export function MissedDeck({ missed }: { missed: MythResult[] }) {
  if (missed.length === 0) {
    return (
      <div className="rounded-3xl bg-white/70 border border-plum/10 p-5 text-center shadow-soft">
        <p className="font-semibold text-plum">You didn’t miss a myth.</p>
        <p className="text-sm text-plum-light mt-1">That’s a clean sweep.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm font-semibold text-plum mb-3">What I Missed</p>
      <div className="flex gap-3 overflow-x-auto pb-2 pr-2 snap-x snap-mandatory">
        {missed.map((m) => (
          <motion.div
            key={m.id}
            className="min-w-[280px] max-w-[320px] snap-center rounded-3xl bg-white border-2 border-coral/20 shadow-card p-5"
            whileTap={{ scale: 0.98 }}
          >
            <p className="text-xs font-semibold text-plum-light uppercase tracking-wider">Myth</p>
            <p className="font-display text-xl text-plum mt-2">{m.card.myth}</p>
            <div className="mt-3 text-sm text-plum-light">
              Correct: <span className="font-bold text-plum">{m.card.answer ? 'TRUE' : 'FALSE'}</span>
            </div>
            <p className="text-sm text-plum-light mt-3 leading-relaxed">{m.card.explanation}</p>
            <div className="mt-4">
              <span className="text-xs px-3 py-1 rounded-full bg-cream border border-plum/10 text-plum-light">
                {m.card.sourceTag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

