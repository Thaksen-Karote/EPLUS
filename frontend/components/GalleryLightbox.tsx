'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export type GalleryImageItem = { src: string; alt: string };

export type GalleryLightboxProps = {
  items: GalleryImageItem[];
  open: boolean;
  initialIndex: number;
  onClose: () => void;
};

export default function GalleryLightbox({
  items,
  open,
  initialIndex,
  onClose,
}: GalleryLightboxProps) {
  const [index, setIndex] = useState(0);

  const clampedInitial = useMemo(
    () =>
      Math.max(0, Math.min(initialIndex, Math.max(0, items.length - 1))),
    [initialIndex, items.length]
  );

  useEffect(() => {
    if (open && items.length > 0) {
      setIndex(clampedInitial);
    }
  }, [open, clampedInitial, items.length]);

  const showPrev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  const showNext = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, showPrev, showNext]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || items.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Full size image"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-3 top-3 z-[102] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
        aria-label="Close gallery"
      >
        <X className="size-6" strokeWidth={2} aria-hidden />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 top-1/2 z-[102] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 md:left-4"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-7" strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-2 top-1/2 z-[102] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 md:right-4"
            aria-label="Next image"
          >
            <ChevronRight className="size-7" strokeWidth={2} aria-hidden />
          </button>
        </>
      )}

      <div
        className="relative z-[101] h-[min(85vh,900px)] w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={items[index].src}
          alt={items[index].alt}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {items.length > 1 && (
        <p className="pointer-events-none absolute bottom-4 left-1/2 z-[102] -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
          {index + 1} / {items.length}
        </p>
      )}
    </div>
  );
}
