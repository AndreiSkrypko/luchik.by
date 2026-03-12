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
import programmingScratchImg from '@/assets/directions/programming-scratch.webp';
import styles from './CoursePage.module.css';

const ProgrammingScratch = () => {
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
            <button className={styles.backButton} onClick={() => navigate('/age/5-10')} aria-label="К программам 5-10 лет">← К программам 5-10 лет</button>
            <h1 className={styles.pageTitle}>Программирование Scratch</h1>
            <p className={styles.pageDescription}>Визуальное программирование — игры и анимации для начинающих</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={programmingScratchImg} alt="Программирование Scratch в Лиде, детский центр Лучик" loading="eager" />
              </div>
              <p className={styles.aboutText}>
                Scratch — среда визуального программирования от MIT. Дети собирают программы из блоков, 
                как конструктор Lego, без набора кода с клавиатуры. Идеально для первого знакомства с 
                программированием: логика, алгоритмы и творчество в одном.
              </p>
              <p className={styles.aboutText}>
                На курсе ребята создают анимации, простые игры, интерактивные истории. Учатся использовать 
                переменные, циклы, условия. К концу курса могут самостоятельно придумать и реализовать 
                собственный проект. Scratch — отличная база для перехода к Python и другим языкам.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🐱</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>5–10 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>45–60 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🖱</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Блоки, проекты</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Программирование Scratch" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎨</span><div><h3>Анимации</h3><p>Движение спрайтов, смена сцен, эффекты</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎮</span><div><h3>Простые игры</h3><p>Лабиринты, квесты, аркады</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔄</span><div><h3>Циклы и условия</h3><p>Повторение, выбор, события</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📊</span><div><h3>Переменные</h3><p>Счётчики, очки, данные</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>✏️</span><div><h3>Свой проект</h3><p>От идеи до готовой игры</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔄</span><div><h3>Подготовка к Python</h3><p>Логика и алгоритмы для следующих курсов</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем Scratch?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Без синтаксиса — фокус на логике и творчестве</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Быстрый результат — первая игра за занятие</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Современный навык — программирование с детства</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Трамплин — легко перейти к Python, Roblox и др.</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="programming-scratch" ageRange="5-10" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="programming-scratch" ageRange="5-10" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Программирование Scratch" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgrammingScratch;
