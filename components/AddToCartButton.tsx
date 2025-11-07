'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { Product } from '@/types'

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded font-semibold"
        >
          -
        </button>
        <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
        <button
          onClick={() => setQuantity(Math.min(product.metadata.stock_quantity, quantity + 1))}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded font-semibold"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="flex-1 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:bg-gray-400"
        disabled={added}
      >
        {added ? '✓ Added to Cart!' : 'Add to Cart'}
      </button>
    </div>
  )
}