import GalleryCategory from '@/components/GalleryCategory';
import { GALLERY_PREFIX, galleryAltLine } from '@/lib/galleryAlt';
import { galleryFiles } from '@/lib/galleryPaths';

const BASE = '/img/gallery/vr';
const SLUG = 'vr_igry';
const COUNT = 8;

const SOURCES = galleryFiles(BASE, SLUG, COUNT);
const PREFIX = GALLERY_PREFIX.vr;

const PHOTOS = SOURCES.map((src, i) => ({
  src,
  alt: galleryAltLine(PREFIX, i),
}));

const GalleryVr = () => (
  <GalleryCategory
    title="Программирование VR-игр"
    description="Фото занятий по разработке VR-игр — виртуальная реальность для детей"
    photos={PHOTOS}
  />
);

export default GalleryVr;
