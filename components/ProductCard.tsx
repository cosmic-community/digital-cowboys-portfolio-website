import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.metadata.featured_image?.imgix_url || product.metadata.images?.[0]?.imgix_url

  return (
    <Link href={`/shop/${product.slug}`} className="group">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        {image && (
          <div className="aspect-square overflow-hidden">
            <img 
              src={`${image}?w=800&h=800&fit=crop&auto=format,compress`}
              alt={product.metadata.product_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-4">
          {product.metadata.category && (
            <p className="text-sm text-gray-500 mb-1">
              {product.metadata.category.metadata.category_name}
            </p>
          )}
          
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
            {product.metadata.product_name}
          </h3>
          
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              ${product.metadata.price.toFixed(2)}
            </span>
            {product.metadata.compare_at_price && product.metadata.compare_at_price > product.metadata.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.metadata.compare_at_price.toFixed(2)}
              </span>
            )}
          </div>

          {product.metadata.stock_quantity === 0 && (
            <p className="text-red-600 text-sm font-semibold mt-2">Out of Stock</p>
          )}
        </div>
      </div>
    </Link>
  )
}