import Link from 'next/link'
import { getPosts, getCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import BlogPostCard from '@/components/BlogPostCard'
import Pagination from '@/components/Pagination'

export const metadata = {
  title: 'Blog - Digital Cowboys',
  description: 'Insights, tutorials, and updates on web development, design, and digital strategy from the Digital Cowboys team.',
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

const POSTS_PER_PAGE = 9

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const skip = (currentPage - 1) * POSTS_PER_PAGE

  const [postsData, categories] = await Promise.all([
    getPosts(skip, POSTS_PER_PAGE),
    getCategories()
  ])

  const posts = postsData.posts as Post[]
  const totalPages = Math.ceil(postsData.total / POSTS_PER_PAGE)

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tutorials, and updates on web development, design, and digital strategy from our team of experts.
          </p>
        </div>

        {/* Categories Filter */}
        {categories.length > 0 && (
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            <Link
              href="/blog"
              className="px-6 py-2 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
            >
              All Posts
            </Link>
            {(categories as Category[]).map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                style={category.metadata.color ? { 
                  backgroundColor: `${category.metadata.color}20`,
                  color: category.metadata.color 
                } : undefined}
              >
                {category.metadata.category_name}
              </Link>
            ))}
          </div>
        )}

        {/* Blog Posts Grid */}
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
                basePath="/blog"
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}