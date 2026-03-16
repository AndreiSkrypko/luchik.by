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
import circuitDesignImg from '@/assets/directions/circuit-design.webp';
import styles from './CoursePage.module.css';

const CircuitDesign = () => {
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
            <h1 className={styles.pageTitle}>Схемотехника</h1>
            <p className={styles.pageDescription}>Схемы, пайка, проектирование электронных устройств</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={circuitDesignImg} alt="Схемотехника в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Схемотехника — чтение и создание принципиальных схем, пайка, проектирование устройств. 
                Подростки учатся разбираться в резисторах, конденсаторах, транзисторах, микросхемах. 
                Собирают простые схемы на макетных платах и паяют готовые модули.
              </p>
              <p className={styles.aboutText}>
                Курс даёт понимание, как устроена электроника «под капотом». Ребята читают документацию, 
                подбирают компоненты, отлаживают схемы. Идеально дополняет Arduino и робототехнику — 
                можно создавать собственные платы и устройства с нуля.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="circuit-design" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🔌</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>10–17 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>60–90 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🔩</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Схемы, пайка</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Схемотехника" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>📐</span><div><h3>Чтение схем</h3><p>Обозначения, трассировка</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>⚡</span><div><h3>Компоненты</h3><p>Резисторы, конденсаторы, транзисторы</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔩</span><div><h3>Пайка</h3><p>Паяльник, припой, флюс</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📋</span><div><h3>Проектирование</h3><p>Выбор компонентов, расчёты</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔧</span><div><h3>Отладка</h3><p>Мультиметр, поиск неисправностей</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🏠</span><div><h3>Проекты</h3><p>Часы, метеостанция, умный дом</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем схемотехника?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Понимание электроники — не только программирование</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Практический навык — пайка и сборка</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Дополнение к Arduino и роботам</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Инженерия, электроника — профориентация</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="circuit-design" ageRange="10-17" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="circuit-design" ageRange="10-17" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Схемотехника" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CircuitDesign;
