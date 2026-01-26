'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface AgendaItem {
  _id: string
  title: string
  content: string
  callToAction?: {
    text: string
    url: string
  }
  carouselImages?: Array<{
    asset: { _ref: string }
    alt?: string
  }>
  order: number
}

// Convert Sanity image reference to CDN URL
function getSanityImageUrl(ref: string): string {
  const [, id, dimensions, format] = ref.match(/image-([a-f0-9]+)-(\d+x\d+)-(\w+)/) || []
  if (!id) return ''
  return `https://cdn.sanity.io/images/jpgrzyq0/production/${id}-${dimensions}.${format}`
}

function Carousel({ images }: { images: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [images])

  if (!images || images.length === 0) {
    return (
      <div className="bg-teal-dark rounded-sm aspect-video flex items-center justify-center p-4">
        <p className="text-white text-xs sm:text-sm font-light text-center">Auto swiping photo carousel</p>
      </div>
    )
  }

  return (
    <div className="relative bg-teal-dark rounded-sm aspect-video overflow-hidden">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-500 ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={getSanityImageUrl(img.asset._ref)}
            alt={img.alt || ''}
            fill
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              idx === currentIndex ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function AccordionItem({
  item,
  isOpen,
  onToggle
}: {
  item: AgendaItem
  isOpen: boolean
  onToggle: () => void
}) {
  const hasCarousel = item.carouselImages && item.carouselImages.length > 0

  return (
    <div>
      {/* Closed state - title only */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="w-full text-center py-3 sm:py-4 md:py-5"
        >
          <h3 className="text-sm sm:text-base text-teal-dark font-normal">
            {item.title}
          </h3>
        </button>
      )}

      {/* Expanded state - full width with title inside */}
      {isOpen && (
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <div
            className="relative overflow-hidden"
            style={{
              backgroundImage: 'url(/images/pattern-lines-rotated.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'top center'
            }}
          >
            {/* Title inside expanded area */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <button
                onClick={onToggle}
                className="w-full text-center py-3 sm:py-4 md:py-5"
              >
                <h3 className="text-sm sm:text-base text-teal-dark font-bold">
                  {item.title}
                </h3>
              </button>
            </div>

            <div className={`grid grid-cols-1 ${hasCarousel ? 'md:grid-cols-2' : ''} gap-0 max-w-5xl mx-auto pb-6 sm:pb-8 md:pb-10`}>
              {/* Text content */}
              <div className={`px-4 sm:px-6 md:px-8 lg:px-12 ${hasCarousel ? 'mb-6 md:mb-0' : ''}`}>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-teal-dark font-light mb-4 sm:mb-6 whitespace-pre-wrap">
                  {item.content}
                </p>
                {item.callToAction && (
                  <a
                    href={item.callToAction.url}
                    className="text-sm sm:text-base font-medium text-teal-dark underline hover:no-underline inline-block"
                  >
                    {item.callToAction.text}
                  </a>
                )}
              </div>

              {/* Carousel */}
              {hasCarousel && (
                <div className="px-4 sm:px-6 md:px-8 lg:px-12 md:pl-0">
                  <Carousel images={item.carouselImages!} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AgendaPage({
  newsItems
}: {
  newsItems: AgendaItem[]
}) {
  const [openItem, setOpenItem] = useState<string | null>(
    newsItems[0]?._id || null
  )

  return (
    <div>
      <div className="bg-white">
        {newsItems.length > 0 ? (
          newsItems.map((item) => (
            <AccordionItem
              key={item._id}
              item={item}
              isOpen={openItem === item._id}
              onToggle={() => setOpenItem(openItem === item._id ? null : item._id)}
            />
          ))
        ) : (
          <div className="p-4 sm:p-6 md:p-8 text-center">
            <p className="text-xs sm:text-sm text-teal-dark">
              No agenda items yet. Add some in Sanity Studio!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}