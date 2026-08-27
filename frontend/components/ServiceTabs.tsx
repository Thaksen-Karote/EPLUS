"use client";

import { useState, useEffect } from 'react';
import { Service, ServiceCategory } from '@/types';
import ServiceCard from '@/components/ServiceCard';
import AnimatedList from '@/components/AnimatedList';
import { motion, AnimatePresence } from 'framer-motion';
import { Factory, Wrench, Building, Sparkles } from 'lucide-react';

interface ServiceTabsProps {
  services: Service[];
}

const TABS: { id: ServiceCategory; label: string; icon: any; description: string }[] = [
  {
    id: 'Industrial EPC',
    label: 'Industrial EPC',
    icon: Factory,
    description: 'End-to-end water, effluent, sewage, and industrial process engineering solutions.',
  },
  {
    id: 'MEPF',
    label: 'MEPF',
    icon: Wrench,
    description: 'Mechanical, Electrical, Plumbing, Fire Protection, and Building Automation systems.',
  },
  {
    id: 'Civil & Infrastructure',
    label: 'Civil & Infrastructure',
    icon: Building,
    description: 'Structural RCC works, site development, foundations, and civil infrastructure execution.',
  },
  {
    id: 'Interior',
    label: 'Interior Design',
    icon: Sparkles,
    description: 'Turnkey interior solutions for offices, hotels, commercial spaces, and restaurants.',
  },
];

export default function ServiceTabs({ services }: ServiceTabsProps) {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('Industrial EPC');

  // Sync hash if present in URL on load, hashchange, or same-page link click
  useEffect(() => {
    const processHash = (hashString: string, shouldScroll = false) => {
      const hash = hashString.replace('#', '').toLowerCase();
      if (!hash) return;

      let targetCategory: ServiceCategory | null = null;
      if (hash.includes('epc') || hash.includes('industrial') || hash === 'stp' || hash === 'wtp') {
        targetCategory = 'Industrial EPC';
      } else if (hash.includes('mepf') || hash === 'hvac' || hash === 'plumbing' || hash === 'fire') {
        targetCategory = 'MEPF';
      } else if (hash.includes('civil') || hash.includes('infrastructure')) {
        targetCategory = 'Civil & Infrastructure';
      } else if (hash.includes('interior') || hash === 'offices' || hash === 'hotels') {
        targetCategory = 'Interior';
      }

      if (targetCategory) {
        setActiveTab(targetCategory);
        if (shouldScroll) {
          setTimeout(() => {
            const el = document.getElementById('services-tabs');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 80);
        }
      }
    };

    // Initial check on page load
    if (typeof window !== 'undefined' && window.location.hash) {
      processHash(window.location.hash, true);
    }

    // Event handler for hash change or history back/forward
    const handleHashEvent = () => {
      if (typeof window !== 'undefined') {
        processHash(window.location.hash, true);
      }
    };

    // Global click listener to catch same-page Next.js link clicks
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.href) {
        try {
          const url = new URL(target.href, window.location.origin);
          if (url.pathname === '/services' && url.hash) {
            processHash(url.hash, true);
          }
        } catch {
          // ignore invalid URLs
        }
      }
    };

    window.addEventListener('hashchange', handleHashEvent);
    window.addEventListener('popstate', handleHashEvent);
    document.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('hashchange', handleHashEvent);
      window.removeEventListener('popstate', handleHashEvent);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const activeServices = services.filter((s) => s.category === activeTab);
  const activeTabMeta = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <div className="space-y-8">
      {/* TABS HEADER BAR */}
      <div className="flex justify-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-slate-100/90 p-2 border border-slate-200/80 shadow-inner max-w-full">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const count = services.filter((s) => s.category === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-md border-2 border-[var(--color-primary)]/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border-2 border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--color-primary)]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span
                  className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold'
                      : 'bg-slate-200/70 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE TAB DESCRIPTION */}
      <div className="text-center max-w-2xl mx-auto px-4">
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          {activeTabMeta.description}
        </p>
      </div>

      {/* ACTIVE TAB SERVICES WITH ANIMATED LIST */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
        >
          <AnimatedList
            items={activeServices.map((service) => (
              <div key={service.id} id={service.id} className="scroll-mt-24 p-1">
                <ServiceCard service={service} />
              </div>
            ))}
            displayScrollbar={false}
            showGradients={false}
            enableArrowNavigation={false}
            className="w-full"
            itemClassName="!bg-transparent !border-none !p-0"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
