import type { Metadata } from 'next';
import SectionWrapper from '@/components/SectionWrapper';
import CareerApplicationForm from '@/components/CareerApplicationForm';
import { Briefcase, Users, TrendingUp, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers | Engineering Plus',
  description: 'Join our team of professionals and build your career in EPC industry with Engineering Plus.',
};

export default function CareersPage() {
  return (
    <main>
      {/* Why Work With Us */}
      <SectionWrapper
        title="Why Work With Us"
        subtitle="Build your career in a dynamic and growing organization"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              Icon: Briefcase,
              title: 'Diverse Projects',
              desc: 'Work on challenging STP, WTP, MEPF and interior projects across sectors',
            },
            {
              Icon: TrendingUp,
              title: 'Career Growth',
              desc: 'Clear career progression paths with continuous learning opportunities',
            },
            {
              Icon: Users,
              title: 'Team Culture',
              desc: 'Collaborative environment with experienced professionals',
            },
            {
              Icon: Award,
              title: 'Recognition',
              desc: 'Performance-based rewards and recognition programs',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-quaternary)]/10 mb-4">
                <item.Icon className="w-6 h-6 text-[var(--color-secondary)]" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Application Form */}
      <SectionWrapper
        title="Apply Now"
        subtitle="Fill out the application form below and we'll get back to you soon"
        bgColor="gray"
      >
        <div className="max-w-3xl mx-auto">
          <CareerApplicationForm />
        </div>
      </SectionWrapper>
    </main>
  );
}
