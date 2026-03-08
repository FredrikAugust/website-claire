import { AboutPractice } from '@/components/AboutPractice'
import { FeaturedWorks } from '@/components/FeaturedWorks'
import { HeroVideo } from '@/components/HeroVideo'
import type { Media as MediaType } from '@/payload-types'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Claire Foody',
  alternates: {
    canonical: '/',
  },
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [home, worksResult] = await Promise.all([
    payload.findGlobal({ slug: 'home' }),
    payload.find({
      collection: 'works',
      where: { featured: { equals: true } },
      sort: 'sortOrder',
      limit: 3,
    }),
  ])

  const heroVideo = home.hero?.video as MediaType | null
  const fallbackImage = home.hero?.fallbackImage as MediaType | null

  return (
    <>
      <HeroVideo
        video={heroVideo}
        fallbackImage={fallbackImage}
        title={home.hero?.title}
        descriptor={home.hero?.descriptor}
      />
      <FeaturedWorks works={worksResult.docs} />
      <AboutPractice quote={home.aboutPractice?.quote} body={home.aboutPractice?.body} />
    </>
  )
}
