import { sanityFetch } from '@/lib/sanity'
import { Page } from '@/lib/types'
import ContentBlock from '@/components/ContentBlock'

const query = `*[_type == "page" && slug.current == "journey"][0]{
  _id,
  title,
  slug,
  contentBlocks[]
}`

export default async function Journey() {
  const page: Page | null = await sanityFetch({ query, tags: ['page'] })

  return (
    <div>
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        {page?.contentBlocks?.map((block) => (
          <ContentBlock key={block._key} block={block} />
        )) || (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            <div className="bg-teal-dark aspect-square rounded-sm"></div>
            <div className="bg-cream aspect-square rounded-sm"></div>
            <div className="bg-white border border-gray-200 aspect-square rounded-sm"></div>
          </div>
        )}
      </div>
    </div>
  )
}
