'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cart } = useCart()
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors">
            Digital Cowboys
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              About
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Services
            </Link>
            <Link href="/team" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Team
            </Link>
            <Link href="/case-studies" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Case Studies
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-primary font-semibold transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/shop" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/services" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/team" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </Link>
              <Link 
                href="/case-studies" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Case Studies
              </Link>
              <Link 
                href="/cart" 
                className="text-gray-700 hover:text-primary font-semibold transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}