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
  type LucideIcon
} from 'lucide-react'
import { useState } from 'react'

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
  const [expandedMobileItems, setExpandedMobileItems] = useState<Set<string>>(new Set())

  const isActive = (href: string) => pathname === href
  const isChildActive = (item: NavItem) => {
    if (!item.children) return false
    return item.children.some(child => pathname === child.href)
  }

  const toggleMobileExpand = (href: string) => {
    setExpandedMobileItems(prev => {
      const next = new Set(prev)
      if (next.has(href)) {
        next.delete(href)
      } else {
        next.add(href)
      }
      return next
    })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundImage: 'url(/images/pattern-lines-sand.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 md:px-8 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo on the left */}
          <Link href="/" className="block -ml-3 sm:ml-0" onClick={() => setMobileMenuOpen(false)}>
            <Image
              src="/images/logo/logo.svg"
              alt="Arcipelago Zero"
              width={200}
              height={50}
              className="h-12 sm:h-14 md:h-16 -my-1 sm:-my-2 md:-my-3 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation links on the right */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
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
                        className={`text-sm font-medium transition-all flex items-center gap-1 ${
                          showAsActive
                            ? 'text-teal-dark font-black'
                            : 'text-teal-dark/70 hover:text-teal-dark hover:opacity-50'
                        }`}
                      >
                        {item.label}
                        <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`text-sm font-medium transition-all flex items-center gap-1 ${
                          showAsActive
                            ? 'text-teal-dark font-black'
                            : 'text-teal-dark/70 hover:text-teal-dark hover:opacity-50'
                        }`}
                      >
                        {item.label}
                        <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                      </Link>
                    )}
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="bg-white rounded-sm shadow-lg border border-gray-100 py-2 min-w-[160px]">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2 text-sm font-medium transition-all ${
                              isActive(child.href)
                                ? 'text-teal-dark font-bold underline'
                                : 'text-teal-dark/70 hover:text-teal-dark hover:underline'
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
                  className={`text-sm font-medium transition-all ${
                    itemIsActive
                      ? 'text-teal-dark font-black'
                      : 'text-teal-dark/70 hover:text-teal-dark hover:opacity-50'
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col space-y-1">
              {items.map((item) => {
                const hasChildren = item.children && item.children.length > 0
                const itemIsActive = isActive(item.href)
                const childIsActive = isChildActive(item)
                const showAsActive = itemIsActive || childIsActive
                const isExpanded = expandedMobileItems.has(item.href)

                if (hasChildren) {
                  return (
                    <div key={item.href}>
                      <div className="flex items-center">
                        {item.isNavParentOnly ? (
                          <button
                            onClick={() => toggleMobileExpand(item.href)}
                            className={`flex-1 text-left text-base py-2 px-2 transition-all ${
                              showAsActive
                                ? 'text-teal-dark font-bold'
                                : 'text-teal-dark/70 hover:text-teal-dark'
                            }`}
                          >
                            {item.label}
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex-1 text-base py-2 px-2 transition-all hover:underline hover:underline-offset-4 active:underline active:underline-offset-4 ${
                              showAsActive
                                ? 'text-teal-dark font-bold'
                                : 'text-teal-dark/70 hover:text-teal-dark'
                            }`}
                          >
                            {item.label}
                          </Link>
                        )}
                        <button
                          onClick={() => toggleMobileExpand(item.href)}
                          className="p-2 text-teal-dark/70 hover:text-teal-dark"
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>
                      {isExpanded && (
                        <div className="pl-4 space-y-1">
                          {item.children!.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`block text-base py-2 px-2 transition-all hover:underline hover:underline-offset-4 ${
                                isActive(child.href)
                                  ? 'text-teal-dark font-bold'
                                  : 'text-teal-dark/70 hover:text-teal-dark'
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base py-2 px-2 transition-all hover:underline hover:underline-offset-4 active:underline active:underline-offset-4 ${
                      itemIsActive
                        ? 'text-teal-dark font-bold'
                        : 'text-teal-dark/70 hover:text-teal-dark'
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
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-teal-dark/70 hover:text-teal-dark transition-colors py-2 px-2 flex items-center gap-2"
                  >
                    <Icon size={18} strokeWidth={1.5} />
                    <span className="text-base">{label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
