import GalleryCategory from '@/components/GalleryCategory';
import masterclassFiles from '@/data/masterclass-photos.json';

const BASE = '/img/gallery/masterclass';
const MASTERCLASS_PHOTOS = (masterclassFiles as string[]).map((f) => ({
  src: `${BASE}/${f}`,
  alt: 'Мастер-класс в центре Лучик',
}));

const GalleryMasterclass = () => (
  <GalleryCategory
    title="Мастер-классы"
    description="Фото творческих мастер-классов и праздников в нашем центре"
    photos={MASTERCLASS_PHOTOS}
  />
);

export default GalleryMasterclass;
