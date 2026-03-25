import GalleryCategory from '@/components/GalleryCategory';
import { GALLERY_PREFIX, galleryAltLine } from '@/lib/galleryAlt';
import { galleryFiles } from '@/lib/galleryPaths';

const BASE = '/img/gallery/developing';
const SLUG = 'razvivayka';
/** 36 файлов на диске (нет прежних 2.webp и 5.webp). */
const COUNT = 36;

const SOURCES = galleryFiles(BASE, SLUG, COUNT);
const PREFIX = GALLERY_PREFIX.developing;

const PHOTOS = SOURCES.map((src, i) => ({
  src,
  alt: galleryAltLine(PREFIX, i),
}));

const GalleryDeveloping = () => (
  <GalleryCategory
    title="Развивающие занятия"
    description="Фото комплексных программ для детей от 1 года"
    photos={PHOTOS}
  />
);

export default GalleryDeveloping;
