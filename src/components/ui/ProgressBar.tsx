import { motion } from 'framer-motion'

interface ProgressBarProps {
  current: number
  total: number
  accent?: 'coral' | 'sage' | 'amber'
  showLabel?: boolean
  className?: string
}

const accentColors = {
  coral: 'bg-coral',
  sage: 'bg-sage',
  amber: 'bg-amber',
}

export function ProgressBar({
  current,
  total,
  accent = 'coral',
  showLabel = false,
  className = '',
}: ProgressBarProps) {
  const percent = total > 0 ? Math.min((current / total) * 100, 100) : 0

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm text-plum-light mb-1.5">
          <span>Progress</span>
          <span>{Math.round(percent)}%</span>
        </div>
      )}
      <div className="h-2 bg-cream-dark rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${accentColors[accent]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
