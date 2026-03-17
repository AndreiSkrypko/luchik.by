import GalleryCategory from '@/components/GalleryCategory';

const BASE = '/img/gallery/prep-school';
const PHOTOS: { src: string; alt: string }[] = [
  { src: `${BASE}/photo_2026-03-16_18-36-11.webp`, alt: 'Подготовка к школе в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-36-17.webp`, alt: 'Подготовка к школе в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-36-20.webp`, alt: 'Подготовка к школе в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-36-25.webp`, alt: 'Подготовка к школе в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-36-29.webp`, alt: 'Подготовка к школе в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-36-32.webp`, alt: 'Подготовка к школе в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-36-36.webp`, alt: 'Подготовка к школе в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-36-39.webp`, alt: 'Подготовка к школе в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-36-42.webp`, alt: 'Подготовка к школе в центре Лучик' },
  { src: `${BASE}/photo_2026-03-17_06-39-27.webp`, alt: 'Подготовка к школе в центре Лучик' },
  { src: `${BASE}/photo_2026-03-17_06-39-29.webp`, alt: 'Подготовка к школе в центре Лучик' },
  { src: `${BASE}/photo_2026-03-17_06-39-33.webp`, alt: 'Подготовка к школе в центре Лучик' },
];

const GalleryPrepSchool = () => (
  <GalleryCategory
    title="Подготовка к школе"
    description="Фото занятий по комплексной подготовке детей к школе"
    photos={PHOTOS}
  />
);

export default GalleryPrepSchool;
