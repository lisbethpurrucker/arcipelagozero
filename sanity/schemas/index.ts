import page from './page'
import textBlock from './textBlock'
import imageBlock from './imageBlock'
import mixedBlock from './mixedBlock'
import crmContact from './crmContact'
import siteSettings from './siteSettings'
import agendaItem from './agendaItem'
import member from './member'

export const schemaTypes = [
  // Document types
  page,
  crmContact,
  siteSettings,
  agendaItem,
  member,

  // Block types
  textBlock,
  imageBlock,
  mixedBlock,
]