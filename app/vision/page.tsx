import { sanityFetch } from '@/lib/sanity'
import { Page } from '@/lib/types'
import ContentBlock from '@/components/ContentBlock'
import Image from 'next/image'

const query = `*[_type == "page" && slug.current == "vision"][0]{
  _id,
  title,
  slug,
  headerImage{
    asset,
    alt
  },
  contentBlocks[]
}`

// Convert Sanity image reference to CDN URL
function getSanityImageUrl(ref: string): string {
  const [, id, dimensions, format] = ref.match(/image-([a-f0-9]+)-(\d+x\d+)-(\w+)/) || []
  if (!id) return ''
  return `https://cdn.sanity.io/images/jpgrzyq0/production/${id}-${dimensions}.${format}`
}

export default async function Vision() {
  const page: Page | null = await sanityFetch({ query, tags: ['page'] })

  return (
    <div>
      {/* Header Image */}
      {page?.headerImage && (
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen mb-6 sm:mb-8 md:mb-10 aspect-[16/9] overflow-hidden">
          <Image
            src={getSanityImageUrl(page.headerImage.asset._ref)}
            alt={page.headerImage.alt || page.title || 'Header image'}
            width={1920}
            height={823}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      )}

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
