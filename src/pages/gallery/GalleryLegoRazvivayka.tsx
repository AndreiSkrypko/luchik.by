import GalleryCategory from '@/components/GalleryCategory';

const BASE = '/img/gallery/legorazvivaika';
const PHOTOS: { src: string; alt: string }[] = [
  { src: `${BASE}/IMG_1818.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/IMG_1822.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/IMG_1824.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/IMG_1826.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/IMG_1829.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/IMG_1833.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/IMG_1835.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/IMG_1837.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/IMG_1838.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/IMG_1841.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/IMG_1971.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/IMG_8303.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/IMG_8310.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/IMG_8312.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-14-48.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-14-52.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-14-56.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-14-59.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-15-03.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-15-06.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-15-10.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-15-13.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-15-16.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-15-19.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-15-25.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-15-39.webp`, alt: 'Лего-развивайка в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-15-42.webp`, alt: 'Лего-развивайка в центре Лучик' },
];

const GalleryLegoRazvivayka = () => (
  <GalleryCategory
    title="Лего-развивайка"
    description="Фото занятий Лего-развивайки для детей 2,5–3 лет"
    photos={PHOTOS}
  />
);

export default GalleryLegoRazvivayka;
