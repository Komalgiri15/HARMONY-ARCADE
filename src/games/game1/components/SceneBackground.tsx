import type { MomentId } from '../types'

interface SceneBackgroundProps {
  momentId: MomentId
  accent: string
}

export function SceneBackground({ momentId, accent }: SceneBackgroundProps) {
  if (momentId === 'morning') return <MorningBedroom accent={accent} />
  if (momentId === 'afternoon') return <AfternoonOffice accent={accent} />
  return <EveningBedroom accent={accent} />
}

function MorningBedroom({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="morningSky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE8C8" />
          <stop offset="45%" stopColor="#FFD4A8" />
          <stop offset="100%" stopColor="#F5C4C4" />
        </linearGradient>
        <linearGradient id="morningWindow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF8E7" />
          <stop offset="100%" stopColor="#F2D9A0" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF4C2" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F2B84B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="320" fill="url(#morningSky)" />

      {/* Wall */}
      <rect x="0" y="120" width="400" height="200" fill="#F5EBE0" />

      {/* Window with dawn */}
      <rect x="240" y="40" width="120" height="100" rx="4" fill="#8B7355" />
      <rect x="248" y="48" width="104" height="84" fill="url(#morningWindow)" />
      <circle cx="300" cy="75" r="28" fill="url(#sunGlow)" />
      <circle cx="300" cy="75" r="14" fill="#F2B84B" opacity="0.8" />

      {/* Curtains */}
      <path d="M240 40 Q260 80 240 140" fill="#E8D5C4" opacity="0.7" />
      <path d="M360 40 Q340 80 360 140" fill="#E8D5C4" opacity="0.7" />

      {/* Bed */}
      <rect x="20" y="200" width="180" height="90" rx="8" fill="#D4C4B0" />
      <rect x="28" y="208" width="164" height="50" rx="6" fill="#FFF8F0" />
      <ellipse cx="50" cy="228" rx="22" ry="14" fill="#F5EBE0" />
      <rect x="20" y="185" width="50" height="30" rx="6" fill="#C9B8A8" />

      {/* Nightstand + glowing phone */}
      <rect x="210" y="230" width="50" height="60" rx="4" fill="#C4A882" />
      <rect x="218" y="218" width="34" height="58" rx="6" fill="#2D2D2D" />
      <rect x="222" y="224" width="26" height="46" rx="2" fill="#4A6FA5" opacity="0.9" />
      {/* Notification glow */}
      <circle cx="248" cy="222" r="8" fill={accent} opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="248" cy="222" r="4" fill="#FF6B6B" />

      {/* Alarm clock */}
      <circle cx="235" cy="210" r="10" fill="#E07A5F" />
      <line x1="235" y1="210" x2="235" y2="205" stroke="#3D2C3E" strokeWidth="1.5" />
      <line x1="235" y1="210" x2="239" y2="212" stroke="#3D2C3E" strokeWidth="1.5" />

      {/* Floor shadow */}
      <ellipse cx="200" cy="305" rx="160" ry="12" fill="#3D2C3E" opacity="0.06" />
    </svg>
  )
}

function AfternoonOffice({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="afternoonWall" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8F0F5" />
          <stop offset="100%" stopColor="#D4E4ED" />
        </linearGradient>
        <linearGradient id="windowLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9E6" />
          <stop offset="100%" stopColor="#B8D4E8" />
        </linearGradient>
      </defs>

      <rect width="400" height="320" fill="url(#afternoonWall)" />

      {/* Large office window */}
      <rect x="280" y="30" width="100" height="140" fill="#7A9BB5" />
      <rect x="288" y="38" width="84" height="124" fill="url(#windowLight)" />
      <line x1="330" y1="38" x2="330" y2="162" stroke="#7A9BB5" strokeWidth="2" />
      <line x1="288" y1="100" x2="372" y2="100" stroke="#7A9BB5" strokeWidth="2" />

      {/* City hint */}
      <rect x="295" y="110" width="12" height="40" fill="#A8BCC9" opacity="0.5" />
      <rect x="315" y="95" width="10" height="55" fill="#A8BCC9" opacity="0.5" />
      <rect x="335" y="105" width="14" height="45" fill="#A8BCC9" opacity="0.5" />

      {/* Desk */}
      <rect x="30" y="210" width="200" height="12" rx="2" fill="#B8956A" />
      <rect x="50" y="222" width="8" height="70" fill="#A08050" />
      <rect x="200" y="222" width="8" height="70" fill="#A08050" />

      {/* Laptop */}
      <rect x="80" y="175" width="90" height="55" rx="4" fill="#4A5568" />
      <rect x="86" y="181" width="78" height="42" rx="2" fill="#63B3ED" opacity="0.5" />
      <rect x="95" y="230" width="70" height="4" rx="1" fill="#718096" />

      {/* Coffee mug on desk */}
      <rect x="190" y="195" width="24" height="20" rx="3" fill="#FFF" stroke="#D4C4B0" strokeWidth="1.5" />
      <path d="M214 198 Q222 200 222 208 Q222 216 214 214" fill="none" stroke="#D4C4B0" strokeWidth="2" />
      <ellipse cx="202" cy="195" rx="12" ry="3" fill="#8B6914" opacity="0.4" />

      {/* Break room microwave hint */}
      <rect x="300" y="200" width="70" height="50" rx="4" fill="#C4C4C4" />
      <rect x="308" y="208" width="54" height="34" rx="2" fill="#2D3748" opacity="0.3" />
      <circle cx="355" cy="225" r="4" fill={accent} opacity="0.7" />

      {/* Fluorescent light */}
      <rect x="120" y="20" width="80" height="8" rx="4" fill="#FFF" opacity="0.6" />
      <ellipse cx="160" cy="60" rx="100" ry="40" fill="#FFF" opacity="0.08" />

      <ellipse cx="200" cy="305" rx="140" ry="10" fill="#3D2C3E" opacity="0.05" />
    </svg>
  )
}

function EveningBedroom({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="eveningSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2D1F4E" />
          <stop offset="40%" stopColor="#4A3A6B" />
          <stop offset="100%" stopColor="#6B5B8A" />
        </linearGradient>
        <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F2B84B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F2B84B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="laptopGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#63B3ED" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#63B3ED" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="320" fill="url(#eveningSky)" />

      {/* Stars */}
      {[
        [50, 40], [120, 25], [200, 50], [350, 35], [300, 60],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#FFF" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Moon */}
      <circle cx="340" cy="55" r="18" fill="#F5F0E8" opacity="0.9" />
      <circle cx="348" cy="50" r="16" fill="#4A3A6B" />

      {/* Wall */}
      <rect x="0" y="100" width="400" height="220" fill="#3D2C4E" />

      {/* Bed */}
      <rect x="30" y="210" width="160" height="80" rx="8" fill="#4A3A5C" />
      <rect x="38" y="218" width="144" height="45" rx="6" fill="#5C4A6D" />
      <ellipse cx="55" cy="238" rx="20" ry="12" fill="#6B5B7A" />

      {/* Bedside lamp */}
      <circle cx="220" cy="200" r="50" fill="url(#lampGlow)" />
      <rect x="215" y="195" width="10" height="50" fill="#8B7355" />
      <path d="M200 195 Q225 170 250 195 Z" fill="#F2B84B" opacity="0.8" />

      {/* Laptop on bed */}
      <circle cx="120" cy="250" r="60" fill="url(#laptopGlow)" />
      <rect x="90" y="235" width="70" height="45" rx="4" fill="#2D3748" />
      <rect x="96" y="241" width="58" height="32" rx="2" fill="#4A6FA5" opacity="0.7" />
      {/* To-do list lines on screen */}
      <line x1="102" y1="250" x2="148" y2="250" stroke="#FFF" strokeWidth="1" opacity="0.5" />
      <line x1="102" y1="258" x2="140" y2="258" stroke="#FFF" strokeWidth="1" opacity="0.4" />
      <line x1="102" y1="266" x2="145" y2="266" stroke="#FFF" strokeWidth="1" opacity="0.3" />

      {/* Lavender accent plant */}
      <rect x="320" y="250" width="30" height="40" rx="4" fill="#C9B8D9" opacity="0.3" />
      <ellipse cx="335" cy="245" rx="18" ry="12" fill={accent} opacity="0.4" />

      <ellipse cx="200" cy="305" rx="150" ry="10" fill="#000" opacity="0.15" />
    </svg>
  )
}
