import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Choice } from '../types'
import { MeeraActionSprite } from './MeeraActionSprite'

interface ChoiceCardsProps {
  choices: Choice[]
  onSelect: (choice: Choice) => void
  disabled?: boolean
}

const natureTints: Record<Choice['nature'], string> = {
  harmonizer: 'from-sage/20 to-sky-50/60 border-sage/30',
  disruptor: 'from-coral/15 to-rose-50/50 border-coral/25',
  neutral: 'from-lavender/15 to-cream border-lavender/25',
}

export function ChoiceCards({ choices, onSelect, disabled }: ChoiceCardsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = (choice: Choice) => {
    if (disabled || selectedId) return
    setSelectedId(choice.id)
    setTimeout(() => onSelect(choice), 900)
  }

  return (
    <div>
      <p className="text-sm font-medium text-plum-light mb-3">
        What does Meera do?
      </p>

      <div className="grid grid-cols-2 gap-2.5">
        <AnimatePresence mode="popLayout">
          {choices.map((choice, i) => {
            const isSelected = selectedId === choice.id
            const isHidden = selectedId !== null && !isSelected
            const isThirdOfThree = choices.length === 3 && i === 2
            const spanClass = isThirdOfThree && !isSelected
              ? 'col-span-2 max-w-[calc(50%-0.3125rem)] mx-auto w-full'
              : isSelected
                ? 'col-span-2'
                : ''

            return (
              <motion.button
                key={choice.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                animate={
                  isHidden
                    ? { opacity: 0, scale: 0.75, y: -8 }
                    : isSelected
                      ? { opacity: 1, scale: 1.01, y: 0 }
                      : { opacity: 1, scale: 1, y: 0 }
                }
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26, delay: i * 0.06 }}
                onClick={() => handleSelect(choice)}
                disabled={disabled || selectedId !== null}
                className={`
                  ${spanClass}
                  text-center rounded-2xl border-2 overflow-hidden
                  bg-gradient-to-br ${natureTints[choice.nature]}
                  shadow-soft transition-shadow
                  ${isSelected ? 'ring-4 ring-coral/25 shadow-card' : 'hover:shadow-card active:scale-[0.98]'}
                  ${disabled || selectedId ? 'pointer-events-none' : 'cursor-pointer'}
                `}
              >
                <div className="p-2.5 pb-2">
                  <MeeraActionSprite action={choice.action} variant="inline" />
                  <p className="font-semibold text-plum text-[12px] leading-snug px-0.5 mt-2">
                    {choice.label}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
