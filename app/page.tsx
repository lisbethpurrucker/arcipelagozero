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
    // Placeholder matching the Figma design layout
    return (
      <div>
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* Hero text block */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <p className="text-[11px] sm:text-xs leading-relaxed text-teal-dark font-light max-w-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>

          {/* First section - text + image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide">TITLE</h3>
              <p className="text-[11px] sm:text-xs leading-relaxed text-teal-dark font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="bg-teal-dark rounded-sm aspect-video flex items-center justify-center p-4">
              <p className="text-white text-[11px] sm:text-xs font-light text-center">In terms consequat lorem ante in sit</p>
            </div>
          </div>

          {/* Color blocks row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
            <div className="bg-teal-dark rounded-sm aspect-square"></div>
            <div className="bg-teal-dark rounded-sm aspect-square"></div>
            <div className="bg-cream rounded-sm aspect-square"></div>
          </div>

          {/* Another text section */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">TITLE</h3>
            <p className="text-[11px] sm:text-xs leading-relaxed text-teal-dark font-light max-w-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
            </p>
          </div>

          {/* Text + cream block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
            <div className="bg-cream rounded-sm aspect-video"></div>
            <div>
              <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">TITLE</h3>
              <p className="text-[11px] sm:text-xs leading-relaxed text-teal-dark font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          {/* Three color blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
            <div className="bg-cream rounded-sm aspect-[3/4]"></div>
            <div className="bg-cream rounded-sm aspect-[3/4]"></div>
            <div className="bg-teal-dark rounded-sm aspect-[3/4]"></div>
          </div>

          {/* Text section */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">TITLE</h3>
            <p className="text-[11px] sm:text-xs leading-relaxed text-teal-dark font-light max-w-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>

          {/* Large cream block */}
          <div className="bg-cream rounded-sm aspect-[2/1] mb-4 sm:mb-5 md:mb-6"></div>

          {/* Final text section */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">TITLE</h3>
            <p className="text-[11px] sm:text-xs leading-relaxed text-teal-dark font-light max-w-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>

          {/* Bottom two blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-teal-dark rounded-sm aspect-video"></div>
            <div>
              <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">TITLE</h3>
              <p className="text-[11px] sm:text-xs leading-relaxed text-teal-dark font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
            </div>
          </div>
        </div>
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