import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GameIcon } from '../components/icons/GameIcons'
import { Logo } from '../components/branding/Logo'
import { COURSE_SUBTITLE, COURSE_TITLE, GAMES } from '../data/course'
import type { GameId } from '../types/game'

const SEEN_KEY = 'hh_seen_intro_v1'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function Start() {
  const nav = useNavigate()
  const [seed] = useState(() => Math.floor(Math.random() * 100000))

  const miniTokens = useMemo(() => {
    // stable-ish random positions across a session
    const rng = (i: number) => {
      const x = Math.sin((seed + i) * 999) * 10000
      return x - Math.floor(x)
    }
    return GAMES.slice(0, 3).map((g, i) => ({
      id: g.id as GameId,
      label: g.title,
      x: clamp((rng(i + 1) - 0.5) * 220, -120, 120),
      y: clamp((rng(i + 9) - 0.5) * 120, -70, 70),
      r: (rng(i + 17) - 0.5) * 18,
      d: 0.08 * i,
      tone: (g.accentColor as 'coral' | 'sage' | 'amber') ?? 'coral',
    }))
  }, [seed])

  const enter = () => {
    localStorage.setItem(SEEN_KEY, '1')
    nav('/hub')
  }

  const bgUrl = '/assets/start-hero.svg'

  return (
    <div className="relative min-h-dvh safe-top safe-bottom overflow-hidden">
      {/* Full-bleed background image (drop your image at public/assets/start-hero.png) */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundColor: 'rgb(253, 244, 238)',
        }}
      />

      {/* No overlay layers on top of background (per request) */}

      {/* Brand mark — top corner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="absolute top-6 left-6 sm:top-8 sm:left-10 z-10"
      >
        <Logo size="md" showSubtitle />
      </motion.div>

      <div className="relative mx-auto w-full max-w-6xl min-h-dvh px-6 sm:px-10 py-10 flex items-center">
        <div className="w-full max-w-xl pt-16 sm:pt-20">
          <span className="sr-only">{COURSE_TITLE}</span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.06 }}
            className="font-game text-6xl sm:text-7xl leading-none mt-5 text-plum"
            style={{
              WebkitTextStroke: '2px rgba(61,44,62,0.18)',
              textShadow: '0 18px 44px rgba(61,44,62,0.26)',
            }}
          >
            HARMONY ARCADE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.45 }}
            className="text-plum-light mt-3 leading-relaxed max-w-lg"
          >
            {COURSE_SUBTITLE}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.45 }}
            className="mt-8 flex items-center gap-3 flex-wrap"
          >
            {miniTokens.map((t) => (
              <motion.div
                key={t.id}
                className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/55 border border-plum/10 shadow-soft"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: t.d }}
              >
                <GameIcon id={t.id} className="w-5 h-5 text-plum" />
                <span className="text-xs font-semibold text-plum-light">{t.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.5 }}
            className="mt-10"
          >
            <motion.button
              onClick={enter}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.96, rotate: -0.4 }}
              className="relative w-full max-w-sm py-5 rounded-3xl font-game text-4xl text-white bg-coral shadow-card overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_42%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.25),transparent_46%)]"
                animate={{ opacity: [0.65, 1, 0.65] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -inset-3 blur-xl"
                style={{ background: 'rgba(224,122,95,0.38)' }}
                animate={{ opacity: [0.35, 0.85, 0.35] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="relative">START</span>
            </motion.button>

            <motion.div
              className="mt-3 text-xs font-semibold px-3 py-1 rounded-full bg-white/55 border border-plum/10 text-plum-light inline-block"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
            >
              Tap to begin
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

