import { getCaseStudies } from '@/lib/cosmic'
import { CaseStudy } from '@/types'
import CaseStudyCard from '@/components/CaseStudyCard'

export const metadata = {
  title: 'Case Studies - Digital Cowboys',
  description: 'Explore our portfolio of successful projects. See how we've helped businesses transform their digital presence and achieve measurable results.',
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies() as CaseStudy[]

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Case Studies</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of successful projects and see how we've helped businesses like yours achieve their digital goals through strategic design, development, and marketing.
          </p>
        </div>

        {/* Case Studies Grid */}
        {caseStudies.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No case studies available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}