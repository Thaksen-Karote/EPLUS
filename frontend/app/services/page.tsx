import { Metadata } from 'next';
import HeroSlideshow from '@/components/HeroSlideshow';
import { heroImagesByPage } from '@/data/hero-images';
import SectionWrapper from '@/components/SectionWrapper';
import ServiceTabs from '@/components/ServiceTabs';
import { fetchServices } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Services - Engineering Plus',
  description:
    'EPC services including STP, WTP, MEPF and Interior solutions.',
};

export default async function Services() {
  const services = await fetchServices();

  return (
    <main>

      {/* HERO */}
      <HeroSlideshow
        images={heroImagesByPage.services}
        ariaLabel="Services hero"
        title="Our Services"
        subtitle="End-to-end EPC solutions across water, infrastructure and interior domains"
      />

      {/* CORE SERVICES TABS */}
      <SectionWrapper
        id="services-tabs"
        title="Core Services"
        subtitle="Explore our specialized expertise across key engineering domains"
      >
        <ServiceTabs services={services} />
      </SectionWrapper>

      {/* EPC APPROACH (IMPROVED UI) */}
      <SectionWrapper
        title="Our Work Approach"
        subtitle="We follow a structured, end-to-end approach to deliver projects with clear coordination, quality control, and reliable execution, from initial engineering and procurement through construction, commissioning, and support."
        bgColor="gray"
        containerClassName="max-w-[1500px]"
      >
        <div className="grid md:grid-cols-4 gap-8">

          {/* CARD */}
          {[
            {
              title: 'Plan & Engineer',
              desc: 'We begin by understanding project requirements, developing the right engineering solutions, and planning the execution strategy for a smooth and efficient project journey.',
              points: ['Design', 'Engineering', 'Planning'],
              color: 'var(--color-primary)',
            },
            {
              title: 'Procure & Coordinate',
              desc: 'We manage procurement and vendor coordination to source the required materials and equipment while maintaining quality, technical compliance, and timely availability.',
              points: ['Equipment Supply', 'Vendor Management', 'Quality Assurance'],
              color: 'var(--color-secondary)',
            },
            {
              title: 'Execute & Integrate',
              desc: 'Our multidisciplinary teams execute the planned works across civil, MEPF, and other project systems while ensuring effective site coordination and quality control.',
              points: ['Construction', 'Installation', 'Coordination'],
              color: 'var(--color-tertiary)',
            },
            {
              title: 'Test & Deliver',
              desc: 'We test and commission completed systems, verify performance, and support a smooth project handover with continued technical support when required.',
              points: ['Testing', 'Commissioning', 'Handover'],
              color: 'var(--color-quaternary)',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white rounded-b-lg border border-slate-200 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >

              {/* TOP ACCENT LINE (DEFAULT) */}
              <div
                className="absolute top-0 left-0 w-full h-1 z-10"
                style={{ background: item.color }}
              />

              {/* HOVER BACKGROUND (SLIDE FROM TOP → DOWN) */}
              <div
                className="absolute inset-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"
                style={{ background: item.color }}
              />

              {/* CONTENT */}
              <div className="relative z-20 transition-colors duration-300 group-hover:text-white">

                {/* TITLE */}
                <h3 className="text-xl text-slate-800  group-hover:text-white ransition-colors font-bold mb-3">
                  {item.title}
                </h3>

                {/* DESC */}
                <p className="mb-5 text-sm leading-relaxed text-slate-600 group-hover:text-white/90 transition-colors">
                  {item.desc}
                </p>

                {/* POINTS */}
                <ul className="space-y-2 text-sm text-slate-600 group-hover:text-white transition-colors">
                  {item.points.map((p, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full bg-current group-hover:bg-white  transition-colors "
                        style={{ color: item.color }}
                      />
                      <span className="group-hover:text-white">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

        </div>
      </SectionWrapper>

      {/* PROCESS (IMPROVED UI) */}
      <SectionWrapper
        title="Our Process"
        subtitle="Structured execution methodology"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {[
            { step: '01', title: 'Assessment', desc: 'Understanding requirements & feasibility' },
            { step: '02', title: 'Design', desc: 'Engineering & planning phase' },
            { step: '03', title: 'Execution', desc: 'Procurement & construction' },
            { step: '04', title: 'Delivery', desc: 'Testing & handover' },
          ].map((item, index) => (
            <div
              key={index}
              className="group relative bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300"
            >

              {/* STEP NUMBER */}
              <div className="text-3xl font-bold text-[var(--color-primary)] mb-2 group-hover:scale-110 transition-transform">
                {item.step}
              </div>

              {/* TITLE */}
              <h4 className="font-semibold text-slate-900 mb-1">
                {item.title}
              </h4>

              {/* DESC */}
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