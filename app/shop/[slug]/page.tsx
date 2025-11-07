// app/shop/[slug]/page.tsx
import { getProductBySlug } from '@/lib/cosmic'
import { Product } from '@/types'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'
import Link from 'next/link'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug) as Product | null

  if (!product) {
    notFound()
  }

  const mainImage = product.metadata.featured_image?.imgix_url || product.metadata.images?.[0]?.imgix_url
  const galleryImages = product.metadata.images || []

  return (
    <div>
      {/* Back to Shop */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <Link href="/shop" className="text-primary hover:text-primary-dark font-semibold">
            ← Back to Shop
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              {mainImage && (
                <div className="mb-4">
                  <img 
                    src={`${mainImage}?w=1200&h=1200&fit=crop&auto=format,compress`}
                    alt={product.metadata.product_name}
                    className="w-full rounded-lg"
                  />
                </div>
              )}
              
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {galleryImages.map((image, index) => (
                    <img 
                      key={index}
                      src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                      alt={`${product.metadata.product_name} - Image ${index + 1}`}
                      className="w-full rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.metadata.product_name}</h1>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  ${product.metadata.price.toFixed(2)}
                </span>
                {product.metadata.compare_at_price && product.metadata.compare_at_price > product.metadata.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.metadata.compare_at_price.toFixed(2)}
                  </span>
                )}
              </div>

              {product.metadata.sku && (
                <p className="text-gray-600 mb-4">SKU: {product.metadata.sku}</p>
              )}

              <div className="mb-6">
                {product.metadata.stock_quantity > 0 ? (
                  <span className="text-green-600 font-semibold">In Stock ({product.metadata.stock_quantity} available)</span>
                ) : (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                )}
              </div>

              <div className="prose max-w-none mb-8">
                <p>{product.metadata.description}</p>
              </div>

              {product.metadata.stock_quantity > 0 && (
                <AddToCartButton product={product} />
              )}

              {product.metadata.category && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-gray-600">
                    Category: <Link href={`/shop/category/${product.metadata.category.slug}`} className="text-primary hover:text-primary-dark font-semibold">
                      {product.metadata.category.metadata.category_name}
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}