import GalleryCategory from '@/components/GalleryCategory';
import { GALLERY_PREFIX, galleryAltLine } from '@/lib/galleryAlt';
import { galleryFiles } from '@/lib/galleryPaths';

const BASE = '/img/gallery/robotics';
const SLUG = 'robototehnika';
const COUNT = 35;

const SOURCES = galleryFiles(BASE, SLUG, COUNT);
const PREFIX = GALLERY_PREFIX.robotics;

const PHOTOS = SOURCES.map((src, i) => ({
  src,
  alt: galleryAltLine(PREFIX, i),
}));

const GalleryRobotics = () => (
  <GalleryCategory
    title="Робототехника"
    description="Фото занятий по конструированию и программированию роботов"
    photos={PHOTOS}
  />
);

export default GalleryRobotics;
