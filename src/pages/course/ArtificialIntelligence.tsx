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
import artificialIntelligenceImg from '@/assets/directions/artificial-intelligence.webp';
import styles from './CoursePage.module.css';

const ArtificialIntelligence = () => {
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
            <h1 className={styles.pageTitle}>Искусственный интеллект</h1>
            <p className={styles.pageDescription}>Основы ML, нейросети, данные и AI-инструменты</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={artificialIntelligenceImg} alt="Искусственный интеллект в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Курс по основам искусственного интеллекта знакомит подростков с машинным обучением, 
                нейросетями и современными AI-инструментами. Ребята работают с Python, библиотеками 
                вроде TensorFlow или аналогами, учатся обучать модели на данных.
              </p>
              <p className={styles.aboutText}>
                Темы: классификация изображений, текстовая генерация, работа с API ChatGPT и др. 
                Понимание, как устроены нейросети, как подготовить данные и оценить результат. 
                Курс не требует углублённой математики — фокус на практике и интуиции.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="artificial-intelligence" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🤖</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>10–17 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>60–90 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🧠</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Python, ML</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Искусственный интеллект" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>📊</span><div><h3>Данные</h3><p>Подготовка, очистка, визуализация</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🧠</span><div><h3>Нейросети</h3><p>Слои, активации, обучение</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🖼</span><div><h3>Распознавание образов</h3><p>Изображения, классификация</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>💬</span><div><h3>Текст и генерация</h3><p>API ChatGPT, промпты</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🛠</span><div><h3>AI-инструменты</h3><p>Практика с современными сервисами</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📋</span><div><h3>Этика AI</h3><p>Ограничения, риски, ответственность</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем AI подростку?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Самые востребованные навыки будущего</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Понимание технологий, которые меняют мир</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Связь с Python и программированием</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Профориентация — Data Science, ML-инженер</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="artificial-intelligence" ageRange="10-17" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="artificial-intelligence" ageRange="10-17" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Искусственный интеллект" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtificialIntelligence;
