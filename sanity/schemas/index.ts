import page from './page'
import textBlock from './textBlock'
import imageBlock from './imageBlock'
import mixedBlock from './mixedBlock'
import crmContact from './crmContact'
import siteSettings from './siteSettings'
import newsItem from './newsItem'
import member from './member'

export const schemaTypes = [
  // Document types
  page,
  crmContact,
  siteSettings,
  newsItem,
  member,

  // Block types
  textBlock,
  imageBlock,
  mixedBlock,
]