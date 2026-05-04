'use client';

import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import HeroSlideshow from '@/components/HeroSlideshow';
import { heroImagesByPage } from '@/data/hero-images';
import SectionWrapper from '@/components/SectionWrapper';
import ProjectCard from '@/components/ProjectCard';
import AnimatedList from '@/components/AnimatedList';

import { Smile, Handshake, Award } from "lucide-react";

export default function ProjectsClient({ projects }: any) {
  const [tab, setTab] = useState<'completed' | 'ongoing'>('completed');

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const completedBtnRef = useRef<HTMLButtonElement>(null);
  const ongoingBtnRef = useRef<HTMLButtonElement>(null);
  const prevTabRef = useRef<'completed' | 'ongoing' | null>(null);
  const hasSyncedTabRef = useRef(false);
  const [navDir, setNavDir] = useState<1 | -1>(1);

  const [indicator, setIndicator] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const measureIndicator = useCallback(() => {
    const container = tabsContainerRef.current;
    const activeEl =
      tab === 'completed'
        ? completedBtnRef.current
        : ongoingBtnRef.current;
    if (!container || !activeEl) return;
    const c = container.getBoundingClientRect();
    const r = activeEl.getBoundingClientRect();
    setIndicator({
      top: r.top - c.top,
      left: r.left - c.left,
      width: r.width,
      height: r.height,
    });
  }, [tab]);

  useLayoutEffect(() => {
    if (!hasSyncedTabRef.current) {
      hasSyncedTabRef.current = true;
      prevTabRef.current = tab;
    } else if (prevTabRef.current !== tab) {
      const order = { completed: 0, ongoing: 1 } as const;
      setNavDir(order[tab] > order[prevTabRef.current!] ? 1 : -1);
      prevTabRef.current = tab;
    }
  }, [tab]);

  useLayoutEffect(() => {
    measureIndicator();
  }, [measureIndicator]);

  useLayoutEffect(() => {
    const container = tabsContainerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => measureIndicator());
    ro.observe(container);
    window.addEventListener('resize', measureIndicator);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measureIndicator);
    };
  }, [measureIndicator]);

  const completedProjects = projects;
  const ongoingProjects: any[] = [];

  const indicatorGradient =
    tab === 'completed'
      ? navDir === 1
        ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-quaternary)]'
        : 'bg-gradient-to-l from-[var(--color-primary)] to-[var(--color-quaternary)]'
      : navDir === 1
        ? 'bg-gradient-to-r from-[var(--color-quaternary)] to-[var(--color-primary)]'
        : 'bg-gradient-to-l from-[var(--color-quaternary)] to-[var(--color-primary)]';

  return (
    <main>

      {/* HERO */}
      <HeroSlideshow
        images={heroImagesByPage.projects}
        ariaLabel="Projects hero"
        title="Our Projects"
        subtitle="Portfolio of successful implementations across diverse sectors"
        ctaText="Explore Projects"
        ctaLink="#projects"
      />

      {/* PROJECTS */}
      <SectionWrapper
        id="projects"
        title="Project Portfolio"
        subtitle="100+ projects completed across India"
      >

        {/* TABS */}
        <div
          ref={tabsContainerRef}
          className="relative flex justify-center gap-4 mb-10"
        >
          {indicator.width > 0 && (
            <motion.div
              aria-hidden
              className={`pointer-events-none absolute rounded-lg shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] ${indicatorGradient}`}
              initial={false}
              animate={{
                top: indicator.top,
                left: indicator.left,
                width: indicator.width,
                height: indicator.height,
              }}
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 34,
                mass: 0.6,
              }}
            />
          )}

          <button
            ref={completedBtnRef}
            type="button"
            onClick={() => setTab('completed')}
            className={`relative z-10 px-5 py-2 rounded-lg text-sm font-semibold transition-colors
              ${
                tab === 'completed'
                  ? 'text-white'
                  : 'text-slate-700 hover:bg-slate-100/80'
              }`}
          >
            Completed
          </button>

          <button
            ref={ongoingBtnRef}
            type="button"
            onClick={() => setTab('ongoing')}
            className={`relative z-10 px-5 py-2 rounded-lg text-sm font-semibold transition-colors
              ${
                tab === 'ongoing'
                  ? 'text-white'
                  : 'text-slate-700 hover:bg-slate-100/80'
              }`}
          >
            Ongoing
          </button>
        </div>

        {/* LIST */}
        {tab === 'completed' ? (
          <AnimatedList
            items={completedProjects.map((project: any) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={project.featured}
                variant="projects"
              />
            ))}
            displayScrollbar={false}
            showGradients={false}
            enableArrowNavigation={false}
            className="w-full"
            itemClassName="!bg-transparent !border-none !p-0"
          />
        ) : (
          <div className="text-center text-slate-500 py-20">
            No ongoing projects available at the moment.
          </div>
        )}

      </SectionWrapper>

      {/* STATS */}
      <SectionWrapper
        title="Project Distribution"
        subtitle="Our expertise across sectors"
        bgColor="gray"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            { category: 'STP', count: '6+', color: 'bg-slate-100 text-blue-600' },
            { category: 'MEP', count: '3+', color: 'bg-slate-100 text-purple-600' },
            { category: 'Interior', count: '3+', color: 'bg-slate-100 text-amber-600' },
            { category: 'Others', count: '2+', color: 'bg-slate-100 text-cyan-600' },
          ].map((cat, index) => (
            <div key={index} className={`${cat.color} rounded-lg py-8 px-2 text-center shadow-sm hover:shadow-md transition-all`}>
              <h3 className="text-3xl font-bold mb-2">{cat.count}</h3>
              <p className="font-semibold font-bold uppercase ">{cat.category}</p>
            </div>
          ))}

        </div>
      </SectionWrapper>

      {/* TESTIMONIALS */}
      <SectionWrapper
        title="Client Testimonials"
        subtitle="What defines our client relationships"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {[
            {
              title: "Client Satisfaction",
              desc: "We ensure high levels of client satisfaction through effective communication and tailored solutions that address specific needs and challenges.",
              Icon: Smile,
            },
            {
              title: "Long-term Partnerships",
              desc: "Many clients choose to work with us repeatedly due to our reliable service, professionalism, and ability to deliver projects that exceed expectations.",
              Icon: Handshake,
            },
            {
              title: "Industry Recognition",
              desc: "We are recognized within the industry for innovation, quality, and professional integrity, reinforcing our position as a trusted partner.",
              Icon: Award,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-slate-200 p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* GRADIENT HOVER BACKGROUND */}
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-br from-[var(--color-quaternary)] to-[var(--color-tertiary)]" />
              {/* CONTENT */}
              <div className="relative z-10 transition-colors duration-300 group-hover:text-white">
          
                {/* ICON */}
                <item.Icon className="w-8 h-8 mb-4 text-[var(--color-quaternary)] group-hover:text-white transition-colors" />
          
                {/* TITLE */}
                <h3 className="text-lg text-slate-800 group-hover:text-white font-semibold mb-2">
                  {item.title}
                </h3>
          
                {/* DESC */}
                <p className="text-sm text-slate-600 group-hover:text-white/90 leading-relaxed">
                  {item.desc}
                </p>
          
              </div>
          
            </div>
          ))}

        </div>
      </SectionWrapper>

    </main>
  );
}