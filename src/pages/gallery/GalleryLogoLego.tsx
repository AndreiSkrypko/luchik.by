import GalleryCategory from '@/components/GalleryCategory';

// Добавляйте фото в /img/gallery/logo-lego/ (1.png, 2.png, ...)
const PHOTOS: { src: string; alt: string }[] = [];

const GalleryLogoLego = () => (
  <GalleryCategory
    title="Логопедия и LEGO"
    description="Фото занятий по современным методикам развития речи"
    photos={PHOTOS}
  />
);

export default GalleryLogoLego;
