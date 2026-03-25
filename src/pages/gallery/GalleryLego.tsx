import GalleryCategory from '@/components/GalleryCategory';
import { GALLERY_PREFIX, galleryAltLine } from '@/lib/galleryAlt';
import { galleryFiles } from '@/lib/galleryPaths';

const BASE = '/img/gallery/legokonstruirovanie';
const SLUG = 'lego_konstr';
const COUNT = 27;

const SOURCES = galleryFiles(BASE, SLUG, COUNT);
const PREFIX = GALLERY_PREFIX.lego;

const PHOTOS = SOURCES.map((src, i) => ({
  src,
  alt: galleryAltLine(PREFIX, i),
}));

const GalleryLego = () => (
  <GalleryCategory
    title="Легоконструирование"
    description="Фото занятий по конструированию из Lego"
    photos={PHOTOS}
  />
);

export default GalleryLego;
