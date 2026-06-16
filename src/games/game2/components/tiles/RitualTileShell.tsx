import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export function RitualTileShell({
  title,
  icon,
  tone,
  children,
}: {
  title: string
  icon: string
  tone: 'sleep' | 'sun' | 'move' | 'food' | 'stress'
  children: ReactNode
}) {
  const tones: Record<typeof tone, string> = {
    sleep: 'from-indigo-200/40 to-indigo-50/50 border-indigo-200/60',
    sun: 'from-amber-200/40 to-amber-50/50 border-amber-200/60',
    move: 'from-sage/25 to-sage/10 border-sage/40',
    food: 'from-orange-200/35 to-rose-50/45 border-orange-200/60',
    stress: 'from-lavender/25 to-lavender-light/30 border-lavender/40',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl border-2 bg-gradient-to-br ${tones[tone]} shadow-soft overflow-hidden`}
    >
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/70 border border-plum/10 flex items-center justify-center text-xl">
            {icon}
          </div>
          <div>
            <p className="font-semibold text-plum">{title}</p>
            <p className="text-xs text-plum-light">Tap and set today’s ritual</p>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">{children}</div>
    </motion.div>
  )
}

