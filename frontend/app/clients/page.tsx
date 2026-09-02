import { Metadata } from 'next';
import HeroSlideshow from '@/components/HeroSlideshow';
import { heroImagesByPage } from '@/data/hero-images';
import SectionWrapper from '@/components/SectionWrapper';
import { clientsData } from '@/data/clients';
import ClientCard from '@/components/ClientCard';
import { Globe2, Layers, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Clients - Engineering Plus',
  description:
    'Trusted by government agencies, power utilities, municipal corporations, and enterprise leaders across India for EPC, PHD, and Waste Water solutions.',
};

export default function ClientsPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      {/* HERO */}
      <HeroSlideshow
        images={heroImagesByPage.clients}
        ariaLabel="Clients hero"
        title="Our Clients & Partners"
        subtitle="Delivering excellence for government bodies, public sector undertakings, and leading private enterprises"
      />

      {/* SECTOR & GEOGRAPHIC HIGHLIGHTS */}
      <SectionWrapper
        title="Key Sectors & National Reach"
        subtitle="Turnkey execution capabilities tailored for specialized industries across India"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Industry Sectors
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              Specialized execution in <strong>Industrial EPC</strong>, <strong>PHD (Public Health Dept.)</strong>, <strong>Waste Water Treatment</strong>, <strong>Power Generation</strong>, and <strong>Commercial Infrastructure</strong>.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Industrial EPC', 'PHD Works', 'Waste Water (STP/WTP)', 'Power & Energy'].map((tag) => (
                <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-tertiary)]/10 flex items-center justify-center text-[var(--color-tertiary)] mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Pan-India Presence
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              Proven operational capability executing multi-crore infrastructure projects across <strong>Haryana</strong>, <strong>Uttar Pradesh</strong>, <strong>Odisha</strong>, and <strong>NCR Region</strong>.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Haryana', 'Uttar Pradesh', 'Odisha', 'NCR Region'].map((tag) => (
                <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-secondary)]/10 flex items-center justify-center text-[var(--color-secondary)] mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Turnkey Compliance
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              Strict adherence to <strong>CPCB</strong>, <strong>SPCB</strong>, and environmental safety norms with end-to-end commissioning and substation integrations.
            </p>
            <div className="flex flex-wrap gap-2">
              {['CPCB Standards', 'STP / WTP', '11 KV Substations', 'Turnkey EPC'].map((tag) => (
                <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CLIENT GRID */}
      <SectionWrapper
        title="Key Clients & Projects"
        subtitle="Our esteemed clientele including GMDA, MCK, UPRVUNL, NTPC, DLF, KEC, and PHD"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientsData.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </SectionWrapper>

      {/* TRUST SECTION */}
      <SectionWrapper
        title="Why Enterprise Clients Choose Engineering Plus"
        subtitle="Delivering high-reliability EPC solutions on time and within budget"
        bgColor="gray"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Turnkey EPC Execution',
              desc: 'Comprehensive end-to-end scope from civil construction and mechanical piping to electrical 11 KV substations and SCADA automation.',
            },
            {
              title: 'Multi-Sector Expertise',
              desc: 'Specialized focus in high-capacity Sewage Treatment Plants (STP), Water Treatment (WTP), MEPF, and interior infrastructure.',
            },
            {
              title: 'Pan-India Footprint',
              desc: 'Proven track record executing projects for government authorities, power stations, and corporate leaders across multiple states.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all"
            >
              <h4 className="font-bold text-slate-900 text-lg mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </main>
  );
}