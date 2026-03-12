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
import prep2yearImg from '@/assets/directions/prep-2year.png';
import styles from './CoursePage.module.css';

const Prep2year = () => {
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
            <button className={styles.backButton} onClick={() => navigate('/age/1-5')} aria-label="К программам 1-5 лет">← К программам 1-5 лет</button>
            <h1 className={styles.pageTitle}>Двухгодовой курс подготовки к школе</h1>
            <p className={styles.pageDescription}>Мягкая подготовка за 2 года до школы — 4–5 лет</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={prep2yearImg} alt="Подготовка к школе" loading="eager" />
              </div>
              <p className={styles.aboutText}>
                Двухгодовой курс подготовки к школе — это мягкое и последовательное введение ребёнка в учебный 
                формат. За два года до первого класса дети осваивают основы чтения, счёта и письма без давления, 
                в комфортном темпе.
              </p>
              <p className={styles.aboutText}>
                Первый год (4–5 лет) фокусируется на развитии внимания, памяти, логики и готовности к обучению. 
                Второй год (5–6 лет) — непосредственно на навыках чтения, счёта и подготовке руки к письму. Такой 
                подход снижает стресс и даёт прочную базу для успешного старта в школе.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>📅</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>4–5 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Курс</span><span className={styles.badgeValue}>2 года</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>📚</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Постепенно</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Двухгодовой курс подготовки к школе" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>📖</span><div><h3>Подготовка к чтению</h3><p>Звуковой анализ, знакомство с буквами, слоги — без спешки</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔢</span><div><h3>Математика</h3><p>Счёт, состав числа, простые задачи — основы математического мышления</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>✏️</span><div><h3>Подготовка руки</h3><p>Графические задания, обводка, штриховка — к письму</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🧠</span><div><h3>Внимание и память</h3><p>Игры на концентрацию, запоминание, следование инструкциям</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>💬</span><div><h3>Речь и общение</h3><p>Расширение словаря, умение отвечать на вопросы, рассказывать</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📋</span><div><h3>Учебные навыки</h3><p>Усидчивость, работа в тетради, умение слушать педагога</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Почему два года?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Меньше стресса — материал усваивается в комфортном темпе</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Прочная база — времени хватает на закрепление навыков</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Учёт возрастных особенностей — каждый год свои задачи</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Уверенный старт в первом классе — ребёнок готов к школе</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="prep-2year" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="prep-2year" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Двухгодовой курс подготовки к школе" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Prep2year;
