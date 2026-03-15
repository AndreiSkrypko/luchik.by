import GalleryCategory from '@/components/GalleryCategory';

const PHOTOS: { src: string; alt: string }[] = [
  { src: '/img/gallery/developing/1.jpg', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/2.jpg', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/3.jpg', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/4.jpg', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/5.jpg', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/6.jpg', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/7.jpg', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/8.jpg', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/9.jpg', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/10.jpg', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/12.jpg', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/13.jpg', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/14.jpg', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/15.jpg', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/16.jpg', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/17.jpg', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/18.jpg', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/19.jpg', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/20.jpg', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/21.jpg', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/22.jpg', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/23.jpg', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/24.jpg', alt: 'Развитие детей в центре Лучик' },
  { src: '/img/gallery/developing/25.jpg', alt: 'Развивающие занятия в центре Лучик' },
  { src: '/img/gallery/developing/26.jpg', alt: 'Занятия для детей в центре Лучик' },
  { src: '/img/gallery/developing/27.jpg', alt: 'Развитие детей в центре Лучик' },
];

const GalleryDeveloping = () => (
  <GalleryCategory
    title="Развивающие занятия"
    description="Фото комплексных программ для детей от 1 года"
    photos={PHOTOS}
  />
);

export default GalleryDeveloping;
