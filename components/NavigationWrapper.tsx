import { sanityFetch } from '@/lib/sanity'
import Navigation from './Navigation'

export interface NavItem {
  label: string
  href: string
  order: number
}

interface SiteSettings {
  showAgenda?: boolean
  agendaLabel?: string
  agendaOrder?: number
  showStays?: boolean
  staysLabel?: string
  staysOrder?: number
  showJourney?: boolean
  journeyLabel?: string
  journeyOrder?: number
  showMembers?: boolean
  membersLabel?: string
  membersOrder?: number
  instagramUrl?: string
  showInstagram?: boolean
}

const pagesQuery = `*[_type == "page" && isPublished == true && showInNav == true] | order(navOrder asc) {
  "label": coalesce(navLabel, title),
  "href": "/" + slug.current,
  "order": navOrder
}`

const settingsQuery = `*[_type == "siteSettings"][0] {
  showAgenda,
  agendaLabel,
  agendaOrder,
  showStays,
  staysLabel,
  staysOrder,
  showJourney,
  journeyLabel,
  journeyOrder,
  showMembers,
  membersLabel,
  membersOrder,
  instagramUrl,
  showInstagram
}`

export default async function NavigationWrapper() {
  let navItems: NavItem[] = []
  let settings: SiteSettings = {}

  try {
    const [pages, siteSettings] = await Promise.all([
      sanityFetch<NavItem[]>({ query: pagesQuery, tags: ['page'] }),
      sanityFetch<SiteSettings | null>({ query: settingsQuery, tags: ['siteSettings'] })
    ])

    navItems = pages || []
    settings = siteSettings || {}
  } catch (error) {
    console.log('Failed to fetch nav data from Sanity')
  }

  // Add special pages based on settings (with defaults if no settings exist)
  const specialPages: NavItem[] = []

  if (settings.showAgenda !== false) {
    specialPages.push({
      label: settings.agendaLabel || 'Agenda',
      href: '/agenda',
      order: settings.agendaOrder ?? 20
    })
  }

  if (settings.showStays !== false) {
    specialPages.push({
      label: settings.staysLabel || 'Stays',
      href: '/stays',
      order: settings.staysOrder ?? 30
    })
  }

  if (settings.showJourney !== false) {
    specialPages.push({
      label: settings.journeyLabel || 'Journey',
      href: '/journey',
      order: settings.journeyOrder ?? 40
    })
  }

  if (settings.showMembers !== false) {
    specialPages.push({
      label: settings.membersLabel || 'Members',
      href: '/members',
      order: settings.membersOrder ?? 50
    })
  }

  // Combine and sort all nav items by order
  const allNavItems = [...navItems, ...specialPages].sort((a, b) => a.order - b.order)

  // Remove order from final items (not needed by Navigation component)
  const finalNavItems = allNavItems.map(({ label, href }) => ({ label, href }))

  return (
    <Navigation
      navItems={finalNavItems}
      instagramUrl={settings.instagramUrl || 'https://instagram.com'}
      showInstagram={settings.showInstagram !== false}
    />
  )
}
