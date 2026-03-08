import { WorksGrid } from '@/components/WorksGrid'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Works',
  alternates: {
    canonical: '/works',
  },
}

export default async function WorksPage() {
  const payload = await getPayload({ config: configPromise })

  const works = await payload.find({
    collection: 'works',
    sort: 'sortOrder',
    limit: 100,
  })

  return <WorksGrid works={works.docs} title="Works" />
}
