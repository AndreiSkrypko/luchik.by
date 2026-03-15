import GalleryCategory from '@/components/GalleryCategory';

// Добавляйте фото в /img/gallery/robotics/ (1.png, 2.png, ...)
const PHOTOS: { src: string; alt: string }[] = [];

const GalleryRobotics = () => (
  <GalleryCategory
    title="Робототехника"
    description="Фото занятий по конструированию и программированию роботов"
    photos={PHOTOS}
  />
);

export default GalleryRobotics;
