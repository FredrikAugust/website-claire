import { FadeIn } from '@/components/motion/FadeIn'
import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About',
  alternates: {
    canonical: '/about',
  },
}

export default async function AboutPage() {
  const payload = await getPayloadClient()
  const about = await payload.findGlobal({ slug: 'about', depth: 1 })
  const portrait = about.portrait as Media | null

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {portrait?.url && (
          <FadeIn>
            <div className="relative aspect-3/4 bg-secondary">
              <Image
                src={portrait.url}
                alt={portrait.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        )}

        <div className="flex flex-col justify-center">
          {about.headline && (
            <FadeIn delay={0.1}>
              <h1 className="font-heading text-4xl md:text-5xl tracking-tight mb-8">
                {about.headline}
              </h1>
            </FadeIn>
          )}
          {about.bio && (
            <FadeIn delay={0.2}>
              <div className="text-foreground/80 leading-relaxed space-y-4">
                <RichText data={about.bio} />
              </div>
            </FadeIn>
          )}
        </div>
      </div>

      {about.approach?.title && (
        <div className="mt-24 max-w-3xl">
          <FadeIn>
            <h2 className="font-heading text-3xl tracking-tight mb-6">{about.approach.title}</h2>
          </FadeIn>
          {about.approach.content && (
            <FadeIn delay={0.1}>
              <div className="text-foreground/80 leading-relaxed">
                <RichText data={about.approach.content} />
              </div>
            </FadeIn>
          )}
        </div>
      )}
    </section>
  )
}
