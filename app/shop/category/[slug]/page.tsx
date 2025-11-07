// app/shop/category/[slug]/page.tsx
import Link from 'next/link'
import { getCategories, getProductsByCategory } from '@/lib/cosmic'
import { Product, Category } from '@/types'
import ProductCard from '@/components/ProductCard'
import { notFound } from 'next/navigation'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const categories = await getCategories() as Category[]
  const category = categories.find(cat => cat.slug === slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id) as Product[]

  return (
    <div>
      {/* Category Header */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {category.metadata.category_name}
            </h1>
            {category.metadata.description && (
              <p className="text-xl text-blue-100">
                {category.metadata.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Back to Shop */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <Link href="/shop" className="text-primary hover:text-primary-dark font-semibold">
            ← Back to Shop
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {products.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}