export interface MythCard {
  id: string
  myth: string
  answer: boolean // true = TRUE, false = FALSE
  explanation: string
  sourceTag: string
}

export type Verdict = 'correct' | 'wrong' | 'timeout'

export interface MythResult {
  id: string
  picked: boolean | null // null = timeout
  correct: boolean
  card: MythCard
}

export interface Game3State {
  phase: 'intro' | 'play' | 'reveal' | 'end'
  index: number
  deck: MythCard[]
  active: MythCard | null
  remaining: number
  secondsLeft: number
  isFlipping: boolean
  lastVerdict: Verdict | null
  streak: number
  multiplier: 1 | 1.5 | 2
  score: number
  correctCount: number
  results: MythResult[]
}

