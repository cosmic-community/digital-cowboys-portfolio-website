import Link from 'next/link'
import { Service } from '@/types'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
        {service.metadata.featured_image && (
          <div className="aspect-video overflow-hidden">
            <img 
              src={`${service.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={service.metadata.service_name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={400}
              height={225}
            />
          </div>
        )}
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            {service.metadata.icon && (
              <span className="text-4xl">{service.metadata.icon}</span>
            )}
            <h3 className="text-2xl font-bold">{service.metadata.service_name}</h3>
          </div>
          
          <p className="text-gray-600 mb-4 flex-1">{service.metadata.short_description}</p>
          
          {service.metadata.starting_price && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Starting at</span>
              <span className="text-xl font-bold text-primary">{service.metadata.starting_price}</span>
            </div>
          )}
          
          <div className="mt-4">
            <span className="text-primary font-semibold hover:text-primary-dark transition-colors">
              Learn More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}