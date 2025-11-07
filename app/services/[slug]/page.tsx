// app/services/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getServiceBySlug, getServices } from '@/lib/cosmic'
import { Service } from '@/types'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = await getServices() as Service[]
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug) as Service | null
  
  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.metadata.service_name} - Digital Cowboys`,
    description: service.metadata.short_description,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug) as Service | null

  if (!service) {
    notFound()
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link 
            href="/services" 
            className="inline-flex items-center text-primary hover:text-primary-dark mb-8 font-semibold"
          >
            ← Back to Services
          </Link>

          {/* Service Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              {service.metadata.icon && (
                <span className="text-6xl">{service.metadata.icon}</span>
              )}
              <h1 className="text-5xl font-bold">{service.metadata.service_name}</h1>
            </div>
            <p className="text-xl text-gray-600">{service.metadata.short_description}</p>
          </div>

          {/* Featured Image */}
          {service.metadata.featured_image && (
            <div className="mb-12 rounded-xl overflow-hidden">
              <img 
                src={`${service.metadata.featured_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
                alt={service.metadata.service_name}
                className="w-full h-auto"
                width={800}
                height={450}
              />
            </div>
          )}

          {/* Full Description */}
          {service.metadata.full_description && (
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: service.metadata.full_description }}
            />
          )}

          {/* Pricing */}
          {service.metadata.starting_price && (
            <div className="bg-gray-50 p-8 rounded-xl mb-12">
              <h3 className="text-2xl font-bold mb-2">Starting Price</h3>
              <p className="text-3xl font-bold text-primary">{service.metadata.starting_price}</p>
            </div>
          )}

          {/* CTA */}
          <div className="bg-primary text-white p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">Interested in this service?</h3>
            <p className="mb-6">Let's discuss how we can help your business grow.</p>
            <Link 
              href="/team"
              className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}