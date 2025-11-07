import type { Metadata } from 'next'
import type React from 'react'
import './globals.css'

export const metadata: Metadata = {
  description: "Claire Foody's personal website",
  title: 'Claire Foody',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="w-screen">{children}</body>
    </html>
  )
}
