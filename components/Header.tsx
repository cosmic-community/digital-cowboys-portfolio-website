'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems } = useCart()
  const cartItemCount = getTotalItems()

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
            <Link href="/shop" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Shop
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-primary font-semibold transition-colors relative">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-primary"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
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
              <Link 
                href="/shop" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/cart" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                Cart {cartItemCount > 0 && `(${cartItemCount})`}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}