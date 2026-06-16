import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { StaggerChildren, StaggerItem } from '../components/ui/PageTransition'
import { Card } from '../components/ui/Card'
import { GameIcon } from '../components/icons/GameIcons'
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
          {GAMES.map((game) => {
            const gameProgress = progress[game.id]
            const status = gameProgress.status

            return (
              <StaggerItem key={game.id}>
                <Link to={`/game/${game.id}`} className="block">
                  <Card accent={game.accentColor as 'coral' | 'sage' | 'amber'}>
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${accentBg[game.accentColor]}`}
                      >
                        <GameIcon id={game.id} className={`w-7 h-7 ${accentIcon[game.accentColor]}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-display text-lg text-plum">{game.title}</h3>
                          <span className={`text-sm font-semibold shrink-0 ${statusColors[status]}`}>
                            {statusLabels[status]}
                          </span>
                        </div>
                        <p className="text-sm text-plum-light mt-0.5">{game.subtitle}</p>
                        <p className="text-sm text-plum-light/80 mt-2 leading-relaxed">
                          {game.description}
                        </p>
                        {status === 'in-progress' && (
                          <div className="mt-3">
                            <div className="h-1.5 bg-cream-dark rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full bg-${game.accentColor}`}
                                style={{
                                  width: `${(gameProgress.currentStep / gameProgress.totalSteps) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <p className="text-xs text-plum-light/60 mt-2">
                          ~{game.estimatedMinutes} min
                        </p>
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
