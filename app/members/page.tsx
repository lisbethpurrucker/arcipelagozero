import { sanityFetch } from '@/lib/sanity'
import MembersClient from './MembersClient'

interface Member {
  _id: string
  name: string
  category: string
  bio?: string
  photo?: {
    asset: { _ref: string }
    alt?: string
  }
  order: number
}

// Placeholder data
const placeholderMembers: Member[] = [
  { _id: '1', name: 'NameSurname #1', category: 'CATEGORY A', order: 1 },
  { _id: '2', name: 'Name Surname #2', category: 'CATEGORY A', order: 2 },
  { _id: '3', name: 'Name Surname #3', category: 'CATEGORY A', order: 3 },
  { _id: '4', name: 'Name Surname #4', category: 'CATEGORY A', order: 4 },
  { 
    _id: '5', 
    name: 'Name Surname #5', 
    category: 'CATEGORY A', 
    bio: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio.',
    order: 5 
  },
  { _id: '6', name: 'Name Surname #1', category: 'CATEGORY B', order: 1 },
  { _id: '7', name: 'Name Surname #2', category: 'CATEGORY B', order: 2 },
  { _id: '8', name: 'Name Surname #3', category: 'CATEGORY B', order: 3 },
  { _id: '9', name: 'Name surname #1', category: 'CATEGORY B', order: 4 },
  { _id: '10', name: 'Name surname #1', category: 'CATEGORY B', order: 5 },
  { _id: '11', name: 'Name surname #1', category: 'CATEGORY B', order: 6 },
]

const query = `*[_type == "member"] | order(category asc, order asc) {
  _id,
  name,
  category,
  bio,
  photo{
    asset,
    alt
  },
  order
}`

export default async function MembersPage() {
  let members: Member[] = placeholderMembers
  
  try {
    const sanityMembers = await sanityFetch({ query, tags: ['member'] })
    if (Array.isArray(sanityMembers) && sanityMembers.length > 0) {
      members = sanityMembers as Member[]
    }
  } catch (error) {
    console.log('Using placeholder data')
  }

  return <MembersClient members={members} />
}