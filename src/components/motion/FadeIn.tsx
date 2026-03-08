import type React from 'react'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  x?: number
  y?: number
}

export function FadeIn({ children, className }: FadeInProps) {
  return <div className={className}>{children}</div>
}
