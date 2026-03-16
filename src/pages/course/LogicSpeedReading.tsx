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
import logicSpeedReadingImg from '@/assets/directions/logic-speed-reading.webp';
import styles from './CoursePage.module.css';

const LogicSpeedReading = () => {
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
            <h1 className={styles.pageTitle}>Логика и скорочтение</h1>
            <p className={styles.pageDescription}>Развитие логики, техника быстрого чтения — 5–10 лет</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={logicSpeedReadingImg} alt="Логика и скорочтение в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Курс «Логика и скорочтение» помогает детям не только быстро читать, но и понимать текст, выделять 
                главное и мыслить структурированно. Используем тренажёры для расширения поля зрения, таблицы 
                Шульте, методики запоминания.
              </p>
              <p className={styles.aboutText}>
                Логические задачи развивают умение анализировать, искать закономерности и принимать решения. 
                Занятия подходят младшим школьникам и тем, кто готовится к школе. После курса дети читают 
                быстрее и лучше усваивают учебный материал.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="logic-speed-reading" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>📖</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>5–10 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>45–60 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🧠</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Тренажёры + логика</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Логика и скорочтение" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>👁</span><div><h3>Техника чтения</h3><p>Расширение поля зрения, устранение регрессий, работа с ритмом</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📊</span><div><h3>Таблицы Шульте</h3><p>Тренажёр для периферийного зрения и концентрации</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🧩</span><div><h3>Логические задачи</h3><p>Анализ, сравнение, поиск закономерностей</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📝</span><div><h3>Понимание текста</h3><p>Выделение главного, пересказ, ответы на вопросы</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>💾</span><div><h3>Память и внимание</h3><p>Упражнения на запоминание и концентрацию</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎮</span><div><h3>Игровые тренажёры</h3><p>Интерактивные задания для закрепления навыков</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем скорочтение школьнику?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Меньше времени на домашние задания — больше на отдых</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Лучшее понимание текста — выше успеваемость</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Развитие логики помогает по математике и другим предметам</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Навык на всю жизнь — пригодится в учёбе и работе</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="logic-speed-reading" ageRange="5-10" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="logic-speed-reading" ageRange="5-10" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Логика и скорочтение" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogicSpeedReading;
