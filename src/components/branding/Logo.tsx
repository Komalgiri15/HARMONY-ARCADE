import { CourseFlowerIcon } from '../icons/GameIcons'

export function Logo({
  size = 'md',
  showSubtitle = false,
}: {
  size?: 'sm' | 'md' | 'lg'
  showSubtitle?: boolean
}) {
  const map = {
    sm: { icon: 'w-5 h-5', title: 'text-base', subtitle: 'text-[11px]' },
    md: { icon: 'w-6 h-6', title: 'text-lg', subtitle: 'text-xs' },
    lg: { icon: 'w-7 h-7', title: 'text-xl', subtitle: 'text-sm' },
  }[size]

  return (
    <div className="inline-flex items-center gap-2">
      <div className="w-10 h-10 rounded-2xl bg-white/70 border border-plum/10 shadow-soft flex items-center justify-center">
        <CourseFlowerIcon className={`${map.icon} text-coral`} />
      </div>
      <div className="leading-tight">
        <div className={`font-display ${map.title} text-plum`}>Hormonal Harmony</div>
        {showSubtitle && <div className={`${map.subtitle} text-plum-light`}>Soft games · real learning</div>}
      </div>
    </div>
  )
}

