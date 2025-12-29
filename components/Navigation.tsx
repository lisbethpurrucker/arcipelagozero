'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Instagram } from 'lucide-react'

const navItems = [
  { label: 'Vision', href: '/vision' },
  { label: 'Agenda', href: '/agenda' },
  { label: 'Stays', href: '/stays' },
  { label: 'Journey', href: '/journey' },
  { label: 'Members', href: '/members' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Logo on the left */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full border-2 border-gray-800 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gray-800"></div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-handwritten text-lg text-gray-800">arcipelago</span>
              <span className="font-handwritten text-lg text-gray-800">zero</span>
            </div>
          </Link>

          {/* Navigation links on the right */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-all ${
                    isActive
                      ? 'text-gray-900 font-black'
                      : 'text-gray-500 hover:text-gray-900 hover:opacity-50'
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
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}