import type { MythCard } from './types'

export const MYTHS: MythCard[] = [
  {
    id: 'm1',
    myth: 'Menopause is a disease.',
    answer: false,
    explanation: 'Menopause is a natural biological transition — not an illness. Your body is changing, and it deserves support, not fear.',
    sourceTag: 'Module: Understanding the transition',
  },
  {
    id: 'm2',
    myth: 'HRT is safe for everyone without monitoring.',
    answer: false,
    explanation: 'HRT decisions are individual and should be guided by a clinician with regular review — typically every 3–6 months.',
    sourceTag: 'Module: Options & supervision',
  },
  {
    id: 'm3',
    myth: 'Only women experience hormonal decline in midlife.',
    answer: false,
    explanation: 'Men can experience testosterone decline in midlife too. Hormone shifts happen across genders — they just show up differently.',
    sourceTag: 'Module: Hormones across midlife',
  },
  {
    id: 'm4',
    myth: 'Poor sleep has no effect on hormonal balance.',
    answer: false,
    explanation: 'Deep sleep supports cortisol regulation and overnight repair that affects estrogen and progesterone balance.',
    sourceTag: 'Module: Sleep & recovery',
  },
  {
    id: 'm5',
    myth: 'Plastic bottles can disrupt hormones.',
    answer: true,
    explanation: 'Some plastics can leach endocrine disruptors like BPA, which can mimic estrogen (xenoestrogens). Heat increases risk.',
    sourceTag: 'Module: Everyday disruptors',
  },
  {
    id: 'm6',
    myth: 'All exercise worsens menopause symptoms.',
    answer: false,
    explanation: 'Balanced movement (strength, yoga, walking) supports mood, sleep, insulin sensitivity, and hormone regulation.',
    sourceTag: 'Module: Movement for harmony',
  },
  {
    id: 'm7',
    myth: 'Menopause is official after 12 consecutive period-free months.',
    answer: true,
    explanation: 'Clinically, menopause is defined after 12 months without a period (not due to other causes).',
    sourceTag: 'Module: Definitions & phases',
  },
  {
    id: 'm8',
    myth: 'Chronic stress helps the body adapt to menopause.',
    answer: false,
    explanation: 'Chronic stress keeps cortisol elevated and can suppress progesterone, amplifying symptoms and disrupting sleep.',
    sourceTag: 'Module: Stress & hormones',
  },
  {
    id: 'm9',
    myth: 'Phytoestrogens in food help balance hormones naturally.',
    answer: true,
    explanation: 'Phytoestrogens (like in flax, soy, legumes) can gently support shifting estrogen levels for many people.',
    sourceTag: 'Module: Food as support',
  },
  {
    id: 'm10',
    myth: 'Morning sunlight has no effect on hormonal health.',
    answer: false,
    explanation: 'Morning light helps regulate melatonin/cortisol rhythms and supports Vitamin D pathways tied to hormonal health.',
    sourceTag: 'Module: Light & rhythm',
  },
  {
    id: 'm11',
    myth: 'Mindset and emotional wellbeing don’t affect menopause symptoms.',
    answer: false,
    explanation: 'Mind-body tools (self-compassion, nervous system regulation) measurably improve sleep, stress, and symptom perception.',
    sourceTag: 'Module: Mind-body connection',
  },
  {
    id: 'm12',
    myth: 'Menopause only affects women in their 50s.',
    answer: false,
    explanation: 'Perimenopause can begin in the mid-to-late 40s (sometimes earlier). Awareness helps you respond sooner.',
    sourceTag: 'Module: Perimenopause timeline',
  },
]

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

