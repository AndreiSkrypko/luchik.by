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
import programmingPythonImg from '@/assets/directions/programming-python.webp';
import styles from './CoursePage.module.css';

const ProgrammingPython = () => {
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
            <h1 className={styles.pageTitle}>Программирование на Python</h1>
            <p className={styles.pageDescription}>Синтаксис, алгоритмы, практические проекты</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={programmingPythonImg} alt="Программирование Python в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Python — один из самых популярных языков в мире. Простой синтаксис, читаемость и богатые 
                библиотеки делают его идеальным первым текстовым языком. Подростки пишут консольные 
                программы, парсеры, ботов, простые игры и скрипты для автоматизации.
              </p>
              <p className={styles.aboutText}>
                Курс охватывает переменные, циклы, условия, функции, списки, словари. Ребята работают с 
                файлами, модулями и основами ООП. К концу курса способны создать собственный проект: 
                телеграм-бота, анализатор данных или игру.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="programming-python" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🐍</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>10–17 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>75 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>💻</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Python 3</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Программирование на Python" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>📝</span><div><h3>Синтаксис</h3><p>Переменные, типы, операции</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔄</span><div><h3>Циклы и условия</h3><p>if, for, while — логика программ</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📦</span><div><h3>Структуры данных</h3><p>Списки, словари, кортежи</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>⚙️</span><div><h3>Функции и модули</h3><p>Структурирование кода</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📁</span><div><h3>Работа с файлами</h3><p>Чтение, запись, парсинг</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎮</span><div><h3>Проекты</h3><p>Боты, игры, скрипты</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Почему Python?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Понятный синтаксис — быстрый старт</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Универсальность — веб, AI, автоматизация</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Востребованность — топ-язык для карьеры</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>База для AI и машинного обучения</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="programming-python" ageRange="10-17" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="programming-python" ageRange="10-17" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Программирование на Python" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgrammingPython;
