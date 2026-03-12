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
import robotics10_17Img from '@/assets/directions/robotics-10-17.webp';
import styles from './CoursePage.module.css';

const Robotics10_17 = () => {
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
            <button className={styles.backButton} onClick={() => navigate('/age/10-17')} aria-label="К программам 10-17 лет">← К программам 10-17 лет</button>
            <h1 className={styles.pageTitle}>Робототехника</h1>
            <p className={styles.pageDescription}>Продвинутые проекты — датчики, микроконтроллеры, программирование</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={robotics10_17Img} alt="Робототехника" loading="eager" />
              </div>
              <p className={styles.aboutText}>
                Продвинутый курс робототехники для подростков — сборка сложных роботов, работа с датчиками, 
                программирование микроконтроллеров Arduino и аналогов. Ребята создают умные устройства: 
                роботы-исследователи, система умного дома, автоматические механизмы.
              </p>
              <p className={styles.aboutText}>
                Курс развивает инженерное и программистское мышление. Участники готовятся к соревнованиям 
                по робототехнике, защищают проекты и учатся работать в команде. Идеально для тех, кто 
                увлекается техникой и хочет связать с ней профессию.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🤖</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>10–17 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>60–90 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🔧</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Arduino, датчики</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Робототехника (10-17)" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>📡</span><div><h3>Датчики</h3><p>Ультразвук, ИК, гироскоп, датчики линии</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>💻</span><div><h3>Микроконтроллеры</h3><p>Arduino, программирование на C</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>⚙️</span><div><h3>Механика</h3><p>Двигатели, сервоприводы, шасси</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎯</span><div><h3>Проекты</h3><p>Робот-следопыт, умный дом, дрон</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🏆</span><div><h3>Соревнования</h3><p>Подготовка к олимпиадам</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📋</span><div><h3>Документация</h3><p>Защита проекта, презентация</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем продвинутая робототехника?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Реальные навыки — программирование и схемотехника</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Профориентация — инженерия, IT, физика</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Портфолио — проекты для поступления</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Команда — соревнования и хакатоны</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="robotics-10-17" ageRange="10-17" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="robotics-10-17" ageRange="10-17" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Робототехника (10-17)" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Robotics10_17;
