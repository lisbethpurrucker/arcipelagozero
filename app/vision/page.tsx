import { sanityFetch, urlFor } from '@/lib/sanity'
import { Page } from '@/lib/types'
import ContentBlock from '@/components/ContentBlock'
import Image from 'next/image'

const query = `*[_type == "page" && slug.current == "vision"][0]{
  _id,
  title,
  slug,
  headerImage{
    asset,
    alt,
    crop,
    hotspot
  },
  contentBlocks[]
}`

export default async function Vision() {
  const page: Page | null = await sanityFetch({ query, tags: ['page'] })

  return (
    <div>
      {/* Header Image */}
      {page?.headerImage && (
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen -mt-6 sm:-mt-8 md:-mt-10 lg:-mt-12 mb-6 sm:mb-8 md:mb-10 h-[25vh] sm:h-[30vh] md:h-[35vh] overflow-hidden">
          <Image
            src={urlFor(page.headerImage).width(1440).fit('crop').url()}
            alt={page.headerImage.alt || page.title || 'Header image'}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      )}

      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        {page?.contentBlocks?.map((block) => (
          <ContentBlock key={block._key} block={block} />
        )) || (
          <div className="bg-sand p-6 sm:p-8 md:p-10 lg:p-12 rounded-sm">
            <p className="text-xs sm:text-sm">Vision page content will appear here once configured in Sanity Studio.</p>
          </div>
        )}
      </div>
    </div>
  )
}
