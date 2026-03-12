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
import programmingJavascriptImg from '@/assets/directions/programming-javascript.png';
import styles from './CoursePage.module.css';

const ProgrammingJavascript = () => {
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
            <h1 className={styles.pageTitle}>Программирование на JavaScript</h1>
            <p className={styles.pageDescription}>Интерактивность веб-страниц, логика приложений</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={programmingJavascriptImg} alt="JavaScript" loading="eager" />
              </div>
              <p className={styles.aboutText}>
                JavaScript — язык веб-разработки. Он отвечает за интерактивность сайтов: кнопки, формы, 
                анимации, загрузку данных без перезагрузки страницы. Подростки учатся писать скрипты, 
                работать с DOM и создавать простые веб-приложения.
              </p>
              <p className={styles.aboutText}>
                Курс даёт основы синтаксиса JS, события, асинхронность, работу с API. Ребята создают 
                интерактивные страницы, мини-игры в браузере и простые приложения. Хорошая база для 
                перехода к React и полноценному фронтенду.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🟨</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>10–17 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>60–90 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🌐</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Браузер, DOM</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Программирование на JavaScript" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>📝</span><div><h3>Синтаксис JS</h3><p>Переменные, функции, объекты</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📄</span><div><h3>DOM</h3><p>Работа с элементами страницы</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🖱</span><div><h3>События</h3><p>Клики, формы, ввод</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>⚡</span><div><h3>Асинхронность</h3><p>fetch, API, промисы</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎮</span><div><h3>Игры в браузере</h3><p>Canvas, анимация</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📦</span><div><h3>Основы фреймворков</h3><p>Подготовка к React/Vue</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем JavaScript?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Язык веба — без JS нет интерактивных сайтов</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Фронтенд и бэкенд — Node.js</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Востребованность — каждый сайт использует JS</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Связь с веб-разработкой — естественный следующий шаг</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="programming-javascript" ageRange="10-17" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="programming-javascript" ageRange="10-17" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Программирование на JavaScript" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgrammingJavascript;
