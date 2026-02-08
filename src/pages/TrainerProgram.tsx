import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import TrainerList from '@/components/TrainerList';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import EnrollmentCard from '@/components/EnrollmentCard';
import styles from './TrainerProgram.module.css';
import EnglishClassCards from '@/components/EnglishClassCards';
import galleryStyles from './Gallery.module.css';
import englishStyles from '@/components/EnglishClassCards.module.css';
import trainerStyles from '@/components/TrainerList.module.css';

const TrainerProgram = () => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const location = useLocation();
  const params = useParams<{ classNumber?: string }>();
  const navigate = useNavigate();
 

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.search]);

  const toggleContacts = () => {
    setIsContactsOpen(!isContactsOpen);
  };

  const closeContacts = () => {
    setIsContactsOpen(false);
  };

  // Если это маршрут конкретного первого класса английского — показываем упрощённую страницу,
  // оформленную как Галерея, но с набором карточек "Учим буквы"
  if (location.pathname.startsWith('/trainers/english/class/') && params.classNumber === '1') {
    const getBadgeText = (title: string) => {
      // keep only letters and spaces, take first letters of up to 2 words
      const cleaned = title.replace(/[^A-Za-zА-Яа-я\s]/g, '').trim();
      const parts = cleaned.split(/\s+/).filter(Boolean);
      return parts.slice(0, 2).map((w) => w[0].toUpperCase()).join('');
    };

    const items = [
      'Letter recognition (Vowels)',
      'Letter recognition (B, C, D, F, G)',
      'Letters (H, J, K, L)',
      'Letters (M, N, P, Q)',
      'Letters (R, S, T, V)',
      'Letters (W, X, Z)',
    ];

    return (
      <div className={galleryStyles.galleryPage}>
        <Header onContactsClick={toggleContacts} />
        <main>
          <div className={galleryStyles.galleryMain}>
            <div className={trainerStyles.headerSection}>
              <button
                className={trainerStyles.backButton}
                onClick={() => navigate('/trainers/english')}
                aria-label="К выбору класса"
              >
                ← К выбору класса
              </button>
              <div className={trainerStyles.titleSection}>
                <h2 className={trainerStyles.trainerListTitle}>Учим буквы</h2>
              </div>
            </div>

            <div className={`${englishStyles.categories} ${galleryStyles.cardsUnderTitle}`}>
              <div className={englishStyles.category}>
                {/* category header removed (title and "Посмотреть все") */}

                <div className={englishStyles.itemsGrid}>
                  {items.map((title) => (
                    <article key={title} className={englishStyles.itemCard}>
                      <div className={englishStyles.badge} aria-hidden>
                        {getBadgeText(title)}
                      </div>
                      <div className={englishStyles.itemInner}>
                        <h4 className={englishStyles.itemTitle}>{title}</h4>
                      </div>
                      <button className={englishStyles.openBtn}>Открыть</button>
                    </article>
                  ))}
                </div>
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
  }

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

