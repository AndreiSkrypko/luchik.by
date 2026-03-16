import GalleryCategory from '@/components/GalleryCategory';

const BASE = '/img/gallery/vr';

const PHOTOS: { src: string; alt: string }[] = [
  { src: `${BASE}/photo_2026-03-16_20-08-21.webp`, alt: 'Программирование VR-игр — ребёнок в шлеме VR' },
  { src: `${BASE}/photo_2026-03-16_20-08-27.webp`, alt: 'Занятия по VR в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_20-08-30.webp`, alt: 'Создание VR-игр для детей' },
  { src: `${BASE}/photo_2026-03-16_20-08-33.webp`, alt: 'VR-программирование' },
  { src: `${BASE}/photo_2026-03-16_20-08-38.webp`, alt: 'VR в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_20-08-41.webp`, alt: 'Занятия по VR-разработке' },
  { src: `${BASE}/photo_2026-03-16_20-08-45.webp`, alt: 'Программирование VR-игр' },
];

const GalleryVr = () => (
  <GalleryCategory
    title="Программирование VR-игр"
    description="Фото занятий по разработке VR-игр — виртуальная реальность для детей"
    photos={PHOTOS}
  />
);

export default GalleryVr;
