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
import programmingVrImg from '@/assets/directions/programming-vr.webp';
import styles from './CoursePage.module.css';

const ProgrammingVr = () => {
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
            <h1 className={styles.pageTitle}>Программирование VR-игр</h1>
            <p className={styles.pageDescription}>3D-мир и интерактивные игры в виртуальной реальности</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={programmingVrImg} alt="VR-программирование в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                VR-разработка — создание миров и игр для шлемов виртуальной реальности. Дети работают в 
                средах вроде CoSpaces или аналогичных, где можно строить 3D-сцены и добавлять интерактивность 
                с помощью блоков кода или простого скриптинга.
              </p>
              <p className={styles.aboutText}>
                Курс знакомит с 3D-пространством, объектами, анимацией и логикой VR-приложений. Ребята 
                создают небольшие сцены и игры, которые можно «войти» в шлеме. Развивает пространственное 
                мышление и понимание современных технологий.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="programming-vr" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🥽</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>5–10 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>75 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🌐</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>3D, VR</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Программирование VR-игр" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>🌍</span><div><h3>3D-сцены</h3><p>Создание мира, объекты, рельеф</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎮</span><div><h3>Интерактивность</h3><p>Действия по нажатию, триггеры</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔄</span><div><h3>Логика</h3><p>События, переменные, условия</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>👀</span><div><h3>Виртуальность</h3><p>Погружение, навигация в VR</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎨</span><div><h3>Дизайн</h3><p>Цвета, текстуры, атмосфера</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🚀</span><div><h3>Проекты</h3><p>Мини-игры и сцены для шлема</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем VR детям?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Технологии будущего — раннее знакомство</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Пространственное мышление — 3D-логика</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Творчество — создание своих миров</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Связь с 3D-моделированием и игростроем</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="programming-vr" ageRange="5-10" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="programming-vr" ageRange="5-10" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Программирование VR-игр" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgrammingVr;
