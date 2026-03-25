import GalleryCategory from '@/components/GalleryCategory';
import { GALLERY_PREFIX, galleryAltLine } from '@/lib/galleryAlt';
import { galleryFiles } from '@/lib/galleryPaths';

const BASE = '/img/gallery/prep-school';
const SLUG = 'podgotovka_k_shkole';
const COUNT = 14;

const SOURCES = galleryFiles(BASE, SLUG, COUNT);
const PREFIX = GALLERY_PREFIX.prepSchool;

const PHOTOS = SOURCES.map((src, i) => ({
  src,
  alt: galleryAltLine(PREFIX, i),
}));

const GalleryPrepSchool = () => (
  <GalleryCategory
    title="Подготовка к школе"
    description="Фото занятий по комплексной подготовке детей к школе"
    photos={PHOTOS}
  />
);

export default GalleryPrepSchool;
