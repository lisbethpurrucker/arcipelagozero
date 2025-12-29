import { sanityFetch } from '@/lib/sanity'
import { Page } from '@/lib/types'
import PageHeader from '@/components/PageHeader'
import ContentBlock from '@/components/ContentBlock'

const query = `*[_type == "page" && slug.current == "stays"][0]{
  _id,
  title,
  slug,
  contentBlocks[]
}`

export default async function Stays() {
  const page: Page | null = await sanityFetch({ query, tags: ['page'] })

  return (
    <div>
      <PageHeader title={page?.title || 'Stays'} />
      <div className="space-y-8">
        {page?.contentBlocks?.map((block) => (
          <ContentBlock key={block._key} block={block} />
        )) || (
          <div className="bg-cream p-12 rounded-sm">
            <p className="text-sm">Stays page content will appear here once configured in Sanity Studio.</p>
          </div>
        )}
      </div>
    </div>
  )
}
