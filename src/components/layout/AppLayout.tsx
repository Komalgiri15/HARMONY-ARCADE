import type { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
  fullBleed?: boolean
}

export function AppLayout({ children, fullBleed = false }: AppLayoutProps) {
  return (
    <div className="min-h-dvh bg-cream">
      {fullBleed ? (
        <div className="min-h-dvh w-full">{children}</div>
      ) : (
        <div className="mx-auto w-full max-w-6xl min-h-dvh px-4 sm:px-6 lg:px-10">
          {children}
        </div>
      )}
    </div>
  )
}
