import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HormoneMeter } from './components/HormoneMeter'
import { SceneCard } from './components/SceneCard'
import { ChoiceCards } from './components/ChoiceCards'
import { ConsequenceView } from './components/ConsequenceView'
import { LessonChest } from './components/LessonChest'
import { IntroScreen } from './components/IntroScreen'
import { EndScreen } from './components/EndScreen'
import { useMeerasDay } from './hooks/useMeerasDay'
import { getBadge } from './data/scenes'
import { useGameProgress } from '../../hooks/useGameProgress'
import { useEffect } from 'react'

const MOMENT_LABELS = ['🌅 Morning', '☀️ Afternoon', '🌙 Evening']

export function Game1() {
  const game = useMeerasDay()
  const { state, currentMoment, currentStep, totalSteps, startGame, selectChoice, continueFromConsequence, collectLesson, replay } = game
  const { setStep, setTotalSteps, advance } = useGameProgress('game1')

  useEffect(() => {
    setTotalSteps(totalSteps)
  }, [totalSteps, setTotalSteps])

  useEffect(() => {
    if (state.phase !== 'intro') {
      setStep(currentStep)
    }
  }, [currentStep, state.phase, setStep])

  useEffect(() => {
    if (state.phase === 'ending') {
      advance(totalSteps - 1)
    }
  }, [state.phase, advance, totalSteps])

  const handleReplay = () => {
    replay()
  }

  const showMeter = state.phase !== 'intro'

  return (
    <div className="min-h-dvh flex flex-col bg-cream safe-top safe-bottom">
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm px-4 pt-4 pb-3 shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <Link to="/" className="shrink-0">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-cream-dark text-plum"
            >
              ←
            </motion.div>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-lg text-plum truncate">Meera&apos;s Day</h1>
            {state.phase !== 'intro' && state.phase !== 'ending' && (
              <p className="text-xs text-plum-light">
                {MOMENT_LABELS[state.momentIndex]}
              </p>
            )}
          </div>
          {state.goodStreak >= 2 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-2 py-1 rounded-full bg-sage/20 text-sage text-xs font-bold"
            >
              🔥 {state.goodStreak} streak
            </motion.span>
          )}
        </div>

        {showMeter && (
          <HormoneMeter value={state.meter} pulseKey={state.pulseKey} />
        )}
      </header>

      <main className="flex-1 px-4 py-3 overflow-y-auto no-select">
        <AnimatePresence mode="wait">
          {state.phase === 'intro' && (
            <motion.div key="intro" exit={{ opacity: 0, x: -20 }}>
              <IntroScreen onStart={startGame} />
            </motion.div>
          )}

          {state.phase === 'scene' && currentMoment && (
            <motion.div
              key={`scene-${state.momentIndex}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="w-full"
            >
              {/* Desktop: true 3-column grid | Mobile: stacked */}
              <div className="grid gap-6 xl:gap-8 lg:grid-cols-2 items-start">
                <div className="min-w-0">
                  <SceneCard moment={currentMoment} />
                </div>

                <div className="min-w-0">
                  <ChoiceCards
                    key={`choices-${state.momentIndex}`}
                    choices={currentMoment.choices}
                    onSelect={selectChoice}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {state.phase === 'consequence' && state.selectedChoice && (
            <motion.div
              key={`consequence-${state.momentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              <ConsequenceView
                choice={state.selectedChoice}
                meterDelta={state.selectedChoice.meterDelta}
                onContinue={continueFromConsequence}
              />
            </motion.div>
          )}

          {state.phase === 'chest' && currentMoment && (
            <motion.div
              key={`chest-${state.momentIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <LessonChest
                lesson={currentMoment.lesson}
                momentLabel={currentMoment.label}
                onCollect={collectLesson}
              />
            </motion.div>
          )}

          {state.phase === 'ending' && (
            <motion.div
              key="ending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <EndScreen
                meter={state.meter}
                badge={getBadge(state.meter)}
                lessons={state.collectedLessons}
                onReplay={handleReplay}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
