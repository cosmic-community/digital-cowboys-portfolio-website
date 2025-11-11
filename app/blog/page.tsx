import { getPublishedBlogPosts } from '@/lib/cosmic'
import { BlogPost } from '@/types'
import BlogPostCard from '@/components/BlogPostCard'

export const metadata = {
    title: 'Blog - Digital Cowboys',
    description: 'Insights, tutorials, and updates from the Digital Cowboys team on web development, design, and digital marketing.',
}

export default async function BlogPage() {
    const blogPosts = await getPublishedBlogPosts() as BlogPost[]

    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, tutorials, and updates on web development, design, and digital marketing from the Digital Cowboys team.
            </p>
          </div>

          {/* Blog Posts Grid */}
          {blogPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blog posts available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    )
}