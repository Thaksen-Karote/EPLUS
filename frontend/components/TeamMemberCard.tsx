'use client';

import { useState } from 'react';
import type { TeamMember } from '@/types';
import { Mail, Phone, Award, ChevronDown } from 'lucide-react';

const VISIBLE_EXPERTISE = 3;

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const [expertiseExpanded, setExpertiseExpanded] = useState(false);
  const extraCount = member.expertise.length - VISIBLE_EXPERTISE;
  const hasOverflow = extraCount > 0;

  const visibleSkills = expertiseExpanded
    ? member.expertise
    : member.expertise.slice(0, VISIBLE_EXPERTISE);

  return (
    <div className="group bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-64 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-tertiary)] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {member.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700">
            {member.department}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
        <p className="text-sm font-semibold text-[var(--color-primary)] mb-3 uppercase tracking-wide">
          {member.position}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <Award className="w-4 h-4 text-[var(--color-secondary)] shrink-0" aria-hidden />
          <span className="text-sm font-medium text-slate-600">
            {member.experience} Experience
          </span>
        </div>

        <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-3">
          {member.bio}
        </p>

        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
            Expertise
          </p>
          <div className="flex flex-wrap gap-1.5">
            {visibleSkills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded"
              >
                {skill}
              </span>
            ))}
            {hasOverflow && !expertiseExpanded && (
              <button
                type="button"
                onClick={() => setExpertiseExpanded(true)}
                className="px-2 py-1 bg-slate-200 text-slate-800 text-xs rounded font-medium hover:bg-slate-300 transition-colors cursor-pointer"
                aria-expanded={false}
                aria-label={`Show ${extraCount} more expertise areas`}
              >
                +{extraCount} more
              </button>
            )}
            {hasOverflow && expertiseExpanded && (
              <button
                type="button"
                onClick={() => setExpertiseExpanded(false)}
                className="inline-flex items-center gap-0.5 px-2 py-1 text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 rounded transition-colors cursor-pointer"
                aria-expanded
                aria-label="Show fewer expertise areas"
              >
                Show less
                <ChevronDown className="size-3.5 rotate-180" aria-hidden />
              </button>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">
            <Mail className="w-4 h-4 shrink-0" aria-hidden />
            <a href={`mailto:${member.email}`} className="truncate">
              {member.email}
            </a>
          </div>
          {member.phone && (
            <div className="flex items-center gap-2 text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">
              <Phone className="w-4 h-4 shrink-0" aria-hidden />
              <a href={`tel:${member.phone}`}>{member.phone}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
