import { ContentBlock as ContentBlockType } from '@/lib/types'
import Image from 'next/image'

interface ContentBlockProps {
  block: ContentBlockType
}

export default function ContentBlock({ block }: ContentBlockProps) {
  const bgColorClasses = {
    teal: 'bg-teal-dark text-white',
    cream: 'bg-cream text-gray-900',
    white: 'bg-white text-gray-900 border border-gray-200',
  }

  const bgClass = block.backgroundColor
    ? bgColorClasses[block.backgroundColor]
    : 'bg-white text-gray-900 border border-gray-200'

  if (block._type === 'textBlock') {
    return (
      <div className={`p-10 rounded-sm ${bgClass}`}>
        <div className="prose max-w-none">
          <p className="text-xs leading-relaxed whitespace-pre-wrap font-light">
            {block.text}
          </p>
        </div>
      </div>
    )
  }

  if (block._type === 'imageBlock') {
    return (
      <div className={`aspect-[4/3] rounded-sm overflow-hidden ${bgClass}`}>
        {block.image ? (
          <Image
            src={block.image.asset._ref}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {block.image && (
          <div className={`aspect-[4/3] rounded-sm overflow-hidden ${bgClass}`}>
            <Image
              src={block.image.asset._ref}
              alt={block.image.alt || ''}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {block.text && (
          <div className={`p-8 rounded-sm flex items-center ${bgClass}`}>
            <p className="text-xs leading-relaxed whitespace-pre-wrap font-light">
              {block.text}
            </p>
          </div>
        )}
      </div>
    )
  }

  return null
}