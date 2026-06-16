import type { CharacterAction } from '../types'

interface MeeraActionSpriteProps {
  action: CharacterAction
  large?: boolean
  variant?: 'card' | 'inline'
}

export function MeeraActionSprite({
  action,
  large = false,
  variant = 'card',
}: MeeraActionSpriteProps) {
  return (
    <div
      className={
        variant === 'card'
          ? `rounded-2xl bg-gradient-to-b from-white to-cream-dark border border-plum/10 shadow-soft overflow-hidden ${large ? 'p-4' : 'p-3'}`
          : ''
      }
    >
      <div className={`relative w-full ${large ? 'h-[170px]' : 'h-[130px]'}`}>
        <MeeraActionScene action={action} variant={variant} />
      </div>
    </div>
  )
}

function SvgStageShell({
  variant,
  children,
}: {
  variant: 'card' | 'inline'
  children: React.ReactNode
}) {
  return (
    <div
      className={
        variant === 'card'
          ? 'w-full h-full rounded-xl bg-gradient-to-r from-sage/15 via-cream to-amber/10 border border-plum/5 relative overflow-hidden flex items-center justify-center'
          : 'w-full h-full rounded-2xl bg-gradient-to-r from-sage/10 via-cream to-amber/10 border border-plum/10 relative overflow-hidden flex items-center justify-center'
      }
    >
      <div className="w-full h-full flex items-center justify-center">{children}</div>
    </div>
  )
}

function MeeraActionScene({ action, variant }: { action: CharacterAction; variant: 'card' | 'inline' }) {
  return (
    <SvgStageShell variant={variant}>
      <svg viewBox="0 0 300 220" className="h-full w-auto max-w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <SceneBackground action={action} />
        <SceneProp action={action} />
        <MeeraChibi action={action} />
      </svg>
    </SvgStageShell>
  )
}

function SceneBackground({ action }: { action: CharacterAction }) {
  const bg =
    action === 'walk'
      ? 'rgba(168,196,176,0.18)'
      : action === 'phone'
        ? 'rgba(201,184,217,0.14)'
        : action === 'coffee'
          ? 'rgba(242,184,75,0.10)'
          : action === 'eat'
            ? 'rgba(224,122,95,0.10)'
            : 'rgba(253,246,240,0.95)'

  return (
    <>
      <rect x="0" y="0" width="300" height="220" fill={bg} />
      <rect x="0" y="176" width="300" height="44" fill="rgba(129,160,139,0.08)" />
      <line x1="0" y1="176" x2="300" y2="176" stroke="rgba(61,44,62,0.10)" strokeWidth="1" />
      {action === 'walk' && (
        <>
          <circle cx="252" cy="44" r="14" fill="#F2D8A8" opacity="0.85" />
          <g opacity="0.45">
            <rect x="24" y="168" width="6" height="22" rx="3" fill="#81A08B" />
            <rect x="90" y="168" width="6" height="22" rx="3" fill="#81A08B" />
            <rect x="210" y="168" width="6" height="22" rx="3" fill="#81A08B" />
          </g>
        </>
      )}
    </>
  )
}

function SceneProp({ action }: { action: CharacterAction }) {
  if (action === 'walk') {
    return (
      <g transform="translate(208 150)" opacity="0.92">
        <ellipse cx="28" cy="26" rx="18" ry="10" fill="#8A6668" />
        <circle cx="10" cy="20" r="9" fill="#8A6668" />
        <ellipse cx="7.5" cy="22" rx="4" ry="3" fill="#F2C9A0" opacity="0.55" />
        <circle cx="7.8" cy="19.5" r="1.3" fill="#2B212C" />
        <circle cx="12.5" cy="19.5" r="1.3" fill="#2B212C" />
        <path d="M4 15 C2 8 10 9 9 15" fill="#6B4B4D" />
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0; 2 0; 0 0" dur="0.5s" repeatCount="indefinite" />
          <rect x="18" y="30" width="5" height="10" rx="2.5" fill="#5B4042" />
          <rect x="31" y="30" width="5" height="10" rx="2.5" fill="#5B4042" />
        </g>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0; -2 0; 0 0" dur="0.5s" repeatCount="indefinite" />
          <rect x="24" y="30" width="5" height="10" rx="2.5" fill="#5B4042" />
          <rect x="37" y="30" width="5" height="10" rx="2.5" fill="#5B4042" />
        </g>
        <path d="M44 24 C52 20 54 12 50 6" fill="none" stroke="#5B4042" strokeWidth="4" strokeLinecap="round">
          <animate attributeName="d" dur="0.7s" repeatCount="indefinite" values="M44 24 C52 20 54 12 50 6; M44 24 C54 22 58 14 54 8; M44 24 C52 20 54 12 50 6" />
        </path>
      </g>
    )
  }

  if (action === 'coffee') {
    return (
      <g transform="translate(176 106)">
        <rect x="0" y="0" width="36" height="34" rx="10" fill="#E07A5F" />
        <path d="M34 8 Q50 12 50 24 Q50 36 34 34" fill="none" stroke="#C45D42" strokeWidth="6" strokeLinecap="round" />
        <path d="M20 -8 C14 -20 28 -26 20 -40" stroke="#E8D0A8" strokeWidth="2.5" fill="none" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
        </path>
      </g>
    )
  }

  if (action === 'phone') {
    return (
      <g transform="translate(190 96)">
        <rect x="0" y="0" width="28" height="44" rx="8" fill="#81A08B" />
        <rect x="4" y="8" width="20" height="28" rx="4" fill="#2D2D2D" opacity="0.22" />
        <circle cx="26" cy="-2" r="6" fill="#E07A5F">
          <animate attributeName="r" values="5;7;5" dur="1.4s" repeatCount="indefinite" />
        </circle>
      </g>
    )
  }

  if (action === 'eat') {
    return (
      <g transform="translate(192 108)">
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="1.2s" repeatCount="indefinite" additive="sum" />
        <path d="M0 20 C6 2 46 2 52 20 Q26 30 0 20 Z" fill="#E8B07A" />
        <path d="M2 26 C10 22 14 30 22 26 C30 22 34 30 42 26 C46 24 50 27 52 28 L52 32 L2 32 Z" fill="#81A08B" opacity="0.9" />
        <rect x="4" y="32" width="46" height="10" rx="5" fill="#6B4226" />
        <rect x="2" y="42" width="50" height="10" rx="5" fill="#D99B62" />
      </g>
    )
  }

  if (action === 'drink') {
    return (
      <g transform="translate(188 108)">
        <path d="M8 0 L16 28 L0 28 Z" fill="#C9B8D9" />
        <ellipse cx="8" cy="0" rx="8" ry="3" fill="#8B0045" opacity="0.55" />
      </g>
    )
  }

  if (action === 'stretch') {
    return (
      <g opacity="0.35">
        <path d="M40 60 Q80 40 120 60" stroke="#81A08B" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  }

  return null
}

function MeeraChibi({ action }: { action: CharacterAction }) {
  const pose = getPose(action)
  const animated = action === 'walk' || action === 'coffee' || action === 'eat' || action === 'phone'

  return (
    <g transform="translate(150 120)">
      {animated && (
        <animateTransform
          attributeName="transform"
          type="translate"
          additive="sum"
          values="0 0;0 -2;0 0"
          dur={action === 'walk' ? '0.7s' : '1.4s'}
          repeatCount="indefinite"
        />
      )}

      <path
        d="M0 -74 C-28 -74 -44 -54 -44 -30 C-44 -8 -30 8 0 8 C30 8 44 -8 44 -30 C44 -54 28 -74 0 -74 Z"
        fill="#3D2C3E"
      />
      <path d="M-36 -18 C-38 -4 -30 8 -16 14 C-26 8 -30 -4 -28 -16 Z" fill="#2B212C" opacity="0.95" />
      <path d="M36 -18 C38 -4 30 8 16 14 C26 8 30 -4 28 -16 Z" fill="#2B212C" opacity="0.95" />

      <circle cx="0" cy="-30" r="26" fill="#F2C9A0" />

      <path d="M-17 -40 Q-9 -45 -3 -40" stroke="#2B212C" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M3 -40 Q9 -45 17 -40" stroke="#2B212C" strokeWidth="2.8" fill="none" strokeLinecap="round" />

      <circle cx="-8.5" cy="-32" r="3.2" fill="#2B212C" />
      <circle cx="8.5" cy="-32" r="3.2" fill="#2B212C" />
      <circle cx="-9.5" cy="-33.2" r="1" fill="#FFFFFF" opacity="0.9" />
      <circle cx="7.5" cy="-33.2" r="1" fill="#FFFFFF" opacity="0.9" />

      <path d="M-12 -16 Q0 -8 12 -16" stroke="#2B212C" strokeWidth="2.8" fill="none" strokeLinecap="round" />

      <circle cx="-15.5" cy="-22" r="5" fill="#E07A5F" opacity="0.12" />
      <circle cx="15.5" cy="-22" r="5" fill="#E07A5F" opacity="0.12" />

      <rect x="-18" y="-4" width="36" height="26" rx="13" fill="#E07A5F" />

      <Arm side="left" action={action} baseAngle={pose.leftArm} />
      <Arm side="right" action={action} baseAngle={pose.rightArm} />

      <path d="M-18 22 Q0 10 18 22 L26 46 Q0 60 -26 46 Z" fill="#D97A67" opacity="0.92" />

      <Leg side="left" action={action} offsetX={pose.leftLegX} />
      <Leg side="right" action={action} offsetX={pose.rightLegX} />
    </g>
  )
}

function Arm({
  side,
  action,
  baseAngle,
}: {
  side: 'left' | 'right'
  action: CharacterAction
  baseAngle: number
}) {
  const pivotX = side === 'left' ? -18 : 18
  const isWalk = action === 'walk'

  return (
    <g transform={isWalk ? undefined : `rotate(${baseAngle} ${pivotX} 8)`}>
      {isWalk && (
        <animateTransform
          attributeName="transform"
          type="rotate"
          values={
            side === 'left'
              ? `${baseAngle} ${pivotX} 8;${baseAngle + 28} ${pivotX} 8;${baseAngle} ${pivotX} 8`
              : `${baseAngle} ${pivotX} 8;${baseAngle - 28} ${pivotX} 8;${baseAngle} ${pivotX} 8`
          }
          dur="0.7s"
          repeatCount="indefinite"
        />
      )}
      <rect
        x={side === 'left' ? -30 : 14}
        y={0}
        width={16}
        height={44}
        rx={8}
        fill="#F2D8A8"
      />
    </g>
  )
}

function Leg({
  side,
  action,
  offsetX,
}: {
  side: 'left' | 'right'
  action: CharacterAction
  offsetX: number
}) {
  const isWalk = action === 'walk'

  return (
    <g transform={isWalk ? undefined : `translate(${offsetX} 0)`}>
      {isWalk && (
        <animateTransform
          attributeName="transform"
          type="translate"
          values={
            side === 'left'
              ? `${offsetX} 0;${offsetX + 4} 0;${offsetX} 0`
              : `${offsetX} 0;${offsetX - 4} 0;${offsetX} 0`
          }
          dur="0.7s"
          repeatCount="indefinite"
        />
      )}
      <rect
        x={side === 'left' ? -22 : 8}
        y={44}
        width={14}
        height={36}
        rx={7}
        fill="#3D2C3E"
        opacity={0.85}
      />
      <ellipse
        cx={side === 'left' ? -15 : 15}
        cy={82}
        rx={12}
        ry={5}
        fill="#3D2C3E"
        opacity={0.9}
      />
    </g>
  )
}

function getPose(action: CharacterAction) {
  switch (action) {
    case 'walk':
      return { leftArm: -14, rightArm: 14, leftLegX: -3, rightLegX: 3 }
    case 'phone':
      return { leftArm: -22, rightArm: 38, leftLegX: 0, rightLegX: 0 }
    case 'coffee':
    case 'drink':
      return { leftArm: -10, rightArm: 28, leftLegX: 0, rightLegX: 0 }
    case 'eat':
      return { leftArm: -16, rightArm: 22, leftLegX: 0, rightLegX: 0 }
    case 'stretch':
      return { leftArm: -55, rightArm: 55, leftLegX: 0, rightLegX: 0 }
    default:
      return { leftArm: -8, rightArm: 8, leftLegX: 0, rightLegX: 0 }
  }
}
