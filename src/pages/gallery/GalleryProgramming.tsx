import GalleryCategory from '@/components/GalleryCategory';

// Добавляйте фото в /img/gallery/programming/ (1.png, 2.png, ...)
const PHOTOS: { src: string; alt: string }[] = [];

const GalleryProgramming = () => (
  <GalleryCategory
    title="Программирование"
    description="Фото занятий по Scratch, Python, Roblox и другим направлениям"
    photos={PHOTOS}
  />
);

export default GalleryProgramming;
