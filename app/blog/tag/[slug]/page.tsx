// app/blog/tag/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTagBySlug, getPostsByTag, getTags } from '@/lib/cosmic'
import { Tag, Post } from '@/types'
import BlogPostCard from '@/components/BlogPostCard'
import Pagination from '@/components/Pagination'

export async function generateStaticParams() {
  const tags = await getTags() as Tag[]
  return tags.map((tag) => ({
    slug: tag.slug,
  }))
}

interface TagPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

const POSTS_PER_PAGE = 9

export async function generateMetadata({ params }: TagPageProps) {
  const { slug } = await params
  const tag = await getTagBySlug(slug) as Tag | null
  
  if (!tag) {
    return {
      title: 'Tag Not Found',
    }
  }

  return {
    title: `#${tag.metadata.tag_name} - Digital Cowboys Blog`,
    description: `Articles tagged with ${tag.metadata.tag_name}`,
  }
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params
  const searchParamsResolved = await searchParams
  const currentPage = Number(searchParamsResolved.page) || 1
  const skip = (currentPage - 1) * POSTS_PER_PAGE

  const tag = await getTagBySlug(slug) as Tag | null

  if (!tag) {
    notFound()
  }

  const postsData = await getPostsByTag(tag.id, skip, POSTS_PER_PAGE)
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

        {/* Tag Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            #{tag.metadata.tag_name}
          </h1>
          <p className="text-gray-500">{postsData.total} {postsData.total === 1 ? 'post' : 'posts'}</p>
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
                basePath={`/blog/tag/${slug}`}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No posts with this tag yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}