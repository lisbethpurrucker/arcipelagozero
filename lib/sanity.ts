import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jpgrzyq0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Disable CDN in development to see content changes immediately
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function sanityFetch<T>({
  query,
  tags,
  params = {},
}: {
  query: string
  tags?: string[]
  params?: Record<string, any>
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      tags,
      revalidate: 0 // Disable caching in development
    }
  })
}
