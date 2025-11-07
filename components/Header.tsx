'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
            🤠 Digital Cowboys
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Services
            </Link>
            <Link href="/case-studies" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Case Studies
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              About
            </Link>
            <Link href="/team" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Team
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/services" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/case-studies" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Case Studies
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/team" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}