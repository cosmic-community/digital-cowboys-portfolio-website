import { getTeamMembers } from '@/lib/cosmic'
import { TeamMember } from '@/types'
import TeamMemberCard from '@/components/TeamMemberCard'

export const metadata = {
  title: 'Our Team - Digital Cowboys',
  description: 'Meet the talented team behind Digital Cowboys. Expert designers, developers, and marketers passionate about creating amazing digital experiences.',
}

export default async function TeamPage() {
  const team = await getTeamMembers() as TeamMember[]

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a passionate group of designers, developers, and digital strategists dedicated to creating exceptional web experiences. Each team member brings unique expertise and creativity to every project.
          </p>
        </div>

        {/* Team Grid */}
        {team.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {team.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No team members available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}