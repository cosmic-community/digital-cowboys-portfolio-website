import Link from 'next/link'
import { Post } from '@/types'

interface BlogPostCardProps {
  post: Post
  compact?: boolean
}

export default function BlogPostCard({ post, compact = false }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
        {/* Featured Image */}
        {post.metadata.featured_image && (
          <div className={`overflow-hidden ${compact ? 'aspect-video' : 'aspect-[16/10]'}`}>
            <img 
              src={`${post.metadata.featured_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
              alt={post.metadata.post_title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={600}
              height={compact ? 338 : 375}
            />
          </div>
        )}
        
        <div className={`${compact ? 'p-4' : 'p-6'} flex-1 flex flex-col`}>
          {/* Categories */}
          {!compact && post.metadata.categories && post.metadata.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.metadata.categories.slice(0, 2).map((category) => (
                <span
                  key={category.id}
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{
                    backgroundColor: category.metadata.color ? `${category.metadata.color}20` : '#f3f4f6',
                    color: category.metadata.color || '#374151'
                  }}
                >
                  {category.metadata.category_name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className={`${compact ? 'text-lg' : 'text-2xl'} font-bold mb-2 line-clamp-2`}>
            {post.metadata.post_title}
          </h3>
          
          {/* Excerpt */}
          <p className={`text-gray-600 ${compact ? 'text-sm mb-3' : 'mb-4'} flex-1 line-clamp-3`}>
            {post.metadata.excerpt}
          </p>
          
          {/* Meta */}
          <div className={`flex items-center justify-between ${compact ? 'text-xs' : 'text-sm'} text-gray-500 mt-auto pt-4 border-t border-gray-100`}>
            <div className="flex items-center gap-2">
              {post.metadata.author?.metadata.profile_photo && (
                <img 
                  src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata.author_name}
                  className={`${compact ? 'w-6 h-6' : 'w-8 h-8'} rounded-full object-cover`}
                  width={compact ? 24 : 32}
                  height={compact ? 24 : 32}
                />
              )}
              <span className="font-semibold">{post.metadata.author?.metadata.author_name}</span>
            </div>
            
            {post.metadata.reading_time && (
              <span>{post.metadata.reading_time} min read</span>
            )}
          </div>
          
          {/* Date */}
          <time dateTime={post.metadata.published_date} className={`${compact ? 'text-xs' : 'text-sm'} text-gray-500 mt-2 block`}>
            {new Date(post.metadata.published_date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
        </div>
      </article>
    </Link>
  )
}