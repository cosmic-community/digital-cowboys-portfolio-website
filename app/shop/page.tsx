import Link from 'next/link'
import { getProducts, getCategories } from '@/lib/cosmic'
import { Product, Category } from '@/types'
import ProductCard from '@/components/ProductCard'

export default async function ShopPage() {
  const products = await getProducts() as Product[]
  const categories = await getCategories() as Category[]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Shop Our Products
            </h1>
            <p className="text-xl text-blue-100">
              Discover high-quality digital products and services
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/shop/category/${category.slug}`}
                  className="bg-white px-6 py-3 rounded-lg font-semibold text-gray-700 hover:bg-primary hover:text-white transition-colors border border-gray-200"
                >
                  {category.metadata.category_name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
              <p className="text-gray-600 text-lg">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}