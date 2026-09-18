'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Client } from '@/types';
import { Building2, MapPin, CheckCircle2, ChevronDown, FolderCheck } from 'lucide-react';

interface ClientCardProps {
  client: Client;
}

// Custom per-client logo sizing map keyed by exact image filename (Gallery/CLIENTS/)
const clientLogoStyles: Record<string, string> = {
  gmda: 'scale-[1.25] p-0',
  ish: 'scale-[1.20] p-0',
  keci: 'scale-[1.00] p-0',
  m3m: 'scale-[1.10] p-0.5',
  mck: 'scale-[1.15] p-0',
  ntpc: 'scale-[1.05] p-0.5',
  phed: 'scale-[1.10] p-0.5',
  uprvunl: 'scale-[1.10] p-0.5',
  vedanta: 'scale-[1.25] p-0',
};

export default function ClientCard({ client }: ClientCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const logoFilename = client.logo.split('/').pop()?.split('.')[0]?.toLowerCase() || '';
  const logoStyle =
    clientLogoStyles[client.id] ||
    clientLogoStyles[logoFilename] ||
    'p-1';

  return (
    <div className="group relative bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* TOP ACCENT BAR */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-tertiary)] to-[var(--color-quaternary)]" />

      <div>
        {/* HEADER ROW: CLIENT LOGO & LOCATION */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-16 h-16 relative flex items-center justify-center rounded-xl bg-white border border-slate-200 p-2 shadow-sm shrink-0 group-hover:border-[var(--color-primary)]/40 transition-colors overflow-hidden">
            {client.logo && !imageError ? (
              <Image
                src={client.logo}
                alt={client.name}
                width={60}
                height={60}
                className={`max-h-full max-w-full w-auto h-auto object-contain transition-transform ${logoStyle}`}
                onError={() => setImageError(true)}
              />
            ) : (
              <Building2 className="w-7 h-7 text-[var(--color-primary)]" />
            )}
          </div>

          {client.location && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              {client.location}
            </span>
          )}
        </div>

        {/* NAME & SECTOR */}
        <h3 className="text-xl font-bold text-slate-900 mb-1 leading-snug">
          {client.name}
        </h3>
        <p className="text-xs font-bold text-[var(--color-tertiary)] uppercase tracking-wider mb-3">
          {client.industry}
        </p>

        {/* DESCRIPTION */}
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          {client.description}
        </p>

        {/* COLLAPSIBLE KEY PROJECTS */}
        {client.keyProjects && client.keyProjects.length > 0 && (
          <div className="mb-6 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-800 hover:text-[var(--color-primary)] transition-colors"
            >
              <span className="flex items-center gap-2">
                <FolderCheck className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                <span>Key Delivered Projects ({client.keyProjects.length})</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {isOpen && (
              <ul className="mt-3 space-y-2 pl-1 animate-fadeIn">
                {client.keyProjects.map((proj, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-secondary)] shrink-0 mt-0.5" />
                    <span>{proj}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* FOOTER - DELIVERED COUNT */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-auto">
        <span className="text-xs font-semibold text-slate-500">
          Total Projects Executed
        </span>
        <span className="text-sm font-bold text-slate-900 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
          {client.projectsCompleted} {client.projectsCompleted === 1 ? 'Project' : 'Projects'}
        </span>
      </div>
    </div>
  );
}
