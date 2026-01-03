import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import styles from './About.module.css';

const About = () => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  const toggleContacts = () => {
    setIsContactsOpen(!isContactsOpen);
  };

  const closeContacts = () => {
    setIsContactsOpen(false);
  };

  return (
    <div className={styles.aboutPage}>
      <Header onContactsClick={toggleContacts} />
      <main>
        <div className={styles.aboutMain}>
          {/* Контент страницы "О нас" будет здесь */}
        </div>
      </main>
      <Footer onContactsClick={toggleContacts} />
      <ContactsPanel isOpen={isContactsOpen} onClose={closeContacts} />
      <ScrollToTop />
    </div>
  );
};

export default About;

