import type { WorkCardData } from '@/components/WorkCard'
import type { Media, Work } from '@/payload-types'

export function mapWorkToCard(work: Work): WorkCardData {
  const thumbnail = work.thumbnailImage as Media | null
  const hero = work.heroImage as Media | null
  const image = thumbnail || hero

  return {
    id: work.id,
    slug: work.slug,
    title: work.title,
    year: work.year,
    category: work.category,
    medium: work.medium,
    venue: work.venue,
    imageUrl: image?.url ?? null,
    imageAlt: image?.alt,
  }
}
