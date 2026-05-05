export type GalleryAlbumCategory = 'project' | 'service' | 'achievement';

export interface GalleryAlbumConfig {
  /** Directory name under `public/Gallery/<folder>/` (falls back to `public/gallery/` if empty). */
  folder: string;
  title: string;
  category: GalleryAlbumCategory;
  /** When set, maps this album to a project and powers the project page carousel. */
  projectId?: string;
}

/** Register each album; add files under `public/Gallery/<folder>/`. */
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
    folder: 'MLD_8',
    title: '8 MLD Sewage Treatment Plant',
    category: 'project',
    projectId: 'stp-kambopura',
  },
];
