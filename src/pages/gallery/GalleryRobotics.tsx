import GalleryCategory from '@/components/GalleryCategory';

// Добавляйте фото в /img/gallery/robotics/ (формат .webp)
const PHOTOS: { src: string; alt: string }[] = [
  { src: '/img/gallery/robotics/IMG_4011.webp', alt: 'Занятия по робототехнике в центре Лучик' },
  { src: '/img/gallery/robotics/IMG_4018.webp', alt: 'Сборка и программирование роботов' },
  { src: '/img/gallery/robotics/photo_2026-03-16_08-45-47.webp', alt: 'Занятия по робототехнике' },
  { src: '/img/gallery/robotics/photo_2026-03-16_08-45-54.webp', alt: 'Конструирование роботов' },
  { src: '/img/gallery/robotics/IMG_1995.webp', alt: 'Робототехника в центре Лучик' },
  { src: '/img/gallery/robotics/IMG_1996.webp', alt: 'Занятия по робототехнике' },
  { src: '/img/gallery/robotics/IMG_2120.webp', alt: 'Сборка роботов' },
  { src: '/img/gallery/robotics/IMG_5125.webp', alt: 'Программирование роботов' },
  { src: '/img/gallery/robotics/20240217_174710.webp', alt: 'Занятия по робототехнике' },
  { src: '/img/gallery/robotics/20240217_174745.webp', alt: 'Робототехника' },
  { src: '/img/gallery/robotics/20240224_164125.webp', alt: 'Конструирование' },
  { src: '/img/gallery/robotics/20250709_101910.webp', alt: 'Занятия по робототехнике' },
  { src: '/img/gallery/robotics/20250709_102010.webp', alt: 'Робототехника' },
  { src: '/img/gallery/robotics/20250710_124818.webp', alt: 'Сборка и программирование' },
  { src: '/img/gallery/robotics/IMG_20250730_183443_868.webp', alt: 'Занятия по робототехнике' },
  { src: '/img/gallery/robotics/IMG_20250730_183456_834.webp', alt: 'Робототехника в центре Лучик' },
  { src: '/img/gallery/robotics/photo_23_2025-03-18_19-28-04.webp', alt: 'Конструирование роботов' },
  { src: '/img/gallery/robotics/photo_2026-03-16_20-30-27.webp', alt: 'Занятия по робототехнике' },
  { src: '/img/gallery/robotics/photo_2026-03-16_20-30-42.webp', alt: 'Робототехника в центре Лучик' },
  { src: '/img/gallery/robotics/photo_2026-03-16_20-30-47.webp', alt: 'Сборка роботов' },
  { src: '/img/gallery/robotics/photo_2026-03-16_20-31-08.webp', alt: 'Программирование роботов' },
  { src: '/img/gallery/robotics/photo_2026-03-16_20-31-13.webp', alt: 'Конструирование и программирование' },
  { src: '/img/gallery/robotics/photo_2026-03-16_20-31-16.webp', alt: 'Робототехника в центре Лучик' },
];

const GalleryRobotics = () => (
  <GalleryCategory
    title="Робототехника"
    description="Фото занятий по конструированию и программированию роботов"
    photos={PHOTOS}
  />
);

export default GalleryRobotics;
