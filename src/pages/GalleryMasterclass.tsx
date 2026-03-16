import GalleryCategory from '@/components/GalleryCategory';

// Добавляйте фото в /img/masterclass/ (1.webp, 2.webp, ... до ~50)
const MASTERCLASS_PHOTOS = [
  { src: '/img/masterclass/1.webp', alt: 'Мастер-класс в центре Лучик — ребёнок с поделкой на новогоднюю тематику' },
  { src: '/img/masterclass/2.webp', alt: 'Мастер-класс в центре Лучик — праздник с кроликом и детьми' },
];

const GalleryMasterclass = () => (
  <GalleryCategory
    title="Мастер-классы"
    description="Фото творческих мастер-классов и праздников в нашем центре"
    photos={MASTERCLASS_PHOTOS}
  />
);

export default GalleryMasterclass;
