import type { Work } from '@/payload-types'
import Link from 'next/link'
import { WorkCard } from './WorkCard'
import { FadeIn } from './motion/FadeIn'
import { StaggerChildren } from './motion/StaggerChildren'

export function FeaturedWorks({ works }: { works: Work[] }) {
  if (!works.length) return null

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <FadeIn>
        <div className="flex items-end justify-between mb-16">
          <h2 className="font-heading text-3xl md:text-4xl tracking-tight">Selected Works</h2>
          <Link
            href="/works"
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            View All &rarr;
          </Link>
        </div>
      </FadeIn>
      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </StaggerChildren>
    </section>
  )
}
