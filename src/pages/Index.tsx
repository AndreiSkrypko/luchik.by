import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import InfoBlocks from '@/components/InfoBlocks';
import WhyUsSection from '@/components/WhyUsSection';
import DirectionsSection from '@/components/DirectionsSection';
import MapSection from '@/components/MapSection';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import styles from './Index.module.css';

const Index = () => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const location = useLocation();

  // Обрабатываем скролл при загрузке главной страницы
  useEffect(() => {
    if (location.pathname === '/') {
      if (location.hash === '#directions') {
        // Если есть якорь #directions, скроллим к секции
        setTimeout(() => {
          const directionsSection = document.getElementById('directions');
          if (directionsSection) {
            directionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else if (!location.hash) {
        // Если нет hash, скроллим наверх
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, [location.pathname, location.hash]);

  const toggleContacts = () => {
    setIsContactsOpen(!isContactsOpen);
  };

  const closeContacts = () => {
    setIsContactsOpen(false);
  };

  return (
    <div className={styles.page}>
      <Header onContactsClick={toggleContacts} />
      <main>
        <HeroSection />
        <InfoBlocks />
        <WhyUsSection />
        <DirectionsSection />
        <MapSection />
      </main>
      <Footer onContactsClick={toggleContacts} />
      <ContactsPanel isOpen={isContactsOpen} onClose={closeContacts} />
      <ScrollToTop />
    </div>
  );
};

export default Index;