import page from './page'
import textBlock from './textBlock'
import imageBlock from './imageBlock'
import mixedBlock from './mixedBlock'
import agendaItem from './agendaItem'
import member from './member'

export const schemaTypes = [
  // Document types
  page,
  agendaItem,
  member,

  // Block types
  textBlock,
  imageBlock,
  mixedBlock,
]