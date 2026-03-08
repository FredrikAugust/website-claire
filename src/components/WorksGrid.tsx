import type { Work } from '@/payload-types'
import { WorkCard } from './WorkCard'
import { StaggerChildren } from './motion/StaggerChildren'

interface WorksGridProps {
  works: Work[]
  title: string
  description?: string
}

export function WorksGrid({ works, title, description }: WorksGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-16">
        <h1 className="font-heading text-4xl md:text-5xl tracking-tight">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>}
      </div>
      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </StaggerChildren>
    </section>
  )
}
