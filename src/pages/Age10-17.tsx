import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import EnrollmentCard from '@/components/EnrollmentCard';
import InDevelopment from '@/components/InDevelopment';
import styles from './AgeCategory.module.css';

const Age10_17 = () => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const toggleContacts = () => {
    setIsContactsOpen(!isContactsOpen);
  };

  const closeContacts = () => {
    setIsContactsOpen(false);
  };

  return (
    <div className={styles.ageCategoryPage}>
      <Header onContactsClick={toggleContacts} />
      <main>
        <div className={styles.ageCategoryMain}>
          <div className={styles.titleSection}>
            <h1 className={styles.ageCategoryTitle}>Программы для детей 10-17 лет</h1>
            <p className={styles.ageCategoryDescription}>
              Развивающие занятия для подростков
            </p>
            <InDevelopment />
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

export default Age10_17;

