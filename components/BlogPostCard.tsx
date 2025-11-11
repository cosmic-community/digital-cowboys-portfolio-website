import Link from 'next/link'
import { BlogPost } from '@/types'

interface BlogPostCardProps {
    post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
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
      <Link href={`/blog/${post.slug}`}>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
          {post.metadata.featured_image && (
            <div className="aspect-video overflow-hidden">
              <img 
                src={`${post.metadata.featured_image.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
                alt={post.metadata.post_title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                width={600}
                height={338}
              />
            </div>
          )}
          
          <div className="p-6 flex-1 flex flex-col">
            {post.metadata.category && (
              <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold mb-3 w-fit">
                {post.metadata.category}
              </span>
            )}
            
            <h3 className="text-2xl font-bold mb-2">{post.metadata.post_title}</h3>
            
            <p className="text-sm text-gray-500 mb-4">
              {publishDate}
              {post.metadata.reading_time && ` • ${post.metadata.reading_time} min read`}
            </p>
            
            <p className="text-gray-600 mb-4 flex-1">{post.metadata.excerpt}</p>
            
            <div className="mt-auto">
              <span className="text-primary font-semibold hover:text-primary-dark transition-colors">
                Read More →
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
}