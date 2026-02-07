import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import TrainerList from '@/components/TrainerList';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import EnrollmentCard from '@/components/EnrollmentCard';
import styles from './TrainerProgram.module.css';
import EnglishClassCards from '@/components/EnglishClassCards';

const TrainerProgram = () => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const location = useLocation();
  const params = useParams<{ classNumber?: string }>();
 

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
      <Header onContactsClick={toggleContacts} hideDecorations={false} />
      <main>
        <div className={styles.trainerProgramMain}>
          {/*
            If the route is /trainers/english/class/1 (or program param equals 'english'),
            render the English class cards. Otherwise render the standard TrainerList.
          */}
          {location.pathname.startsWith('/trainers/english/class/') && params.classNumber === '1' ? (
            <EnglishClassCards />
          ) : (
            <TrainerList />
          )}
        </div>
      </main>
      <Footer onContactsClick={toggleContacts} />
      <ContactsPanel isOpen={isContactsOpen} onClose={closeContacts} />
      <ScrollToTop />
      <EnrollmentCard />
    </div>
  );
};

export default TrainerProgram;

