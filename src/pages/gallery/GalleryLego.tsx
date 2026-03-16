import GalleryCategory from '@/components/GalleryCategory';

// Добавляйте фото в /img/gallery/lego/ (формат .webp)
const PHOTOS: { src: string; alt: string }[] = [];

const GalleryLego = () => (
  <GalleryCategory
    title="Легоконструирование"
    description="Фото занятий по конструированию из Lego"
    photos={PHOTOS}
  />
);

export default GalleryLego;
