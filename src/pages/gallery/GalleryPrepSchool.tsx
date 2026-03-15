import GalleryCategory from '@/components/GalleryCategory';

// Добавляйте фото в /img/gallery/prep-school/ (1.png, 2.png, ...)
const PHOTOS: { src: string; alt: string }[] = [];

const GalleryPrepSchool = () => (
  <GalleryCategory
    title="Подготовка к школе"
    description="Фото занятий по комплексной подготовке детей к школе"
    photos={PHOTOS}
  />
);

export default GalleryPrepSchool;
