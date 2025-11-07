import Link from 'next/link'
import { getServices, getTestimonials, getCaseStudies } from '@/lib/cosmic'
import { Service, Testimonial, CaseStudy } from '@/types'
import ServiceCard from '@/components/ServiceCard'
import TestimonialCard from '@/components/TestimonialCard'
import CaseStudyCard from '@/components/CaseStudyCard'

export default async function HomePage() {
  const services = await getServices() as Service[]
  const testimonials = await getTestimonials() as Testimonial[]
  const caseStudies = await getCaseStudies() as CaseStudy[]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Digital Cowboys
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              We wrangle the web to create stunning digital experiences that drive results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services" 
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors text-lg"
              >
                Our Services
              </Link>
              <Link 
                href="/case-studies" 
                className="bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-900 transition-colors text-lg border-2 border-white"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From design to development and beyond, we offer comprehensive digital solutions
            </p>
          </div>
          
          {services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No services available at the moment.</p>
          )}
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Work</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how we've helped businesses transform their digital presence
            </p>
          </div>
          
          {caseStudies.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-8">
                {caseStudies.slice(0, 2).map((caseStudy) => (
                  <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
                ))}
              </div>
              <div className="text-center">
                <Link 
                  href="/case-studies"
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  View All Case Studies
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600">No case studies available at the moment.</p>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear what our clients have to say
            </p>
          </div>
          
          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No testimonials available at the moment.</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-red-100">
            Let's work together to create something amazing. Get in touch to discuss your project.
          </p>
          <Link 
            href="/team"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors text-lg"
          >
            Meet Our Team
          </Link>
        </div>
      </section>
    </div>
  )
}