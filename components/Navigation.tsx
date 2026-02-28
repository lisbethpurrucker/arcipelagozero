'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Music2,
  Pin,
  Video,
  AtSign,
  Cloud,
  Menu,
  X,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  type LucideIcon
} from 'lucide-react'
import { useState, useEffect } from 'react'

interface NavItem {
  label: string
  href: string
  isNavParentOnly?: boolean
  children?: NavItem[]
}

interface SocialLink {
  platform: string
  url: string
  showInNav: boolean
}

const defaultNavItems: NavItem[] = [
  { label: 'Vision', href: '/vision' },
]

const platformIcons: Record<string, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Music2,
  pinterest: Pin,
  vimeo: Video,
  threads: AtSign,
  bluesky: Cloud,
}

const platformLabels: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'X (Twitter)',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  pinterest: 'Pinterest',
  vimeo: 'Vimeo',
  threads: 'Threads',
  bluesky: 'Bluesky',
}

interface NavigationProps {
  navItems?: NavItem[]
  socialLinks?: SocialLink[]
}

export default function Navigation({ navItems, socialLinks = [] }: NavigationProps) {
  const items = navItems && navItems.length > 0 ? navItems : defaultNavItems
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubMenu, setMobileSubMenu] = useState<NavItem | null>(null)

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const isActive = (href: string) => pathname === href
  const isChildActive = (item: NavItem) => {
    if (!item.children) return false
    return item.children.some(child => pathname === child.href)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileSubMenu(null)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white font-manrope">
      <div className="relative bg-[url('/images/pattern-lines-sand.png')] bg-no-repeat bg-[length:300%_auto] bg-[position:center_top] md:bg-[length:100%_auto] md:bg-top">
      <div className="max-w-7xl mx-auto px-4 h-20 sm:px-6 sm:h-14 md:px-8 md:h-20 flex items-center justify-between">
          {/* Logo on the left */}
          <Link href="/" className="block -ml-3 sm:ml-0" onClick={closeMobileMenu}>
            <Image
              src="/images/logo/logo.svg"
              alt="Arcipelago Zero"
              width={200}
              height={50}
              className="h-12 sm:h-14 md:h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation links on the right */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {items.map((item) => {
              const hasChildren = item.children && item.children.length > 0
              const itemIsActive = isActive(item.href)
              const childIsActive = isChildActive(item)
              const showAsActive = itemIsActive || childIsActive

              if (hasChildren) {
                return (
                  <div key={item.href} className="relative group">
                    {item.isNavParentOnly ? (
                      <button
                        className={`text-lg font-bold transition-all flex items-center gap-1 text-teal-dark ${
                          showAsActive
                            ? 'underline underline-offset-4 decoration-1 hover:decoration-2'
                            : 'hover:underline hover:underline-offset-4 hover:decoration-1'
                        }`}
                      >
                        {item.label}
                        <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`text-lg font-bold transition-all flex items-center gap-1 text-teal-dark ${
                          showAsActive
                            ? 'underline underline-offset-4 decoration-1 hover:decoration-2'
                            : 'hover:underline hover:underline-offset-4 hover:decoration-1'
                        }`}
                      >
                        {item.label}
                        <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                      </Link>
                    )}
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="bg-white rounded-md shadow-sm py-2 min-w-[160px]">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2 text-lg font-bold transition-all text-teal-dark ${
                              isActive(child.href)
                                ? 'underline underline-offset-4 decoration-1 hover:decoration-2'
                                : 'hover:underline hover:underline-offset-4 hover:decoration-1'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg font-bold transition-all text-teal-dark ${
                    itemIsActive
                      ? 'underline underline-offset-4 decoration-1 hover:decoration-2'
                      : 'hover:underline hover:underline-offset-4 hover:decoration-1'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {socialLinks.map((link) => {
              const Icon = platformIcons[link.platform]
              if (!Icon) return null
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-dark/70 hover:text-teal-dark transition-colors"
                  aria-label={platformLabels[link.platform] || link.platform}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              )
            })}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-teal-dark p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed left-0 right-0 bottom-0 top-20 sm:top-14 z-40 overflow-y-auto bg-white">
            {mobileSubMenu ? (
              /* Sub-menu view */
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileSubMenu(null)}
                  className="flex items-center gap-2 w-full text-left text-base py-3 px-4 text-teal-dark bg-[#f5f0e8]"
                >
                  <ArrowLeft size={18} />
                  {mobileSubMenu.label}
                </button>
                <div className="flex flex-col px-4 py-2">
                  {mobileSubMenu.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={closeMobileMenu}
                      className={`block text-lg font-bold py-3 px-2 transition-all text-teal-dark ${
                        isActive(child.href)
                          ? 'underline underline-offset-4 decoration-1 hover:decoration-2'
                          : 'hover:underline hover:underline-offset-4 hover:decoration-1'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              /* Main menu view */
              <div className="flex flex-col px-4 py-6">
                {items.map((item) => {
                  const hasChildren = item.children && item.children.length > 0
                  const itemIsActive = isActive(item.href)
                  const childIsActive = isChildActive(item)
                  const showAsActive = itemIsActive || childIsActive

                  if (hasChildren) {
                    return (
                      <button
                        key={item.href}
                        onClick={() => setMobileSubMenu(item)}
                        className={`flex items-center justify-between text-lg font-bold py-3 px-2 transition-all text-teal-dark ${
                          showAsActive
                            ? 'underline underline-offset-4 decoration-1 hover:decoration-2'
                            : 'hover:underline hover:underline-offset-4 hover:decoration-1'
                        }`}
                      >
                        {item.label}
                        <ArrowRight size={18} />
                      </button>
                    )
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`text-lg font-bold py-3 px-2 transition-all text-teal-dark ${
                        itemIsActive
                          ? 'underline underline-offset-4 decoration-1 hover:decoration-2'
                          : 'hover:underline hover:underline-offset-4 hover:decoration-1'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
                {socialLinks.map((link) => {
                  const Icon = platformIcons[link.platform]
                  const label = platformLabels[link.platform] || link.platform
                  if (!Icon) return null
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className="text-teal-dark py-3 px-2 flex items-center gap-2 text-lg font-bold hover:underline hover:underline-offset-4 hover:decoration-1 transition-all"
                    >
                      <Icon size={18} strokeWidth={1.5} />
                      <span>{label}</span>
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </nav>
  )
}
