import { sanityFetch } from '@/lib/sanity'
import Navigation from './Navigation'

export interface NavItem {
  label: string
  href: string
  isNavParentOnly?: boolean
  children?: NavItem[]
}

export interface SocialLink {
  platform: string
  url: string
  showInNav: boolean
}

interface PageNavData {
  _id: string
  label: string
  slug: string
  navOrder: number
  isNavParentOnly?: boolean
  parentId?: string
  parentSlug?: string
}

interface SiteSettings {
  socialLinks?: SocialLink[]
}

const pagesQuery = `*[_type == "page" && isPublished == true && showInNav == true] {
  _id,
  "label": coalesce(navLabel, title),
  "slug": slug.current,
  navOrder,
  isNavParentOnly,
  "parentId": parent._ref,
  "parentSlug": parent->slug.current
}`

const settingsQuery = `*[_type == "siteSettings"][0] {
  socialLinks[] {
    platform,
    url,
    showInNav
  }
}`

function buildNavHierarchy(pages: PageNavData[]): NavItem[] {
  // Separate top-level pages from children
  const topLevel = pages.filter(p => !p.parentId)
  const children = pages.filter(p => p.parentId)

  // Build map of parent ID to children
  const childrenByParent = new Map<string, PageNavData[]>()
  for (const child of children) {
    const existing = childrenByParent.get(child.parentId!) || []
    existing.push(child)
    childrenByParent.set(child.parentId!, existing)
  }

  // Convert to NavItem structure
  const navItems: NavItem[] = topLevel
    .sort((a, b) => (a.navOrder ?? 0) - (b.navOrder ?? 0))
    .map(page => {
      const pageChildren = childrenByParent.get(page._id) || []
      const sortedChildren = pageChildren.sort((a, b) => (a.navOrder ?? 0) - (b.navOrder ?? 0))

      const item: NavItem = {
        label: page.label,
        href: `/${page.slug}`,
        isNavParentOnly: page.isNavParentOnly,
      }

      if (sortedChildren.length > 0) {
        item.children = sortedChildren.map(child => ({
          label: child.label,
          href: `/${page.slug}/${child.slug}`,
        }))
      }

      return item
    })

  return navItems
}

export default async function NavigationWrapper() {
  let navItems: NavItem[] = []
  let settings: SiteSettings = {}

  try {
    const [pages, siteSettings] = await Promise.all([
      sanityFetch<PageNavData[]>({ query: pagesQuery, tags: ['page'] }),
      sanityFetch<SiteSettings | null>({ query: settingsQuery, tags: ['siteSettings'] })
    ])

    navItems = buildNavHierarchy(pages || [])
    settings = siteSettings || {}
  } catch (error) {
    console.log('Failed to fetch nav data from Sanity')
  }

  // Filter social links to only those that should show in nav
  const navSocialLinks = (settings.socialLinks || []).filter(link => link.showInNav !== false)

  return (
    <Navigation
      navItems={navItems}
      socialLinks={navSocialLinks}
    />
  )
}
