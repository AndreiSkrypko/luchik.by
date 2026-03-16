import GalleryCategory from '@/components/GalleryCategory';

// Добавляйте фото в /img/gallery/programming/ (формат .webp)
const PHOTOS: { src: string; alt: string }[] = [
  { src: '/img/gallery/programming/IMG_3940.webp', alt: 'Занятия по программированию в центре Лучик' },
  { src: '/img/gallery/programming/IMG_3986.webp', alt: 'Программирование Scratch и Python' },
  { src: '/img/gallery/programming/IMG_3989.webp', alt: 'Программирование для детей в центре Лучик' },
];

const GalleryProgramming = () => (
  <GalleryCategory
    title="Программирование"
    description="Фото занятий по Scratch, Python, Roblox и другим направлениям"
    photos={PHOTOS}
  />
);

export default GalleryProgramming;
