'use client'

import { motion } from 'motion/react'
import type React from 'react'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  x?: number
  y?: number
}

export function FadeIn({ children, className, delay = 0, x = 0, y = 20 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
