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
import programmingRobloxImg from '@/assets/directions/programming-roblox.webp';
import styles from './CoursePage.module.css';

const ProgrammingRoblox = () => {
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
              <CourseBreadcrumb to="/age/5-10" label="К программам 5-10 лет" />
            </div>
            <h1 className={styles.pageTitle}>Программирование Roblox для детей</h1>
            <p className={styles.pageDescription}>Создание игр в Roblox Studio на Lua — 5–10 лет, Лида</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={programmingRobloxImg} alt="Программирование Roblox в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Roblox Studio — платформа, где дети создают собственные 3D-игры и публикуют их для миллионов 
                игроков. Программирование на Lua позволяет добавлять механики, меню, логику игры. Популярность 
                Roblox среди детей делает курс особенно мотивирующим.
              </p>
              <p className={styles.aboutText}>
                Ребята учатся работать в 3D-редакторе, размещать объекты, писать скрипты на Lua. Создают 
                обжи, лабиринты, гонки — всё, что подскажет фантазия. Lua — простой язык, отличный первый 
                шаг к текстовому программированию после Scratch.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="programming-roblox" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🎮</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>5–10 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>75 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>💻</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Roblox Studio, Lua</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Программирование Roblox" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>🏗</span><div><h3>Roblox Studio</h3><p>Интерфейс, объекты, 3D-сцены</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📜</span><div><h3>Язык Lua</h3><p>Переменные, функции, условия</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎯</span><div><h3>Механики игр</h3><p>Сбор предметов, счёт, победа</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>👤</span><div><h3>Персонажи</h3><p>Управление, анимация, взаимодействие</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🌍</span><div><h3>Свой мир</h3><p>Ландшафт, ловушки, награды</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🚀</span><div><h3>Публикация</h3><p>Публикация игры, тестирование</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Почему Roblox?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Дети любят Roblox — максимальная мотивация</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Реальный результат — свою игру видят друзья</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Lua — лёгкий вход в текстовое программирование</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>3D, дизайн, логика — комплексный навык</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="programming-roblox" ageRange="5-10" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="programming-roblox" ageRange="5-10" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Программирование Roblox" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgrammingRoblox;
