import type { Metadata } from 'next'
import type React from 'react'
import './globals.css'

const baseUrl = process.env.SERVER_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Claire Foody',
    template: '%s | Claire Foody',
  },
  description: "Claire Foody's personal website",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: 'Claire Foody',
    description: "Claire Foody's personal website",
    url: '/',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
