import GalleryCategory from '@/components/GalleryCategory';

const BASE = '/img/gallery/legomatematika';
const PHOTOS: { src: string; alt: string }[] = [
  { src: `${BASE}/IMG_1969.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/IMG_1970.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/IMG_1971.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/IMG_1974.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/IMG_1976.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/IMG_1978.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/IMG_1979.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/IMG_1990.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/20211126_182350.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/20211126_182433.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/20211126_182610.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/20230121_135002.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/photo_2026-03-17_06-35-31.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/photo_2026-03-17_06-35-35.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/photo_2026-03-17_06-35-38.webp`, alt: 'Лего-математика в центре Лучик' },
  { src: `${BASE}/photo_2026-03-17_06-35-42.webp`, alt: 'Лего-математика в центре Лучик' },
];

const GalleryLegoMatematika = () => (
  <GalleryCategory
    title="Лего-математика"
    description="Фото занятий по Лего-математике для детей 5–7 лет"
    photos={PHOTOS}
  />
);

export default GalleryLegoMatematika;
