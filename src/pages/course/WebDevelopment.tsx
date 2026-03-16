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
import CoursePriceGallery from '@/components/CoursePriceGallery';
import CourseBreadcrumb from '@/components/CourseBreadcrumb';
import webDevelopmentImg from '@/assets/directions/web-development.webp';
import styles from './CoursePage.module.css';

const WebDevelopment = () => {
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
            <div className={styles.breadcrumbWrapper}>
              <CourseBreadcrumb to="/age/10-17" label="К программам 10-17 лет" />
            </div>
            <h1 className={styles.pageTitle}>Веб-разработка</h1>
            <p className={styles.pageDescription}>HTML, CSS, JavaScript — создание сайтов с нуля</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={webDevelopmentImg} alt="Веб-разработка в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Веб-разработка — создание сайтов: разметка (HTML), стили (CSS) и интерактивность (JavaScript). 
                Подростки учатся верстать страницы, адаптировать под мобильные устройства и добавлять 
                динамику. От статической страницы до многостраничного сайта.
              </p>
              <p className={styles.aboutText}>
                Курс охватывает семантическую вёрстку, Flexbox, Grid, медиазапросы. Ребята создают 
                портфолио, лендинг, многостраничный сайт. Понимают структуру веб-страницы и готовы к 
                изучению фреймворков (React, Vue) или бэкенда.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="web-development" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🌐</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>10–17 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>60–90 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>📄</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>HTML, CSS, JS</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Веб-разработка" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>📄</span><div><h3>HTML5</h3><p>Семантика, структура, формы</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎨</span><div><h3>CSS3</h3><p>Стили, Flexbox, Grid</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📱</span><div><h3>Адаптивность</h3><p>Медиазапросы, mobile-first</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🟨</span><div><h3>JavaScript</h3><p>Интерактивность, DOM</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📂</span><div><h3>Проекты</h3><p>Лендинг, портфолио, сайт</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🚀</span><div><h3>Деплой</h3><p>Публикация в интернете</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем веб-разработка?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Видимый результат — свой сайт в сети</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>База для фреймворков — React, Vue</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Востребованная профессия</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Портфолио для поступления и работы</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="web-development" ageRange="10-17" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="web-development" ageRange="10-17" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Веб-разработка" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebDevelopment;
