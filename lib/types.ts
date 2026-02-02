export type PortableTextBlock = {
  _key: string
  _type: 'block'
  children: { _key: string; _type: string; text: string; marks?: string[] }[]
  markDefs?: { _key: string; _type: string; href?: string }[]
  style?: string
}

export interface ContentBlock {
  _key: string
  _type: 'textBlock' | 'imageBlock' | 'videoBlock' | 'galleryBlock' | 'embedBlock' | 'mixedBlock' | 'quoteBlock' | 'ctaBlock' | 'spacerBlock'
  text?: PortableTextBlock[]
  quote?: PortableTextBlock[]
  image?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
}

export interface Page {
  _id: string
  _type: 'page'
  title: string
  slug: {
    current: string
  }
  headerImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  contentBlocks?: ContentBlock[]
}

