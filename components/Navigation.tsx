'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Instagram, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Vision', href: '/vision' },
  { label: 'Agenda', href: '/agenda' },
  { label: 'Stays', href: '/stays' },
  { label: 'Journey', href: '/journey' },
  { label: 'Members', href: '/members' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 md:px-8 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo on the left */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-teal-dark flex items-center justify-center">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-teal-dark"></div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-handwritten text-base sm:text-lg text-teal-dark">arcipelago</span>
              <span className="font-handwritten text-base sm:text-lg text-teal-dark">zero</span>
            </div>
          </Link>

          {/* Desktop Navigation links on the right */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
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
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-dark/70 hover:text-teal-dark transition-colors"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-teal-dark p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base py-2 px-2 rounded-lg transition-all ${
                      isActive
                        ? 'text-teal-dark font-black bg-gray-50'
                        : 'text-teal-dark/70 hover:text-teal-dark hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-dark/70 hover:text-teal-dark transition-colors py-2 px-2 flex items-center gap-2"
              >
                <Instagram size={20} strokeWidth={1.5} />
                <span className="text-base">Instagram</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}