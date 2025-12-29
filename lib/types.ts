export interface ContentBlock {
  _key: string
  _type: 'textBlock' | 'imageBlock' | 'mixedBlock'
  text?: string
  backgroundColor?: 'teal' | 'cream' | 'white'
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
  contentBlocks?: ContentBlock[]
}

export interface CRMContact {
  _id: string
  _type: 'crmContact'
  name: string
  email: string
  phone?: string
  notes?: string
  status: 'new' | 'contacted' | 'active' | 'archived'
  dateAdded: string
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  title: string
  description: string
}
