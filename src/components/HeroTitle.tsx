'use client'

import { motion } from 'motion/react'

interface HeroTitleProps {
  title?: string | null
  descriptor?: string | null
}

export function HeroTitle({ title, descriptor }: HeroTitleProps) {
  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
      {title && (
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-primary-foreground tracking-tight"
        >
          {title}
        </motion.h1>
      )}
      {descriptor && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-4 text-sm md:text-base uppercase tracking-[0.3em] text-primary-foreground/80"
        >
          {descriptor}
        </motion.p>
      )}
    </div>
  )
}
