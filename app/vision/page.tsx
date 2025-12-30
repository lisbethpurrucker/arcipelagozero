import { sanityFetch } from '@/lib/sanity'
import { Page } from '@/lib/types'
import PageHeader from '@/components/PageHeader'
import ContentBlock from '@/components/ContentBlock'

const query = `*[_type == "page" && slug.current == "vision"][0]{
  _id,
  title,
  slug,
  contentBlocks[]
}`

export default async function Vision() {
  const page: Page | null = await sanityFetch({ query, tags: ['page'] })

  return (
    <div>
      <PageHeader title={page?.title || 'Vision'} />
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        {page?.contentBlocks?.map((block) => (
          <ContentBlock key={block._key} block={block} />
        )) || (
          <div className="bg-cream p-6 sm:p-8 md:p-10 lg:p-12 rounded-sm">
            <p className="text-xs sm:text-sm">Vision page content will appear here once configured in Sanity Studio.</p>
          </div>
        )}
      </div>
    </div>
  )
}
