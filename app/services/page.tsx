import { getServices } from '@/lib/cosmic'
import { Service } from '@/types'
import ServiceCard from '@/components/ServiceCard'

export const metadata = {
  title: 'Our Services - Digital Cowboys',
  description: 'Web design, development, and digital marketing services to help your business grow online.',
}

export default async function ServicesPage() {
  const services = await getServices() as Service[]

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive digital solutions to help businesses establish and grow their online presence. From stunning designs to powerful development and strategic marketing.
          </p>
        </div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}