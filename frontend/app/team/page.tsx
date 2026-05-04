import { Metadata } from 'next';
import HeroSlideshow from '@/components/HeroSlideshow';
import { heroImagesByPage } from '@/data/hero-images';
import SectionWrapper from '@/components/SectionWrapper';
import TeamMemberCard from '@/components/TeamMemberCard';
import { teamData } from '@/data/team';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Team - Engineering Plus',
  description: 'Meet the experienced professionals behind Engineering Plus EPC solutions.',
};

export default function TeamPage() {
  return (
    <main>
      
      {/* Hero Section */}
      <HeroSlideshow
        images={heroImagesByPage.team}
        ariaLabel="Team hero"
        title="Our Team"
        subtitle="Meet the experienced professionals driving excellence in EPC execution"
      />

      {/* Team Grid */}
      <SectionWrapper
        title="Leadership & Experts"
        subtitle="Dedicated professionals with decades of combined experience"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {teamData.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}

        </div>
      </SectionWrapper>

      {/* Team Values */}
      <SectionWrapper
        title="What Drives Our Team"
        subtitle="Core principles that unite our professionals"
        bgColor="gray"
      >
        <div className="grid md:grid-cols-4 gap-6">
          
          {[
            {
              title: 'Technical Excellence',
              desc: 'Continuous learning and staying updated with industry best practices',
            },
            {
              title: 'Collaboration',
              desc: 'Cross-functional teamwork ensuring seamless project execution',
            },
            {
              title: 'Client Focus',
              desc: 'Understanding client needs and delivering beyond expectations',
            },
            {
              title: 'Innovation',
              desc: 'Adopting new technologies and methods for better outcomes',
            },
          ].map((value, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-slate-900 mb-2">
                {value.title}
              </h4>
              <p className="text-sm text-slate-600">
                {value.desc}
              </p>
            </div>
          ))}

        </div>
      </SectionWrapper>

      {/* Join Us CTA */}
      <SectionWrapper
        title="Join Our Team"
        subtitle="We're always looking for talented professionals"
        bgColor="dark"
      >
        <div className="text-center">
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            If you're passionate about engineering excellence and want to be part of a growing EPC company, 
            we'd love to hear from you.
          </p>
          <Link
            href="/careers"
            className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-quaternary)] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            <UserPlus className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            Join Our Team
          </Link>
        </div>
      </SectionWrapper>

    </main>
  );
}
