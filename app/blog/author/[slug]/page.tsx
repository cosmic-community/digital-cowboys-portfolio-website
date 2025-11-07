// app/blog/author/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAuthorBySlug, getPostsByAuthor, getAuthors } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import BlogPostCard from '@/components/BlogPostCard'

export async function generateStaticParams() {
  const authors = await getAuthors() as Author[]
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.metadata.author_name} - Digital Cowboys`,
    description: author.metadata.bio || `Articles by ${author.metadata.author_name}`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as Post[]

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Link */}
          <Link 
            href="/blog" 
            className="inline-flex items-center text-primary hover:text-primary-dark mb-8 font-semibold"
          >
            ← Back to Blog
          </Link>

          {/* Author Profile */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {author.metadata.profile_photo && (
                <img 
                  src={`${author.metadata.profile_photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                  alt={author.metadata.author_name}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover"
                  width={192}
                  height={192}
                />
              )}
              
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4">{author.metadata.author_name}</h1>
                
                {author.metadata.bio && (
                  <p className="text-lg text-gray-600 mb-6">{author.metadata.bio}</p>
                )}

                {/* Contact & Social */}
                <div className="flex flex-wrap gap-4">
                  {author.metadata.email && (
                    <a 
                      href={`mailto:${author.metadata.email}`}
                      className="text-primary hover:text-primary-dark font-semibold"
                    >
                      Email
                    </a>
                  )}
                  {author.metadata.twitter && (
                    <a 
                      href={`https://twitter.com/${author.metadata.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark font-semibold"
                    >
                      Twitter
                    </a>
                  )}
                  {author.metadata.linkedin && (
                    <a 
                      href={author.metadata.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark font-semibold"
                    >
                      LinkedIn
                    </a>
                  )}
                  {author.metadata.website && (
                    <a 
                      href={author.metadata.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark font-semibold"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Author's Posts */}
          <div>
            <h2 className="text-3xl font-bold mb-8">
              Articles by {author.metadata.author_name} ({posts.length})
            </h2>

            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No posts yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}