import { Metadata } from 'next';
import HeroSlideshow from '@/components/HeroSlideshow';
import { heroImagesByPage } from '@/data/hero-images';
import SectionWrapper from '@/components/SectionWrapper';
import { clientsData } from '@/data/clients';
import { Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Clients - Engineering Plus',
  description: 'Our clients across infrastructure, energy and hospitality sectors.',
};

export default function ClientsPage() {
  return (
    <main>

      {/* HERO */}
      <HeroSlideshow
        images={heroImagesByPage.clients}
        ariaLabel="Clients hero"
        title="Our Clients"
        subtitle="Trusted by organizations across industries"
      />

      {/* CLIENT GRID */}
      <SectionWrapper
        title="Key Clients"
        subtitle="Partnerships built on trust and performance"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {clientsData.map((client) => (
            <div
              key={client.id}
              className="group relative bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >

              {/* TOP ACCENT */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]" />

              {/* LOGO / ICON */}
              <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-lg bg-slate-100 group-hover:bg-[var(--color-primary)]/10 transition-colors">
                <Building2 className="w-6 h-6 text-[var(--color-primary)]" />
              </div>

              {/* NAME */}
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {client.name}
              </h3>

              {/* INDUSTRY */}
              <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">
                {client.industry}
              </p>

              {/* DESCRIPTION */}
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {client.description}
              </p>

              {/* PROJECT COUNT */}
              <div className="flex items-center justify-between border-t pt-3 text-sm">
                <span className="text-slate-500">
                  Projects Delivered
                </span>
                <span className="font-semibold text-slate-900">
                  {client.projectsCompleted}+
                </span>
              </div>

            </div>
          ))}

        </div>
      </SectionWrapper>

      {/* TRUST SECTION */}
      <SectionWrapper
        title="Why Clients Trust Us"
        subtitle="Delivering consistent results across projects"
        bgColor="gray"
      >
        <div className="grid md:grid-cols-3 gap-6">

          {[
            {
              title: 'Reliable Delivery',
              desc: 'Projects completed within timeline and scope',
            },
            {
              title: 'Technical Expertise',
              desc: 'Strong engineering and execution capabilities',
            },
            {
              title: 'Quality Focus',
              desc: 'Strict adherence to standards and compliance',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-slate-900 mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </SectionWrapper>

    </main>
  );
}