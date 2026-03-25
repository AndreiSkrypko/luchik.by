import GalleryCategory from '@/components/GalleryCategory';
import { GALLERY_PREFIX, galleryAltLine } from '@/lib/galleryAlt';
import { galleryFiles } from '@/lib/galleryPaths';

const BASE = '/img/gallery/english';
const SLUG = 'anglijskij';
const COUNT = 17;

const SOURCES = galleryFiles(BASE, SLUG, COUNT);
const PREFIX = GALLERY_PREFIX.english;

const PHOTOS = SOURCES.map((src, i) => ({
  src,
  alt: galleryAltLine(PREFIX, i),
}));

const GalleryEnglish = () => (
  <GalleryCategory
    title="Английский язык"
    description="Фото занятий по английскому — игровые уроки и разговорные практики"
    photos={PHOTOS}
  />
);

export default GalleryEnglish;
