import Link from 'next/link'
import { CaseStudy } from '@/types'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${caseStudy.slug}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
        {caseStudy.metadata.featured_image && (
          <div className="aspect-video overflow-hidden">
            <img 
              src={`${caseStudy.metadata.featured_image.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
              alt={caseStudy.metadata.project_title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={600}
              height={338}
            />
          </div>
        )}
        
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold mb-2">{caseStudy.metadata.project_title}</h3>
          <p className="text-sm text-gray-500 mb-4">{caseStudy.metadata.client_name}</p>
          
          <p className="text-gray-600 mb-4 flex-1">{caseStudy.metadata.project_summary}</p>
          
          {caseStudy.metadata.services_used && caseStudy.metadata.services_used.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {caseStudy.metadata.services_used.map((service) => (
                <span 
                  key={service.id}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold"
                >
                  {service.metadata.icon} {service.metadata.service_name}
                </span>
              ))}
            </div>
          )}
          
          <div className="mt-auto">
            <span className="text-primary font-semibold hover:text-primary-dark transition-colors">
              View Case Study →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}