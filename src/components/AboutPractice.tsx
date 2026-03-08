import { RichText } from '@payloadcms/richtext-lexical/react'
import { FadeIn } from './motion/FadeIn'

interface AboutPracticeProps {
  quote?: string | null
  body?: Record<string, unknown> | null
}

export function AboutPractice({ quote, body }: AboutPracticeProps) {
  if (!quote && !body) return null

  return (
    <section className="bg-secondary py-24">
      <div className="mx-auto max-w-4xl px-6">
        {quote && (
          <FadeIn x={-20} y={0}>
            <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl leading-snug tracking-tight text-foreground/90 border-l-2 border-foreground/20 pl-8">
              {quote}
            </blockquote>
          </FadeIn>
        )}
        {body && (
          <FadeIn delay={0.2}>
            <div className="mt-12 max-w-2xl text-muted-foreground leading-relaxed">
              {/* @ts-expect-error -- Payload richText data type mismatch */}
              <RichText data={body} />
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
