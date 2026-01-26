import { ContentBlock as ContentBlockType } from '@/lib/types'
import Image from 'next/image'

interface ContentBlockProps {
  block: ContentBlockType
}

// Convert Sanity image reference to CDN URL
function getSanityImageUrl(ref: string): string {
  const [, id, dimensions, format] = ref.match(/image-([a-f0-9]+)-(\d+x\d+)-(\w+)/) || []
  if (!id) return ''
  return `https://cdn.sanity.io/images/jpgrzyq0/production/${id}-${dimensions}.${format}`
}

export default function ContentBlock({ block }: ContentBlockProps) {
  const bgColorClasses = {
    teal: 'bg-teal-dark text-white',
    cream: 'bg-cream text-teal-dark',
    white: 'bg-white text-teal-dark',
  }

  const bgClass = block.backgroundColor
    ? bgColorClasses[block.backgroundColor]
    : 'bg-white text-teal-dark'

  if (block._type === 'textBlock') {
    return (
      <div className={`p-4 sm:p-6 md:p-8 lg:p-10 ${bgClass}`}>
        <div className="prose max-w-none">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-wrap font-light">
            {block.text}
          </p>
        </div>
      </div>
    )
  }

  if (block._type === 'imageBlock') {
    return (
      <div className={`aspect-[4/3] overflow-hidden ${bgClass}`}>
        {block.image ? (
          <Image
            src={getSanityImageUrl(block.image.asset._ref)}
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

  if (block._type === 'mixedBlock') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        {block.image && (
          <div className={`aspect-[4/3] overflow-hidden ${bgClass}`}>
            <Image
              src={getSanityImageUrl(block.image.asset._ref)}
              alt={block.image.alt || ''}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {block.text && (
          <div className={`p-4 sm:p-6 md:p-8 flex items-center ${bgClass}`}>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-wrap font-light">
              {block.text}
            </p>
          </div>
        )}
      </div>
    )
  }

  return null
}