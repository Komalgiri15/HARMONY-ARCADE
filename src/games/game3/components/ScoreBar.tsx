import { motion } from 'framer-motion'

export function ScoreBar({ correct }: { correct: number }) {
  const total = 12
  const pct = Math.min(100, (correct / total) * 100)

  const milestones = [
    { at: 4, icon: '🏆' },
    { at: 8, icon: '🏆' },
    { at: 12, icon: '🏆' },
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-semibold text-plum-light uppercase tracking-wider">Score</p>
        <p className="text-xs text-plum-light">{correct}/12</p>
      </div>
      <div className="relative h-2 rounded-full bg-cream-dark overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-sage rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {milestones.map((m, i) => {
          const left = (m.at / total) * 100
          const lit = correct >= m.at
          return (
            <div key={i} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${left}%` }}>
              <div className={`w-5 h-5 -ml-2.5 rounded-full flex items-center justify-center ${lit ? 'bg-amber text-white' : 'bg-white/80 text-plum-light'} border border-plum/10 shadow-soft`}>
                <span className="text-[10px]">{m.icon}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

