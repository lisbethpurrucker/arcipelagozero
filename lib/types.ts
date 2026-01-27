export interface ContentBlock {
  _key: string
  _type: 'textBlock' | 'imageBlock' | 'mixedBlock'
  text?: string
  backgroundColor?: 'teal' | 'sand' | 'white'
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

