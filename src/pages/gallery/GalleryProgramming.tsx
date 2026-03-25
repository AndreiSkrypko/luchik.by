import GalleryCategory from '@/components/GalleryCategory';
import { GALLERY_PREFIX, galleryAltLine } from '@/lib/galleryAlt';
import { galleryFiles } from '@/lib/galleryPaths';

const BASE = '/img/gallery/programming';
const SLUG = 'programmirovanie';
const COUNT = 7;

const SOURCES = galleryFiles(BASE, SLUG, COUNT);
const PREFIX = GALLERY_PREFIX.programming;

const PHOTOS = SOURCES.map((src, i) => ({
  src,
  alt: galleryAltLine(PREFIX, i),
}));

const GalleryProgramming = () => (
  <GalleryCategory
    title="Программирование"
    description="Фото занятий по Scratch, Python, Roblox и другим направлениям"
    photos={PHOTOS}
  />
);

export default GalleryProgramming;
