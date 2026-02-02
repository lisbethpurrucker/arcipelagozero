'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Instagram, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface NavItem {
  label: string
  href: string
}

const defaultNavItems: NavItem[] = [
  { label: 'Vision', href: '/vision' },
  { label: 'Agenda', href: '/agenda' },
  { label: 'Stays', href: '/stays' },
  { label: 'Journey', href: '/journey' },
  { label: 'Members', href: '/members' },
]

interface NavigationProps {
  navItems?: NavItem[]
  instagramUrl?: string
  showInstagram?: boolean
}

export default function Navigation({ navItems, instagramUrl = 'https://instagram.com', showInstagram = true }: NavigationProps) {
  const items = navItems && navItems.length > 0 ? navItems : defaultNavItems
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 md:px-8 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo on the left */}
          <Link href="/" className="block" onClick={() => setMobileMenuOpen(false)}>
            <Image
              src="/images/logo/logo.svg"
              alt="Arcipelago Zero"
              width={200}
              height={50}
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation links on the right */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {items.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-all ${
                    isActive
                      ? 'text-teal-dark font-black'
                      : 'text-teal-dark/70 hover:text-teal-dark hover:opacity-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {showInstagram && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-dark/70 hover:text-teal-dark transition-colors"
              >
                <Instagram size={20} strokeWidth={1.5} />
              </a>
            )}
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
            <div className="flex flex-col space-y-3">
              {items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base py-2 px-2 transition-all hover:underline hover:underline-offset-4 active:underline active:underline-offset-4 ${
                      isActive
                        ? 'text-teal-dark font-bold'
                        : 'text-teal-dark/70 hover:text-teal-dark'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
              {showInstagram && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-teal-dark/70 hover:text-teal-dark transition-colors py-2 px-2 flex items-center gap-2"
                >
                  <Instagram size={18} strokeWidth={1.5} />
                  <span className="text-base">Instagram</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}