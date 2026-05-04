import { Project } from '@/types';
import { MapPin, CalendarDays, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  variant?: 'home' | 'projects';
}

export default function ProjectCard({
  project,
  featured = false,
  variant = 'home',
}: ProjectCardProps) {

  // HOME CARD (same as current but WITHOUT button)
  if (variant === 'home') {
    return (
      <div className="group bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">

        {/* HEADER */}
        <div className="relative h-44 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-tertiary)] to-[var(--color-secondary)] opacity-90"></div>

          <div className="relative z-10 h-full flex items-center justify-center text-white text-lg font-bold">
            {project.category}
          </div>

          {featured && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-6">

          <p className="text-sm text-slate-500">{project.client}</p>

          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {project.name}
          </h3>

          <p className="text-sm text-slate-600 line-clamp-2">
            {project.description}
          </p>

        </div>
      </div>
    );
  }

  // PROJECTS PAGE CARD (FULL WIDTH)
  return (
<div className="min-h-[300px] relative group bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
      {/* LEFT SIDE (IMAGE / SLIDER FUTURE) */}
      <div className="relative md:w-[40%] h-52 md:h-auto overflow-hidden">

        {/* TEMP GRADIENT (future image slider) */}
        <div className="w-full h-full bg-gradient-to-br from-[var(--color-tertiary)] to-[var(--color-secondary)] flex items-center justify-center text-white text-xl font-bold">
          {project.category}
        </div>

        {/* FUTURE: arrows */}
        <button
          type="button"
          className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-md bg-white/30 backdrop-blur-sm text-white shadow-sm transition hover:bg-white/45"
          aria-label="Previous image"
        >
          <ChevronLeft className="size-5 shrink-0" strokeWidth={2} aria-hidden />
        </button>
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-md bg-white/30 backdrop-blur-sm text-white shadow-sm transition hover:bg-white/45"
          aria-label="Next image"
        >
          <ChevronRight className="size-5 shrink-0" strokeWidth={2} aria-hidden />
        </button>
      </div>

      {/* RIGHT SIDE (DETAILS) */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        {/* FEATURED */}
        {featured && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full">
            Featured
          </span>
        )}

        <p className="text-sm text-slate-500 mb-1">
          {project.client}
        </p>

        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {project.name}
        </h3>

        <p className="text-sm text-slate-600 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 mb-3">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-[var(--color-tertiary)]" aria-hidden />
            <span>
              <strong className="text-slate-700">Completed:</strong>{' '}
              {project.completionDate}
            </span>
          </span>
          <span className="inline-flex items-center gap-2">
            <Tag className="h-4 w-4 shrink-0 text-[var(--color-secondary)]" aria-hidden />
            <span className="rounded-md bg-slate-100 px-2 py-0.5 font-semibold text-slate-800">
              {project.category}
            </span>
          </span>
          <span className="inline-flex items-center gap-2 min-w-0">
            <MapPin className="h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden />
            <span className="truncate">{project.location}</span>
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-3">
          <strong className="text-slate-700">Budget:</strong> {project.budget}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.scope.slice(0, 3).map((item, index) => (
            <span key={index} className="px-2.5 py-1 text-[10px] shadow-sm font-bold bg-slate-100 text-slate-700 rounded-lg">
              {item}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}