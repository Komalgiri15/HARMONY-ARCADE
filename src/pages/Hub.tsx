import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { StaggerChildren, StaggerItem } from '../components/ui/PageTransition'
import { Card } from '../components/ui/Card'
import { GameIcon } from '../components/icons/GameIcons'
import { GameCardArt } from '../components/hub/GameCardArt'
import { Logo } from '../components/branding/Logo'
import { GAMES, COURSE_TITLE, COURSE_SUBTITLE } from '../data/course'
import { getAllProgress } from '../utils/progressStorage'
import type { GameStatus } from '../types/game'

const statusLabels: Record<GameStatus, string> = {
  locked: 'Locked',
  available: 'Start',
  'in-progress': 'Continue',
  completed: 'Play again',
}

const statusColors: Record<GameStatus, string> = {
  locked: 'text-plum-light',
  available: 'text-coral',
  'in-progress': 'text-amber',
  completed: 'text-sage',
}

const accentBg: Record<string, string> = {
  coral: 'bg-coral/10',
  sage: 'bg-sage/10',
  amber: 'bg-amber/10',
}

const accentIcon: Record<string, string> = {
  coral: 'text-coral',
  sage: 'text-sage',
  amber: 'text-amber',
}

const accentFill: Record<string, string> = {
  coral: 'bg-coral',
  sage: 'bg-sage',
  amber: 'bg-amber',
}

const accentChip: Record<string, string> = {
  coral: 'bg-coral/10 text-coral',
  sage: 'bg-sage/10 text-sage-dark',
  amber: 'bg-amber/15 text-amber',
}

const accentCta: Record<string, string> = {
  coral: 'bg-coral text-white',
  sage: 'bg-sage text-white',
  amber: 'bg-amber text-plum',
}

export function Hub() {
  const progress = getAllProgress()

  return (
    <div className="min-h-dvh safe-top safe-bottom">
      {/* Hero */}
      <div className="relative px-6 pt-10 pb-8 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-sage/10 rounded-full blur-3xl" />

        <StaggerChildren className="relative">
          <StaggerItem>
            <div className="mb-4">
              <Logo size="md" showSubtitle />
            </div>
            <h1 className="font-display text-3xl text-plum leading-tight mb-2">
              {COURSE_TITLE}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="text-plum-light text-base leading-relaxed">
              {COURSE_SUBTITLE}
            </p>
          </StaggerItem>
        </StaggerChildren>
      </div>

      {/* Games */}
      <div className="px-4 pb-8">
        <h2 className="font-display text-xl text-plum mb-4 px-2">Your Games</h2>

        <StaggerChildren className="space-y-4">
          {GAMES.map((game, index) => {
            const gameProgress = progress[game.id]
            const status = gameProgress.status
            const progressPct =
              gameProgress.totalSteps > 0
                ? Math.round((gameProgress.currentStep / gameProgress.totalSteps) * 100)
                : 0

            return (
              <StaggerItem key={game.id}>
                <Link to={`/game/${game.id}`} className="block group">
                  <Card
                    accent={game.accentColor as 'coral' | 'sage' | 'amber'}
                    className="p-0 overflow-hidden transition-shadow duration-200 group-hover:shadow-card"
                  >
                    <div className="relative min-h-[148px] overflow-hidden bg-white">
                      {/* Art bleeds under content via soft gradient */}
                      <div className="absolute inset-y-0 left-0 w-[52%] pointer-events-none">
                        <GameCardArt id={game.id} accent={game.accentColor} className="h-full" />
                      </div>
                      <div
                        className="absolute inset-y-0 left-[28%] right-0 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(to right, transparent 0%, rgba(255,253,250,0.55) 28%, #ffffff 58%, #ffffff 100%)',
                        }}
                      />

                      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-white/80 border border-plum/10 text-[10px] font-bold text-plum-light shadow-soft">
                        0{index + 1}
                      </div>

                      <div className="relative flex min-h-[148px]">
                        <div className="w-[38%] shrink-0" aria-hidden />
                        <div className="flex-1 py-3 pr-3.5 pl-1 flex flex-col min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${accentBg[game.accentColor]}`}>
                              <GameIcon id={game.id} className={`w-4 h-4 ${accentIcon[game.accentColor]}`} />
                            </div>
                            <span className={`text-[11px] font-semibold shrink-0 ${statusColors[status]}`}>
                              {statusLabels[status]}
                            </span>
                          </div>

                          <h3 className="font-display text-[15px] text-plum mt-1.5 leading-snug">{game.title}</h3>
                          <p className="text-[11px] text-plum-light">{game.subtitle}</p>
                          <p className="text-[11px] text-plum-light/80 mt-1 leading-relaxed line-clamp-2">
                            {game.description}
                          </p>

                          <div className="flex flex-wrap gap-1 mt-2">
                            {game.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${accentChip[game.accentColor]}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {status === 'in-progress' && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-[9px] text-plum-light mb-0.5">
                                <span>Progress</span>
                                <span>{progressPct}%</span>
                              </div>
                              <div className="h-1 bg-cream-dark rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full rounded-full ${accentFill[game.accentColor]}`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progressPct}%` }}
                                  transition={{ duration: 0.6, ease: 'easeOut' }}
                                />
                              </div>
                            </div>
                          )}

                          <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                            <span className="text-[10px] text-plum-light/70 font-medium">
                              ~{game.estimatedMinutes} min
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${accentCta[game.accentColor]} shadow-soft`}
                            >
                              {statusLabels[status]}
                              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerChildren>
      </div>
    </div>
  )
}
