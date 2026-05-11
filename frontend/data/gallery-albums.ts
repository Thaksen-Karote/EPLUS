export type GalleryAlbumCategory = 'project' | 'service' | 'achievement';

export interface GalleryAlbumConfig {
  /** Directory name under `public/Gallery/<folder>/` (falls back to `public/gallery/` if empty). */
  folder: string;
  title: string;
  category: GalleryAlbumCategory;
  /** When set, maps this album to a project and powers the project page carousel. */
  projectId?: string;
}

/** Register each album; folder names must match `public/Gallery/<folder>/` exactly. */
export const galleryAlbumRegistry: GalleryAlbumConfig[] = [
  {
    folder: 'Vedanta',
    title: 'KEC – Vedanta Admin Building',
    category: 'project',
    projectId: 'vedanta-admin',
  },
  {
    folder: 'Hotel_Katra_Alwar',
    title: 'Hotel Projects (Katra & Alwar)',
    category: 'project',
    projectId: 'hotel-projects',
  },
  {
    folder: 'MLD8_KARNAL',
    title: '8 MLD Sewage Treatment Plant',
    category: 'project',
    projectId: 'stp-kambopura',
  },
  {
    folder: 'MLD6_KARNAL',
    title: '6.0 MLD Sewage Treatment Plant',
    category: 'project',
    projectId: 'stp-nilokheri',
  },
  {
    folder: 'MLD5.5_KARNAL',
    title: '5.5 MLD Sewage Treatment Plant',
    category: 'project',
    projectId: 'stp-tarori',
  },
  {
    folder: 'KV_SUBSTATION_KARNAL',
    title: '11 KV Substation at 8 MLD STP',
    category: 'project',
    projectId: 'substation-kambopura',
  },
  {
    folder: 'STP_LADWA',
    title: '7.0 MLD Sewage Treatment Plant',
    category: 'project',
    projectId: 'stp-ladwa',
  },
  {
    folder: 'MLD25_MANESAR',
    title: '25 MLD Sewage Treatment Plant',
    category: 'project',
    projectId: 'stp-25-manesar',
  },
  {
    folder: 'MLDSTP_OBRA',
    title: '3.0 MLD STP & Sewage Network',
    category: 'project',
    projectId: 'stp-obra',
  },
  {
    folder: 'TPP_OBRA',
    title: '11 KV Substation & Line Installation',
    category: 'project',
    projectId: 'substation-obra',
  },
  {
    folder: 'AMPM_CAFE',
    title: 'AMPM Cafe',
    category: 'project',
    projectId: 'ampm-cafe',
  },
];
