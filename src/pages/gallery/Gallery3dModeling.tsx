import GalleryCategory from '@/components/GalleryCategory';

const BASE = '/img/gallery/3dmodelirovanie';
const PHOTOS: { src: string; alt: string }[] = [
  { src: `${BASE}/IMG_5054.webp`, alt: '3D-моделирование в центре Лучик' },
  { src: `${BASE}/IMG_5059.webp`, alt: '3D-моделирование в центре Лучик' },
  { src: `${BASE}/IMG_5065.webp`, alt: '3D-моделирование в центре Лучик' },
  { src: `${BASE}/IMG_5067.webp`, alt: '3D-моделирование в центре Лучик' },
  { src: `${BASE}/IMG_5068.webp`, alt: '3D-моделирование в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-52-19.webp`, alt: '3D-моделирование в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-52-23.webp`, alt: '3D-моделирование в центре Лучик' },
  { src: `${BASE}/photo_2026-03-16_18-52-26.webp`, alt: '3D-моделирование в центре Лучик' },
];

const Gallery3dModeling = () => (
  <GalleryCategory
    title="3D-моделирование"
    description="Фото занятий по 3D-моделированию: Tinkercad, Blender"
    photos={PHOTOS}
  />
);

export default Gallery3dModeling;
