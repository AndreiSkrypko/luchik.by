import GalleryCategory from '@/components/GalleryCategory';

const PHOTOS: { src: string; alt: string }[] = [
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-00-45.webp', alt: 'Арт-студия в центре Лучик' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-00-35.webp', alt: 'Творческие занятия для детей' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-00-38.webp', alt: 'Арт-студия в центре Лучик' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-00-43.webp', alt: 'Творческие занятия для детей' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-00-49.webp', alt: 'Арт-студия в центре Лучик' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-00-51.webp', alt: 'Творческие занятия для детей' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-00-53.webp', alt: 'Арт-студия в центре Лучик' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-00-56.webp', alt: 'Творческие занятия для детей' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-00-58.webp', alt: 'Арт-студия в центре Лучик' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-01-01.webp', alt: 'Творческие занятия для детей' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-01-03.webp', alt: 'Арт-студия в центре Лучик' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-01-06.webp', alt: 'Творческие занятия для детей' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-01-08.webp', alt: 'Арт-студия в центре Лучик' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-01-10.webp', alt: 'Творческие занятия для детей' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-01-13.webp', alt: 'Арт-студия в центре Лучик' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-01-15.webp', alt: 'Творческие занятия для детей' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-01-18.webp', alt: 'Арт-студия в центре Лучик' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-01-20.webp', alt: 'Творческие занятия для детей' },
  { src: '/img/gallery/artstudio/photo_2026-03-18_12-01-23.webp', alt: 'Арт-студия в центре Лучик' },
];

const GalleryArtStudio = () => (
  <GalleryCategory
    title="Арт-студия"
    description="Фото творческих занятий для детей"
    photos={PHOTOS}
  />
);

export default GalleryArtStudio;
