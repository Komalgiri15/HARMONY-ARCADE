export type MeeraMood = 'happy' | 'tired' | 'anxious' | 'calm' | 'neutral'

export type ChoiceNature = 'harmonizer' | 'disruptor' | 'neutral'

export type GamePhase = 'intro' | 'scene' | 'consequence' | 'chest' | 'ending'

export type MomentId = 'morning' | 'afternoon' | 'evening'

export type CharacterAction = 'idle' | 'phone' | 'walk' | 'coffee' | 'eat' | 'stretch' | 'drink'

export interface Choice {
  id: string
  icon: string
  label: string
  action: CharacterAction
  nature: ChoiceNature
  meterDelta: number
  consequence: string
  hormone: string
  deepDive: string
}

export interface LessonCard {
  id: string
  moment: MomentId
  title: string
  summary: string
  icon: string
}

export interface Moment {
  id: MomentId
  label: string
  timeLabel: string
  mood: MeeraMood
  narration: string[]
  background: {
    gradient: string
    accent: string
  }
  choices: Choice[]
  lesson: LessonCard
}

export interface Game1State {
  phase: GamePhase
  momentIndex: number
  meter: number
  selectedChoice: Choice | null
  collectedLessons: LessonCard[]
  goodStreak: number
  pulseKey: number
}

export type BadgeId = 'harmony-hero' | 'on-the-path' | 'body-needs-you'

export interface Badge {
  id: BadgeId
  title: string
  description: string
  emoji: string
}
