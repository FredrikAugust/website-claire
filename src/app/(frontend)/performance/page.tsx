import { Navigation } from '@/components/Navigation'
import { WorksGrid } from '@/components/WorksGrid'
import { mapWorkToCard } from '@/lib/mapWorkToCard'
import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Performance',
  alternates: {
    canonical: '/performance',
  },
}

export default async function PerformancePage() {
  const payload = await getPayloadClient()

  const works = await payload.find({
    collection: 'works',
    where: { category: { equals: 'performance' } },
    sort: 'sortOrder',
    limit: 100,
    depth: 1,
    select: {
      title: true,
      slug: true,
      year: true,
      category: true,
      medium: true,
      venue: true,
      thumbnailImage: true,
      heroImage: true,
    },
  })

  return (
    <>
      <Navigation />
      <WorksGrid works={works.docs.map(mapWorkToCard)} title="Performance" />
    </>
  )
}
