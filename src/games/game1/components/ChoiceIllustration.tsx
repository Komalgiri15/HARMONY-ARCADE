import type { ReactNode } from 'react'

interface ChoiceIllustrationProps {
  choiceId: string
  className?: string
}

export function ChoiceIllustration({ choiceId, className = '' }: ChoiceIllustrationProps) {
  return (
    <div className={`w-full aspect-[4/3] flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px]" aria-hidden>
        {illustrations[choiceId] ?? <DefaultIcon />}
      </svg>
    </div>
  )
}

function DefaultIcon() {
  return <circle cx="60" cy="45" r="20" fill="#E8D5C4" />
}

const illustrations: Record<string, ReactNode> = {
  'morning-phone': (
    <>
      {/* Woman silhouette checking phone in bed */}
      <ellipse cx="60" cy="78" rx="40" ry="6" fill="#3D2C3E" opacity="0.08" />
      <ellipse cx="45" cy="55" rx="14" ry="16" fill="#E07A5F" opacity="0.85" />
      <path d="M32 55 Q28 48 35 42 Q42 38 48 42" fill="#3D2C3E" />
      <rect x="55" y="48" width="22" height="36" rx="4" fill="#2D2D2D" />
      <rect x="58" y="52" width="16" height="28" rx="2" fill="#4A90D9" />
      <circle cx="71" cy="50" r="3" fill="#FF6B6B" />
      <line x1="62" y1="58" x2="70" y2="58" stroke="#FFF" strokeWidth="1" opacity="0.5" />
      <line x1="62" y1="63" x2="68" y2="63" stroke="#FFF" strokeWidth="1" opacity="0.4" />
      <line x1="62" y1="68" x2="70" y2="68" stroke="#FFF" strokeWidth="1" opacity="0.3" />
    </>
  ),
  'morning-sun': (
    <>
      <circle cx="60" cy="30" r="18" fill="#F2B84B" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1={60 + Math.cos((deg * Math.PI) / 180) * 22}
          y1={30 + Math.sin((deg * Math.PI) / 180) * 22}
          x2={60 + Math.cos((deg * Math.PI) / 180) * 28}
          y2={30 + Math.sin((deg * Math.PI) / 180) * 28}
          stroke="#F2B84B"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
      <ellipse cx="60" cy="68" rx="20" ry="8" fill="#81A08B" opacity="0.3" />
      <circle cx="60" cy="58" r="10" fill="#E07A5F" opacity="0.7" />
      <path d="M48 58 Q44 50 50 46 Q56 44 60 48" fill="#3D2C3E" />
      <path d="M55 75 L50 85 M65 75 L70 85" stroke="#81A08B" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  'morning-coffee': (
    <>
      {/* Plastic cup with coffee */}
      <rect x="38" y="35" width="44" height="50" rx="4" fill="#E8E8E8" stroke="#B0B0B0" strokeWidth="1.5" />
      <rect x="42" y="40" width="36" height="8" rx="2" fill="#FF6B6B" opacity="0.3" />
      <text x="60" y="48" textAnchor="middle" fontSize="6" fill="#999">BPA</text>
      <ellipse cx="60" cy="38" rx="18" ry="5" fill="#6B4226" opacity="0.6" />
      <path d="M82 42 Q92 44 92 54 Q92 62 82 60" fill="none" stroke="#B0B0B0" strokeWidth="2" />
      <path d="M45 30 Q60 20 75 30" fill="none" stroke="#D4C4B0" strokeWidth="2" opacity="0.6" />
      <circle cx="52" cy="28" r="3" fill="#D4C4B0" opacity="0.4" />
      <circle cx="68" cy="26" r="4" fill="#D4C4B0" opacity="0.4" />
      {/* Ceramic mug comparison faded */}
      <rect x="12" y="50" width="20" height="24" rx="3" fill="#FFF" stroke="#C4A882" strokeWidth="1" opacity="0.4" />
      <path d="M32 54 Q38 56 38 62 Q38 68 32 66" fill="none" stroke="#C4A882" strokeWidth="1" opacity="0.4" />
    </>
  ),
  'afternoon-pastry': (
    <>
      <rect x="35" y="50" width="50" height="30" rx="4" fill="#C4A882" />
      <ellipse cx="60" cy="48" rx="22" ry="14" fill="#F4A896" />
      <circle cx="52" cy="44" r="4" fill="#E07A5F" opacity="0.6" />
      <path d="M48 40 Q60 32 72 40" fill="#F2B84B" />
      <text x="60" y="72" textAnchor="middle" fontSize="7" fill="#D45B5B">sugar spike</text>
    </>
  ),
  'afternoon-walk': (
    <>
      <rect x="0" y="60" width="120" height="30" fill="#A8C4B0" opacity="0.3" />
      <circle cx="90" cy="25" r="12" fill="#F2B84B" opacity="0.8" />
      <circle cx="55" cy="50" r="9" fill="#E07A5F" />
      <path d="M44 50 Q38 42 44 36 Q50 32 55 36" fill="#3D2C3E" />
      <path d="M48 58 L42 75 M58 58 L64 72 M52 58 L48 75" stroke="#3D2C3E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M55 45 L65 40" stroke="#E07A5F" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  'afternoon-desk': (
    <>
      <rect x="20" y="55" width="80" height="8" rx="2" fill="#B8956A" />
      <rect x="45" y="30" width="30" height="22" rx="2" fill="#4A5568" />
      <rect x="48" y="33" width="24" height="16" fill="#63B3ED" opacity="0.4" />
      <circle cx="35" cy="48" r="8" fill="#E07A5F" />
      <ellipse cx="35" cy="52" rx="10" ry="6" fill="#E07A5F" opacity="0.5" />
      <rect x="55" y="48" width="14" height="10" rx="2" fill="#F4A896" opacity="0.6" />
    </>
  ),
  'evening-scroll': (
    <>
      <rect x="25" y="55" width="70" height="25" rx="6" fill="#5C4A6D" />
      <circle cx="40" cy="48" r="8" fill="#E07A5F" opacity="0.8" />
      <path d="M30 48 Q26 42 32 38 Q38 36 42 40" fill="#3D2C3E" />
      <rect x="55" y="42" width="18" height="30" rx="3" fill="#2D2D2D" />
      <rect x="58" y="46" width="12" height="22" rx="1" fill="#4A90D9" opacity="0.7" />
      <circle cx="60" cy="30" r="15" fill="#4A90D9" opacity="0.15" />
      <text x="64" y="58" fontSize="5" fill="#FFF" opacity="0.5">10 min...</text>
    </>
  ),
  'evening-stretch': (
    <>
      <circle cx="60" cy="25" r="10" fill="#F2B84B" opacity="0.2" />
      <circle cx="60" cy="42" r="9" fill="#E07A5F" />
      <path d="M48 42 Q42 36 48 30 Q54 28 58 32" fill="#3D2C3E" />
      <path d="M50 50 L35 35 M70 50 L85 35 M55 50 L50 70 M65 50 L72 68" stroke="#E07A5F" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="95" cy="65" rx="12" ry="8" fill="#E8E8E8" opacity="0.5" />
      <path d="M88 60 Q95 50 102 60 L102 72 Q95 78 88 72 Z" fill="#D4C4B0" opacity="0.4" />
    </>
  ),
  'evening-wine': (
    <>
      <path d="M48 30 L52 55 L68 55 L72 30 Z" fill="#C9B8D9" opacity="0.5" />
      <ellipse cx="60" cy="30" rx="12" ry="4" fill="#8B0045" opacity="0.6" />
      <rect x="56" y="55" width="8" height="12" fill="#C9B8D9" opacity="0.5" />
      <ellipse cx="60" cy="68" rx="10" ry="3" fill="#C9B8D9" opacity="0.5" />
      <text x="60" y="82" textAnchor="middle" fontSize="6" fill="#D45B5B">no dinner</text>
      <line x1="25" y1="50" x2="40" y2="50" stroke="#999" strokeWidth="1" strokeDasharray="3" opacity="0.4" />
      <text x="22" y="48" fontSize="5" fill="#999" opacity="0.5">🍽</text>
    </>
  ),
}
