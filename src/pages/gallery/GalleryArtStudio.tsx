import GalleryCategory from '@/components/GalleryCategory';
import { GALLERY_PREFIX, galleryAltLine } from '@/lib/galleryAlt';
import { galleryFiles } from '@/lib/galleryPaths';

const BASE = '/img/gallery/artstudio';
const SLUG = 'artstudiya';
const COUNT = 19;

const SOURCES = galleryFiles(BASE, SLUG, COUNT);
const PREFIX = GALLERY_PREFIX.artStudio;

const PHOTOS = SOURCES.map((src, i) => ({
  src,
  alt: galleryAltLine(PREFIX, i),
}));

const GalleryArtStudio = () => (
  <GalleryCategory
    title="Арт-студия"
    description="Фото творческих занятий для детей"
    photos={PHOTOS}
  />
);

export default GalleryArtStudio;
