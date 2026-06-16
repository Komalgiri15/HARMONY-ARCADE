import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

export function DeckStack({
  remaining,
  shuffleAnimated = false,
  launch = false,
}: {
  remaining: number
  shuffleAnimated?: boolean
  launch?: boolean
}) {
  const layers = Math.min(6, Math.max(1, Math.ceil(remaining / 2)))
  const [front, setFront] = useState(0)

  useEffect(() => {
    if (!shuffleAnimated) return
    const id = window.setInterval(() => setFront((f) => (f + 1) % Math.max(1, layers)), 650)
    return () => window.clearInterval(id)
  }, [shuffleAnimated, layers])

  const order = useMemo(() => {
    // order[0] is the current front card index
    return Array.from({ length: layers }, (_, k) => (front + k) % layers)
  }, [front, layers])

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-56 h-72 [perspective:900px]">
        {Array.from({ length: layers }).map((_, rawIndex) => {
          // position 0 = front, last = back
          const pos = order.indexOf(rawIndex)
          void layers

          const baseX = pos * -3
          const baseY = pos * 4
          const baseRotZ = -6
          const baseRotX = 12

          // When this card becomes the new back, give it a clear "send to back" motion.
          const isMovingToBack = shuffleAnimated && rawIndex === front
          const isLaunchingTop = launch && pos === 0
          const toBackX = (layers - 1) * -3
          const toBackY = (layers - 1) * 4

          return (
            <motion.div
              key={rawIndex}
              className="absolute inset-0 rounded-3xl bg-white border-2 border-plum/10 shadow-card"
              style={{ zIndex: 100 - pos }}
              initial={false}
              animate={{
                // launch: top card springs upward like it's being drawn
                ...(isLaunchingTop
                  ? {
                      x: [baseX, baseX - 10, baseX],
                      y: [baseY, baseY - 80, baseY],
                      rotateZ: [baseRotZ, baseRotZ + 4, baseRotZ],
                      rotateX: [baseRotX, 0, baseRotX],
                      scale: [1, 1.03, 1],
                    }
                  : {}),
                x: isMovingToBack ? [baseX, baseX + 64, toBackX] : baseX,
                y: isMovingToBack ? [baseY, baseY - 20, toBackY] : baseY,
                rotateZ: isMovingToBack ? [baseRotZ, baseRotZ + 14, baseRotZ - 2] : baseRotZ,
                rotateX: isMovingToBack ? [baseRotX, baseRotX + 10, baseRotX] : baseRotX,
                opacity: 1 - pos * 0.07,
              }}
              transition={{
                duration: isLaunchingTop ? 0.75 : isMovingToBack ? 0.62 : 0.38,
                ease: isLaunchingTop ? [0.18, 0.9, 0.2, 1] : isMovingToBack ? [0.2, 0.9, 0.2, 1] : 'easeOut',
              }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/90 to-cream" />
              <div className="absolute inset-0 rounded-3xl border border-amber/35" />
              <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-10 select-none">
                ?
              </div>
              <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)' }} />
            </motion.div>
          )
        })}
      </div>
      <p className="text-sm text-plum-light mt-3">{remaining} myths remaining</p>
    </div>
  )
}

