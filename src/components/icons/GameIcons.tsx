import { LuFlower2, LuSearch, LuSprout, LuSunrise } from 'react-icons/lu'
import type { GameId } from '../../types/game'

const gameIconMap = {
  game1: LuSunrise,
  game2: LuSprout,
  game3: LuSearch,
} as const

export function GameIcon({
  id,
  className = 'w-7 h-7',
}: {
  id: GameId
  className?: string
}) {
  const Icon = gameIconMap[id]
  return <Icon className={className} aria-hidden />
}

export function CourseFlowerIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <LuFlower2 className={className} aria-hidden />
}
