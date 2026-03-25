import GalleryCategory from '@/components/GalleryCategory';
import { GALLERY_PREFIX, galleryAltLine } from '@/lib/galleryAlt';
import { galleryFiles } from '@/lib/galleryPaths';

const BASE = '/img/gallery/legorazvivaika';
const SLUG = 'lego_razvivajka';
const COUNT = 32;

const SOURCES = galleryFiles(BASE, SLUG, COUNT);
const PREFIX = GALLERY_PREFIX.legoRazvivayka;

const PHOTOS = SOURCES.map((src, i) => ({
  src,
  alt: galleryAltLine(PREFIX, i),
}));

const GalleryLegoRazvivayka = () => (
  <GalleryCategory
    title="Лего-развивайка"
    description="Фото занятий Лего-развивайки для детей 2,5–3 лет"
    photos={PHOTOS}
  />
);

export default GalleryLegoRazvivayka;
