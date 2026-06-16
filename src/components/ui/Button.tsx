import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'success'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

const variants = {
  primary: 'bg-coral text-white shadow-soft hover:bg-coral-dark active:scale-[0.98]',
  secondary: 'bg-cream-dark text-plum border-2 border-sage/30 hover:border-sage active:scale-[0.98]',
  ghost: 'bg-transparent text-plum hover:bg-cream-dark active:scale-[0.98]',
  success: 'bg-sage text-white shadow-soft hover:bg-sage-dark active:scale-[0.98]',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
}: ButtonProps) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        font-body font-semibold transition-colors duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}
