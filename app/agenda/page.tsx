import { sanityFetch } from '@/lib/sanity'
import AgendaClient from './AgendaClient'

interface AgendaItem {
  _id: string
  title: string
  content: string
  callToAction?: {
    text: string
    url: string
  }
  carouselImages?: Array<{
    asset: { _ref: string }
    alt?: string
  }>
  order: number
}

// Placeholder data
const placeholderAgenda: AgendaItem[] = [
  { 
    _id: '1', 
    title: 'News#1 Title', 
    content: 'Content for agenda item 1. Add real content through Sanity Studio.',
    order: 1 
  },
  { 
    _id: '2', 
    title: 'News#2 Title', 
    content: 'Content for agenda item 2. Add real content through Sanity Studio.',
    order: 2 
  },
  { 
    _id: '3', 
    title: 'News#3 Title', 
    content: 'Content for agenda item 3. Add real content through Sanity Studio.',
    order: 3 
  },
  { 
    _id: '4', 
    title: 'News#4 Title', 
    content: 'Content for agenda item 4. Add real content through Sanity Studio.',
    order: 4 
  },
  { 
    _id: '5', 
    title: 'News#5 Title', 
    content: 'Content for agenda item 5. Add real content through Sanity Studio.',
    order: 5 
  },
  {
    _id: '6',
    title: 'News#6 Title',
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio.',
    callToAction: {
      text: 'Call to action',
      url: '#'
    },
    order: 6,
  },
]

const query = `*[_type == "agendaItem"] | order(order asc) {
  _id,
  title,
  content,
  callToAction,
  carouselImages[]{
    asset,
    alt
  },
  order
}`

export default async function AgendaPage() {
  let agendaItems: AgendaItem[] = placeholderAgenda

  try {
    const sanityAgenda: any = await sanityFetch({ query, tags: ['agendaItem'] })
    // Only use Sanity data if it's an array with items
    if (Array.isArray(sanityAgenda) && sanityAgenda.length > 0) {
      agendaItems = sanityAgenda as AgendaItem[]
    }
  } catch (error) {
    // Stay with placeholder data
    console.log('Using placeholder data')
  }

  return <AgendaClient newsItems={agendaItems} />
}