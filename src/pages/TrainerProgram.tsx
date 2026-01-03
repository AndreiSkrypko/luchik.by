import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import TrainerList from '@/components/TrainerList';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import styles from './TrainerProgram.module.css';

const TrainerProgram = () => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.search]);

  const toggleContacts = () => {
    setIsContactsOpen(!isContactsOpen);
  };

  const closeContacts = () => {
    setIsContactsOpen(false);
  };

  return (
    <div className={styles.trainerProgramPage}>
      <Header onContactsClick={toggleContacts} hideDecorations={true} />
      <main>
        <div className={styles.trainerProgramMain}>
          <TrainerList />
        </div>
      </main>
      <Footer onContactsClick={toggleContacts} />
      <ContactsPanel isOpen={isContactsOpen} onClose={closeContacts} />
      <ScrollToTop />
    </div>
  );
};

export default TrainerProgram;

