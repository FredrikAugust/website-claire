'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { Media } from '@/payload-types'
import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'

export default function PhotoCarousel({ images }: { images: Media[] }) {
  return (
    <Carousel
      plugins={[AutoScroll({ speed: 0.8, startDelay: 0 })]}
      className="w-full"
      opts={{ align: 'start', loop: true }}
    >
      <CarouselContent>
        {images.map((img) => {
          return (
            <CarouselItem className="basis-1/3 md:basis-1/4 h-80" key={img.url!}>
              <div className="relative w-full h-full">
                <Image
                  loading="eager"
                  src={img.url!}
                  alt={img.alt}
                  className="object-cover"
                  fill={true}
                  sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw"
                />
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}
