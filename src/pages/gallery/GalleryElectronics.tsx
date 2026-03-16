import GalleryCategory from '@/components/GalleryCategory';

// Добавляйте фото в /img/gallery/elektronika_shemotehnika/ (формат .webp)
const PHOTOS: { src: string; alt: string }[] = [
  { src: '/img/gallery/elektronika_shemotehnika/IMG_2016.webp', alt: 'Электроника и схемотехника в центре Лучик' },
  { src: '/img/gallery/elektronika_shemotehnika/IMG_2020.webp', alt: 'Занятия по Arduino и пайке' },
  { src: '/img/gallery/elektronika_shemotehnika/IMG_2023.webp', alt: 'Создание электронных устройств' },
  { src: '/img/gallery/elektronika_shemotehnika/IMG_2024.webp', alt: 'Электроника для детей' },
  { src: '/img/gallery/elektronika_shemotehnika/IMG_2059.webp', alt: 'Электроника и схемотехника' },
  { src: '/img/gallery/elektronika_shemotehnika/IMG_2062.webp', alt: 'Схемотехника в центре Лучик' },
  { src: '/img/gallery/elektronika_shemotehnika/IMG_2063.webp', alt: 'Занятия по электронике' },
  { src: '/img/gallery/elektronika_shemotehnika/IMG_2064.webp', alt: 'Электронные проекты' },
  { src: '/img/gallery/elektronika_shemotehnika/IMG_2066.webp', alt: 'Пайка и микроконтроллеры' },
  { src: '/img/gallery/elektronika_shemotehnika/IMG_2080.webp', alt: 'Электроника и схемотехника' },
  { src: '/img/gallery/elektronika_shemotehnika/20250412_095608.webp', alt: 'Занятия по Arduino' },
  { src: '/img/gallery/elektronika_shemotehnika/photo_17_2025-03-18_19-28-04.webp', alt: 'Электроника для детей' },
  { src: '/img/gallery/elektronika_shemotehnika/photo_21_2025-03-18_19-28-04.webp', alt: 'Схемотехника' },
];

const GalleryElectronics = () => (
  <GalleryCategory
    title="Электроника и схемотехника"
    description="Фото занятий по Arduino, пайке и созданию электронных устройств"
    photos={PHOTOS}
  />
);

export default GalleryElectronics;
