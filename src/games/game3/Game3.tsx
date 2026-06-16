import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { DeckStack } from './components/DeckStack'
import { MythFlipCard } from './components/MythFlipCard'
import { ScoreBar } from './components/ScoreBar'
import { StreakBanner } from './components/StreakBanner'
import { MissedDeck } from './components/MissedDeck'
import { ArcadeOverlay } from './components/ArcadeOverlay'
import { EdgeFlash } from './components/EdgeFlash'
import type { Game3State, MythResult, Verdict } from './types'
import { MYTHS, shuffle } from './data'

function makeInitialState(): Game3State {
  const deck = shuffle(MYTHS)
  return {
    phase: 'intro',
    index: 0,
    deck,
    active: null,
    remaining: deck.length,
    secondsLeft: 10,
    isFlipping: false,
    lastVerdict: null,
    streak: 0,
    multiplier: 1,
    score: 0,
    correctCount: 0,
    results: [],
  }
}

function computeMultiplier(streak: number): 1 | 1.5 | 2 {
  if (streak >= 6) return 2
  if (streak >= 3) return 1.5
  return 1
}

export function Game3() {
  const [state, setState] = useState<Game3State>(() => makeInitialState())
  const [picked, setPicked] = useState<boolean | null>(null)
  const [overlay, setOverlay] = useState<'ready' | 'bust' | null>(null)
  const [launchIntro, setLaunchIntro] = useState(false)
  const [displayScore, setDisplayScore] = useState(0)
  const timerRef = useRef<number | null>(null)

  const active = state.active

  const missed = useMemo(() => state.results.filter((r) => !r.correct), [state.results])

  const start = () => {
    setLaunchIntro(true)
    setOverlay('ready')
    window.setTimeout(() => setOverlay('bust'), 650)
    window.setTimeout(() => setOverlay(null), 1150)
    setPicked(null)
    setState((prev) => {
      const card = prev.deck[0] ?? null
      return {
        ...prev,
        phase: 'play',
        index: 0,
        active: card,
        remaining: prev.deck.length,
        secondsLeft: 10,
        isFlipping: false,
        lastVerdict: null,
        streak: 0,
        multiplier: 1,
        score: 0,
        correctCount: 0,
        results: [],
      }
    })
  }

  const reset = () => {
    setPicked(null)
    setDisplayScore(0)
    setState(makeInitialState())
  }

  const stopTimer = () => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = null
  }

  const nextCard = () => {
    setPicked(null)
    setState((prev) => {
      const nextIndex = prev.index + 1
      const next = prev.deck[nextIndex] ?? null
      if (!next) {
        return { ...prev, phase: 'end', active: null, remaining: 0, secondsLeft: 0, isFlipping: false }
      }
      return {
        ...prev,
        phase: 'play',
        active: next,
        index: nextIndex,
        remaining: prev.deck.length - nextIndex,
        secondsLeft: 10,
        isFlipping: false,
        lastVerdict: null,
      }
    })
  }

  const answer = (value: boolean, isTimeout = false) => {
    if (!active) return
    if (state.isFlipping) return

    const correct = value === active.answer && !isTimeout
    const verdict: Verdict = isTimeout ? 'timeout' : correct ? 'correct' : 'wrong'
    const nextStreak = correct ? state.streak + 1 : 0
    const multiplier = computeMultiplier(nextStreak)
    const pointsGained = correct ? Math.round(100 * multiplier) : 0

    const result: MythResult = {
      id: active.id,
      picked: isTimeout ? null : value,
      correct,
      card: active,
    }

    setPicked(isTimeout ? null : value)
    setState((prev) => ({
      ...prev,
      phase: 'reveal',
      isFlipping: true,
      lastVerdict: verdict,
      streak: nextStreak,
      multiplier,
      score: prev.score + pointsGained,
      correctCount: prev.correctCount + (correct ? 1 : 0),
      results: [...prev.results, result],
    }))

    stopTimer()
  }

  // Timer loop while playing
  useEffect(() => {
    stopTimer()
    if (state.phase !== 'play' || !state.active) return

    timerRef.current = window.setInterval(() => {
      setState((prev) => {
        if (prev.phase !== 'play') return prev
        if (prev.secondsLeft <= 1) {
          // trigger timeout in effect below
          return { ...prev, secondsLeft: 0 }
        }
        return { ...prev, secondsLeft: prev.secondsLeft - 1 }
      })
    }, 1000)

    return () => stopTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase, state.index])

  // Timeout handling
  useEffect(() => {
    if (state.phase === 'play' && state.active && state.secondsLeft === 0) {
      answer(false, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.secondsLeft, state.phase, state.active])

  // Score tick-up on end screen
  useEffect(() => {
    if (state.phase !== 'end') return
    const target = state.score
    setDisplayScore(0)
    const startAt = performance.now()
    const duration = 900
    let raf = 0

    const step = (t: number) => {
      const p = Math.min(1, (t - startAt) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplayScore(Math.round(target * eased))
      if (p < 1) raf = window.requestAnimationFrame(step)
    }

    raf = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(raf)
  }, [state.phase, state.score])

  const badge =
    state.correctCount >= 10 ? { title: 'Myth Buster Expert', tone: 'gold' as const } :
    state.correctCount >= 6 ? { title: 'Getting There', tone: 'silver' as const } :
    { title: 'Keep Learning', tone: 'bronze' as const }

  const badgeColors = {
    gold: 'from-amber to-amber-light border-amber/40',
    silver: 'from-cream-dark to-white border-plum/10',
    bronze: 'from-coral/25 to-cream border-coral/25',
  }

  const summaryMissed = missed.slice(0, 3)

  return (
    <div className="min-h-dvh bg-cream safe-top safe-bottom">
      <ArcadeOverlay show={overlay === 'ready'} text="READY!" tone="amber" />
      <ArcadeOverlay show={overlay === 'bust'} text="BUST!" tone="coral" />
      <EdgeFlash verdict={state.lastVerdict} />
      <StreakBanner
        show={state.streak > 0 && state.streak % 3 === 0 && state.phase !== 'intro'}
        multiplier={state.multiplier}
        streak={state.streak}
      />

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
            <h1 className="font-display text-lg text-plum truncate">Menopause Myth Busters</h1>
            <p className="text-xs text-plum-light">Flip fast · Bust myths</p>
          </div>
          <Button variant="ghost" onClick={reset}>Reset</Button>
        </div>
        <div className="mt-3">
          <ScoreBar correct={state.correctCount} />
        </div>
      </header>

      <main className="px-4 py-5">
        <AnimatePresence mode="wait">
          {state.phase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <div className="max-w-2xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <div className="text-6xl">🕵️‍♀️</div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 18, delay: 0.08 }}
                  className="font-game text-5xl sm:text-6xl leading-none text-plum"
                  style={{
                    WebkitTextStroke: '2px rgba(61,44,62,0.18)',
                    textShadow: '0 10px 24px rgba(61,44,62,0.10)',
                  }}
                >
                  Myth Busters
                </motion.h2>
                <p className="text-plum-light mt-3 leading-relaxed">
                  Flip through 12 myths. Decide <span className="font-semibold text-plum">TRUE</span> or <span className="font-semibold text-plum">FALSE</span> before the timer runs out.
                </p>
                <div className="mt-8">
                  <DeckStack remaining={12} shuffleAnimated launch={launchIntro} />
                </div>
                <div className="mt-6 max-w-sm mx-auto">
                  <Button fullWidth size="lg" onClick={start}>Start Busting →</Button>
                </div>
              </div>
            </motion.div>
          )}

          {(state.phase === 'play' || state.phase === 'reveal') && active && (
            <motion.div key="play" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <MythFlipCard
                card={active}
                isFlipped={state.phase === 'reveal'}
                verdict={state.lastVerdict}
                picked={picked}
                secondsLeft={state.phase === 'play' ? state.secondsLeft : 0}
                onPick={(v) => answer(v, false)}
                disabled={state.phase !== 'play'}
              />

              {state.phase === 'reveal' && (
                <div className="mt-5 max-w-2xl mx-auto">
                  <Button fullWidth size="lg" onClick={nextCard}>
                    Next myth →
                  </Button>
                </div>
              )}

              {state.phase === 'play' && (
                <div className="mt-4 flex justify-center">
                  <div className="text-xs text-plum-light">
                    Multiplier: <span className="font-bold text-plum">{state.multiplier}×</span> · Score: <span className="font-bold text-plum">{state.score}</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {state.phase === 'end' && (
            <motion.div key="end" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <motion.div
                      initial={{ rotate: -18, scale: 0.72, y: 14, opacity: 0 }}
                      animate={{ rotate: [-18, 6, -2], scale: [0.72, 1.08, 1], y: [14, -6, 0], opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                      className="relative"
                    >
                      <ResultsFanBackdrop />
                      <div className={`relative px-8 py-6 rounded-3xl bg-gradient-to-br ${badgeColors[badge.tone]} border-2 shadow-card`}>
                        <motion.div
                          className="absolute -inset-2 rounded-[1.8rem] blur-xl"
                          style={{
                            background:
                              badge.tone === 'gold'
                                ? 'rgba(242,184,75,0.22)'
                                : badge.tone === 'silver'
                                  ? 'rgba(61,44,62,0.10)'
                                  : 'rgba(224,122,95,0.18)',
                          }}
                          animate={{ opacity: [0.35, 0.7, 0.35] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      <p className="text-xs uppercase tracking-wider text-plum-light">Badge</p>
                      <p className="font-display text-3xl text-plum mt-2">{badge.title}</p>
                      <p className="text-sm text-plum-light mt-2">
                        {state.correctCount}/12 correct · Score <span className="font-bold text-plum tabular-nums">{displayScore}</span>
                      </p>
                      </div>
                    </motion.div>
                  </div>

                  {badge.tone === 'gold' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center mb-4"
                    >
                      <ConfettiBurst />
                      <Button variant="secondary" onClick={() => window.print()}>Share</Button>
                    </motion.div>
                  )}

                  {badge.tone === 'silver' && summaryMissed.length > 0 && (
                    <div className="rounded-3xl bg-white/70 border border-plum/10 p-5 shadow-soft text-left mt-4">
                      <p className="text-sm font-semibold text-plum">3 most important missed myths</p>
                      <ol className="mt-3 space-y-2 text-sm text-plum-light list-decimal list-inside">
                        {summaryMissed.map((m) => (
                          <li key={m.id}>{m.card.myth}</li>
                        ))}
                      </ol>
                      <div className="mt-4">
                        <Button onClick={reset}>Replay</Button>
                      </div>
                    </div>
                  )}

                  {badge.tone === 'bronze' && (
                    <div className="rounded-3xl bg-white/70 border border-plum/10 p-5 shadow-soft text-left mt-4">
                      <p className="text-sm font-semibold text-plum">Keep going — you’re building clarity.</p>
                      <p className="text-sm text-plum-light mt-2">
                        The myths you missed are below, with fuller explanations. Use them as your “next best steps.”
                      </p>
                      <div className="mt-4">
                        <Button onClick={reset}>Play again</Button>
                      </div>
                    </div>
                  )}
                </motion.div>

                <div className="mt-7">
                  <MissedDeck missed={missed} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

function ConfettiBurst() {
  return (
    <div className="relative h-14 mb-2 pointer-events-none">
      {Array.from({ length: 18 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 w-2 h-2 rounded-sm"
          style={{
            backgroundColor: i % 3 === 0 ? 'rgba(242,184,75,0.95)' : i % 3 === 1 ? 'rgba(224,122,95,0.9)' : 'rgba(129,160,139,0.9)',
          }}
          initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
          animate={{
            x: (Math.random() - 0.5) * 240,
            y: -20 - Math.random() * 90,
            opacity: [0, 1, 0],
            rotate: 180 + Math.random() * 180,
          }}
          transition={{ duration: 1.2, delay: 0.05 * i, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function ResultsFanBackdrop() {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
      <div className="relative w-[360px] h-[220px]">
        {Array.from({ length: 7 }, (_, i) => {
          const offset = i - 3
          const rot = offset * 8
          const x = offset * 18
          const y = Math.abs(offset) * 6 + 16
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 w-[180px] h-[120px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/65 border border-plum/10 shadow-soft"
              initial={{ opacity: 0, rotate: rot - 10, x, y: y + 10, scale: 0.98 }}
              animate={{ opacity: 1, rotate: rot, x, y, scale: 1 }}
              transition={{ delay: 0.05 * i, type: 'spring', stiffness: 220, damping: 20 }}
              style={{ filter: 'blur(0.2px)' }}
            />
          )
        })}
      </div>
    </div>
  )
}
