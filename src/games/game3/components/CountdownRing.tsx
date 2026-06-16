import { motion } from 'framer-motion'

export function CountdownRing({ secondsLeft, totalSeconds }: { secondsLeft: number; totalSeconds: number }) {
  const r = 46
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, secondsLeft / totalSeconds))
  const dash = c * pct

  const color =
    secondsLeft > 6 ? 'rgba(129,160,139,0.9)' : secondsLeft > 3 ? 'rgba(242,184,75,0.95)' : 'rgba(212,91,91,0.95)'

  return (
    <svg
      viewBox="0 0 120 120"
      className="absolute -top-4 -right-4 w-[72px] h-[72px] z-30 drop-shadow-[0_12px_18px_rgba(61,44,62,0.18)]"
      aria-label={`Time left: ${secondsLeft} seconds`}
      role="img"
    >
      {/* Solid base so it stays visible on light cards */}
      <circle cx="60" cy="60" r={r} fill="rgba(255,255,255,0.95)" stroke="rgba(61,44,62,0.14)" strokeWidth="10" />
      <motion.circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c}`}
        transform="rotate(-90 60 60)"
        initial={false}
        animate={{ strokeDasharray: `${dash} ${c}` }}
        transition={{ duration: 0.25, ease: 'linear' }}
      />
      <text x="60" y="68" textAnchor="middle" fontSize="24" fontFamily="DM Sans" fill="rgba(61,44,62,0.92)" fontWeight="700">
        {secondsLeft}
      </text>
    </svg>
  )
}

