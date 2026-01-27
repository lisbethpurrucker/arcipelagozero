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
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {/* Hero text block - large intro text */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-teal-dark font-medium">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-teal-dark font-medium mt-4">
              Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
            </p>
          </div>

          {/* First section - text + image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-dark">TITLE</h3>
              <p className="text-sm sm:text-base leading-relaxed text-teal-dark font-light">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio
              </p>
              <a href="#" className="text-sm sm:text-base font-medium text-teal-dark underline hover:no-underline inline-block">
                Call to action
              </a>
            </div>
            <div className="bg-teal-dark rounded-sm aspect-video flex items-center justify-center p-4">
              <a href="#" className="text-white text-sm sm:text-base font-medium underline hover:no-underline text-center">
                in some cases photo can be a link
              </a>
            </div>
          </div>

          {/* Color blocks row */}
          <div className="grid grid-cols-2 gap-0 mb-6 sm:mb-8 md:mb-10">
            <div className="bg-teal-dark aspect-square"></div>
            <div className="bg-sand aspect-square"></div>
          </div>

          {/* Another text section */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-dark mb-3 sm:mb-4">TITLE</h3>
            <p className="text-sm sm:text-base leading-relaxed text-teal-dark font-light max-w-3xl">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.
            </p>
          </div>

          {/* Text + sand block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
            <div className="bg-sand aspect-video"></div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-dark">TITLE</h3>
              <p className="text-sm sm:text-base leading-relaxed text-teal-dark font-light">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          {/* Three color blocks */}
          <div className="grid grid-cols-3 gap-0 mb-6 sm:mb-8 md:mb-10">
            <div className="bg-sand aspect-[3/4]"></div>
            <div className="bg-sand aspect-[3/4]"></div>
            <div className="bg-teal-dark aspect-[3/4]"></div>
          </div>

          {/* Text section */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-dark mb-3 sm:mb-4">TITLE</h3>
            <p className="text-sm sm:text-base leading-relaxed text-teal-dark font-light max-w-3xl">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>

          {/* Large sand block */}
          <div className="bg-sand aspect-[2/1] mb-6 sm:mb-8 md:mb-10"></div>

          {/* Final text section */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-dark mb-3 sm:mb-4">TITLE</h3>
            <p className="text-sm sm:text-base leading-relaxed text-teal-dark font-light max-w-3xl">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>

          {/* Bottom two blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-teal-dark aspect-video"></div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-dark">TITLE</h3>
              <p className="text-sm sm:text-base leading-relaxed text-teal-dark font-light">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exercitation.
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