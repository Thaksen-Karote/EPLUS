import { Metadata } from 'next';
import HeroSlideshow from '@/components/HeroSlideshow';
import { heroImagesByPage } from '@/data/hero-images';
import SectionWrapper from '@/components/SectionWrapper';
import ServiceCard from '@/components/ServiceCard';
import { fetchServices } from '@/lib/api';
import AnimatedList from '@/components/AnimatedList';

export const metadata: Metadata = {
  title: 'Services - Engineering Plus',
  description:
    'EPC services including STP, WTP, MEP and Interior solutions.',
};



export default async function Services() {
  const services = await fetchServices();
  const grouped = {
      "industrial-epc": services.filter(s => s.category === "Industrial EPC"),
      "mep": services.filter(s => s.category === "MEP"),
      "interior": services.filter(s => s.category === "Interior"),
    };
  return (
    <main>

      {/* HERO */}
      <HeroSlideshow
        images={heroImagesByPage.services}
        ariaLabel="Services hero"
        title="Our Services"
        subtitle="End-to-end EPC solutions across water, infrastructure and interior domains"
      />

      {/* CORE SERVICES */}
      <SectionWrapper
        title="Core Services"
        subtitle="Focused expertise across key engineering domains"
      >
        <div className="space-y-12">

          {Object.entries(grouped).map(([key, group]) => (
            <section key={key} id={key} className="scroll-mt-24 space-y-6">
              {/* SECTION TITLE */}
              <h2 className="text-2xl font-bold text-slate-900 capitalize">
                {key.replace('-', ' ')}
              </h2>
              {/* ANIMATED LIST INSIDE */}
              <AnimatedList
                items={group.map((service) => (
                  <div className="p-1">
                    <ServiceCard key={service.id} service={service} />
                  </div>
                ))}
                displayScrollbar={false}
                showGradients={false}
                enableArrowNavigation={false}
                className="w-full"
                itemClassName="!bg-transparent !border-none !p-0"
              />
            </section>
          ))}
        </div>
      </SectionWrapper>

      {/* EPC APPROACH (IMPROVED UI) */}
      <SectionWrapper
        title="Our EPC Approach"
        subtitle="Integrated Engineering, Procurement and Construction model"
        bgColor="gray"
      >
        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD */}
          {[
            {
              title: 'Engineering',
              desc: 'Detailed design and planning to ensure efficient execution.',
              points: ['STP & WTP Design', 'MEP Design', 'Feasibility Studies'],
              color: 'var(--color-primary)',
            },
            {
              title: 'Procurement',
              desc: 'Sourcing quality materials and equipment from trusted vendors.',
              points: ['Equipment Supply', 'Vendor Management', 'Quality Assurance'],
              color: 'var(--color-secondary)',
            },
            {
              title: 'Construction',
              desc: 'Execution across civil, mechanical and electrical works.',
              points: ['Civil Works', 'Installation', 'Commissioning'],
              color: 'var(--color-tertiary)',
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