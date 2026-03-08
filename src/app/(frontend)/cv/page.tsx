import { CVSection } from '@/components/CVSection'
import { FadeIn } from '@/components/motion/FadeIn'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'CV',
  alternates: {
    canonical: '/cv',
  },
}

export default async function CVPage() {
  const payload = await getPayload({ config: configPromise })
  const cv = await payload.findGlobal({ slug: 'cv' })

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <FadeIn>
        <h1 className="font-heading text-4xl md:text-5xl tracking-tight mb-16">Curriculum Vitae</h1>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        <div className="lg:col-span-2">
          {cv.sections?.map((section) => (
            <CVSection key={section.id} title={section.title} entries={section.entries ?? []} />
          ))}
        </div>

        <div>
          {cv.sidebarSections?.map((section) => (
            <CVSection
              key={section.id}
              title={section.title}
              entries={section.entries ?? []}
              compact
            />
          ))}
        </div>
      </div>
    </section>
  )
}
