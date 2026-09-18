import { Metadata } from "next";
import HeroSlideshow from "@/components/HeroSlideshow";
import { heroImagesByPage } from "@/data/hero-images";
import SectionWrapper from "@/components/SectionWrapper";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import TrustedClients from "@/components/TrustedClients";
import { fetchServices, fetchFeaturedProjects } from "@/lib/api";
import Link from "next/link";
import { ShieldCheck, CircleCheckBig, Brain, Workflow } from "lucide-react";
import { Service } from '@/types';

export const metadata: Metadata = {
  title: "Engineering Plus - EPC Solutions",
  description:
    "Leading EPC company specializing in STP, WTP, MEPF works, and interior solutions for offices, factories, and hotels.",
  keywords: "EPC, STP, WTP, MEPF, construction, engineering, water treatment",
};

const homeServices: Service[] = [
  {
    id: 'industrial-epc',
    name: 'Industrial EPC',
    category: 'Industrial EPC',
    description:
      'End-to-end EPC solutions for industrial infrastructure including STP and WTP projects. We handle complete execution from design and procurement to construction and commissioning with a focus on efficiency, compliance, and sustainability.',
    icon: 'Droplets',
    color: 'text-blue-500',
    benefits: [],
  },
  {
    id: 'MEPF',
    name: 'MEPF Works',
    category: 'MEPF',
    description:
      'Comprehensive Mechanical, Electrical, and Plumbing services covering civil integration, electromechanical systems, fire protection, and automation to ensure reliable and efficient building infrastructure.',
    icon: 'Cog',
    color: 'text-yellow-500',
    benefits: [],
  },
  {
    id: 'civil-infrastructure',
    name: 'Civil & Infrastructure',
    category: 'Civil & Infrastructure',
    description:
      'Civil construction, structural RCC works, foundations, and site development with focus on safety, quality construction standards, and engineering precision.',
    icon: 'Building',
    color: 'text-pink-600',
    benefits: [],
  },
  // {
  //   id: 'interior',
  //   name: 'Interior Solutions',
  //   category: 'Interior',
  //   description:
  //     'Turnkey interior design and execution for offices, hotels, and cafes, combining functionality, aesthetics, and high-quality materials to deliver modern and efficient spaces.',
  //   icon: 'LampCeilingIcon',
  //   color: 'text-purple-500',
  //   benefits: [],
  // },
];

export default async function Home() {
  const featuredProjects = await fetchFeaturedProjects();
  const topProjects = featuredProjects.filter(p => p.featured).slice(0, 3);


  return (
    <main>
      {/* Hero Section */}
      <HeroSlideshow
        images={heroImagesByPage.home}
        ariaLabel="Home hero"
        title="Engineering Solutions for Tomorrow"
        subtitle="Comprehensive EPC services specializing in STP, WTP, MEPF works, and interior solutions. Building excellence across India."
        ctaText="Explore Services"
        ctaLink="#services"
      />

      {/* About Preview */}
      <SectionWrapper
        id="why-engineering-plus"
        title="Why Engineering Plus"
        subtitle="We deliver comprehensive engineering, procurement, and construction solutions with a focus on quality and innovation"
        bgColor="gray"
        containerClassName="max-w-[1500px]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative bg-white/70 backdrop-blur-xl border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
            {/* Background Icon (top-right, blur + fade) */}
            <Brain className="absolute top-4 right-4 w-20 h-20 text-[var(--color-secondary)] opacity-20 blur-[3px] group-hover:scale-110 transition-transform duration-300" />

            {/* Foreground Icon */}
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--color-secondary)]/10 mb-4">
              <Brain className="w-6 h-6 text-[var(--color-secondary)] group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mt-2 mb-2">
              Expertise
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              15+ years of experience in designing and executing complex EPC
              projects across various sectors.
            </p>
          </div>

          <div className="relative bg-white/70 backdrop-blur-xl border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
            {/* Background Icon (top-right, blur + fade) */}
            <CircleCheckBig className="absolute top-4 right-4 w-20 h-20 text-[var(--color-quaternary)] opacity-20 blur-[3px] group-hover:scale-110 transition-transform duration-300" />

            {/* Foreground Icon */}
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--color-quaternary)]/10 mb-4">
              <CircleCheckBig className="w-6 h-6 text-[var(--color-quaternary)] group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mt-2 mb-2">
              Proven Track Record
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              Successfully completed 100+ projects for leading clients in
              industrial, hospitality, and residential sectors.
            </p>
          </div>

          <div className="relative bg-white/70 backdrop-blur-xl border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
            {/* Background Icon (top-right, blur + fade) */}
            <ShieldCheck className="absolute top-4 right-4 w-20 h-20 text-[var(--color-tertiary)] opacity-20 blur-[3px] group-hover:scale-110 transition-transform duration-300" />

            {/* Foreground Icon */}
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--color-tertiary)]/10 mb-4">
              <ShieldCheck className="w-6 h-6 text-[var(--color-tertiary)] group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mt-2 mb-2">
              Quality Assurance
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              Stringent quality checks at every stage ensuring compliance with
              international standards and regulations.
            </p>
          </div>

          <div className="relative bg-white/70 backdrop-blur-xl border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
            {/* Background Icon (top-right, blur + fade) */}
            <Workflow className="absolute top-4 right-4 w-20 h-20 text-[var(--color-primary)] opacity-20 blur-[3px] group-hover:scale-110 transition-transform duration-300" />

            {/* Foreground Icon */}
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--color-primary)]/10 mb-4">
              <Workflow className="w-6 h-6 text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mt-2 mb-2">
              End-to-End Solutions
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              Integrated capabilities across engineering, procurement, MEPF, civil infrastructure, construction, and commissioning.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Services Preview */}
      <SectionWrapper
        id="services"
        title="Our Services"
        subtitle="Complete range of EPC solutions tailored to your project needs"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
          {homeServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/services"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-quaternary)] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            View All Services
          </Link>
        </div>
      </SectionWrapper>

      {/* Our Projects */}
      <SectionWrapper
        title="Our Projects"
        subtitle="From water and wastewater treatment to industrial and commercial developments, we deliver projects across diverse sectors with a focus on quality, coordination, and reliable execution."
        bgColor="gray"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {topProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featured={true} variant="home" />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-quaternary)] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            View All Projects
          </Link>
        </div>
      </SectionWrapper>

      {/* Trusted Clients Section */}
      <TrustedClients />

      {/* CTA Section */}
      <SectionWrapper
        title="Ready to Start Your Project?"
        subtitle="Contact us today for a free consultation and project assessment"
        bgColor="dark"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-quaternary)] text-white font-semibold rounded-lg hover:shadow-lg transition-all text-center"
          >
            Get in Touch
          </Link>
          <Link
            href="/projects"
            className="px-8 py-3 bg-gradient-to-r from-[var(--color-quaternary)] to-[var(--color-primary)] text-white font-semibold rounded-lg hover:shadow-lg transition-all text-center"
          >
            View Our Work
          </Link>
        </div>
      </SectionWrapper>
    </main>
  );
}
