'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SLIDE_INTERVAL_MS = 10_000;

interface HeroSlideshowProps {
  images: readonly string[] | string[];
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  /** Screen-reader label for the rotating background (e.g. "Home page"). */
  ariaLabel?: string;
  /** Hide the bottom “Scroll to explore” hint (e.g. single short hero). */
  showScrollHint?: boolean;
}

export default function HeroSlideshow({
  images,
  title,
  subtitle,
  ctaText,
  ctaLink,
  ariaLabel = 'Hero',
  showScrollHint = true,
}: HeroSlideshowProps) {
  const slides = images.length > 0 ? [...images] : [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-800"
        aria-label={ariaLabel}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">{title}</h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">{subtitle}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-label={ariaLabel}
    >
      <div className="absolute inset-0" aria-hidden>
        {slides.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === index ? 'opacity-100 z-0' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/60 z-[1]" aria-hidden />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">{subtitle}</p>

        {ctaText && ctaLink && (
          <div className="inline-block px-8 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-quaternary)] text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all">
            {ctaLink.startsWith('/') ? (
              <Link href={ctaLink}>{ctaText}</Link>
            ) : (
              <a href={ctaLink}>{ctaText}</a>
            )}
          </div>
        )}
      </div>

      {slides.length > 1 && (
        <div
          className={`absolute left-1/2 z-10 flex -translate-x-1/2 gap-1.5 ${showScrollHint ? 'bottom-24' : 'bottom-8'}`}
          role="tablist"
          aria-label="Hero slide indicators"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}

      {showScrollHint && (
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white text-sm">
            Scroll to explore
            <svg
              className="w-6 h-6 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
