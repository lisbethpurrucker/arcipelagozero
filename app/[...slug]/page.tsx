import { sanityFetch, urlFor } from '@/lib/sanity'
import { Page } from '@/lib/types'
import ContentBlock from '@/components/ContentBlock'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'

// Must match the nav bar heights in Navigation.tsx
const NAV = 'h-20 sm:h-14 md:h-20'
const NAV_NEG = '-mt-20 sm:-mt-14 md:-mt-20'

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
  headerImageHeight,
  contentBlocks[]
}`

const heightClasses: Record<string, string> = {
  auto:       'h-[40vh]',
  short:      'h-[40vh]',
  medium:     'h-[55vh]',
  tall:       'h-[75vh]',
  fullscreen: 'h-dvh-safe',
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug: slugArray } = await params

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

  if (page.isNavParentOnly) {
    redirect('/')
  }

  const hasHero = Boolean(page.headerImage?.asset)
  const heightClass = heightClasses[page.headerImageHeight ?? 'auto'] ?? heightClasses.auto

  return (
    <div>
      {hasHero && (() => {
        const hotspot = page.headerImage!.hotspot
        const objectPosition = hotspot
          ? `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`
          : 'center center'
        return (
          /* Hero section — transparent nav overlay */
          <div className="relative">
            <div className={`sticky top-0 ${NAV} z-40 pointer-events-none`} />
            <div className={`relative ${NAV_NEG} ${heightClass} overflow-hidden`}>
              <Image
                src={urlFor(page.headerImage!).width(2400).quality(90).url()}
                alt={page.headerImage!.alt || page.title || 'Header image'}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition }}
                priority
              />
            </div>
          </div>
        )
      })()}

      {/* Content section — white sticky blocker makes nav appear white */}
      <div className="relative">
        <div className={`sticky top-0 ${NAV} z-40 bg-white pointer-events-none`} />
        <div className="max-w-5xl mx-auto px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 lg:px-12">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {page.contentBlocks?.map((block) => (
              <ContentBlock key={block._key} block={block} />
            )) || (
              <div className="bg-sand p-6 sm:p-8 md:p-10 lg:p-12 rounded-sm">
                <p className="text-xs sm:text-sm">Page content will appear here once configured in Sanity Studio.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

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
