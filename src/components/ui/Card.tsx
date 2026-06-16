import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  onClick?: () => void
  selected?: boolean
  disabled?: boolean
  accent?: 'coral' | 'sage' | 'amber' | 'lavender'
  className?: string
}

const accentBorders = {
  coral: 'border-coral/40 ring-coral/20',
  sage: 'border-sage/40 ring-sage/20',
  amber: 'border-amber/40 ring-amber/20',
  lavender: 'border-lavender/40 ring-lavender/20',
}

export function Card({
  children,
  onClick,
  selected = false,
  disabled = false,
  accent = 'coral',
  className = '',
}: CardProps) {
  const Component = onClick ? motion.button : motion.div

  return (
    <Component
      whileTap={onClick && !disabled ? { scale: 0.98 } : undefined}
      onClick={disabled ? undefined : onClick}
      className={`
        bg-white rounded-2xl p-5 shadow-soft
        border-2 transition-all duration-200
        ${selected ? `border-${accent} ring-4 ${accentBorders[accent]}` : 'border-transparent'}
        ${onClick && !disabled ? 'cursor-pointer hover:shadow-card active:shadow-soft' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  )
}
