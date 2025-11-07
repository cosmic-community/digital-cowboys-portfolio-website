// app/blog/category/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPostsByCategory, getCategories } from '@/lib/cosmic'
import { Category, Post } from '@/types'
import BlogPostCard from '@/components/BlogPostCard'
import Pagination from '@/components/Pagination'

export async function generateStaticParams() {
  const categories = await getCategories() as Category[]
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

const POSTS_PER_PAGE = 9

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.metadata.category_name} - Digital Cowboys Blog`,
    description: category.metadata.description || `Articles about ${category.metadata.category_name}`,
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const searchParamsResolved = await searchParams
  const currentPage = Number(searchParamsResolved.page) || 1
  const skip = (currentPage - 1) * POSTS_PER_PAGE

  const category = await getCategoryBySlug(slug) as Category | null

  if (!category) {
    notFound()
  }

  const postsData = await getPostsByCategory(category.id, skip, POSTS_PER_PAGE)
  const posts = postsData.posts as Post[]
  const totalPages = Math.ceil(postsData.total / POSTS_PER_PAGE)

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-primary hover:text-primary-dark mb-8 font-semibold"
        >
          ← Back to Blog
        </Link>

        {/* Category Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span 
              className="px-6 py-3 rounded-full text-xl font-bold"
              style={{
                backgroundColor: category.metadata.color ? `${category.metadata.color}20` : '#f3f4f6',
                color: category.metadata.color || '#374151'
              }}
            >
              {category.metadata.category_name}
            </span>
          </div>
          {category.metadata.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {category.metadata.description}
            </p>
          )}
          <p className="text-gray-500 mt-4">{postsData.total} {postsData.total === 1 ? 'post' : 'posts'}</p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={`/blog/category/${slug}`}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No posts in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}