import fs from 'fs';
import path from 'path';
import { galleryAlbumRegistry } from '@/data/gallery-albums';
import { projectsData } from '@/data/projects';
import type { GalleryAlbumConfig } from '@/data/gallery-albums';
import type { Project } from '@/types';

export type ResolvedGalleryAlbum = GalleryAlbumConfig & { images: string[] };

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

const GALLERY_PUBLIC_BASES = ['Gallery', 'gallery'] as const;

function readAlbumImages(folder: string): string[] {
  for (const base of GALLERY_PUBLIC_BASES) {
    const dir = path.join(process.cwd(), 'public', base, folder);
    try {
      if (!fs.existsSync(dir)) continue;
      const images = fs
        .readdirSync(dir)
        .filter((f) => IMAGE_EXT.test(f))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((f) => `/${base}/${folder}/${f}`);
      if (images.length > 0) return images;
    } catch {
      continue;
    }
  }
  return [];
}

export function getResolvedGalleryAlbums(): ResolvedGalleryAlbum[] {
  return galleryAlbumRegistry.map((album) => ({
    ...album,
    images: readAlbumImages(album.folder),
  }));
}

export function getGalleryImagesForProject(projectId: string): string[] {
  const imgs: string[] = [];
  for (const a of getResolvedGalleryAlbums()) {
    if (a.projectId === projectId && a.images.length > 0) {
      imgs.push(...a.images);
    }
  }
  return imgs;
}

export function enrichProjectsWithGallery(projects: Project[]): Project[] {
  return projects.map((p) => {
    if (!p.showGalleryImages) {
      return { ...p, gallery: undefined };
    }
    const imgs = getGalleryImagesForProject(p.id);
    if (imgs.length === 0) return { ...p, gallery: undefined };
    return { ...p, gallery: imgs };
  });
}

/** Projects page placeholders: gradient when gallery images are disabled or no files yet. */
export function getProjectsForGradientPlaceholders(): Project[] {
  return projectsData.filter((p) => {
    if (!p.showGalleryImages) return true;
    return getGalleryImagesForProject(p.id).length === 0;
  });
}

export function projectAlbumEligibleForImages(
  album: ResolvedGalleryAlbum
): boolean {
  if (album.category !== 'project') return true;
  if (!album.projectId) return false;
  const p = projectsData.find((x) => x.id === album.projectId);
  return p?.showGalleryImages === true;
}
