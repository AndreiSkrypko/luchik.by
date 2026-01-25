import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import EnrollmentCard from '@/components/EnrollmentCard';
import { useState } from 'react';
import styles from './NotFound.module.css';

const NotFound = () => {
  const location = useLocation();
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const toggleContacts = () => {
    setIsContactsOpen(!isContactsOpen);
  };

  const closeContacts = () => {
    setIsContactsOpen(false);
  };

  return (
    <div className={styles.notFoundPage}>
      <Header onContactsClick={toggleContacts} />
      <div className={styles.notFoundContent}>
        <h1 style={{ 
          marginBottom: '16px', 
          fontSize: '4rem', 
          fontWeight: 'bold',
          color: '#4665a1',
          fontFamily: "'Nunito', sans-serif"
        }}>
          404
        </h1>
        <p style={{ 
          marginBottom: '16px', 
          fontSize: '1.25rem',
          color: '#4A5568',
          fontFamily: "'Segoe UI', system-ui, sans-serif"
        }}>
          Страница не найдена
        </p>
        <a 
          href="/" 
          style={{
            color: '#FF6B35',
            textDecoration: 'underline',
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#FF8C5A'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#FF6B35'}
        >
          Вернуться на главную
        </a>
      </div>
      <Footer onContactsClick={toggleContacts} />
      <ContactsPanel isOpen={isContactsOpen} onClose={closeContacts} />
      <ScrollToTop />
      <EnrollmentCard />
    </div>
  );
};

export default NotFound;

