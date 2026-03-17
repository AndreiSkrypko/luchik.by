import GalleryCategory from '@/components/GalleryCategory';

const PHOTOS: { src: string; alt: string }[] = [
  { src: '/img/gallery/developing/1.webp', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/2.webp', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/3.webp', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/4.webp', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/5.webp', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/6.webp', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/7.webp', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/8.webp', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/9.webp', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/10.webp', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/12.webp', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/13.webp', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/14.webp', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/15.webp', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/16.webp', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/17.webp', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/18.webp', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/19.webp', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/20.webp', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/21.webp', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/22.webp', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/23.webp', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/24.webp', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/25.webp', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/26.webp', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/27.webp', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/photo_2026-03-17_06-38-08.webp', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/photo_2026-03-17_06-38-12.webp', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/photo_2026-03-17_06-38-15.webp', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/photo_2026-03-17_06-38-18.webp', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/photo_2026-03-17_06-38-22.webp', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/photo_2026-03-17_06-38-25.webp', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/photo_2026-03-17_06-38-28.webp', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/photo_2026-03-17_06-38-31.webp', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/photo_2026-03-17_06-38-34.webp', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/photo_2026-03-17_06-38-38.webp', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/photo_2026-03-17_06-38-41.webp', alt: 'Занятия для детей в центре Лучик' },
];

const GalleryDeveloping = () => (
  <GalleryCategory
    title="Развивающие занятия"
    description="Фото комплексных программ для детей от 1 года"
    photos={PHOTOS}
  />
);

export default GalleryDeveloping;
