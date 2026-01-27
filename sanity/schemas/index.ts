import page from './page'
import textBlock from './textBlock'
import imageBlock from './imageBlock'
import mixedBlock from './mixedBlock'
import videoBlock from './videoBlock'
import galleryBlock from './galleryBlock'
import embedBlock from './embedBlock'
import quoteBlock from './quoteBlock'
import ctaBlock from './ctaBlock'
import spacerBlock from './spacerBlock'
import agendaItem from './agendaItem'
import stayItem from './stayItem'
import journeyItem from './journeyItem'
import member from './member'
import siteSettings from './siteSettings'

export const schemaTypes = [
  // Singleton
  siteSettings,

  // Document types
  page,
  agendaItem,
  stayItem,
  journeyItem,
  member,

  // Block types
  textBlock,
  imageBlock,
  mixedBlock,
  videoBlock,
  galleryBlock,
  embedBlock,
  quoteBlock,
  ctaBlock,
  spacerBlock,
]