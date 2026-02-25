import { sanityFetch, urlFor } from '@/lib/sanity'
import { Page } from '@/lib/types'
import ContentBlock from '@/components/ContentBlock'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

interface PageWithNavInfo extends Page {
  isNavParentOnly?: boolean
}

const query = `*[_type == "page" && slug.current == $slug && (
  ($parentSlug == "" && !defined(parent)) ||
  (parent->slug.current == $parentSlug)
)][0]{
  _id,
  title,
  slug,
  isNavParentOnly,
  headerImage{
    asset,
    alt,
    crop,
    hotspot
  },
  contentBlocks[]
}`

export default async function DynamicPage({ params }: PageProps) {
  const { slug: slugArray } = await params

  // Handle nested paths: /stays/garden-suite -> ['stays', 'garden-suite']
  const slug = slugArray[slugArray.length - 1]
  const parentSlug = slugArray.length > 1 ? slugArray[slugArray.length - 2] : ''

  const page: PageWithNavInfo | null = await sanityFetch({
    query,
    tags: ['page'],
    params: { slug, parentSlug }
  })

  if (!page) {
    notFound()
  }

  // Redirect nav-parent-only pages to homepage
  if (page.isNavParentOnly) {
    redirect('/')
  }

  return (
    <div>
      {/* Header Image */}
      {page.headerImage?.asset && (
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
        {page.contentBlocks?.map((block) => (
          <ContentBlock key={block._key} block={block} />
        )) || (
          <div className="bg-sand p-6 sm:p-8 md:p-10 lg:p-12 rounded-sm">
            <p className="text-xs sm:text-sm">Page content will appear here once configured in Sanity Studio.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Generate static params for known pages (exclude nav-parent-only pages)
export async function generateStaticParams() {
  const pages = await sanityFetch<{ slug: string; parentSlug: string | null }[]>({
    query: `*[_type == "page" && defined(slug.current) && isNavParentOnly != true]{
      "slug": slug.current,
      "parentSlug": parent->slug.current
    }`,
    tags: ['page']
  })

  return pages.map((page) => ({
    slug: page.parentSlug
      ? [page.parentSlug, page.slug]
      : [page.slug],
  }))
}
