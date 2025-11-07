'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { Media } from '@/payload-types'
import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'

export default function PhotoCarousel({ images }: { images: Media[] }) {
  return (
    <Carousel
      plugins={[AutoScroll({ speed: 0.8 })]}
      className="w-full"
      opts={{ align: 'start', loop: true }}
    >
      <CarouselContent>
        {images.map((img) => {
          return (
            <CarouselItem className="basis-1/4 h-60" key={img.url!}>
              <div className="relative w-full h-full">
                <Image src={img.url!} alt={img.alt} objectFit="cover" fill={true} />
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}
