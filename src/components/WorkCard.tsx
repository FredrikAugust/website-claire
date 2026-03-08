'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

export interface WorkCardData {
  id: number
  slug: string
  title: string
  year: number
  category: string
  medium?: string | null
  venue?: string | null
  imageUrl?: string | null
  imageAlt?: string
}

export function WorkCard({ work }: { work: WorkCardData }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
      }}
    >
      <Link href={`/works/${work.slug}`} className="group block">
        {work.imageUrl && (
          <div className="aspect-4/3 relative overflow-hidden bg-secondary mb-4">
            <Image
              src={work.imageUrl}
              alt={work.imageAlt ?? work.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {work.year}
            </span>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {work.category}
            </span>
          </div>
          <h3 className="font-heading text-xl tracking-tight group-hover:text-muted-foreground transition-colors">
            {work.title}
          </h3>
          {work.medium && <p className="text-sm text-muted-foreground">{work.medium}</p>}
          {work.venue && <p className="text-sm text-muted-foreground">{work.venue}</p>}
          <span className="inline-block mt-2 text-xs uppercase tracking-[0.15em] text-foreground group-hover:tracking-[0.25em] transition-all">
            View Project &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
