import { Metadata } from 'next';
import Image from 'next/image';
import HeroSlideshow from '@/components/HeroSlideshow';
import { heroImagesByPage } from '@/data/hero-images';
import SectionWrapper from '@/components/SectionWrapper';
import FAQSection from '@/components/FAQSection';
import {
  Target,
  Rocket,
  ShieldCheck,
  Star,
  Users,
  Leaf,
  Building2,
  Wrench,
} from 'lucide-react';
import CertificationCards from '@/components/CertificationCards';

export const metadata: Metadata = {
  title: 'About Engineering Plus',
  description:
    'Engineering Plus is an EPC company specializing in STP, WTP, MEPF and Interior solutions.',
};

export default function About() {
  return (
    <main>

      {/* HERO */}
      <HeroSlideshow
        images={heroImagesByPage.about}
        ariaLabel="About hero"
        title="About Engineering Plus"
        subtitle="Delivering reliable EPC solutions across infrastructure and water sectors"
      />

      {/* COMPANY OVERVIEW (PPT BASED) */}
      <SectionWrapper
        title="Who We Are"
        subtitle="Focused expertise in EPC execution"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Engineering Plus is an EPC (Engineering, Procurement & Construction)
              company specializing in STP, WTP, MEPF works and Interior solutions.
              We deliver end-to-end project execution from design to commissioning.
            </p>

            <p className="text-slate-600 mb-4 leading-relaxed">
              Our strength lies in integrating engineering expertise with on-ground
              execution capabilities, ensuring projects are delivered efficiently,
              within timeline and quality standards.
            </p>

            <p className="text-slate-600 leading-relaxed">
              We focus on sustainable infrastructure development with a strong
              commitment to environmental compliance and operational efficiency.
            </p>
          </div>

          {/* VISUAL */}
          <div className="relative rounded-lg h-80 overflow-hidden shadow-lg border border-slate-200">
            <Image
              src="/Hero/AboutImage.jpeg"
              alt="EPC Solutions"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

        </div>
      </SectionWrapper>

      {/* MISSION & VISION (UPGRADED UI) */}
      <SectionWrapper title="Mission & Vision" bgColor="gray">
        <div className="grid md:grid-cols-2 gap-8">

          {/* MISSION */}
          <div className="group relative overflow-hidden bg-white rounded-lg border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300">

            <Target className="w-10 h-10 text-[var(--color-primary)] mb-4" />

            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Our Mission
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed">
              To deliver efficient, sustainable and high-quality EPC solutions
              that meet client requirements while ensuring environmental and
              operational excellence.
            </p>
          </div>

          {/* VISION */}
          <div className="group relative overflow-hidden bg-white rounded-lg border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300">

            <Rocket className="w-10 h-10 text-[var(--color-secondary)] mb-4" />

            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Our Vision
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed">
              To be a trusted EPC partner known for reliability, technical
              excellence and consistent project delivery across infrastructure sectors.
            </p>
          </div>

        </div>
      </SectionWrapper>

      {/* CORE VALUES */}
      <SectionWrapper
        title="Core Values"
        subtitle="Principles that define our work"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              Icon: ShieldCheck,
              title: 'Integrity',
              desc: 'Transparent and ethical execution',
            },
            {
              Icon: Star,
              title: 'Quality',
              desc: 'Commitment to high standards',
            },
            {
              Icon: Users,
              title: 'Collaboration',
              desc: 'Strong teamwork and partnerships',
            },
            {
              Icon: Leaf,
              title: 'Sustainability',
              desc: 'Environmentally responsible approach',
            },
          ].map((value, index) => (
            <div
              key={index}
              className="group bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <value.Icon className="w-8 h-8 mx-auto mb-3 text-[var(--color-quaternary)] group-hover:scale-110 transition-transform" />

              <h4 className="font-semibold text-slate-900 mb-1">
                {value.title}
              </h4>

              <p className="text-slate-600 text-sm">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* EXPERTISE */}
      <SectionWrapper
        title="Our Expertise"
        subtitle="Key domains we specialize in"
        bgColor="gray"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { Icon: Building2, label: 'STP Projects' },
            { Icon: Wrench, label: 'WTP Systems' },
            { Icon: Wrench, label: 'MEPF Works' },
            { Icon: Building2, label: 'Interior Solutions' },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-lg p-6 text-center border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <item.Icon className="w-8 h-8 mx-auto mb-3 text-[var(--color-tertiary)] group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-slate-800">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CERTIFICATIONS & CREDENTIALS */}
      {/* <SectionWrapper
        title="Certifications & Credentials"
        subtitle="Committed to quality, safety, and environmental standards"
      >
        <CertificationCards />
      </SectionWrapper> */}

      {/* 🔥 FAQ SECTION */}
      <FAQSection />

    </main>
  );
}