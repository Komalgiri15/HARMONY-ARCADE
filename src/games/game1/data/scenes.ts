import type { Badge, Moment } from '../types'

export const STARTING_METER = 50
export const METER_MIN = 0
export const METER_MAX = 100

export const MOMENTS: Moment[] = [
  {
    id: 'morning',
    label: 'Morning',
    timeLabel: '6:00 AM',
    mood: 'tired',
    narration: [
      "It's 6am. Meera's alarm goes off.",
      'She slept for 4 hours.',
      'Dawn light spills across her bedroom. Her phone is face-up — notifications already glowing.',
    ],
    background: {
      gradient: 'from-amber-100 via-orange-50 to-rose-100',
      accent: '#F2B84B',
    },
    choices: [
      {
        id: 'morning-phone',
        icon: '📱',
        label: 'Check notifications first',
        action: 'phone',
        nature: 'disruptor',
        meterDelta: -15,
        hormone: 'Cortisol spike',
        consequence:
          'Blue light within 30 minutes of waking spikes cortisol and delays your melatonin reset for tonight.',
        deepDive:
          'Your circadian clock is most sensitive in the first hour after waking. Phone light tells your brain it\'s still "daytime mode," keeping stress hormones elevated when they should be gently rising then settling.',
      },
      {
        id: 'morning-sun',
        icon: '☀️',
        label: 'Step outside for 10 minutes',
        action: 'walk',
        nature: 'harmonizer',
        meterDelta: 20,
        hormone: 'Serotonin & cortisol balance',
        consequence:
          'Morning sunlight triggers serotonin release and begins your cortisol regulation for the day.',
        deepDive:
          'Natural light within the first hour helps anchor your body clock. Even 10 minutes outdoors signals your hypothalamus to time hormone release more accurately — better energy, mood, and sleep tonight.',
      },
      {
        id: 'morning-coffee',
        icon: '☕',
        label: 'Make coffee in a plastic cup',
        action: 'coffee',
        nature: 'disruptor',
        meterDelta: -10,
        hormone: 'Estrogen mimicry',
        consequence:
          'BPA from heated plastic leaches into your drink and mimics estrogen — confusing your endocrine system.',
        deepDive:
          'Endocrine disruptors don\'t always feel immediate, but they add up. Heat accelerates chemical leaching from plastic. A ceramic or steel mug is a small swap with a real hormonal payoff.',
      },
    ],
    lesson: {
      id: 'lesson-morning',
      moment: 'morning',
      title: 'The First Hour Sets the Tone',
      summary: 'What you do within 60 minutes of waking shapes cortisol, melatonin, and mood for the entire day.',
      icon: '🌅',
    },
  },
  {
    id: 'afternoon',
    label: 'Afternoon',
    timeLabel: '1:30 PM',
    mood: 'anxious',
    narration: [
      "It's 1:30pm. The morning rush is behind her — but the slump has arrived.",
      'Her shoulders are tight. The break room smells like microwaved food.',
      'Three hours of meetings left. Her body is asking for something.',
    ],
    background: {
      gradient: 'from-sky-100 via-blue-50 to-indigo-100',
      accent: '#81A08B',
    },
    choices: [
      {
        id: 'afternoon-pastry',
        icon: '🧁',
        label: 'Grab a sugary pastry',
        action: 'eat',
        nature: 'disruptor',
        meterDelta: -12,
        hormone: 'Insulin roller coaster',
        consequence:
          'A sugar spike gives you 20 minutes of energy — then insulin crashes, leaving you more tired and irritable.',
        deepDive:
          'Mid-afternoon is when cortisol naturally dips. Refined sugar masks the dip temporarily but worsens the crash. Stable blood sugar keeps mood and hormones steadier through menopause transitions.',
      },
      {
        id: 'afternoon-walk',
        icon: '🚶‍♀️',
        label: 'Take a 15-minute walk outside',
        action: 'walk',
        nature: 'harmonizer',
        meterDelta: 18,
        hormone: 'Cortisol reset',
        consequence:
          'Movement plus daylight lowers afternoon cortisol and boosts endorphins — your natural energy without the crash.',
        deepDive:
          'A short walk activates your parasympathetic nervous system. It\'s one of the fastest ways to interrupt stress patterns that keep progesterone and estrogen out of balance.',
      },
      {
        id: 'afternoon-desk',
        icon: '💻',
        label: 'Eat at your desk while scrolling',
        action: 'phone',
        nature: 'disruptor',
        meterDelta: -8,
        hormone: 'Stress digestion',
        consequence:
          'Eating while distracted keeps your body in "fight mode" — digestion slows and nutrients absorb poorly.',
        deepDive:
          'Your gut and hormones are deeply linked. When you eat under stress, blood diverts away from digestion. Even five mindful bites can change how your body processes food and regulates blood sugar.',
      },
    ],
    lesson: {
      id: 'lesson-afternoon',
      moment: 'afternoon',
      title: 'The Slump Is a Signal',
      summary: 'Afternoon fatigue isn\'t weakness — it\'s your body asking for movement, nourishment, or a reset.',
      icon: '☀️',
    },
  },
  {
    id: 'evening',
    label: 'Evening',
    timeLabel: '9:00 PM',
    mood: 'calm',
    narration: [
      "It's 9pm. The house is finally quiet.",
      'Tomorrow\'s to-do list is still open on her laptop.',
      'Her body is ready to wind down — but her mind hasn\'t gotten the message.',
    ],
    background: {
      gradient: 'from-indigo-200 via-purple-100 to-violet-100',
      accent: '#C9B8D9',
    },
    choices: [
      {
        id: 'evening-scroll',
        icon: '📲',
        label: 'Scroll in bed for "just 10 minutes"',
        action: 'phone',
        nature: 'disruptor',
        meterDelta: -15,
        hormone: 'Melatonin suppression',
        consequence:
          'Blue light at night suppresses melatonin by up to 50% — making deep sleep and overnight hormone repair much harder.',
        deepDive:
          'Sleep is when your body recalibrates estrogen, progesterone, and growth hormone. Even brief screen time in bed trains your brain to stay alert. Your pillow should mean "rest," not "one more scroll."',
      },
      {
        id: 'evening-stretch',
        icon: '🧘‍♀️',
        label: 'Stretch, then a warm shower',
        action: 'stretch',
        nature: 'harmonizer',
        meterDelta: 20,
        hormone: 'Parasympathetic activation',
        consequence:
          'Gentle movement and warmth signal your nervous system to shift into recovery mode — priming melatonin for tonight.',
        deepDive:
          'A warm shower slightly raises then drops your core temperature — a natural sleep cue. Pairing it with slow stretching tells your body the day is done, supporting the hormonal repair that happens during deep sleep.',
      },
      {
        id: 'evening-wine',
        icon: '🍷',
        label: 'Skip dinner, just have wine',
        action: 'drink',
        nature: 'disruptor',
        meterDelta: -12,
        hormone: 'Liver & estrogen load',
        consequence:
          'Alcohol on an empty stomach spikes blood sugar, then crashes it — and your liver prioritizes alcohol over estrogen metabolism.',
        deepDive:
          'During menopause, your liver works harder to process shifting hormone levels. Alcohol competes for the same pathways. A light, protein-rich evening meal supports steadier blood sugar and cleaner hormone clearance overnight.',
      },
    ],
    lesson: {
      id: 'lesson-evening',
      moment: 'evening',
      title: 'Wind-Down Is Hormone Work',
      summary: 'How you close the day determines how well your body repairs and rebalances overnight.',
      icon: '🌙',
    },
  },
]

export const BADGES: Record<string, Badge> = {
  'harmony-hero': {
    id: 'harmony-hero',
    title: 'Harmony Hero',
    description: 'You guided Meera\'s day with choices that truly supported her body.',
    emoji: '🏅',
  },
  'on-the-path': {
    id: 'on-the-path',
    title: 'On the Path',
    description: 'Solid instincts — a few different choices could lift her balance even higher.',
    emoji: '🌿',
  },
  'body-needs-you': {
    id: 'body-needs-you',
    title: 'Body Needs You',
    description: 'Today was tough on her hormones. Replay and see how small swaps change everything.',
    emoji: '💛',
  },
}

export function getBadge(meter: number): Badge {
  if (meter >= 70) return BADGES['harmony-hero']
  if (meter >= 40) return BADGES['on-the-path']
  return BADGES['body-needs-you']
}

export function getMeterColor(meter: number): 'green' | 'amber' | 'red' {
  if (meter >= 65) return 'green'
  if (meter >= 35) return 'amber'
  return 'red'
}
