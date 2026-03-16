import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import EnrollmentCard from '@/components/EnrollmentCard';
import GalleryPhotoCard from '@/components/GalleryPhotoCard';
import styles from './Gallery.module.css';

const GALLERY_ITEMS = [
  {
    src: '/img/gallery/developing/1.webp',
    alt: 'Развивающие занятия в центре Лучик',
    title: 'Развивающие занятия',
    description: 'Комплексные программы для детей от 1 года',
    href: '/gallery/developing',
  },
  {
    src: '/img/gallery/robotics/IMG_4011.webp',
    alt: 'Робототехника в центре Лучик',
    title: 'Робототехника',
    description: 'Конструирование и программирование роботов',
    href: '/gallery/robotics',
  },
  {
    src: '/img/gallery/prep-school/photo_2026-03-16_18-36-11.webp',
    alt: 'Подготовка к школе в центре Лучик',
    title: 'Подготовка к школе',
    description: 'Комплексная подготовка детей к школе',
    href: '/gallery/prep-school',
  },
  {
    src: '/img/gallery/programming/IMG_3989.webp',
    alt: 'Программирование в центре Лучик',
    title: 'Программирование',
    description: 'Scratch, Python, Roblox и другие направления',
    href: '/gallery/programming',
  },
  {
    src: '/img/gallery/vr/photo_2026-03-16_20-08-21.webp',
    alt: 'Программирование VR-игр в центре Лучик',
    title: 'Программирование VR-игр',
    description: 'Создание игр для шлемов виртуальной реальности',
    href: '/gallery/programming-vr',
  },
  {
    src: '/img/gallery/english/photo_2026-03-16_20-05-26.webp',
    alt: 'Английский в центре Лучик',
    title: 'Английский язык',
    description: 'Уроки английского в игровой форме для детей',
    href: '/gallery/english',
  },
  {
    src: '/img/gallery/masterclass/IMG_7670.webp',
    alt: 'Мастер-классы в центре Лучик',
    title: 'Мастер-классы',
    description: 'Творческие и развивающие мастер-классы',
    href: '/gallery/masterclass',
  },
  {
    src: '/img/gallery/elektronika_shemotehnika/IMG_2016.webp',
    alt: 'Электроника и схемотехника в центре Лучик',
    title: 'Электроника и схемотехника',
    description: 'Arduino, пайка, создание электронных устройств',
    href: '/gallery/electronics',
  },
  {
    src: '/img/gallery/legokonstruirovanie/20230325_110808.webp',
    alt: 'Легоконструирование в центре Лучик',
    title: 'Легоконструирование',
    description: 'Конструирование из Lego для детей',
    href: '/gallery/lego',
  },
  {
    src: '/img/gallery/legorazvivaika/IMG_1818.webp',
    alt: 'Лего-развивайка в центре Лучик',
    title: 'Лего-развивайка',
    description: 'Занятия для детей 2,5–3 лет',
    href: '/gallery/lego-razvivayka',
  },
  {
    src: '/img/gallery/chess/IMG_2095.webp',
    alt: 'Шахматы в центре Лучик',
    title: 'Шахматы',
    description: 'Развитие логики и стратегического мышления',
    href: '/gallery/chess',
  },
  {
    src: '/img/gallery/legomatematika/IMG_1969.webp',
    alt: 'Лего-математика в центре Лучик',
    title: 'Лего-математика',
    description: 'Математика через Lego для детей 5–7 лет',
    href: '/gallery/lego-matematika',
  },
  {
    src: '/img/gallery/3dmodelirovanie/IMG_5054.webp',
    alt: '3D-моделирование в центре Лучик',
    title: '3D-моделирование',
    description: 'Tinkercad, Blender — создание 3D-моделей',
    href: '/gallery/3d-modeling',
  },
];

const Gallery = () => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  const toggleContacts = () => {
    setIsContactsOpen(!isContactsOpen);
  };

  const closeContacts = () => {
    setIsContactsOpen(false);
  };

  return (
    <div className={styles.galleryPage}>
      <Header onContactsClick={toggleContacts} />
      <main>
        <div className={styles.galleryMain}>
          <div className={styles.titleSection}>
            <h1 className={styles.galleryTitle}>Галерея</h1>
            <p className={styles.galleryDescription}>
              Фото занятий и мастер-классов нашего центра
            </p>
            <div className={styles.galleryGrid}>
              {GALLERY_ITEMS.map((item, index) => (
                <GalleryPhotoCard
                  key={index}
                  src={item.src}
                  alt={item.alt}
                  title={item.title}
                  description={item.description}
                  href={'href' in item ? item.href : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer onContactsClick={toggleContacts} />
      <ContactsPanel isOpen={isContactsOpen} onClose={closeContacts} />
      <ScrollToTop />
      <EnrollmentCard />
    </div>
  );
};

export default Gallery;

