export type MovementType = 'strength' | 'yoga' | 'walk' | 'rest' | 'none'

export interface SleepInput {
  bedTime: string | null // "22:00"
  wakeTime: string | null // "06:00"
}

export interface StressInput {
  level: 1 | 2 | 3 | 4 | 5
  mindfulness: boolean | null
}

export interface DayRitualInput {
  sleep: SleepInput
  sunlight: boolean | null
  movement: MovementType | null
  foodSeeds: 1 | 2 | 3 | 4 | 5 | null
  stress: StressInput
}

export interface DayResult {
  dayIndex: number // 0..6
  dateISO: string // day start date
  sealed: boolean
  points: number
  weakestHabit: keyof DayRitualInput | null
  input: DayRitualInput
}

export interface Game2Profile {
  name: string
  whyHere: 'energy' | 'sleep' | 'mood' | 'weight' | 'hot-flashes' | 'strength' | 'curiosity'
  biggestStruggle: 'stress' | 'sleep' | 'consistency' | 'food-cravings' | 'low-energy'
}

export interface Game2State {
  version: 1
  startedAtISO: string
  profile: Game2Profile | null
  days: DayResult[]
}

export type Game2Screen = 'onboarding' | 'home' | 'ritual' | 'sealed' | 'lesson' | 'reveal'

