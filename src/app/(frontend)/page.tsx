import type { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { getPayload } from 'payload'
import PhotoCarousel from './PhotoCarousel'

export default async function HomePage() {
  const payload = await getPayload({
    config: configPromise,
  })

  const home = await payload.findGlobal({
    slug: 'home',
    depth: 1,
  })

  const heroImage = home.hero.image as Media
  const contactImage = home.contact.image as Media

  return (
    <main className="flex flex-col items-center gap-8 lg:gap-12">
      <header className="container mt-10 lg:mt-20 flex items-center gap-8">
        <div className="size-30 relative shrink-0">
          <Image
            className="aspect-square"
            src={heroImage.url!}
            objectFit="cover"
            fill={true}
            alt={heroImage.alt}
          />
        </div>
        <div>
          <h1>{home.hero.title}</h1>
          <RichText data={home.hero.description} />
        </div>
      </header>

      <PhotoCarousel images={home.carousel as Media[]} />

      <section className="container">
        <h1>About me</h1>
        <RichText data={home.aboutMe.description} />
      </section>

      <section className="container flex gap-24 justify-between items-center">
        <div>
          <h1>Contact</h1>
          <div className="grid grid-cols-[auto_auto] gap-4">
            <span>phone</span>
            <span>home.contact.phone</span>
            <span>email</span>
            <span>{home.contact.email}</span>
          </div>
        </div>
        <div className="aspect-3/1 relative h-full grow">
          <Image src={contactImage.url!} alt={contactImage.alt} objectFit="cover" fill={true} />
        </div>
      </section>
    </main>
  )
}
