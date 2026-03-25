import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import EnrollmentCard from '@/components/EnrollmentCard';
import GalleryPhotoCard from '@/components/GalleryPhotoCard';
import { hubAlt } from '@/lib/galleryAlt';
import styles from './Gallery.module.css';

const GALLERY_ITEMS = [
  {
    src: '/img/gallery/developing/razvivayka_1.webp',
    alt: hubAlt('developing'),
    title: 'Развивающие занятия',
    description: 'Комплексные программы для детей от 1 года',
    href: '/gallery/developing',
  },
  {
    src: '/img/gallery/robotics/robototehnika_1.webp',
    alt: hubAlt('robotics'),
    title: 'Робототехника',
    description: 'Конструирование и программирование роботов',
    href: '/gallery/robotics',
  },
  {
    src: '/img/gallery/prep-school/podgotovka_k_shkole_1.webp',
    alt: hubAlt('prepSchool'),
    title: 'Подготовка к школе',
    description: 'Комплексная подготовка детей к школе',
    href: '/gallery/prep-school',
  },
  {
    src: '/img/gallery/programming/programmirovanie_3.webp',
    alt: hubAlt('programming'),
    title: 'Программирование',
    description: 'Scratch, Python, Roblox и другие направления',
    href: '/gallery/programming',
  },
  {
    src: '/img/gallery/vr/vr_igry_1.webp',
    alt: hubAlt('vr'),
    title: 'Программирование VR-игр',
    description: 'Создание игр для шлемов виртуальной реальности',
    href: '/gallery/programming-vr',
  },
  {
    src: '/img/gallery/english/anglijskij_1.webp',
    alt: hubAlt('english'),
    title: 'Английский язык',
    description: 'Уроки английского в игровой форме для детей',
    href: '/gallery/english',
  },
  {
    src: '/img/gallery/masterclass/masterklass_51.webp',
    alt: hubAlt('masterclass'),
    title: 'Мастер-классы',
    description: 'Творческие и развивающие мастер-классы',
    href: '/gallery/masterclass',
  },
  {
    src: '/img/gallery/artstudio/artstudiya_1.webp',
    alt: hubAlt('artStudio'),
    title: 'Арт-студия',
    description: 'Творческие занятия для детей',
    href: '/gallery/art-studio',
  },
  {
    src: '/img/gallery/elektronika_shemotehnika/elektronika_1.webp',
    alt: hubAlt('electronics'),
    title: 'Электроника и схемотехника',
    description: 'Arduino, пайка, создание электронных устройств',
    href: '/gallery/electronics',
  },
  {
    src: '/img/gallery/legokonstruirovanie/lego_konstr_8.webp',
    alt: hubAlt('lego'),
    title: 'Легоконструирование',
    description: 'Конструирование из Lego для детей',
    href: '/gallery/lego',
  },
  {
    src: '/img/gallery/legorazvivaika/lego_razvivajka_1.webp',
    alt: hubAlt('legoRazvivayka'),
    title: 'Лего-развивайка',
    description: 'Занятия для детей 2,5–3 лет',
    href: '/gallery/lego-razvivayka',
  },
  {
    src: '/img/gallery/chess/shahmaty_1.webp',
    alt: hubAlt('chess'),
    title: 'Шахматы',
    description: 'Развитие логики и стратегического мышления',
    href: '/gallery/chess',
  },
  {
    src: '/img/gallery/legomatematika/lego_matematika_1.webp',
    alt: hubAlt('legoMatematika'),
    title: 'Лего-математика',
    description: 'Математика через Lego для детей 5–7 лет',
    href: '/gallery/lego-matematika',
  },
  {
    src: '/img/gallery/3dmodelirovanie/modelirovanie_3d_1.webp',
    alt: hubAlt('modeling3d'),
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

