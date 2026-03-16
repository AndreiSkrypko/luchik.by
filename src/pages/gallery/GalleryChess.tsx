import GalleryCategory from '@/components/GalleryCategory';

const BASE = '/img/gallery/chess';
const PHOTOS: { src: string; alt: string }[] = [
  { src: `${BASE}/IMG_2095.webp`, alt: 'Шахматы в центре Лучик' },
  { src: `${BASE}/IMG_2097.webp`, alt: 'Шахматы в центре Лучик' },
  { src: `${BASE}/IMG_2108.webp`, alt: 'Шахматы в центре Лучик' },
  { src: `${BASE}/IMG_2109.webp`, alt: 'Шахматы в центре Лучик' },
  { src: `${BASE}/IMG_2111.webp`, alt: 'Шахматы в центре Лучик' },
  { src: `${BASE}/IMG_20191005_130245.webp`, alt: 'Шахматы в центре Лучик' },
];

const GalleryChess = () => (
  <GalleryCategory
    title="Шахматы"
    description="Фото занятий по шахматам для детей"
    photos={PHOTOS}
  />
);

export default GalleryChess;
