// app/case-studies/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCaseStudyBySlug, getCaseStudies } from '@/lib/cosmic'
import { CaseStudy } from '@/types'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies() as CaseStudy[]
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug) as CaseStudy | null
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    }
  }

  return {
    title: `${caseStudy.metadata.project_title} - Digital Cowboys`,
    description: caseStudy.metadata.project_summary,
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug) as CaseStudy | null

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Link */}
          <Link 
            href="/case-studies" 
            className="inline-flex items-center text-primary hover:text-primary-dark mb-8 font-semibold"
          >
            ← Back to Case Studies
          </Link>

          {/* Case Study Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4">{caseStudy.metadata.project_title}</h1>
            <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
              <span className="font-semibold">Client: {caseStudy.metadata.client_name}</span>
              {caseStudy.metadata.completion_date && (
                <>
                  <span>•</span>
                  <span>Completed: {new Date(caseStudy.metadata.completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                </>
              )}
            </div>
            <p className="text-xl text-gray-600">{caseStudy.metadata.project_summary}</p>
          </div>

          {/* Featured Image */}
          {caseStudy.metadata.featured_image && (
            <div className="mb-12 rounded-xl overflow-hidden">
              <img 
                src={`${caseStudy.metadata.featured_image.imgix_url}?w=2000&h=1000&fit=crop&auto=format,compress`}
                alt={caseStudy.metadata.project_title}
                className="w-full h-auto"
                width={1000}
                height={500}
              />
            </div>
          )}

          {/* Services Used */}
          {caseStudy.metadata.services_used && caseStudy.metadata.services_used.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4">Services Provided</h3>
              <div className="flex flex-wrap gap-3">
                {caseStudy.metadata.services_used.map((service) => (
                  <span 
                    key={service.id}
                    className="bg-primary text-white px-4 py-2 rounded-full font-semibold"
                  >
                    {service.metadata.icon} {service.metadata.service_name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Challenge */}
          {caseStudy.metadata.challenge && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">The Challenge</h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: caseStudy.metadata.challenge }}
              />
            </div>
          )}

          {/* Solution */}
          {caseStudy.metadata.solution && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Solution</h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: caseStudy.metadata.solution }}
              />
            </div>
          )}

          {/* Results */}
          {caseStudy.metadata.results && (
            <div className="mb-12 bg-gray-50 p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-4">The Results</h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: caseStudy.metadata.results }}
              />
            </div>
          )}

          {/* Project Gallery */}
          {caseStudy.metadata.project_gallery && caseStudy.metadata.project_gallery.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Project Gallery</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {caseStudy.metadata.project_gallery.map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden">
                    <img 
                      src={`${image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                      alt={`${caseStudy.metadata.project_title} - Gallery Image ${index + 1}`}
                      className="w-full h-auto"
                      width={600}
                      height={400}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Link */}
          {caseStudy.metadata.project_url && (
            <div className="text-center bg-primary text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">View Live Project</h3>
              <a 
                href={caseStudy.metadata.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Visit Website →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}