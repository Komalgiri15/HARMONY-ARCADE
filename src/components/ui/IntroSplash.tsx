import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { LuSparkles } from 'react-icons/lu'

export function IntroSplash({
  title,
  subtitle,
  caption,
  icon,
  accent = 'coral',
  primaryLabel,
  onPrimary,
  secondary,
}: {
  title: string
  subtitle: string
  caption?: string
  icon?: ReactNode
  accent?: 'coral' | 'sage' | 'amber' | 'lavender'
  primaryLabel: string
  onPrimary: () => void
  secondary?: ReactNode
}) {
  const accentMap = {
    coral: { blob: 'bg-coral/20', glow: 'shadow-[0_0_40px_rgba(224,122,95,0.25)]', text: 'text-coral' },
    sage: { blob: 'bg-sage/20', glow: 'shadow-[0_0_40px_rgba(129,160,139,0.22)]', text: 'text-sage' },
    amber: { blob: 'bg-amber/25', glow: 'shadow-[0_0_40px_rgba(242,184,75,0.22)]', text: 'text-amber' },
    lavender: { blob: 'bg-lavender/25', glow: 'shadow-[0_0_40px_rgba(201,184,217,0.22)]', text: 'text-plum' },
  }[accent]

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-plum/10 bg-gradient-to-br from-white via-cream to-cream-dark shadow-card p-6 sm:p-8">
      {/* soft animated blobs */}
      <motion.div
        className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl ${accentMap.blob}`}
        animate={{ scale: [1, 1.08, 1], x: [0, -8, 0], y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl bg-lavender/20"
        animate={{ scale: [1, 1.05, 1], x: [0, 10, 0], y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/70 border border-plum/10 shadow-soft">
            {icon ?? <LuSparkles className="w-7 h-7 text-amber" aria-hidden />}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="text-sm font-semibold uppercase tracking-wider text-plum-light"
        >
          {subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 18, delay: 0.12 }}
          className={`font-game text-5xl sm:text-6xl leading-none mt-3 ${accentMap.glow}`}
          style={{
            WebkitTextStroke: '2px rgba(61,44,62,0.18)',
            textShadow: '0 10px 24px rgba(61,44,62,0.10)',
          }}
        >
          <span className="text-plum">{title}</span>
        </motion.h1>

        {caption && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-plum-light mt-3 leading-relaxed max-w-xl mx-auto"
          >
            {caption}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mt-7 max-w-md mx-auto space-y-3"
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onPrimary}
            className={`w-full py-4 rounded-2xl font-semibold text-white shadow-soft ${accent === 'sage' ? 'bg-sage hover:bg-sage-dark' : accent === 'amber' ? 'bg-amber hover:brightness-95' : 'bg-coral hover:bg-coral-dark'}`}
          >
            {primaryLabel} →
          </motion.button>
          {secondary}
        </motion.div>

        <motion.div
          className="absolute top-6 right-6 text-xs font-semibold px-3 py-1 rounded-full bg-white/70 border border-plum/10 text-plum-light"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Tap to begin
        </motion.div>
      </div>
    </div>
  )
}

