import GalleryCategory from '@/components/GalleryCategory';

// Добавляйте фото в /img/gallery/electronics/ (формат .webp)
const PHOTOS: { src: string; alt: string }[] = [];

const GalleryElectronics = () => (
  <GalleryCategory
    title="Электроника и схемотехника"
    description="Фото занятий по Arduino, пайке и созданию электронных устройств"
    photos={PHOTOS}
  />
);

export default GalleryElectronics;
