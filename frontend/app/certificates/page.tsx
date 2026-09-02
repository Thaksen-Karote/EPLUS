import NotFound from '@/components/NotFound';

export default function TeamPage() {
  return <NotFound />;
}
// import { Metadata } from 'next';
// import Link from 'next/link';
// import SectionWrapper from '@/components/SectionWrapper';
// import CertificationCards from '@/components/CertificationCards';
// import GalleryImageGrid from '@/components/GalleryImageGrid';
// import { getResolvedGalleryAlbums } from '@/lib/gallery';

// export const metadata: Metadata = {
//   title: 'Certificates & Achievements - Engineering Plus',
//   description:
//     'ISO certifications, environmental approvals, and credentials. Document scans and recognition gallery.',
// };

// function ScanPlaceholder({ title, subtitle }: { title: string; subtitle: string }) {
//   return (
//     <div className="relative min-h-[200px] overflow-hidden rounded-xl border border-slate-200/80 shadow-sm">
//       <div
//         className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/85 via-[var(--color-tertiary)]/80 to-[var(--color-quaternary)]/85"
//         aria-hidden
//       />
//       <div className="relative flex min-h-[200px] flex-col items-center justify-center gap-2 px-5 py-10 text-center text-white">
//         <p className="text-sm font-semibold uppercase tracking-wide text-white/90">
//           {subtitle}
//         </p>
//         <p className="text-lg font-bold text-white">{title}</p>
//       </div>
//     </div>
//   );
// }

// export default function CertificatesPage() {
//   const albums = getResolvedGalleryAlbums();
//   const achievementAlbumsWithImages = albums.filter(
//     (a) => a.category === 'achievement' && a.images.length > 0
//   );

//   const defaultPlaceholders = [
//     { title: 'ISO & quality documents', subtitle: 'Scan coming soon' },
//     { title: 'Environmental approvals', subtitle: 'Scan coming soon' },
//     { title: 'Safety certificates', subtitle: 'Scan coming soon' },
//     { title: 'Awards & recognition', subtitle: 'Photo coming soon' },
//   ];

//   return (
//     <main>
//       <SectionWrapper
//         title="Certificates &amp; achievements"
//         subtitle="Recognized standards in quality, environment, health & safety — plus a growing archive of official documents and awards."
//         bgColor="gray"
//       >
//         <div className="mx-auto max-w-3xl text-center">
//           <p className="text-base leading-relaxed text-slate-600">
//             We are building a visual library of registrations, audits, and milestones.
//             Scans and photos will be published here as they are prepared. Project imagery
//             continues to live on our{' '}
//             <Link
//               href="/gallery"
//               className="font-semibold text-[var(--color-tertiary)] underline decoration-2 underline-offset-2 hover:text-[var(--color-primary)]"
//             >
//               Gallery
//             </Link>
//             .
//           </p>
//         </div>
//       </SectionWrapper>

//       <SectionWrapper
//         title="Standards we maintain"
//         subtitle="Current certifications and credentials (summarized)"
//         bgColor="white"
//       >
//         <CertificationCards />
//       </SectionWrapper>

//       <SectionWrapper
//         title="Document &amp; award gallery"
//         subtitle="Official scans and recognition — populated from the achievements folders under Gallery when images are added."
//         bgColor="gray"
//       >
//         {achievementAlbumsWithImages.length > 0 ? (
//           <div className="mx-auto flex max-w-7xl flex-col gap-12">
//             {achievementAlbumsWithImages.map((album) => (
//               <div key={album.folder} className="space-y-4">
//                 <h3 className="text-xl font-bold text-slate-900">{album.title}</h3>
//                 <GalleryImageGrid
//                   items={album.images.map((src) => ({
//                     src,
//                     alt: `${album.title} — certificate or award`,
//                   }))}
//                 />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//             {defaultPlaceholders.map((p) => (
//               <ScanPlaceholder key={p.title} title={p.title} subtitle={p.subtitle} />
//             ))}
//           </div>
//         )}
//       </SectionWrapper>
//     </main>
//   );
// }
