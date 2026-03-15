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
    src: '/img/gallery/developing/1.jpg',
    alt: 'Развивающие занятия в центре Лучик',
    title: 'Развивающие занятия',
    description: 'Комплексные программы для детей от 1 года',
    href: '/gallery/developing',
  },
  {
    src: '/img/cards/robotics.webp',
    alt: 'Робототехника в центре Лучик',
    title: 'Робототехника',
    description: 'Конструирование и программирование роботов',
    href: '/gallery/robotics',
  },
  {
    src: '/img/cards/about-center.webp',
    alt: 'Подготовка к школе в центре Лучик',
    title: 'Подготовка к школе',
    description: 'Комплексная подготовка детей к школе',
    href: '/gallery/prep-school',
  },
  {
    src: '/img/cards/robotics.webp',
    alt: 'Программирование в центре Лучик',
    title: 'Программирование',
    description: 'Scratch, Python, Roblox и другие направления',
    href: '/gallery/programming',
  },
  {
    src: '/img/masterclass/1.png',
    alt: 'Мастер-классы в центре Лучик',
    title: 'Мастер-классы',
    description: 'Творческие и развивающие мастер-классы',
    href: '/gallery/masterclass',
  },
  {
    src: '/img/cards/robotics.webp',
    alt: 'Логопедия и LEGO в центре Лучик',
    title: 'Логопедия и LEGO',
    description: 'Современные методики развития речи',
    href: '/gallery/logo-lego',
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

