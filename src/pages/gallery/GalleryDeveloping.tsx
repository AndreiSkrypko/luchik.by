import GalleryCategory from '@/components/GalleryCategory';

// Добавляйте фото в /img/gallery/developing/ (1.png, 2.png, ...)
const PHOTOS: { src: string; alt: string }[] = [];

const GalleryDeveloping = () => (
  <GalleryCategory
    title="Развивающие занятия"
    description="Фото комплексных программ для детей от 1 года"
    photos={PHOTOS}
  />
);

export default GalleryDeveloping;
