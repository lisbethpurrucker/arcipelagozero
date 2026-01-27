import { sanityFetch } from '@/lib/sanity'
import AccordionList, { AccordionItem } from '@/components/AccordionList'

// Placeholder data
const placeholderStays: AccordionItem[] = [
  {
    _id: '1',
    title: 'Stay#1 Title',
    content: 'Content for stay item 1. Add real content through Sanity Studio.',
    order: 1
  },
  {
    _id: '2',
    title: 'Stay#2 Title',
    content: 'Content for stay item 2. Add real content through Sanity Studio.',
    order: 2
  },
  {
    _id: '3',
    title: 'Stay#3 Title',
    content: 'Content for stay item 3. Add real content through Sanity Studio.',
    order: 3
  },
  {
    _id: '4',
    title: 'Stay#4 Title',
    content: 'Content for stay item 4. Add real content through Sanity Studio.',
    order: 4
  },
  {
    _id: '5',
    title: 'Stay#5 Title',
    content: 'Content for stay item 5. Add real content through Sanity Studio.',
    order: 5
  },
  {
    _id: '6',
    title: 'Stay#6 Title',
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio.',
    callToAction: {
      text: 'Call to action',
      url: '#'
    },
    order: 6,
  },
]

const query = `*[_type == "stayItem"] | order(order asc) {
  _id,
  title,
  content,
  callToAction,
  carouselMedia[]{
    _type,
    asset,
    alt
  },
  order
}`

export default async function StaysPage() {
  let stayItems: AccordionItem[] = placeholderStays

  try {
    const sanityStays: any = await sanityFetch({ query, tags: ['stayItem'] })
    // Only use Sanity data if it's an array with items
    if (Array.isArray(sanityStays) && sanityStays.length > 0) {
      stayItems = sanityStays as AccordionItem[]
    }
  } catch (error) {
    // Stay with placeholder data
    console.log('Using placeholder data')
  }

  return (
    <AccordionList
      items={stayItems}
      emptyMessage="No stay items yet. Add some in Sanity Studio!"
    />
  )
}
