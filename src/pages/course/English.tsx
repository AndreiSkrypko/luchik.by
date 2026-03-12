import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import EnrollmentCard from '@/components/EnrollmentCard';
import EnrollmentForm from '@/components/EnrollmentForm';
import CourseNav from '@/components/CourseNav';
import RelatedCourses from '@/components/RelatedCourses';
import englishImg from '@/assets/directions/english.png';
import styles from './CoursePage.module.css';

const English = () => {
  const navigate = useNavigate();
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  const toggleContacts = () => setIsContactsOpen(!isContactsOpen);
  const closeContacts = () => setIsContactsOpen(false);
  const handleFormSuccess = () => { setIsFormOpen(false); navigate('/thank-you'); };

  return (
    <div className={styles.coursePage}>
      <Header onContactsClick={toggleContacts} />
      <main>
        <div className={styles.courseMain}>
          <div className={styles.titleSection}>
            <button className={styles.backButton} onClick={() => navigate('/age/5-10')} aria-label="К программам 5-10 лет">← К программам 5-10 лет</button>
            <h1 className={styles.pageTitle}>Английский язык</h1>
            <p className={styles.pageDescription}>Словарь, чтение, аудирование — игровой формат для 5–10 лет</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={englishImg} alt="Английский язык" loading="eager" />
              </div>
              <p className={styles.aboutText}>
                Курс английского для детей 5–10 лет строится на коммуникативном подходе: много говорения, игр, 
                песен и мультиков. Дети накапливают словарный запас, учатся читать простые тексты и понимать 
                английскую речь на слух.
              </p>
              <p className={styles.aboutText}>
                Занятия проходят в небольших группах, где каждый ребёнок получает возможность говорить. 
                Педагог использует яркие материалы, карточки, интерактивные задания. К концу курса дети 
                могут рассказать о себе, задать вопросы и поддержать простой диалог.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🌍</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>5–10 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>45–60 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🎭</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Игры, песни, диалоги</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Английский язык" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>💬</span><div><h3>Разговорная практика</h3><p>Диалоги, игры, живое общение на английском</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📚</span><div><h3>Словарный запас</h3><p>Темы: семья, еда, животные, путешествия</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📖</span><div><h3>Чтение</h3><p>Простые тексты, адаптированные книги</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>👂</span><div><h3>Аудирование</h3><p>Песни, мультики, подкасты для детей</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>✏️</span><div><h3>Грамматика</h3><p>Базовые структуры в игровой форме</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎵</span><div><h3>Творчество</h3><p>Песни, скетчи, проекты на английском</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Почему английский с раннего возраста?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Дети легко впитывают языки — естественное усвоение</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Игровой формат снимает страх ошибок</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Хорошая база для школьной программы</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Открывает мир — общение, культура, путешествия</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="english" ageRange="5-10" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="english" ageRange="5-10" />
        </div>
      </main>
      <Footer onContactsClick={toggleContacts} />
      <ContactsPanel isOpen={isContactsOpen} onClose={closeContacts} />
      <ScrollToTop />
      <EnrollmentCard />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className={styles.formDialog}>
          <DialogHeader className={styles.formDialogHeader}>
            <DialogTitle className={styles.formDialogTitle}>Записаться на занятие</DialogTitle>
            <DialogDescription className={styles.formDialogDesc}>Оставьте заявку — мы перезвоним и подберём удобное время</DialogDescription>
          </DialogHeader>
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Английский язык" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default English;
