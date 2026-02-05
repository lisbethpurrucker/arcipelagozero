import page from './page'
import textBlock from './textBlock'
import imageBlock from './imageBlock'
import mixedBlock from './mixedBlock'
import videoBlock from './videoBlock'
import galleryBlock from './galleryBlock'
import carouselBlock from './carouselBlock'
import embedBlock from './embedBlock'
import quoteBlock from './quoteBlock'
import ctaBlock from './ctaBlock'
import spacerBlock from './spacerBlock'
import siteSettings from './siteSettings'
import socialLink from './socialLink'

export const schemaTypes = [
  // Singleton
  siteSettings,

  // Document types
  page,

  // Block types
  textBlock,
  imageBlock,
  mixedBlock,
  videoBlock,
  galleryBlock,
  carouselBlock,
  embedBlock,
  quoteBlock,
  ctaBlock,
  spacerBlock,

  // Object types
  socialLink,
]
