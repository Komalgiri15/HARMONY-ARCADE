import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface GameShellProps {
  children: ReactNode
  title: string
  currentStep?: number
  totalSteps?: number
  accent?: 'coral' | 'sage' | 'amber'
  showBack?: boolean
  showProgress?: boolean
}

export function GameShell({
  children,
  title,
  currentStep,
  totalSteps,
  accent = 'coral',
  showBack = true,
  showProgress = true,
}: GameShellProps) {
  const accentColors = {
    coral: 'bg-coral',
    sage: 'bg-sage',
    amber: 'bg-amber',
  }

  const percent =
    showProgress && currentStep !== undefined && totalSteps
      ? Math.min((currentStep / totalSteps) * 100, 100)
      : 0

  return (
    <div className="min-h-dvh flex flex-col bg-cream safe-top safe-bottom">
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-sm px-4 pt-4 pb-3">
        <div className="flex items-center gap-3 mb-3">
          {showBack && (
            <Link to="/" className="shrink-0">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-cream-dark text-plum"
              >
                ←
              </motion.div>
            </Link>
          )}
          <h1 className="font-display text-lg text-plum truncate flex-1">{title}</h1>
        </div>

        {showProgress && totalSteps !== undefined && (
          <div className="h-1.5 bg-cream-dark rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${accentColors[accent]}`}
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        )}
      </header>

      <main className="flex-1 px-4 py-6 overflow-y-auto no-select">
        {children}
      </main>
    </div>
  )
}
