import GalleryCategory from '@/components/GalleryCategory';
import { GALLERY_PREFIX, galleryAltLine } from '@/lib/galleryAlt';
import { galleryFiles } from '@/lib/galleryPaths';

const BASE = '/img/gallery/legomatematika';
const SLUG = 'lego_matematika';
const COUNT = 16;

const SOURCES = galleryFiles(BASE, SLUG, COUNT);
const PREFIX = GALLERY_PREFIX.legoMatematika;

const PHOTOS = SOURCES.map((src, i) => ({
  src,
  alt: galleryAltLine(PREFIX, i),
}));

const GalleryLegoMatematika = () => (
  <GalleryCategory
    title="Лего-математика"
    description="Фото занятий по Лего-математике для детей 5–7 лет"
    photos={PHOTOS}
  />
);

export default GalleryLegoMatematika;
