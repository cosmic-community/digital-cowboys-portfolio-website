import { getAboutPage } from '@/lib/cosmic'
import { AboutPage } from '@/types'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'About Us - Digital Cowboys',
  description: 'Learn about Digital Cowboys - our story, mission, values, and the passionate team behind exceptional web experiences.',
}

export default async function AboutPageComponent() {
  const aboutData = await getAboutPage() as AboutPage | null

  if (!aboutData) {
    notFound()
  }

  const { metadata: data } = aboutData

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {data.hero_headline}
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            {data.hero_subheadline}
          </p>
          {data.hero_image?.imgix_url && (
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={`${data.hero_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
                alt="Digital Cowboys Team"
                className="w-full h-auto"
                width="1600"
                height="900"
              />
            </div>
          )}
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">{data.story_title}</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            {data.story_content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {data.mission_statement}
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">{data.values_title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">{data.value_1_title}</h3>
              <p className="text-gray-600 leading-relaxed">{data.value_1_description}</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">{data.value_2_title}</h3>
              <p className="text-gray-600 leading-relaxed">{data.value_2_description}</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">{data.value_3_title}</h3>
              <p className="text-gray-600 leading-relaxed">{data.value_3_description}</p>
            </div>

            {data.value_4_title && data.value_4_description && (
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">{data.value_4_title}</h3>
                <p className="text-gray-600 leading-relaxed">{data.value_4_description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        {data.stats_title && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">{data.stats_title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.years_in_business && (
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {data.years_in_business}+
                  </div>
                  <div className="text-gray-600 font-medium">Years in Business</div>
                </div>
              )}
              {data.projects_completed && (
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {data.projects_completed}+
                  </div>
                  <div className="text-gray-600 font-medium">Projects Completed</div>
                </div>
              )}
              {data.happy_clients && (
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {data.happy_clients}+
                  </div>
                  <div className="text-gray-600 font-medium">Happy Clients</div>
                </div>
              )}
              {data.team_members_count && (
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {data.team_members_count}+
                  </div>
                  <div className="text-gray-600 font-medium">Team Members</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}