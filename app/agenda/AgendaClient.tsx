'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface NewsItem {
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
      <div className="bg-teal-dark rounded-sm aspect-video flex items-center justify-center">
        <p className="text-white text-sm font-light">Auto swiping photo carousel</p>
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
            src={img.asset._ref}
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
  item: NewsItem
  isOpen: boolean
  onToggle: () => void 
}) {
  const hasCarousel = item.carouselImages && item.carouselImages.length > 0

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full text-left py-5 hover:bg-gray-50/30 transition-colors"
      >
        <h3 className="text-base text-gray-600 font-normal">{item.title}</h3>
      </button>
      
      {isOpen && (
        <div className="pb-0">
          <div className="bg-cream rounded-none relative overflow-hidden">
            {/* PNG pattern background */}
            <div 
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: 'url(/images/pattern-lines.png)',
                backgroundRepeat: 'repeat',
                backgroundSize: 'auto'
              }}
            />
            
            <div className={`grid grid-cols-1 ${hasCarousel ? 'md:grid-cols-2' : ''} gap-0 relative z-10`}>
              {/* Text content */}
              <div className="p-10">
                <p className="text-sm leading-relaxed text-gray-700 font-light mb-6 whitespace-pre-wrap">
                  {item.content}
                </p>
                {item.callToAction && (
                  <a
                    href={item.callToAction.url}
                    className="text-sm font-medium text-gray-700 underline hover:no-underline inline-block"
                  >
                    {item.callToAction.text}
                  </a>
                )}
              </div>
              
              {/* Carousel */}
              {hasCarousel && (
                <div className="p-10 pl-0">
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
  newsItems: NewsItem[] 
}) {
  const [openItem, setOpenItem] = useState<string | null>(
    newsItems[newsItems.length - 1]?._id || null
  )

  return (
    <div>
      <h1 className="text-5xl font-black mb-10 text-gray-900 tracking-tight">Agenda</h1>
      
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
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500">
              No news items yet. Add some in Sanity Studio!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}