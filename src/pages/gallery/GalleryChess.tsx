import GalleryCategory from '@/components/GalleryCategory';
import { GALLERY_PREFIX, galleryAltLine } from '@/lib/galleryAlt';
import { galleryFiles } from '@/lib/galleryPaths';

const BASE = '/img/gallery/chess';
const SLUG = 'shahmaty';
/** На диске 7 фото (один файл из списка отсутствовал). */
const COUNT = 7;

const SOURCES = galleryFiles(BASE, SLUG, COUNT);
const PREFIX = GALLERY_PREFIX.chess;

const PHOTOS = SOURCES.map((src, i) => ({
  src,
  alt: galleryAltLine(PREFIX, i),
}));

const GalleryChess = () => (
  <GalleryCategory
    title="Шахматы"
    description="Фото занятий по шахматам для детей"
    photos={PHOTOS}
  />
);

export default GalleryChess;
