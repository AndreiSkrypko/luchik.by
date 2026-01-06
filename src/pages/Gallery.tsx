import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import styles from './Gallery.module.css';

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
          </div>
          {/* Контент галереи будет здесь */}
        </div>
      </main>
      <Footer onContactsClick={toggleContacts} />
      <ContactsPanel isOpen={isContactsOpen} onClose={closeContacts} />
      <ScrollToTop />
    </div>
  );
};

export default Gallery;

