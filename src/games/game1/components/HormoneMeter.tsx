import { motion } from 'framer-motion'
import { getMeterColor } from '../data/scenes'

interface HormoneMeterProps {
  value: number
  pulseKey: number
  showLabel?: boolean
  size?: 'sm' | 'lg'
}

const colorMap = {
  green: {
    fill: 'bg-success',
    glow: 'shadow-[0_0_20px_rgba(107,163,104,0.5)]',
    text: 'text-success',
    track: 'from-success/30 to-success/10',
  },
  amber: {
    fill: 'bg-amber',
    glow: 'shadow-[0_0_20px_rgba(242,184,75,0.45)]',
    text: 'text-amber',
    track: 'from-amber/30 to-amber/10',
  },
  red: {
    fill: 'bg-error',
    glow: 'shadow-[0_0_20px_rgba(212,91,91,0.45)]',
    text: 'text-error',
    track: 'from-error/30 to-error/10',
  },
}

export function HormoneMeter({ value, pulseKey, showLabel = true, size = 'sm' }: HormoneMeterProps) {
  const color = getMeterColor(value)
  const styles = colorMap[color]
  const height = size === 'lg' ? 'h-4' : 'h-3'

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-plum-light uppercase tracking-wider">
            Hormone Balance
          </span>
          <motion.span
            key={pulseKey}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-sm font-bold tabular-nums ${styles.text}`}
          >
            {Math.round(value)}%
          </motion.span>
        </div>
      )}

      <div className={`relative ${height} rounded-full bg-cream-dark overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-r ${styles.track} opacity-60`} />

        <motion.div
          key={pulseKey}
          className={`absolute inset-y-0 left-0 rounded-full ${styles.fill} ${styles.glow}`}
          initial={false}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: [0.34, 1.2, 0.64, 1] }}
        />

        <motion.div
          key={`pulse-${pulseKey}`}
          className={`absolute inset-y-0 left-0 rounded-full ${styles.fill} opacity-40`}
          initial={{ width: `${value}%` }}
          animate={{ width: [`${value}%`, `${Math.min(value + 4, 100)}%`, `${value}%`] }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
