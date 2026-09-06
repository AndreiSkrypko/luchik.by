import { useState, useEffect } from 'react';
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
import legoLogopedImg from '@/assets/directions/lego-logoped.webp';
import styles from './CoursePage.module.css';

const LegoLogoped = () => {
    const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  const toggleContacts = () => setIsContactsOpen(!isContactsOpen);
  const closeContacts = () => setIsContactsOpen(false);
  const handleFormSuccess = () => { setIsFormOpen(false); };

  return (
    <div className={styles.coursePage}>
      <Header onContactsClick={toggleContacts} />
      <main>
        <div className={styles.courseMain}>
          <div className={styles.titleSection}>
            <div className={styles.breadcrumbWrapper}>
              <CourseBreadcrumb to="/age/1-5" label="К программам 1-5 лет" />
            </div>
            <h1 className={styles.pageTitle}>Лего с логопедом</h1>
            <p className={styles.pageDescription}>Lego и логопедия вместе — 3–5 лет</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={legoLogopedImg} alt="Лего с логопедом в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Лего с логопедом — уникальный формат, объединяющий конструирование и развитие речи. Дети с 
                удовольствием собирают из Lego Duplo, а логопед параллельно проводит артикуляционные упражнения, 
                работает над звуками и обогащением словаря в игровом контексте.
              </p>
              <p className={styles.aboutText}>
                Такой подход снижает сопротивление — ребёнок воспринимает занятия как игру, а не терапию. 
                Конструирование развивает мелкую моторику, что напрямую связано с речевым центром мозга. 
                Идеально подходит для детей, которых сложно усадить за классические логопедические задания.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="lego-logoped" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>👶</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>3–5 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>60 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🧱</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Lego + речь</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Лего с логопедом" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>🧱</span><div><h3>Конструирование Lego</h3><p>Сборка по образцу и свободное строительство — развитие моторики и логики</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>👄</span><div><h3>Артикуляционная гимнастика</h3><p>Упражнения для губ, языка, щёк в игровой форме</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔊</span><div><h3>Постановка звуков</h3><p>Автоматизация правильного произношения в речи</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>💬</span><div><h3>Развитие словаря</h3><p>Новые слова через темы построек: транспорт, дом, природа</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📖</span><div><h3>Связная речь</h3><p>Описание постройки, рассказ о том, что получилось</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>👂</span><div><h3>Фонематический слух</h3><p>Игры на различение звуков в контексте Lego-задач</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Почему Lego и логопед вместе?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Мелкая моторика и речь связаны — развитие одной помогает другой</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Ребёнок не скучает — Lego привлекает, речь развивается естественно</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Для тех, кому сложно усидеть на «классических» логопедических занятиях</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Комплексный подход: моторика, логика, речь в одном курсе</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="lego-logoped" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="lego-logoped" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Лего с логопедом" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LegoLogoped;
