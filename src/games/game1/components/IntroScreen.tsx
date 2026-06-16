import { IntroSplash } from '../../../components/ui/IntroSplash'
import { MeeraAvatar } from './MeeraAvatar'

interface IntroScreenProps {
  onStart: () => void
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <IntroSplash
        title="Meera’s Day"
        subtitle="Narrative Simulation"
        caption="Live inside one woman’s day. Each choice ripples through her body — and you’ll see it happen in real time."
        accent="coral"
        icon={<MeeraAvatar mood="tired" size="md" />}
        primaryLabel="Begin"
        onPrimary={onStart}
        secondary={<p className="text-xs text-plum-light/70">~5 minutes · 3 scenes · 3 lessons</p>}
      />
    </div>
  )
}
