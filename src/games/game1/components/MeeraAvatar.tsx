import { useState } from 'react'
import { motion } from 'framer-motion'
import type { MeeraMood } from '../types'

interface MeeraAvatarProps {
  mood: MeeraMood
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-28 h-28',
}

const imageSizes = {
  sm: 48,
  md: 64,
  lg: 112,
}

const moodLabels: Record<MeeraMood, string> = {
  happy: 'Meera feeling happy',
  tired: 'Meera feeling tired',
  anxious: 'Meera feeling anxious',
  calm: 'Meera feeling calm',
  neutral: 'Meera',
}

function avatarSrc(mood: MeeraMood): string {
  // User-provided filenames in `public/assets/`
  const map: Record<MeeraMood, string> = {
    happy: '/assets/meera_happy.png',
    anxious: '/assets/meera.anxious.png',
    calm: '/assets/meera.clam.png',
    tired: '/assets/meera.tried.png',
    neutral: '/assets/meera.clam.png',
  }
  return map[mood]
}

const moodConfig: Record<MeeraMood, { eyes: string; mouth: string; blush: boolean; brows: string }> = {
  happy: { eyes: '◠ ◠', mouth: '‿', blush: true, brows: 'relaxed' },
  tired: { eyes: '− −', mouth: '⌢', blush: false, brows: 'droopy' },
  anxious: { eyes: '● ●', mouth: '⌢', blush: true, brows: 'worried' },
  calm: { eyes: '◡ ◡', mouth: '‿', blush: false, brows: 'relaxed' },
  neutral: { eyes: '• •', mouth: '—', blush: false, brows: 'relaxed' },
}

function FallbackAvatar({ mood, size }: { mood: MeeraMood; size: 'sm' | 'md' | 'lg' }) {
  const config = moodConfig[mood]

  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-coral-light to-coral shadow-soft flex items-center justify-center overflow-hidden border-2 border-white relative`}>
      <div className="absolute -top-1 left-0 right-0 h-1/2 bg-plum/80 rounded-t-full" />
      <div className="relative z-10 flex flex-col items-center justify-center pt-1">
        <div className="flex gap-2 mb-0.5">
          <span className={`text-[5px] md:text-[6px] text-plum ${config.brows === 'worried' ? 'rotate-12' : config.brows === 'droopy' ? '-rotate-12' : ''}`}>⌒</span>
          <span className={`text-[5px] md:text-[6px] text-plum ${config.brows === 'worried' ? '-rotate-12' : config.brows === 'droopy' ? 'rotate-12' : ''}`}>⌒</span>
        </div>
        <div className="flex gap-1.5 text-[7px] text-plum font-bold">
          {config.eyes.split(' ').map((eye, i) => (
            <span key={i}>{eye}</span>
          ))}
        </div>
        <span className="text-[8px] text-plum">{config.mouth}</span>
        {config.blush && (
          <>
            <div className="absolute left-1 top-1/2 w-1.5 h-1 bg-coral/30 rounded-full" />
            <div className="absolute right-1 top-1/2 w-1.5 h-1 bg-coral/30 rounded-full" />
          </>
        )}
      </div>
    </div>
  )
}

export function MeeraAvatar({ mood, size = 'md' }: MeeraAvatarProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const px = imageSizes[size]

  return (
    <motion.div
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className={`${sizes[size]} relative shrink-0`}
    >
      {!imgFailed ? (
        <img
          src={avatarSrc(mood)}
          alt={moodLabels[mood]}
          width={px}
          height={px}
          onError={() => setImgFailed(true)}
          className={`${sizes[size]} rounded-full object-cover border-2 border-white shadow-soft`}
        />
      ) : (
        <FallbackAvatar mood={mood} size={size} />
      )}
    </motion.div>
  )
}
