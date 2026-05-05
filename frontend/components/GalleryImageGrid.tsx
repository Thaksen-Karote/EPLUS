'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import GalleryLightbox, { type GalleryImageItem } from '@/components/GalleryLightbox';

export type { GalleryImageItem };

type GalleryImageGridProps = {
  items: GalleryImageItem[];
};

export default function GalleryImageGrid({ items }: GalleryImageGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  if (items.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setOpenIndex(idx)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 text-left shadow-sm outline-none ring-offset-2 transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-tertiary)]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      <GalleryLightbox
        items={items}
        open={openIndex !== null}
        initialIndex={openIndex ?? 0}
        onClose={close}
      />
    </>
  );
}
