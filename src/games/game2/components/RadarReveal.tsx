import { motion } from 'framer-motion'
import { Button } from '../../../components/ui/Button'
import type { DayResult, DayRitualInput } from '../types'

function avg(days: DayResult[], key: keyof DayRitualInput): number {
  const sealed = days.filter((d) => d.sealed)
  if (sealed.length === 0) return 0

  const val = sealed.reduce((sum, d) => {
    if (key === 'sleep') {
      return sum + (d.input.sleep.bedTime && d.input.sleep.wakeTime ? 90 : 0)
    }
    if (key === 'sunlight') return sum + (d.input.sunlight ? 100 : 0)
    if (key === 'movement') {
      const m = d.input.movement
      const map: any = { strength: 100, yoga: 85, walk: 75, rest: 55, none: 0 }
      return sum + (m ? map[m] : 0)
    }
    if (key === 'foodSeeds') return sum + (d.input.foodSeeds ? (d.input.foodSeeds / 5) * 100 : 0)
    if (key === 'stress') {
      const base = 100 - (d.input.stress.level - 1) * 20
      const bonus = d.input.stress.mindfulness ? 10 : 0
      return sum + Math.max(0, Math.min(100, base + bonus))
    }
    return sum
  }, 0)

  return Math.round(val / sealed.length)
}

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

export function RadarReveal({
  days,
  totalScore,
  onBack,
}: {
  days: DayResult[]
  totalScore: number
  onBack: () => void
}) {
  const axes: { key: keyof DayRitualInput; label: string }[] = [
    { key: 'sleep', label: 'Sleep' },
    { key: 'sunlight', label: 'Sunlight' },
    { key: 'movement', label: 'Movement' },
    { key: 'foodSeeds', label: 'Food' },
    { key: 'stress', label: 'Stress' },
  ]

  const values = axes.map((a) => avg(days, a.key))

  const cx = 160
  const cy = 160
  const maxR = 105
  const angles = axes.map((_, i) => (i / axes.length) * 360)

  const points = values
    .map((v, i) => polar(cx, cy, (v / 100) * maxR, angles[i]))
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ')

  const badge = totalScore >= 520 ? 'Hormonal Harmony Keeper' : totalScore >= 360 ? 'Harmony Gardener' : 'Seed Starter'

  const downloadSvg = () => {
    const svg = document.getElementById('radar-svg') as SVGSVGElement | null
    if (!svg) return
    const text = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([text], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'harmony-week.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-3xl text-plum">Day 7 Reveal</h2>
          <p className="text-sm text-plum-light">Your week, across all five pillars.</p>
        </div>
        <Button variant="secondary" onClick={onBack}>Back</Button>
      </div>

      <div className="rounded-3xl bg-white/70 backdrop-blur-sm border border-plum/10 shadow-card p-5">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center justify-center">
            <motion.svg
              id="radar-svg"
              width="320"
              height="320"
              viewBox="0 0 320 320"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* rings */}
              {[0.25, 0.5, 0.75, 1].map((p, i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={maxR * p}
                  fill="none"
                  stroke="rgba(61,44,62,0.10)"
                  strokeWidth="1"
                />
              ))}

              {/* axes */}
              {angles.map((a, i) => {
                const p = polar(cx, cy, maxR, a)
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={p.x}
                    y2={p.y}
                    stroke="rgba(61,44,62,0.12)"
                    strokeWidth="1"
                  />
                )
              })}

              {/* fill */}
              <motion.polygon
                points={points}
                fill="rgba(129,160,139,0.30)"
                stroke="rgba(129,160,139,0.9)"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />

              {/* dots */}
              {values.map((v, i) => {
                const p = polar(cx, cy, (v / 100) * maxR, angles[i])
                return (
                  <motion.circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="rgba(224,122,95,0.95)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 0.3 + i * 0.08 }}
                  />
                )
              })}
            </motion.svg>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-cream border border-plum/10 p-4"
            >
              <p className="text-xs uppercase tracking-wider text-plum-light">Badge</p>
              <p className="font-display text-2xl text-plum mt-1">{badge}</p>
              <p className="text-sm text-plum-light mt-2">
                Total score: <span className="font-semibold text-plum">{totalScore}</span>
              </p>
            </motion.div>

            <div className="mt-4 space-y-2">
              {axes.map((a, i) => (
                <div key={a.key} className="flex items-center justify-between text-sm">
                  <span className="text-plum-light">{a.label}</span>
                  <span className="font-semibold text-plum">{values[i]}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <Button variant="secondary" onClick={downloadSvg}>Download</Button>
              <Button onClick={() => window.print()}>Share</Button>
            </div>
            <p className="text-xs text-plum-light/70 mt-2">
              Download saves the radar as an SVG. (We can add a combined garden+radar image next.)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

