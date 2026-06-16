import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { loadGame2State, resetGame2, sealDay, setProfile, updateDayInput } from './store'
import type { Game2Screen, MovementType } from './types'
import { WHY_OPTIONS, STRUGGLE_OPTIONS } from './questions'
import { Garden } from './components/Garden'
import { StreakTimeline } from './components/StreakTimeline'
import { RitualTileSleep } from './components/tiles/RitualTileSleep'
import { RitualTileSunlight } from './components/tiles/RitualTileSunlight'
import { RitualTileMovement } from './components/tiles/RitualTileMovement'
import { RitualTileFood } from './components/tiles/RitualTileFood'
import { RitualTileStress } from './components/tiles/RitualTileStress'
import { MicroLessonScroll } from './components/MicroLessonScroll'
import { RadarReveal } from './components/RadarReveal'

function allFilled(input: ReturnType<typeof loadGame2State>['days'][number]['input']) {
  return (
    input.sleep.bedTime &&
    input.sleep.wakeTime &&
    input.sunlight !== null &&
    input.movement !== null &&
    input.foodSeeds !== null &&
    input.stress.mindfulness !== null
  )
}

export function Game2() {
  const [screen, setScreen] = useState<Game2Screen>('onboarding')
  const [state, setState] = useState(() => loadGame2State())
  const [dayIndex, setDayIndex] = useState(0)

  useEffect(() => {
    const s = loadGame2State()
    setState(s)
    setScreen(s.profile ? 'home' : 'onboarding')
  }, [])

  const currentDay = state.days[dayIndex]
  const completedDays = useMemo(() => state.days.filter((d) => d.sealed).length, [state.days])
  const weekDone = completedDays >= 7

  const canSeal = allFilled(currentDay.input) && !currentDay.sealed

  const totalScore = useMemo(
    () => state.days.reduce((sum, d) => sum + (d.sealed ? d.points : 0), 0),
    [state.days],
  )

  const startFresh = () => {
    resetGame2()
    const s = loadGame2State()
    setState(s)
    setScreen('onboarding')
    setDayIndex(0)
  }

  return (
    <div className="min-h-dvh bg-cream safe-top safe-bottom">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <Link to="/hub" className="shrink-0">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-cream-dark text-plum"
            >
              ←
            </motion.div>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-lg text-plum truncate">Hormone Harmony Habit Tracker</h1>
            <p className="text-xs text-plum-light">7-day ritual · Harmony Garden</p>
          </div>
          <button
            onClick={startFresh}
            className="text-xs font-semibold text-plum-light hover:text-plum"
            title="Reset"
          >
            Reset
          </button>
        </div>
      </header>

      <main className="px-4 py-4">
        <AnimatePresence mode="wait">
          {screen === 'onboarding' && (
            <motion.div key="onboarding" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <Onboarding
                onDone={(profile) => {
                  const next = setProfile(profile)
                  setState(next)
                  setScreen('home')
                }}
              />
            </motion.div>
          )}

          {screen === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <Garden dayCount={completedDays} />

              <div className="mt-4">
                <StreakTimeline
                  days={state.days}
                  onPickDay={(i) => setDayIndex(i)}
                  selectedDay={dayIndex}
                />
              </div>

              <div className="mt-5">
                <Card accent="sage">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-plum">Today’s Ritual</p>
                      <p className="text-xs text-plum-light mt-1">
                        {weekDone
                          ? 'Your week is ready.'
                          : currentDay.sealed
                            ? `Sealed · ${currentDay.points} pts`
                            : '5 quick tiles · ~2 minutes'}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <Button
                        variant="success"
                        onClick={() => {
                          if (weekDone) setScreen('reveal')
                          else setScreen('ritual')
                        }}
                      >
                        {weekDone ? 'Reveal' : currentDay.sealed ? 'View' : 'Start'}
                      </Button>
                    </div>
                  </div>

                  {!weekDone && !currentDay.sealed && (
                    <div className="mt-4">
                      <Button
                        fullWidth
                        size="lg"
                        variant="success"
                        onClick={() => setScreen('ritual')}
                      >
                        Begin Today’s Ritual →
                      </Button>
                      <p className="text-xs text-plum-light/70 text-center mt-2">
                        No penalties if you miss a day — the garden just pauses.
                      </p>
                    </div>
                  )}
                </Card>
              </div>

              {weekDone && (
                <div className="mt-4">
                  <Button fullWidth variant="secondary" onClick={() => setScreen('reveal')}>
                    See your Week in Bloom →
                  </Button>
                </div>
              )}

              <div className="mt-6 text-center text-xs text-plum-light/70">
                {state.profile?.name ? `Hello, ${state.profile.name}.` : ' '}
              </div>
            </motion.div>
          )}

          {screen === 'ritual' && (
            <motion.div key="ritual" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-2xl text-plum">Today’s Ritual</h2>
                  <p className="text-sm text-plum-light">Fill all five tiles. Then seal the day.</p>
                </div>
                <Button variant="ghost" onClick={() => setScreen('home')}>
                  Close
                </Button>
              </div>

              <div className="space-y-3">
                <RitualTileSleep
                  value={currentDay.input.sleep}
                  onChange={(sleep) => {
                    const next = updateDayInput(dayIndex, (prev) => ({ ...prev, sleep }))
                    setState(next)
                  }}
                />

                <RitualTileSunlight
                  value={currentDay.input.sunlight}
                  onChange={(sunlight) => {
                    const next = updateDayInput(dayIndex, (prev) => ({ ...prev, sunlight }))
                    setState(next)
                  }}
                />

                <RitualTileMovement
                  value={currentDay.input.movement}
                  onChange={(movement: MovementType) => {
                    const next = updateDayInput(dayIndex, (prev) => ({ ...prev, movement }))
                    setState(next)
                  }}
                />

                <RitualTileFood
                  value={currentDay.input.foodSeeds}
                  onChange={(foodSeeds) => {
                    const next = updateDayInput(dayIndex, (prev) => ({ ...prev, foodSeeds }))
                    setState(next)
                  }}
                />

                <RitualTileStress
                  value={currentDay.input.stress}
                  onChange={(stress) => {
                    const next = updateDayInput(dayIndex, (prev) => ({ ...prev, stress }))
                    setState(next)
                  }}
                />
              </div>

              <div className="mt-5">
                <motion.div
                  animate={canSeal ? { boxShadow: ['0 0 0 0 rgba(129,160,139,0.0)', '0 0 0 14px rgba(129,160,139,0.18)', '0 0 0 0 rgba(129,160,139,0.0)'] } : {}}
                  transition={{ duration: 1.8, repeat: canSeal ? Infinity : 0 }}
                  className="rounded-2xl"
                >
                  <Button
                    fullWidth
                    size="lg"
                    variant={canSeal ? 'success' : 'secondary'}
                    disabled={!canSeal}
                    onClick={() => {
                      const next = sealDay(dayIndex)
                      setState(next)
                      setScreen('sealed')
                    }}
                  >
                    Seal Today’s Ritual
                  </Button>
                </motion.div>
                <p className="text-xs text-plum-light/70 text-center mt-2">
                  {canSeal ? 'Ready.' : 'Complete all tiles to seal.'}
                </p>
              </div>
            </motion.div>
          )}

          {screen === 'sealed' && (
            <motion.div key="sealed" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <SealScreen
                points={currentDay.points}
                onContinue={() => setScreen('lesson')}
              />
            </motion.div>
          )}

          {screen === 'lesson' && (
            <motion.div key="lesson" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <MicroLessonScroll
                weakestHabit={currentDay.weakestHabit}
                onDone={() => setScreen('home')}
              />
            </motion.div>
          )}

          {screen === 'reveal' && (
            <motion.div key="reveal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <RadarReveal
                days={state.days}
                totalScore={totalScore}
                onBack={() => setScreen('home')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

function Onboarding({ onDone }: { onDone: (profile: { name: string; whyHere: any; biggestStruggle: any }) => void }) {
  const [name, setName] = useState('')
  const [why, setWhy] = useState<string | null>(null)
  const [struggle, setStruggle] = useState<string | null>(null)

  const canContinue = why && struggle

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">🌿</div>
        <h2 className="font-game text-5xl leading-none text-plum">Harmony Garden</h2>
        <p className="text-plum-light mt-2">Quick setup — then you’re in.</p>
      </div>

      <Card accent="sage">
        <label className="block">
          <span className="text-sm font-semibold text-plum">Name (optional)</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mt-2 w-full px-4 py-3 rounded-2xl bg-white border-2 border-cream-dark focus:outline-none focus:border-sage"
          />
        </label>
      </Card>

      <div className="mt-4">
        <Card accent="sage">
          <p className="text-sm font-semibold text-plum mb-3">What are you hoping to feel more of?</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {WHY_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => setWhy(o.id)}
                className={`text-left px-4 py-3 rounded-2xl border-2 transition ${
                  why === o.id ? 'border-sage bg-sage/10' : 'border-cream-dark bg-white'
                }`}
              >
                <p className="font-semibold text-plum text-sm">{o.label}</p>
                {o.sub && <p className="text-xs text-plum-light mt-0.5">{o.sub}</p>}
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-4">
        <Card accent="sage">
          <p className="text-sm font-semibold text-plum mb-3">What feels hardest to stay consistent with?</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {STRUGGLE_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => setStruggle(o.id)}
                className={`text-left px-4 py-3 rounded-2xl border-2 transition ${
                  struggle === o.id ? 'border-sage bg-sage/10' : 'border-cream-dark bg-white'
                }`}
              >
                <p className="font-semibold text-plum text-sm">{o.label}</p>
                {o.sub && <p className="text-xs text-plum-light mt-0.5">{o.sub}</p>}
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 max-w-sm mx-auto">
        <Button
          fullWidth
          size="lg"
          variant={canContinue ? 'success' : 'secondary'}
          disabled={!canContinue}
          onClick={() =>
            onDone({
              name: name.trim() || 'Friend',
              whyHere: why,
              biggestStruggle: struggle,
            })
          }
        >
          Start →
        </Button>
      </div>
    </div>
  )
}

function SealScreen({ points, onContinue }: { points: number; onContinue: () => void }) {
  return (
    <div className="max-w-xl mx-auto text-center">
      <motion.div
        initial={{ rotateX: 0 }}
        animate={{ rotateX: [0, 18, 0] }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mx-auto w-full"
      >
        <Card accent="sage">
          <div className="flex items-center justify-center gap-3">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
              className="text-4xl"
            >
              🔖
            </motion.span>
            <div className="text-left">
              <p className="text-sm font-semibold text-plum">Sealed.</p>
              <p className="text-sm text-plum-light">Your ritual is saved.</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-5"
          >
            <p className="text-xs uppercase tracking-wider text-plum-light">Today</p>
            <p className="font-display text-5xl text-plum mt-1">{points}</p>
            <p className="text-sm text-plum-light">Harmony Points</p>
          </motion.div>
        </Card>
      </motion.div>

      <div className="mt-5 max-w-sm mx-auto">
        <Button fullWidth size="lg" onClick={onContinue}>
          Unfurl my micro-lesson →
        </Button>
      </div>
    </div>
  )
}
