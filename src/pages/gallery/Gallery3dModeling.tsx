import GalleryCategory from '@/components/GalleryCategory';
import { GALLERY_PREFIX, galleryAltLine } from '@/lib/galleryAlt';
import { galleryFiles } from '@/lib/galleryPaths';

const BASE = '/img/gallery/3dmodelirovanie';
const SLUG = 'modelirovanie_3d';
const COUNT = 8;

const SOURCES = galleryFiles(BASE, SLUG, COUNT);
const PREFIX = GALLERY_PREFIX.modeling3d;

const PHOTOS = SOURCES.map((src, i) => ({
  src,
  alt: galleryAltLine(PREFIX, i),
}));

const Gallery3dModeling = () => (
  <GalleryCategory
    title="3D-моделирование"
    description="Фото занятий по 3D-моделированию: Tinkercad, Blender"
    photos={PHOTOS}
  />
);

export default Gallery3dModeling;
