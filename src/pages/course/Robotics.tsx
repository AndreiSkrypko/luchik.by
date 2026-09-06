import { useState, useEffect } from 'react';
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
import roboticsImg from '@/assets/directions/robotics.webp';
import styles from './CoursePage.module.css';

const Robotics = () => {
    const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  const toggleContacts = () => setIsContactsOpen(!isContactsOpen);
  const closeContacts = () => setIsContactsOpen(false);
  const handleFormSuccess = () => { setIsFormOpen(false); };

  return (
    <div className={styles.coursePage}>
      <Header onContactsClick={toggleContacts} />
      <main>
        <div className={styles.courseMain}>
          <div className={styles.titleSection}>
            <div className={styles.breadcrumbWrapper}>
              <CourseBreadcrumb to="/age/5-10" label="К программам 5-10 лет" />
            </div>
            <h1 className={styles.pageTitle}>Робототехника для детей 5–10 лет</h1>
            <p className={styles.pageDescription}>Сборка роботов, механика и программирование — Лида</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={roboticsImg} alt="Робототехника для детей 5–10 лет в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Робототехника объединяет конструирование, механику и программирование. Дети собирают роботов 
                из Lego WeDo, Lego Mindstorms или аналогов: моторы, датчики, шестерни. Затем программируют 
                поведение — движение, реакцию на препятствия, выполнение задач.
              </p>
              <p className={styles.aboutText}>
                Курс развивает инженерное мышление: как устроены механизмы, как передаётся движение, как 
                робот «понимает» среду. Ребята работают в парах или командах, создают проекты и защищают 
                их. Отличная основа для участия в соревнованиях и олимпиадах по робототехнике.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="robotics" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🤖</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>5–10 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>75 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🔧</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Lego, датчики</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Робототехника" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>🧱</span><div><h3>Конструирование</h3><p>Сборка моделей, передача движения</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>⚙️</span><div><h3>Механика</h3><p>Шестерни, рычаги, колёса</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📡</span><div><h3>Датчики</h3><p>Расстояние, касание, цвет</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>💻</span><div><h3>Программирование</h3><p>Управление моторами и логика</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎯</span><div><h3>Проекты</h3><p>Транспорт, робот-исследователь</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🏆</span><div><h3>Соревнования</h3><p>Подготовка к олимпиадам и фестивалям</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем робототехника?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Руки + голова — сборка и программирование</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Инженерное мышление — как устроен мир</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Командная работа — проекты в группе</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Связь с IT — программирование через роботов</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="robotics" ageRange="5-10" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="robotics" ageRange="5-10" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Робототехника" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Robotics;
