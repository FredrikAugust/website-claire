import type { MetadataRoute } from 'next'

export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SERVER_URL ?? 'http://localhost:3000'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
