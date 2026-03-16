import GalleryCategory from '@/components/GalleryCategory';

const BASE = '/img/gallery/english';

const PHOTOS: { src: string; alt: string }[] = [
  { src: `${BASE}/photo_2026-03-16_20-05-26.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-11-41.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-22-47.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-22-51.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-22-54.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-22-58.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-23-01.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-23-04.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-23-07.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-23-11.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-23-15.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-23-18.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-23-22.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-23-25.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-23-29.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-23-32.webp`, alt: 'Английский — занятие' },
  { src: `${BASE}/photo_2026-03-16_20-23-35.webp`, alt: 'Английский — занятие' },
];

const GalleryEnglish = () => (
  <GalleryCategory
    title="Английский язык"
    description="Фото занятий по английскому — игровые уроки и разговорные практики"
    photos={PHOTOS}
  />
);

export default GalleryEnglish;

