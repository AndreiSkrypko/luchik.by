import GalleryCategory from '@/components/GalleryCategory';
import { GALLERY_PREFIX, galleryAltLine } from '@/lib/galleryAlt';
import { galleryFiles } from '@/lib/galleryPaths';

const BASE = '/img/gallery/elektronika_shemotehnika';
const SLUG = 'elektronika';
const COUNT = 16;

const SOURCES = galleryFiles(BASE, SLUG, COUNT);
const PREFIX = GALLERY_PREFIX.electronics;

const PHOTOS = SOURCES.map((src, i) => ({
  src,
  alt: galleryAltLine(PREFIX, i),
}));

const GalleryElectronics = () => (
  <GalleryCategory
    title="Электроника и схемотехника"
    description="Фото занятий по Arduino, пайке и созданию электронных устройств"
    photos={PHOTOS}
  />
);

export default GalleryElectronics;
