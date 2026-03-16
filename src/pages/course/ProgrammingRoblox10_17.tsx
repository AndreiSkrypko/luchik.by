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
import programmingRoblox10_17Img from '@/assets/directions/programming-roblox-10-17.webp';
import styles from './CoursePage.module.css';

const ProgrammingRoblox10_17 = () => {
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
            <h1 className={styles.pageTitle}>Разработка игр в Roblox</h1>
            <p className={styles.pageDescription}>Roblox Studio и Lua — многопользовательские игры</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={programmingRoblox10_17Img} alt="Программирование Roblox в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Продвинутый курс Roblox для подростков — создание многопользовательских игр с механиками, 
                инвентарём, системой прогресса. Lua-скрипты управляют логикой, физикой, магазином, 
                лидерами. Игры публикуются и доступны миллионам игроков.
              </p>
              <p className={styles.aboutText}>
                Курс охватывает продвинутый Lua: RemoteEvents, DataStore, оптимизация. Ребята создают 
                обжи, симуляторы, гонки — жанры, популярные в Roblox. Понимают геймдизайн и монетизацию. 
                Отличный опыт для портфолио геймдев-разработчика.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="programming-roblox-10-17" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🎮</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>10–17 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>60–90 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>👥</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Multiplayer, Lua</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Разработка игр в Roblox" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>📜</span><div><h3>Lua</h3><p>Скрипты, сервер, клиент</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>👥</span><div><h3>Multiplayer</h3><p>RemoteEvents, репликация</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎯</span><div><h3>Геймдизайн</h3><p>Механики, баланс, петля прогресса</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>💾</span><div><h3>DataStore</h3><p>Сохранение данных игроков</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🛒</span><div><h3>GamePass, DevProducts</h3><p>Основы монетизации</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🚀</span><div><h3>Публикация</h3><p>Релиз, апдейты, аналитика</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем Roblox подростку?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Реальная аудитория — миллионы игроков</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Геймдизайн + программирование</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Портфолио для геймдева</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Опыт работы с живым продуктом</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="programming-roblox-10-17" ageRange="10-17" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="programming-roblox-10-17" ageRange="10-17" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Разработка игр в Roblox" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgrammingRoblox10_17;
