import { motion } from 'framer-motion'
import type { Moment } from '../types'
import { MeeraAvatar } from './MeeraAvatar'
import { SceneBackground } from './SceneBackground'

interface SceneCardProps {
  moment: Moment
  compact?: boolean
}

export function SceneCard({ moment, compact = false }: SceneCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative rounded-3xl overflow-hidden shadow-card flex flex-col ${
        compact ? 'min-h-[210px]' : 'min-h-[300px]'
      }`}
    >
      <SceneBackground momentId={moment.id} accent={moment.background.accent} />

      {/* Soft overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />

      <div className={`relative z-10 flex flex-col flex-1 ${compact ? 'p-4' : 'p-5'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MeeraAvatar mood={moment.mood} size="sm" />
            <div>
              <p className="text-xs font-semibold text-white/90 uppercase tracking-wider drop-shadow-sm">
                {moment.label}
              </p>
              <p className="text-sm font-medium text-white drop-shadow-sm">{moment.timeLabel}</p>
            </div>
          </div>
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-plum"
          >
            {moment.mood === 'tired' && '😴 Tired'}
            {moment.mood === 'anxious' && '😟 On edge'}
            {moment.mood === 'calm' && '😌 Winding down'}
            {moment.mood === 'happy' && '😊 Bright'}
            {moment.mood === 'neutral' && '😐 Neutral'}
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col justify-end">
          <div className={`bg-white/85 backdrop-blur-md rounded-2xl shadow-soft ${
            compact ? 'p-3 space-y-1' : 'p-4 space-y-2'
          }`}>
            {moment.narration.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
                className={`text-plum leading-relaxed ${compact ? 'text-[13px]' : 'text-[15px]'}`}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
