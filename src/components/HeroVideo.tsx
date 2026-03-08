import { HeroTitle } from './HeroTitle'

interface HeroVideoProps {
  videoUrl?: string | null
  videoMimeType?: string | null
  fallbackImageUrl?: string | null
  fallbackImageAlt?: string
  title?: string | null
  descriptor?: string | null
}

export function HeroVideo({
  videoUrl,
  videoMimeType,
  fallbackImageUrl,
  fallbackImageAlt,
  title,
  descriptor,
}: HeroVideoProps) {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-foreground">
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={fallbackImageUrl ?? undefined}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoUrl} type={videoMimeType ?? 'video/mp4'} />
        </video>
      ) : fallbackImageUrl ? (
        <img
          src={fallbackImageUrl}
          alt={fallbackImageAlt ?? ''}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      <div className="absolute inset-0 bg-foreground/30" />

      <HeroTitle title={title} descriptor={descriptor} />
    </section>
  )
}
