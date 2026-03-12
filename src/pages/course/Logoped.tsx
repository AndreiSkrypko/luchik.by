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
import logopedImg from '@/assets/directions/logoped.png';
import styles from './CoursePage.module.css';

const Logoped = () => {
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
            <h1 className={styles.pageTitle}>Логопед</h1>
            <p className={styles.pageDescription}>Коррекция речи и постановка звуков — с 3 лет</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={logopedImg} alt="Логопед" loading="eager" />
              </div>
              <p className={styles.aboutText}>
                Занятия с логопедом помогают ребёнку правильно произносить звуки, развивать связную речь и 
                преодолевать речевые трудности. С трёх лет уже можно оценить, нужна ли логопедическая поддержка — 
                специалист проводит диагностику и составляет индивидуальный план занятий.
              </p>
              <p className={styles.aboutText}>
                Мы работаем над постановкой звуков, развитием фонематического слуха, обогащением словарного 
                запаса и связной речи. Занятия проходят в игровой форме — ребёнок не чувствует давления, а 
                родители получают рекомендации для занятий дома.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>👶</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>С 3 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>30–45 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>👤</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Индивидуально</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Логопед" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔍</span><div><h3>Диагностика речи</h3><p>Оценка звукопроизношения, словаря, связной речи и рекомендации</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>👄</span><div><h3>Постановка звуков</h3><p>Артикуляционная гимнастика и автоматизация правильного произношения</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>👂</span><div><h3>Фонематический слух</h3><p>Различение звуков речи — основа грамотного чтения и письма</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📖</span><div><h3>Развитие словаря</h3><p>Расширение лексики, умение строить предложения и рассказывать</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎭</span><div><h3>Связная речь</h3><p>Пересказ, описание картинок, умение вести диалог</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🏠</span><div><h3>Рекомендации родителям</h3><p>Упражнения и игры для закрепления результата дома</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Когда стоит обратиться к логопеду?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Ребёнок неправильно произносит звуки или «глотает» их</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Маленький словарный запас или затруднения с построением фраз</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Заикание, темповые нарушения, неразборчивая речь</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Профилактика — чем раньше начать, тем проще скорректировать</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="logoped" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Индивидуальный подход</span>
          </section>

          <CourseNav currentCourseId="logoped" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Логопед" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Logoped;
