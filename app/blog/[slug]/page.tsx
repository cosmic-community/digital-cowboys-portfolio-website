// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getPosts, getRelatedPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import BlogPostCard from '@/components/BlogPostCard'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const postsData = await getPosts(0, 100)
  const posts = postsData.posts as Post[]
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.metadata.post_title} - Digital Cowboys Blog`,
    description: post.metadata.excerpt,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null

  if (!post) {
    notFound()
  }

  // Get related posts
  const categoryIds = post.metadata.categories?.map(cat => cat.id) || []
  const tagIds = post.metadata.tags?.map(tag => tag.id) || []
  const relatedPosts = await getRelatedPosts(post.id, categoryIds, tagIds, 3) as Post[]

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link 
            href="/blog" 
            className="inline-flex items-center text-primary hover:text-primary-dark mb-8 font-semibold"
          >
            ← Back to Blog
          </Link>

          {/* Post Header */}
          <article>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.metadata.post_title}</h1>
              
              {/* Post Meta */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                {/* Author */}
                {post.metadata.author && (
                  <Link 
                    href={`/blog/author/${post.metadata.author.slug}`}
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    {post.metadata.author.metadata.profile_photo && (
                      <img 
                        src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt={post.metadata.author.metadata.author_name}
                        className="w-10 h-10 rounded-full object-cover"
                        width={40}
                        height={40}
                      />
                    )}
                    <span className="font-semibold">{post.metadata.author.metadata.author_name}</span>
                  </Link>
                )}
                
                <span>•</span>
                
                {/* Published Date */}
                <time dateTime={post.metadata.published_date}>
                  {new Date(post.metadata.published_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
                
                {post.metadata.reading_time && (
                  <>
                    <span>•</span>
                    <span>{post.metadata.reading_time} min read</span>
                  </>
                )}
              </div>

              {/* Categories */}
              {post.metadata.categories && post.metadata.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.metadata.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/blog/category/${category.slug}`}
                      className="px-4 py-1 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: category.metadata.color ? `${category.metadata.color}20` : '#f3f4f6',
                        color: category.metadata.color || '#374151'
                      }}
                    >
                      {category.metadata.category_name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Featured Image */}
              {post.metadata.featured_image && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img 
                    src={`${post.metadata.featured_image.imgix_url}?w=2000&h=1000&fit=crop&auto=format,compress`}
                    alt={post.metadata.post_title}
                    className="w-full h-auto"
                    width={1000}
                    height={500}
                  />
                </div>
              )}
            </header>

            {/* Post Content */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.metadata.content }}
            />

            {/* Tags */}
            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.metadata.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog/tag/${tag.slug}`}
                      className="px-4 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors"
                    >
                      #{tag.metadata.tag_name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {post.metadata.author && (
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-bold mb-4">About the Author</h3>
                <div className="flex gap-4">
                  {post.metadata.author.metadata.profile_photo && (
                    <img 
                      src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                      alt={post.metadata.author.metadata.author_name}
                      className="w-20 h-20 rounded-full object-cover"
                      width={80}
                      height={80}
                    />
                  )}
                  <div className="flex-1">
                    <Link 
                      href={`/blog/author/${post.metadata.author.slug}`}
                      className="text-lg font-bold hover:text-primary"
                    >
                      {post.metadata.author.metadata.author_name}
                    </Link>
                    {post.metadata.author.metadata.bio && (
                      <p className="text-gray-600 mt-2">{post.metadata.author.metadata.bio}</p>
                    )}
                    {/* Author Social Links */}
                    <div className="flex gap-3 mt-3">
                      {post.metadata.author.metadata.twitter && (
                        <a 
                          href={`https://twitter.com/${post.metadata.author.metadata.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary"
                        >
                          Twitter
                        </a>
                      )}
                      {post.metadata.author.metadata.linkedin && (
                        <a 
                          href={post.metadata.author.metadata.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary"
                        >
                          LinkedIn
                        </a>
                      )}
                      {post.metadata.author.metadata.website && (
                        <a 
                          href={post.metadata.author.metadata.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary"
                        >
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogPostCard key={relatedPost.id} post={relatedPost} compact />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}