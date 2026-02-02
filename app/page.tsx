import { sanityFetch } from '@/lib/sanity'
import { Page } from '@/lib/types'
import ContentBlock from '@/components/ContentBlock'

const query = `*[_type == "page" && slug.current == "home"][0]{
  _id,
  title,
  slug,
  contentBlocks[]
}`

export default async function Home() {
  const page: Page | null = await sanityFetch({ query, tags: ['page'] })

  if (!page) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-teal-dark opacity-60">
          No content yet — create a &ldquo;home&rdquo; page in Sanity Studio.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {page.contentBlocks?.map((block) => (
          <ContentBlock key={block._key} block={block} />
        ))}
      </div>
    </div>
  )
}