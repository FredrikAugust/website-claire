import { ProjectHero } from '@/components/ProjectHero'
import { ProjectInfo } from '@/components/ProjectInfo'
import { ProjectNavigation } from '@/components/ProjectNavigation'
import type { Media as MediaType } from '@/payload-types'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'works',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const work = result.docs[0]
  if (!work) return { title: 'Not Found' }

  return {
    title: work.title,
    description: work.subtitle ?? `${work.title} — ${work.category}, ${work.year}`,
    alternates: { canonical: `/works/${slug}` },
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const works = await payload.find({ collection: 'works', limit: 1000 })
  return works.docs.map((work) => ({ slug: work.slug }))
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'works',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const work = result.docs[0]
  if (!work) notFound()

  const nextResult = await payload.find({
    collection: 'works',
    where: {
      sortOrder: { greater_than: work.sortOrder ?? 0 },
      id: { not_equals: work.id },
    },
    sort: 'sortOrder',
    limit: 1,
  })

  const heroImage = work.heroImage as MediaType | null

  return (
    <>
      {heroImage && <ProjectHero image={heroImage} />}
      <ProjectInfo work={work} />
      <ProjectNavigation nextWork={nextResult.docs[0] ?? null} category={work.category} />
    </>
  )
}
