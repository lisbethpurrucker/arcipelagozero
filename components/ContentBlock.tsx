'use client'

import Image from 'next/image'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'
import { useState, useEffect, useCallback } from 'react'

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children, value }) => {
      const isEmpty = !value?.children?.some((child: any) => child.text?.trim())
      if (isEmpty) return <div className="h-3" />
      return <p className="mb-3 last:mb-0">{children}</p>
    },
    // Fallbacks for old content with per-paragraph styles
    small: ({ children, value }) => {
      const isEmpty = !value?.children?.some((child: any) => child.text?.trim())
      if (isEmpty) return <div className="h-3" />
      return <p className="mb-3 last:mb-0">{children}</p>
    },
    large: ({ children, value }) => {
      const isEmpty = !value?.children?.some((child: any) => child.text?.trim())
      if (isEmpty) return <div className="h-3" />
      return <p className="mb-3 last:mb-0">{children}</p>
    },
    xlarge: ({ children, value }) => {
      const isEmpty = !value?.children?.some((child: any) => child.text?.trim())
      if (isEmpty) return <div className="h-3" />
      return <p className="mb-3 last:mb-0">{children}</p>
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-teal-dark underline hover:no-underline"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
}

interface ContentBlockProps {
  block: any
}

// Carousel Block Component
function CarouselBlock({ block }: { block: any }) {
  const items = block.items || []
  const itemCount = items.length
  const autoSwipe = block.autoSwipe !== false
  const interval = (block.autoSwipeInterval || 5) * 1000

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }

    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  const maxIndex = Math.max(0, itemCount - itemsPerPage)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  const goToPage = (pageIndex: number) => {
    setCurrentIndex(Math.min(pageIndex, maxIndex))
  }

  // Reset index when itemsPerPage changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [maxIndex, currentIndex])

  // Auto-swipe effect
  useEffect(() => {
    if (!autoSwipe || isPaused || itemCount <= itemsPerPage) return

    const timer = setInterval(goToNext, interval)
    return () => clearInterval(timer)
  }, [autoSwipe, isPaused, interval, goToNext, itemCount, itemsPerPage])

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return

    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrev()
      }
    }

    setTouchStart(null)
  }

  // Calculate number of pages for dots
  const pageCount = Math.max(1, maxIndex + 1)

  return (
    <div
      className="py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel container */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="flex-shrink-0 px-2 sm:px-3"
              style={{ width: `${100 / itemsPerPage}%` }}
            >
              <div className="flex flex-col">
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden rounded-sm mb-4">
                  {item.link ? (
                    <a href={item.link} className="block h-full">
                      <Image
                        src={urlFor(item.image).width(400).height(533).fit('crop').url()}
                        alt={item.title || ''}
                        width={400}
                        height={533}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </a>
                  ) : (
                    <Image
                      src={urlFor(item.image).width(400).height(533).fit('crop').url()}
                      alt={item.title || ''}
                      width={400}
                      height={533}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {/* Subtitle */}
                {item.subtitle && (
                  <p className="text-sm text-center text-teal-dark/70 mb-1">
                    {item.subtitle}
                  </p>
                )}
                {/* Title */}
                {item.title && (
                  <h3 className="text-base sm:text-lg font-bold text-center text-teal-dark uppercase tracking-wide">
                    {item.link ? (
                      <a href={item.link} className="hover:underline">
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      {pageCount > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: pageCount }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                idx === currentIndex
                  ? 'bg-teal-dark'
                  : 'bg-teal-dark/30 hover:bg-teal-dark/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* CTA Button */}
      {block.showButton && block.buttonText && (
        <div className="flex justify-center mt-6">
          <a
            href={block.buttonUrl || '#'}
            className="inline-block bg-gray-500 text-white px-6 py-3 rounded-sm hover:bg-gray-600 transition-colors"
          >
            {block.buttonText}
          </a>
        </div>
      )}
    </div>
  )
}

// Convert Sanity file reference to CDN URL
function getSanityFileUrl(ref: string): string {
  const [, id, format] = ref.match(/file-([a-f0-9]+)-(\w+)/) || []
  if (!id) return ''
  return `https://cdn.sanity.io/files/jpgrzyq0/production/${id}.${format}`
}

// Extract YouTube/Vimeo video ID
function getEmbedUrl(url: string): string | null {
  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }
  return null
}

export default function ContentBlock({ block }: ContentBlockProps) {
  // Text Block
  if (block._type === 'textBlock') {
    const isHero = block.variant === 'hero'
    const textAlignClasses: Record<string, string> = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }
    const fontSizeClasses: Record<string, string> = {
      small: 'text-sm',
      normal: 'text-base',
      large: 'text-lg',
      xlarge: 'text-xl',
    }
    const textAlign = textAlignClasses[block.textAlign] || textAlignClasses.left
    const fontSize = fontSizeClasses[block.fontSize] || fontSizeClasses.normal

    return (
      <div className={`bg-white text-teal-dark ${textAlign} ${isHero ? 'relative -ml-4 sm:-ml-6 md:-ml-8 lg:-ml-12 pr-0 pl-2 sm:pl-3 py-4 sm:py-6 md:py-8 lg:py-10' : 'p-4 sm:p-6 md:p-8 lg:p-10'}`}>
        {block.title && (
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-dark mb-3 sm:mb-4">
            {block.title}
          </h3>
        )}
        <div className={`max-w-none leading-relaxed ${isHero ? 'text-lg sm:text-xl md:text-2xl font-medium' : `${fontSize} font-light`}`}>
          {block.text && <PortableText value={block.text} components={portableTextComponents} />}
        </div>
        {block.callToAction?.text && (
          <a
            href={block.callToAction.url || '#'}
            className="text-sm sm:text-base font-medium text-teal-dark underline hover:no-underline inline-block mt-4"
          >
            {block.callToAction.text}
          </a>
        )}
      </div>
    )
  }

  // Image Block
  if (block._type === 'imageBlock') {
    return (
      <div className="aspect-[4/3] overflow-hidden bg-white text-teal-dark">
        {block.image ? (
          <Image
            src={urlFor(block.image).width(800).height(600).fit('crop').url()}
            alt={block.image.alt || ''}
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs opacity-40 font-light">Image placeholder</span>
          </div>
        )}
      </div>
    )
  }

  // Video Block
  if (block._type === 'videoBlock') {
    return (
      <div className="bg-white text-teal-dark">
        <div className="aspect-video overflow-hidden">
          {block.video?.asset?._ref ? (
            <video
              src={getSanityFileUrl(block.video.asset._ref)}
              className="w-full h-full object-cover"
              controls
              autoPlay={block.autoplay}
              muted={block.autoplay}
              loop={block.loop}
              playsInline
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-teal-dark">
              <span className="text-white text-xs opacity-40 font-light">Video placeholder</span>
            </div>
          )}
        </div>
        {block.caption && (
          <p className="text-xs sm:text-sm mt-2 opacity-70 text-center">{block.caption}</p>
        )}
      </div>
    )
  }

  // Gallery Block
  if (block._type === 'galleryBlock') {
    const columns = block.columns || 3
    const gapClasses: Record<string, string> = {
      none: 'gap-0',
      small: 'gap-1 sm:gap-2',
      medium: 'gap-2 sm:gap-3 md:gap-4',
      large: 'gap-3 sm:gap-4 md:gap-6',
    }
    const gap = gapClasses[block.gap] || gapClasses.medium
    const colClasses: Record<number, string> = {
      2: 'grid-cols-2',
      3: 'grid-cols-2 md:grid-cols-3',
      4: 'grid-cols-2 md:grid-cols-4',
    }

    return (
      <div className="flex justify-center">
        <div className={`grid ${colClasses[columns] || colClasses[3]} ${gap} w-full max-w-5xl`}>
          {block.images?.map((img: any, idx: number) => (
            <div key={idx} className="aspect-square overflow-hidden">
              <Image
                src={urlFor(img).width(400).height(400).fit('crop').url()}
                alt={img.alt || ''}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Carousel Block
  if (block._type === 'carouselBlock') {
    return <CarouselBlock block={block} />
  }

  // Embed Block (Videos, Forms, Other)
  if (block._type === 'embedBlock') {
    const embedType = block.embedType || 'video'

    // For videos, parse YouTube/Vimeo URLs
    if (embedType === 'video') {
      const embedUrl = block.url ? getEmbedUrl(block.url) : null
      const aspectClasses: Record<string, string> = {
        '16/9': 'aspect-video',
        '4/3': 'aspect-[4/3]',
        '1/1': 'aspect-square',
        '9/16': 'aspect-[9/16] max-w-sm mx-auto',
      }
      const aspect = aspectClasses[block.aspectRatio] || aspectClasses['16/9']

      return (
        <div>
          <div className={`${aspect} overflow-hidden bg-teal-dark`}>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white text-xs opacity-40 font-light">Invalid video URL</span>
              </div>
            )}
          </div>
          {block.caption && (
            <p className="text-xs sm:text-sm mt-2 opacity-70 text-center text-teal-dark">{block.caption}</p>
          )}
        </div>
      )
    }

    // For forms and other embeds, use the URL directly
    const heightClasses: Record<string, string> = {
      small: 'h-[400px]',
      medium: 'h-[600px]',
      large: 'h-[800px]',
      xlarge: 'h-[1000px]',
    }
    const height = heightClasses[block.height] || heightClasses.medium

    return (
      <div>
        <div className={`w-full ${height} overflow-hidden`}>
          {block.url ? (
            <iframe
              src={block.url}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-xs font-light">No URL provided</span>
            </div>
          )}
        </div>
        {block.caption && (
          <p className="text-xs sm:text-sm mt-2 opacity-70 text-center text-teal-dark">{block.caption}</p>
        )}
      </div>
    )
  }

  // Mixed Block
  if (block._type === 'mixedBlock') {
    const imageLeft = block.imagePosition === 'left'
    const bgClasses: Record<string, string> = {
      white: 'bg-white',
      sand: 'bg-sand',
      mint: 'bg-mint',
    }
    const bgClass = bgClasses[block.backgroundColor] || bgClasses.white

    const imageEl = block.image && (
      <div className="relative overflow-hidden min-h-[200px]">
        <Image
          src={urlFor(block.image).width(800).fit('crop').url()}
          alt={block.image.alt || ''}
          fill
          className="object-cover object-center"
        />
      </div>
    )

    const textEl = (
      <div className={`flex items-start ${bgClass} text-teal-dark py-2 p-6 sm:p-8 md:p-10`}>
        <div>
          {block.title && (
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-dark mb-3 sm:mb-4">
              {block.title}
            </h3>
          )}
          {block.text && (
            <div className="text-sm sm:text-base md:text-lg leading-relaxed font-light">
              <PortableText value={block.text} components={portableTextComponents} />
            </div>
          )}
          {block.callToAction?.text && (
            <a
              href={block.callToAction.url || '#'}
              className="text-sm sm:text-base font-medium text-teal-dark underline hover:no-underline inline-block mt-4"
            >
              {block.callToAction.text}
            </a>
          )}
        </div>
      </div>
    )

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {imageLeft ? <>{imageEl}{textEl}</> : <>{textEl}{imageEl}</>}
      </div>
    )
  }

  // Quote Block
  if (block._type === 'quoteBlock') {
    return (
      <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-white text-teal-dark">
        <blockquote className="text-center">
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed font-light italic mb-4 sm:mb-6">
            {block.quote && <PortableText value={block.quote} components={portableTextComponents} />}
          </div>
          {(block.author || block.role) && (
            <footer className="text-sm sm:text-base">
              {block.author && <span className="font-medium">{block.author}</span>}
              {block.author && block.role && <span className="opacity-70"> — </span>}
              {block.role && <span className="opacity-70">{block.role}</span>}
            </footer>
          )}
        </blockquote>
      </div>
    )
  }

  // CTA Block
  if (block._type === 'ctaBlock') {
    const alignClasses: Record<string, string> = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }
    const align = alignClasses[block.alignment] || alignClasses.center

    const buttonStyles: Record<string, string> = {
      filled: 'bg-teal-dark text-white hover:bg-teal-dark/90 px-6 py-3',
      outline: 'border-2 border-teal-dark text-teal-dark hover:bg-teal-dark hover:text-white px-6 py-3',
      link: 'text-teal-dark underline hover:no-underline',
    }
    const buttonClass = buttonStyles[block.style] || buttonStyles.filled

    return (
      <div className={`p-6 sm:p-8 md:p-10 bg-white text-teal-dark ${align}`}>
        {block.heading && (
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-teal-dark">
            {block.heading}
          </h3>
        )}
        {block.text && (
          <div className="text-sm sm:text-base md:text-lg leading-relaxed font-light mb-4 sm:mb-6 max-w-2xl mx-auto">
            <PortableText value={block.text} components={portableTextComponents} />
          </div>
        )}
        <a
          href={block.buttonUrl}
          className={`inline-block transition-all ${buttonClass}`}
        >
          {block.buttonText}
        </a>
      </div>
    )
  }

  // Spacer Block
  if (block._type === 'spacerBlock') {
    const sizeClasses: Record<string, string> = {
      small: 'h-4',
      medium: 'h-8',
      large: 'h-16',
      xlarge: 'h-24',
    }
    const size = sizeClasses[block.size] || sizeClasses.medium

    const dividerColors: Record<string, string> = {
      teal: 'border-teal-dark',
      sand: 'border-sand',
      gray: 'border-gray-200',
    }
    const dividerColor = dividerColors[block.dividerColor] || dividerColors.gray

    return (
      <div className={`${size} flex items-center`}>
        {block.showDivider && (
          <div className={`w-full border-t ${dividerColor}`} />
        )}
      </div>
    )
  }

  return null
}
