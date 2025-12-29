import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
})

export async function sanityFetch<T>({
  query,
  tags,
}: {
  query: string
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, {}, { next: { tags } })
}
