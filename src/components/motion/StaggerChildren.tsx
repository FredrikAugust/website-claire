import type React from 'react'

interface StaggerChildrenProps {
  children: React.ReactNode
  className?: string
  stagger?: number
}

export function StaggerChildren({ children, className }: StaggerChildrenProps) {
  return <div className={className}>{children}</div>
}
