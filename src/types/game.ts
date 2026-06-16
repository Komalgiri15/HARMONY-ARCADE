export type GameId = 'game1' | 'game2' | 'game3'

export type GameStatus = 'locked' | 'available' | 'in-progress' | 'completed'

export interface GameMeta {
  id: GameId
  title: string
  subtitle: string
  description: string
  accentColor: string
  estimatedMinutes: number
  tags: string[]
}

export interface GameProgress {
  gameId: GameId
  status: GameStatus
  currentStep: number
  totalSteps: number
  score?: number
  completedAt?: string
}

export interface FeedbackState {
  type: 'success' | 'error' | 'info' | 'celebration'
  message: string
  submessage?: string
}

export interface GameState {
  progress: GameProgress
  feedback: FeedbackState | null
}
