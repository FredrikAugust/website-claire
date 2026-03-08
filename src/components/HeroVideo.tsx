import Image from 'next/image'

interface HeroVideoProps {
  videoUrl?: string | null
  videoMimeType?: string | null
  fallbackImageUrl?: string | null
  fallbackImageAlt?: string
}

export function HeroVideo({
  videoUrl,
  videoMimeType,
  fallbackImageUrl,
  fallbackImageAlt,
}: HeroVideoProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-foreground">
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={fallbackImageUrl ?? undefined}
          className="absolute inset-0 h-full w-full object-cover grayscale"
        >
          <source src={videoUrl} type={videoMimeType ?? 'video/mp4'} />
        </video>
      ) : fallbackImageUrl ? (
        <Image
          src={fallbackImageUrl}
          alt={fallbackImageAlt ?? ''}
          fill
          className="object-cover grayscale"
          priority
        />
      ) : null}

      <div className="absolute inset-0 bg-foreground/30" />
    </section>
  )
}
