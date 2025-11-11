// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug, getPublishedBlogPosts } from '@/lib/cosmic'
import { BlogPost } from '@/types'

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const blogPosts = await getPublishedBlogPosts() as BlogPost[]
    return blogPosts.map((post) => ({
      slug: post.slug,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = await getBlogPostBySlug(slug) as BlogPost | null
    
    if (!post) {
      return {
        title: 'Blog Post Not Found',
      }
    }

    return {
      title: post.metadata.seo_title || `${post.metadata.post_title} - Digital Cowboys Blog`,
      description: post.metadata.seo_description || post.metadata.excerpt,
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = await getBlogPostBySlug(slug) as BlogPost | null

    if (!post) {
      notFound()
    }

    // Format the publish date
    const publishDate = post.metadata.publish_date 
      ? new Date(post.metadata.publish_date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : new Date(post.created_at).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })

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

            {/* Post Header */}
            <div className="mb-8">
              {post.metadata.category && (
                <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  {post.metadata.category}
                </span>
              )}
              <h1 className="text-5xl font-bold mb-4">{post.metadata.post_title}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                {post.metadata.author && (
                  <span className="font-semibold">By {post.metadata.author}</span>
                )}
                <span>•</span>
                <span>{publishDate}</span>
                {post.metadata.reading_time && (
                  <>
                    <span>•</span>
                    <span>{post.metadata.reading_time} min read</span>
                  </>
                )}
              </div>
              <p className="text-xl text-gray-600">{post.metadata.excerpt}</p>
            </div>

            {/* Post Content */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.metadata.content }}
            />

            {/* Tags */}
            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.metadata.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="bg-primary text-white p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Digital Presence?</h3>
              <p className="mb-6 text-red-100">
                Let's discuss how we can help your business succeed online.
              </p>
              <Link 
                href="/services"
                className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
}