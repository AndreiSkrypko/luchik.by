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
import mentalArithmeticImg from '@/assets/directions/mental-arithmetic.webp';
import styles from './CoursePage.module.css';

const MentalArithmetic = () => {
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
              <button className={styles.backButton} onClick={() => navigate('/age/5-10')} aria-label="К программам 5-10 лет">← К программам 5-10 лет</button>
            </div>
            <h1 className={styles.pageTitle}>Ментальная арифметика</h1>
            <p className={styles.pageDescription}>Счёт в уме, память и концентрация — офлайн и тренажёры</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={mentalArithmeticImg} alt="Ментальная арифметика в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Ментальная арифметика — методика развития умственного счёта с помощью абакуса (счётов). 
                Дети учатся представлять счёты в уме и выполнять операции: сложение, вычитание, умножение, 
                деление — без калькулятора и бумаги.
              </p>
              <p className={styles.aboutText}>
                Курс развивает оба полушария мозга: левое — логику и числа, правое — образы и воображение. 
                Улучшается память, внимание, скорость мышления. Мы сочетаем офлайн-занятия с онлайн-тренажёрами 
                на сайте — дети могут тренироваться дома.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="mental-arithmetic" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🧮</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>5–10 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>45–60 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>📱</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Офлайн + тренажёры</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Ментальная арифметика" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>🧮</span><div><h3>Абакус</h3><p>Работа на счётах, основы ментального счёта</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>➕</span><div><h3>Сложение и вычитание</h3><p>Однозначные и многозначные числа</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>✖️</span><div><h3>Умножение и деление</h3><p>Устный счёт больших чисел</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>💾</span><div><h3>Память</h3><p>Упражнения на запоминание</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎮</span><div><h3>Онлайн-тренажёры</h3><p>Практика дома, флешкарты, игры</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📈</span><div><h3>Скорость и точность</h3><p>Таймер, соревнования, прогресс</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Чем полезна ментальная арифметика?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Развитие обоих полушарий мозга</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Память и концентрация — для учёбы</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Уверенность в математике</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Тренажёры — практика в любое время</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="mental-arithmetic" ageRange="5-10" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="mental-arithmetic" ageRange="5-10" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Ментальная арифметика" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentalArithmetic;
