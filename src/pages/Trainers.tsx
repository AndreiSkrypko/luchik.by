import { useState } from 'react';
import Header from '@/components/Header';
import ProgramCards from '@/components/ProgramCards';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import styles from './Trainers.module.css';

const Trainers = () => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  const toggleContacts = () => {
    setIsContactsOpen(!isContactsOpen);
  };

  const closeContacts = () => {
    setIsContactsOpen(false);
  };

  return (
    <div className={styles.trainersPage}>
      <Header onContactsClick={toggleContacts} hideDecorations={true} />
      <main>
        <div className={styles.trainersMain}>
          <ProgramCards />
        </div>
      </main>
      <Footer onContactsClick={toggleContacts} />
      <ContactsPanel isOpen={isContactsOpen} onClose={closeContacts} />
      <ScrollToTop />
    </div>
  );
};

export default Trainers;

