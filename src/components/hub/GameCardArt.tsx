import type { GameId } from '../../types/game'

const palettes = {
  coral: { a: '#F5D4C8', b: '#E07A5F', c: '#F2D8A8', d: '#D97A67', e: '#F0D8E6' },
  sage: { a: '#DDEAE4', b: '#81A08B', c: '#AFCFC4', d: '#5E8A72', e: '#C9E4D4' },
  amber: { a: '#F8E8C8', b: '#F2B84B', c: '#E07A5F', d: '#C9B8D9', e: '#F4D48A' },
} as const

type Palette = { a: string; b: string; c: string; d: string; e: string }

/** Wide viewBox matches the narrow art column; meet keeps the full scene visible */
const VIEW_W = 240
const VIEW_H = 132

export function GameCardArt({
  id,
  accent,
  className = '',
}: {
  id: GameId
  accent: string
  className?: string
}) {
  const p = palettes[accent as keyof typeof palettes] ?? palettes.coral

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-full"
        preserveAspectRatio="xMinYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor={p.e} />
            <stop offset="60%" stopColor={p.a} />
            <stop offset="100%" stopColor="#FDF6F0" />
          </linearGradient>
          <radialGradient id={`glow-${id}`} cx="40%" cy="30%" r="50%">
            <stop offset="0%" stopColor={p.c} stopOpacity="0.45" />
            <stop offset="100%" stopColor={p.c} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`fade-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="68%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width={VIEW_W} height={VIEW_H} fill={`url(#bg-${id})`} />
        <rect width={VIEW_W} height={VIEW_H} fill={`url(#glow-${id})`} />
        {id === 'game1' && <Game1Art p={p} />}
        {id === 'game2' && <Game2Art p={p} />}
        {id === 'game3' && <Game3Art p={p} />}
        <rect width={VIEW_W} height={VIEW_H} fill={`url(#fade-${id})`} />
      </svg>
    </div>
  )
}

function Game1Art({ p }: { p: Palette }) {
  return (
    <g transform="translate(4 2) scale(0.9)">
      {/* Dawn window */}
      <rect x="128" y="8" width="72" height="48" rx="9" fill="white" opacity="0.5" />
      <rect x="133" y="13" width="62" height="38" rx="7" fill={p.c} opacity="0.28" />
      <circle cx="178" cy="22" r="10" fill={p.c}>
        <animate attributeName="r" values="9;11;9" dur="2.8s" repeatCount="indefinite" />
      </circle>

      {/* Bed */}
      <rect x="14" y="78" width="88" height="14" rx="7" fill="white" opacity="0.6" />
      <rect x="18" y="73" width="30" height="10" rx="5" fill={p.e} opacity="0.85" />
      <path d="M12 88 Q56 82 102 86 L102 94 Q56 98 12 92 Z" fill={p.b} opacity="0.12" />

      {/* Speech bubble */}
      <g transform="translate(78 28)">
        <g opacity="0.92">
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.85;1;0.85" dur="2.2s" repeatCount="indefinite" />
          <rect x="0" y="0" width="40" height="22" rx="10" fill="white" stroke={p.b} strokeWidth="1.2" />
          <path d="M10 22 L6 28 L18 22 Z" fill="white" stroke={p.b} strokeWidth="1.2" strokeLinejoin="round" />
          <rect x="10" y="22" width="8" height="2" fill="white" />
          <text x="10" y="15" fontSize="10" fill={p.d} fontFamily="sans-serif" fontWeight="700">
            Hey!
          </text>
        </g>
      </g>

      {/* Meera — waving hello */}
      <g transform="translate(58 86)">
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="2.4s" repeatCount="indefinite" />

        <path
          d="M0 -30 C-18 -30 -26 -20 -26 -4 C-26 8 -18 14 0 14 C18 14 26 8 26 -4 C26 -20 18 -30 0 -30 Z"
          fill="#3D2C3E"
        />
        <path d="M-22 -6 C-24 2 -17 8 -9 12 C-16 6 -19 0 -17 -8 Z" fill="#2B212C" opacity="0.92" />
        <path d="M22 -6 C24 2 17 8 9 12 C16 6 19 0 17 -8 Z" fill="#2B212C" opacity="0.92" />

        <circle cx="0" cy="-4" r="14" fill="#F2C9A0" />
        <path d="M-10 -12 Q-4 -15 -1 -12" stroke="#2B212C" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M1 -12 Q4 -15 10 -12" stroke="#2B212C" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="-4.5" cy="-6" r="2" fill="#2B212C" />
        <circle cx="4.5" cy="-6" r="2" fill="#2B212C" />
        <circle cx="-5.2" cy="-6.8" r="0.75" fill="#FFFFFF" opacity="0.9" />
        <circle cx="3.8" cy="-6.8" r="0.75" fill="#FFFFFF" opacity="0.9" />
        <circle cx="-10" cy="-1" r="3.5" fill="#E07A5F" opacity="0.14" />
        <circle cx="10" cy="-1" r="3.5" fill="#E07A5F" opacity="0.14" />
        <path d="M-6 3 Q0 7 6 3" stroke="#2B212C" strokeWidth="2" fill="none" strokeLinecap="round" />

        <rect x="-11" y="10" width="22" height="14" rx="7" fill={p.d} />

        {/* Left arm — relaxed at shoulder */}
        <g transform="translate(-11 11) rotate(28)">
          <rect x="-2" y="0" width="4" height="10" rx="2" fill="#F2C9A0" />
          <circle cx="0" cy="10.5" r="2.6" fill="#F2C9A0" />
        </g>

        {/* Right arm — wave from shoulder */}
        <g transform="translate(11 11)">
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-55 0 0; -95 0 0; -55 0 0"
              dur="0.75s"
              repeatCount="indefinite"
            />
            <rect x="-2" y="0" width="4" height="10" rx="2" fill="#F2C9A0" />
            <circle cx="0" cy="10.5" r="2.8" fill="#F2C9A0" stroke="#E8B896" strokeWidth="0.5" />
          </g>
        </g>

        <path d="M-11 22 Q0 16 11 22 L13 32 Q0 38 -13 32 Z" fill={p.b} opacity="0.82" />
        </g>
      </g>

      {/* Hormone meter */}
      <g transform="translate(16 14)" opacity="0.9">
        <rect x="0" y="0" width="44" height="8" rx="4" fill="white" opacity="0.7" />
        <rect x="2" y="2" width="20" height="4" rx="2" fill={p.b} opacity="0.8">
          <animate attributeName="width" values="16;24;18;16" dur="4s" repeatCount="indefinite" />
        </rect>
        <animateTransform attributeName="transform" type="translate" values="16 14;16 12.5;16 14" dur="3s" repeatCount="indefinite" />
      </g>

      <Sparkle cx={38} cy={34} color={p.c} delay={0} />
    </g>
  )
}

function Game2Art({ p }: { p: Palette }) {
  return (
    <g transform="translate(8 6) scale(0.88)">
      <ellipse cx="40" cy="28" rx="24" ry="12" fill="white" opacity="0.35">
        <animate attributeName="cx" values="40;44;40" dur="5s" repeatCount="indefinite" />
      </ellipse>

      {/* Garden ground */}
      <ellipse cx="110" cy="98" rx="78" ry="16" fill={p.d} opacity="0.2" />
      <path d="M36 98 C58 90 78 100 110 96 C142 92 162 98 184 94" stroke={p.d} strokeWidth="2" fill="none" opacity="0.35" />

      {/* Main plant — shorter so it fits */}
      <g transform="translate(110 98)">
        <line x1="0" y1="0" x2="0" y2="-38" stroke={p.d} strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="0" cy="-42" r="11" fill={p.b} opacity="0.7">
          <animate attributeName="r" values="10;12;10" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <ellipse cx="-14" cy="-28" rx="10" ry="6" fill={p.b} opacity="0.55" transform="rotate(-30)">
          <animateTransform attributeName="transform" type="rotate" values="-30 0 0;-22 0 0;-30 0 0" dur="3s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="14" cy="-28" rx="10" ry="6" fill={p.b} opacity="0.55" transform="rotate(30)">
          <animateTransform attributeName="transform" type="rotate" values="30 0 0;38 0 0;30 0 0" dur="3.2s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="-11" cy="-14" rx="8" ry="5" fill={p.c} opacity="0.65" transform="rotate(-40)" />
        <ellipse cx="11" cy="-14" rx="8" ry="5" fill={p.c} opacity="0.65" transform="rotate(40)" />
      </g>

      <g transform="translate(76 98)">
        <line x1="0" y1="0" x2="0" y2="-22" stroke={p.d} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="0" cy="-25" r="6.5" fill="#EDC4D0" opacity="0.75">
          <animate attributeName="cy" values="-25;-26.5;-25" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </g>
      <g transform="translate(144 98)">
        <line x1="0" y1="0" x2="0" y2="-20" stroke={p.d} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="0" cy="-23" r="6" fill={p.c} opacity="0.8">
          <animate attributeName="cy" values="-23;-24.5;-23" dur="3.1s" repeatCount="indefinite" />
        </circle>
      </g>

      <g transform="translate(18 16)">
        <rect x="0" y="0" width="42" height="26" rx="8" fill="white" opacity="0.7" />
        <text x="8" y="12" fontSize="6" fill={p.d} fontFamily="sans-serif" fontWeight="600">DAY</text>
        <text x="8" y="21" fontSize="9" fill={p.b} fontFamily="sans-serif" fontWeight="700">3</text>
        <animateTransform attributeName="transform" type="translate" values="18 16;18 14.5;18 16" dur="2.6s" repeatCount="indefinite" />
      </g>

      <g transform="translate(168 44)">
        <ellipse cx="-5" cy="0" rx="6" ry="4" fill={p.c} opacity="0.75">
          <animateTransform attributeName="transform" type="scale" values="1 1;0.4 1;1 1" dur="0.35s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="5" cy="0" rx="6" ry="4" fill={p.e} opacity="0.75">
          <animateTransform attributeName="transform" type="scale" values="1 1;0.4 1;1 1" dur="0.35s" repeatCount="indefinite" />
        </ellipse>
        <animateTransform attributeName="transform" type="translate" values="168 44;154 34;168 44" dur="5s" repeatCount="indefinite" />
      </g>

      <Sparkle cx={96} cy={38} color={p.c} delay={0.3} />
      <Sparkle cx={124} cy={68} color={p.b} delay={0.9} />
    </g>
  )
}

function Game3Art({ p }: { p: Palette }) {
  return (
    <g transform="translate(12 4) scale(0.82)">
      <circle cx="110" cy="62" r="44" fill={p.b} opacity="0.08">
        <animate attributeName="r" values="40;48;40" dur="2s" repeatCount="indefinite" />
      </circle>

      <g transform="translate(110 62)">
        <rect x="-32" y="-38" width="64" height="76" rx="10" fill="white" opacity="0.4" transform="rotate(-10)">
          <animateTransform attributeName="transform" type="rotate" values="-10 0 0;-8 0 0;-10 0 0" dur="3s" repeatCount="indefinite" additive="sum" />
        </rect>
        <rect x="-28" y="-36" width="64" height="76" rx="10" fill="white" opacity="0.55" transform="rotate(6)">
          <animateTransform attributeName="transform" type="rotate" values="6 0 0;8 0 0;6 0 0" dur="3.4s" repeatCount="indefinite" additive="sum" />
        </rect>
      </g>

      <g transform="translate(110 62)">
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 0 0;-4 0 0;0 0 0;4 0 0;0 0 0"
            dur="4s"
            repeatCount="indefinite"
          />
          <rect x="-30" y="-36" width="60" height="72" rx="10" fill="white" stroke={p.b} strokeWidth="2" />
          <text x="-18" y="-10" fontSize="9" fill="#3D2C3E" fontFamily="sans-serif" fontWeight="700">MYTH?</text>
          <line x1="-18" y1="-4" x2="14" y2="-4" stroke={p.a} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="-18" y1="4" x2="8" y2="4" stroke={p.a} strokeWidth="2.5" strokeLinecap="round" />
          <rect x="-14" y="18" width="14" height="8" rx="4" fill={p.c} opacity="0.9" />
          <rect x="2" y="18" width="14" height="8" rx="4" fill={p.d} opacity="0.35" />
        </g>
      </g>

      <g transform="translate(148 34)">
        <circle cx="0" cy="0" r="11" fill={p.b} opacity="0.92">
          <animate attributeName="r" values="10;12;10" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <path d="M-4 0 L-1 3 L5 -3" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <animateTransform attributeName="transform" type="translate" values="148 34;148 32;148 34" dur="2s" repeatCount="indefinite" />
      </g>

      <g transform="translate(52 34)">
        <circle cx="0" cy="0" r="13" fill="none" stroke="white" strokeWidth="2.5" opacity="0.35" />
        <circle cx="0" cy="0" r="13" fill="none" stroke={p.b} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="22 60" transform="rotate(-90)">
          <animateTransform attributeName="transform" type="rotate" values="-90 0 0;270 0 0" dur="3s" repeatCount="indefinite" />
        </circle>
        <text x="-4" y="3" fontSize="8" fill={p.d} fontFamily="sans-serif" fontWeight="700">5</text>
      </g>

      <g transform="translate(110 18)">
        <text x="-16" y="0" fontSize="7" fill={p.b} fontFamily="sans-serif" fontWeight="700" opacity="0.85">x3 COMBO</text>
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1.2s" repeatCount="indefinite" />
      </g>

      <Sparkle cx={32} cy={82} color={p.b} delay={0} />
      <Sparkle cx={188} cy={76} color={p.c} delay={0.5} />
      <Sparkle cx={110} cy={108} color={p.d} delay={1} />
    </g>
  )
}

function Sparkle({ cx, cy, color, delay }: { cx: number; cy: number; color: string; delay: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <path d="M0 -4 L1 0 L0 4 L-1 0 Z" fill={color}>
        <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="scale" values="0.6;1.1;0.6" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
      </path>
    </g>
  )
}
