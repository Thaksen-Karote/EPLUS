import { Metadata } from 'next';
import SectionWrapper from '@/components/SectionWrapper';
import GalleryImageGrid from '@/components/GalleryImageGrid';
import {
  getResolvedGalleryAlbums,
  getProjectsForGradientPlaceholders,
  projectAlbumEligibleForImages,
} from '@/lib/gallery';

export const metadata: Metadata = {
  title: 'Gallery - Engineering Plus',
  description:
    'Project photos, site work, and highlights from Engineering Plus.',
};

function GradientPlaceholder({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="relative min-h-[180px] overflow-hidden rounded-xl border border-slate-200/80 shadow-sm">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[var(--color-tertiary)] via-[var(--color-primary)]/90 to-[var(--color-quaternary)] opacity-95"
        aria-hidden
      />
      <div className="relative flex h-full min-h-[180px] flex-col items-center justify-center gap-1 px-4 py-8 text-center text-white">
        <p className="text-sm font-semibold tracking-wide text-white/90">
          {subtitle ?? 'Project gallery'}
        </p>
        <p className="text-lg font-bold text-white">{title}</p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const albums = getResolvedGalleryAlbums();
  const projectAlbumsWithImages = albums.filter(
    (a) =>
      a.category === 'project' &&
      a.images.length > 0 &&
      projectAlbumEligibleForImages(a)
  );
  const serviceAlbumsWithImages = albums.filter(
    (a) => a.category === 'service' && a.images.length > 0
  );
  const achievementAlbumsWithImages = albums.filter(
    (a) => a.category === 'achievement' && a.images.length > 0
  );
  const gradientProjects = getProjectsForGradientPlaceholders();

  return (
    <main>
      <SectionWrapper
        title="Gallery"
        subtitle="Snapshots from our projects, sites, and milestones. More albums are added as new assets arrive."
        bgColor="gray"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-16">
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Projects</h3>

            {projectAlbumsWithImages.map((album) => (
              <div key={album.folder} className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-800">
                  {album.title}
                </h4>
                <GalleryImageGrid
                  items={album.images.map((src) => ({
                    src,
                    alt: `${album.title} — project photo`,
                  }))}
                />
              </div>
            ))}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gradientProjects.map((p) => (
                <GradientPlaceholder
                  key={p.id}
                  title={p.name}
                  subtitle="Photos coming soon"
                />
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Services</h3>
            {serviceAlbumsWithImages.length > 0 ? (
              <div className="flex flex-col gap-10">
                {serviceAlbumsWithImages.map((album) => (
                  <div key={album.folder} className="space-y-4">
                    <h4 className="text-lg font-semibold text-slate-800">
                      {album.title}
                    </h4>
                    <GalleryImageGrid
                      items={album.images.map((src) => ({
                        src,
                        alt: `${album.title} — service`,
                      }))}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <GradientPlaceholder
                  title="Service highlights"
                  subtitle="Gallery coming soon"
                />
                <GradientPlaceholder
                  title="On-site execution"
                  subtitle="Gallery coming soon"
                />
                <GradientPlaceholder
                  title="Work in progress"
                  subtitle="Gallery coming soon"
                />
              </div>
            )}
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">
              Achievements &amp; awards
            </h3>
            {achievementAlbumsWithImages.length > 0 ? (
              <div className="flex flex-col gap-10">
                {achievementAlbumsWithImages.map((album) => (
                  <div key={album.folder} className="space-y-4">
                    <h4 className="text-lg font-semibold text-slate-800">
                      {album.title}
                    </h4>
                    <GalleryImageGrid
                      items={album.images.map((src) => ({
                        src,
                        alt: `${album.title} — achievement`,
                      }))}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <GradientPlaceholder
                  title="Certifications & awards"
                  subtitle="Gallery coming soon"
                />
                <GradientPlaceholder
                  title="Recognitions"
                  subtitle="Gallery coming soon"
                />
                <GradientPlaceholder
                  title="Milestones"
                  subtitle="Gallery coming soon"
                />
              </div>
            )}
          </section>
        </div>
      </SectionWrapper>
    </main>
  );
}
