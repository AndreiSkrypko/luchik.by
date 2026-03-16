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
import programmingVr10_17Img from '@/assets/directions/programming-vr-10-17.webp';
import styles from './CoursePage.module.css';

const ProgrammingVr10_17 = () => {
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
              <button className={styles.backButton} onClick={() => navigate('/age/10-17')} aria-label="К программам 10-17 лет">← К программам 10-17 лет</button>
            </div>
            <h1 className={styles.pageTitle}>Разработка VR-игр</h1>
            <p className={styles.pageDescription}>Создание приложений виртуальной реальности — 3D-мир и интерактив</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={programmingVr10_17Img} alt="VR-программирование в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                VR-разработка — создание приложений и игр для шлемов виртуальной реальности. Подростки 
                работают в Unity или аналогах: строят 3D-сцены, добавляют интерактивность, настраивают 
                контроллеры и тестируют в шлеме.
              </p>
              <p className={styles.aboutText}>
                Курс охватывает основы 3D-движков, скрипты на C#, взаимодействие с объектами в VR. 
                Ребята создают мини-игры, симуляции и образовательные приложения. VR — растущая 
                отрасль: игры, обучение, медицина, архитектура.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="programming-vr-10-17" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🥽</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>10–17 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>60–90 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🎮</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Unity, VR</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Разработка VR-игр" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>🌍</span><div><h3>3D-движок</h3><p>Unity или аналог, сцены</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎮</span><div><h3>VR-контроллеры</h3><p>Input, граббинг, телепорт</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>💻</span><div><h3>Скрипты</h3><p>C#, логика взаимодействия</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔄</span><div><h3>Интерактив</h3><p>Триггеры, события, физика</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📱</span><div><h3>Тестирование</h3><p>Сборка под Meta Quest и др.</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🚀</span><div><h3>Проекты</h3><p>Мини-игры, симуляции</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем VR-разработка?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Растущая отрасль — игры, обучение, медицина</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>3D + программирование — комплексный навык</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Уникальный опыт — своя игра в шлеме</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Связь с геймдевом и 3D</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="programming-vr-10-17" ageRange="10-17" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="programming-vr-10-17" ageRange="10-17" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Разработка VR-игр" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgrammingVr10_17;
