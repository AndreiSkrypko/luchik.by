import GalleryCategory from '@/components/GalleryCategory';

// Добавляйте фото в /img/gallery/robotics/ (формат .webp)
const PHOTOS: { src: string; alt: string }[] = [
  { src: '/img/gallery/robotics/IMG_4011.webp', alt: 'Занятия по робототехнике в центре Лучик' },
  { src: '/img/gallery/robotics/IMG_4018.webp', alt: 'Сборка и программирование роботов' },
  { src: '/img/gallery/robotics/IMG_3937.webp', alt: 'Робототехника в центре Лучик' },
  { src: '/img/gallery/robotics/photo_2026-03-16_08-45-47.webp', alt: 'Занятия по робототехнике' },
  { src: '/img/gallery/robotics/photo_2026-03-16_08-45-54.webp', alt: 'Конструирование роботов' },
];

const GalleryRobotics = () => (
  <GalleryCategory
    title="Робототехника"
    description="Фото занятий по конструированию и программированию роботов"
    photos={PHOTOS}
  />
);

export default GalleryRobotics;
