import type { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getPayload } from 'payload'
import { Suspense } from 'react'
import { Installations } from './Installations'
import PhotoCarousel from './PhotoCarousel'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  description: "Claire Foody's personal website",
  title: 'Claire Foody',
}

export default async function HomePage() {
  const payload = await getPayload({
    config: configPromise,
  })

  const home = await payload.findGlobal({
    slug: 'home',
  })

  const heroImage = home.hero.image as Media
  const contactImage = home.contact.image as Media

  return (
    <main className="flex flex-col items-center gap-8 lg:gap-12 py-10 md:pt-20 py:mt-20 ">
      <header className="container max-w-[75ch] flex flex-col md:flex-row md:items-center gap-8 px-4">
        <div className="h-40 w-30 relative shrink-0">
          <Image
            className="object-cover"
            sizes="50vw"
            src={heroImage.url!}
            priority
            fill={true}
            alt={heroImage.alt}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className={'text-3xl font-sans'}>{home.hero.title}</h1>
          <RichText className="font-serif" data={home.hero.description} />
        </div>
      </header>

      <PhotoCarousel images={home.carousel as Media[]} />

      <section className="container max-w-[75ch] flex flex-col gap-2 px-4">
        <h2 className={'text-2xl font-sans'}>About me</h2>
        <RichText className="font-serif text-justify" data={home.aboutMe.description} />
      </section>

      <section className="container max-w-[75ch] flex flex-col gap-4 px-4">
        <h2 className={'text-2xl font-sans'}>Installations</h2>
        <Suspense>
          <Installations />
        </Suspense>
      </section>

      <section className="container max-w-[75ch] flex gap-8 md:gap-24 justify-between flex-col md:flex-row md:items-center px-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-sans">Contact</h2>
          <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1">
            <span className="font-medium">Phone</span>
            <span>{home.contact.phone}</span>
            <span className="font-medium">Email</span>
            <a className="underline" href={`mailto:${home.contact.email}`}>
              {home.contact.email}
            </a>
          </div>
        </div>
        <div className="aspect-3/1 relative size-full">
          <Image
            src={contactImage.url!}
            alt={contactImage.alt}
            className="object-cover"
            sizes="50vw"
            fill={true}
          />
        </div>
      </section>
    </main>
  )
}
