import GalleryCategory from '@/components/GalleryCategory';
import masterclassFiles from '@/data/masterclass-photos.json';
import { GALLERY_PREFIX, galleryAltLine } from '@/lib/galleryAlt';

const BASE = '/img/gallery/masterclass';
const PREFIX = GALLERY_PREFIX.masterclass;

const MASTERCLASS_PHOTOS = (masterclassFiles as string[]).map((f, i) => ({
  src: `${BASE}/${f}`,
  alt: galleryAltLine(PREFIX, i),
}));

const GalleryMasterclass = () => (
  <GalleryCategory
    title="Мастер-классы"
    description="Фото творческих мастер-классов и праздников в нашем центре"
    photos={MASTERCLASS_PHOTOS}
  />
);

export default GalleryMasterclass;
