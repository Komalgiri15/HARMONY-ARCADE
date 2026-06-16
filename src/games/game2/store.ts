import type { DayResult, DayRitualInput, Game2Profile, Game2State, MovementType } from './types'

const STORAGE_KEY = 'hormone-harmony-habit-tracker-v1'

function todayISO(): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}

function defaultInput(): DayRitualInput {
  return {
    sleep: { bedTime: null, wakeTime: null },
    sunlight: null,
    movement: null,
    foodSeeds: null,
    stress: { level: 3, mindfulness: null },
  }
}

function makeEmptyDays(): DayResult[] {
  const base = new Date()
  base.setHours(0, 0, 0, 0)
  const startISO = base.toISOString()

  return Array.from({ length: 7 }, (_, i) => ({
    dayIndex: i,
    dateISO: startISO,
    sealed: false,
    points: 0,
    weakestHabit: null,
    input: defaultInput(),
  }))
}

export function loadGame2State(): Game2State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Game2State
  } catch {
    // ignore
  }

  return {
    version: 1,
    startedAtISO: todayISO(),
    profile: null,
    days: makeEmptyDays(),
  }
}

export function saveGame2State(state: Game2State): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function setProfile(profile: Game2Profile): Game2State {
  const state = loadGame2State()
  const next = { ...state, profile }
  saveGame2State(next)
  return next
}

export function updateDayInput(dayIndex: number, updater: (prev: DayRitualInput) => DayRitualInput): Game2State {
  const state = loadGame2State()
  const days = state.days.map((d) =>
    d.dayIndex === dayIndex ? { ...d, input: updater(d.input) } : d,
  )
  const next = { ...state, days }
  saveGame2State(next)
  return next
}

export function sealDay(dayIndex: number): Game2State {
  const state = loadGame2State()
  const day = state.days[dayIndex]
  const scored = scoreDay(day.input)

  const days = state.days.map((d) =>
    d.dayIndex === dayIndex
      ? { ...d, sealed: true, points: scored.points, weakestHabit: scored.weakestHabit }
      : d,
  )

  const next = { ...state, days }
  saveGame2State(next)
  return next
}

export function resetGame2(): void {
  localStorage.removeItem(STORAGE_KEY)
}

function parseTimeToMinutes(t: string): number {
  const [hh, mm] = t.split(':').map(Number)
  return hh * 60 + mm
}

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x))
}

function distanceMinutes(a: number, b: number) {
  return Math.abs(a - b)
}

export function scoreDay(input: DayRitualInput): { points: number; weakestHabit: keyof DayRitualInput } {
  const scores: Record<keyof DayRitualInput, number> = {
    sleep: 0,
    sunlight: 0,
    movement: 0,
    foodSeeds: 0,
    stress: 0,
  }

  // Sleep: ideal 22:00–06:00
  if (input.sleep.bedTime && input.sleep.wakeTime) {
    const bed = parseTimeToMinutes(input.sleep.bedTime)
    const wake = parseTimeToMinutes(input.sleep.wakeTime)
    const idealBed = 22 * 60
    const idealWake = 6 * 60

    const bedDist = distanceMinutes(bed, idealBed)
    const wakeDist = distanceMinutes(wake, idealWake)
    const bedScore = clamp01(1 - bedDist / 180) // within 3h
    const wakeScore = clamp01(1 - wakeDist / 180)

    // Duration (handle overnight wrap)
    const dur = wake >= bed ? wake - bed : wake + 24 * 60 - bed
    const durScore = clamp01(1 - Math.abs(dur - 8 * 60) / 240) // within 4h range

    scores.sleep = Math.round((bedScore * 0.35 + wakeScore * 0.35 + durScore * 0.3) * 100)
  }

  // Sunlight: yes/no
  if (input.sunlight !== null) scores.sunlight = input.sunlight ? 100 : 0

  // Movement
  if (input.movement) {
    const map: Record<MovementType, number> = {
      strength: 100,
      yoga: 85,
      walk: 75,
      rest: 55,
      none: 0,
    }
    scores.movement = map[input.movement]
  }

  // Food seeds
  if (input.foodSeeds) scores.foodSeeds = Math.round((input.foodSeeds / 5) * 100)

  // Stress: lower level better + mindfulness helps
  if (input.stress.level) {
    const base = 100 - (input.stress.level - 1) * 20 // 1->100, 5->20
    const mindfulBonus = input.stress.mindfulness ? 10 : 0
    scores.stress = Math.max(0, Math.min(100, base + mindfulBonus))
  }

  const points = Math.round(
    (scores.sleep * 0.28 +
      scores.sunlight * 0.18 +
      scores.movement * 0.18 +
      scores.foodSeeds * 0.18 +
      scores.stress * 0.18),
  )

  const weakestHabit = (Object.keys(scores) as (keyof DayRitualInput)[]).reduce(
    (minK, k) => (scores[k] < scores[minK] ? k : minK),
    'sleep',
  )

  return { points, weakestHabit }
}

