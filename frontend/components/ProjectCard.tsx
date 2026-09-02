'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import {
  MapPin,
  CalendarDays,
  Tag,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import GalleryLightbox from '@/components/GalleryLightbox';

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
  const slides = useMemo(() => {
    if (variant !== 'projects') return [];
    if (!project.showGalleryImages) return [];
    if (project.gallery && project.gallery.length > 0) return project.gallery;
    return [];
  }, [variant, project.showGalleryImages, project.gallery]);

  const lightboxItems = useMemo(
    () =>
      slides.map((src, i) => ({
        src,
        alt: `${project.name} — photo ${i + 1} of ${slides.length}`,
      })),
    [slides, project.name]
  );

  const [slideIndex, setSlideIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = useCallback(() => {
    if (slides.length > 0) setLightboxOpen(true);
  }, [slides.length]);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    setSlideIndex(0);
    setLightboxOpen(false);
  }, [project.id, slides.length]);

  // HOME CARD (same as current but WITHOUT button)
  if (variant === 'home') {
    return (
      <div className="group bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col">

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
    <>
    <div className="min-h-[300px] relative group bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
      {/* LEFT SIDE (gallery / hero image / gradient) */}
      <div className="relative md:w-[40%] h-52 md:min-h-[240px] md:h-auto overflow-hidden bg-slate-100">
        {slides.length > 0 ? (
          <>
            <Image
              src={slides[slideIndex]}
              alt={`${project.name} — photo ${slideIndex + 1} of ${slides.length}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority={slideIndex === 0}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-black/45 to-transparent h-16 md:h-20" aria-hidden />
            <button
              type="button"
              onClick={openLightbox}
              className="absolute inset-0 z-[2] cursor-zoom-in bg-transparent"
              aria-label={`Open full size — ${project.name}`}
            />
            <span className="pointer-events-none absolute bottom-3 left-3 z-[3] rounded-md bg-black/35 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
              {project.category}
            </span>
          </>
        ) : (
          <div className="w-full h-full min-h-[13rem] bg-gradient-to-br from-[var(--color-tertiary)] to-[var(--color-secondary)] flex items-center justify-center text-white text-xl font-bold">
            {project.category}
          </div>
        )}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSlideIndex(
                  (i) => (i - 1 + slides.length) % slides.length
                );
              }}
              className="absolute left-2 top-1/2 z-[4] -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-md bg-white/30 backdrop-blur-sm text-white shadow-sm transition hover:bg-white/45"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5 shrink-0" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSlideIndex((i) => (i + 1) % slides.length);
              }}
              className="absolute right-2 top-1/2 z-[4] -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-md bg-white/30 backdrop-blur-sm text-white shadow-sm transition hover:bg-white/45"
              aria-label="Next image"
            >
              <ChevronRight className="size-5 shrink-0" strokeWidth={2} aria-hidden />
            </button>
          </>
        )}
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

        {/* <p className="text-xs text-slate-500 mb-3">
          <strong className="text-slate-700">Budget:</strong> {project.budget}
        </p> */}

        <div className="flex flex-wrap gap-2">
          {project.scope.slice(0, 3).map((item, index) => (
            <span key={index} className="px-2.5 py-1 text-[10px] shadow-sm font-bold bg-slate-100 text-slate-700 rounded-lg">
              {item}
            </span>
          ))}
        </div>

      </div>
    </div>

    <GalleryLightbox
      items={lightboxItems}
      open={lightboxOpen}
      initialIndex={slideIndex}
      onClose={closeLightbox}
    />
    </>
  );
}
