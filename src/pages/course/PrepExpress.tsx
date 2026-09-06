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
import prepExpressImg from '@/assets/directions/prep-express.webp';
import styles from './CoursePage.module.css';

const PrepExpress = () => {
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
              <CourseBreadcrumb to="/age/5-10" label="К программам 5-10 лет" />
            </div>
            <h1 className={styles.pageTitle}>Экспресс-курс подготовки к школе</h1>
            <p className={styles.pageDescription}>Интенсивная подготовка за 6 месяцев — чтение, счёт, письмо, 5–7 лет</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={prepExpressImg} alt="Экспресс-курс подготовки к школе в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Экспресс-курс подготовки к школе — компактная программа на 6 месяцев для тех, кто хочет быстро 
                наверстать базу перед первым классом. За полгода ребёнок осваивает чтение, счёт и основы письма 
                в более интенсивном темпе, без потери качества занятий.
              </p>
              <p className={styles.aboutText}>
                Формат подходит, если до школы осталось меньше года или нужно сфокусироваться на ключевых навыках. 
                Педагоги уделяют внимание и знаниям, и психологической готовности: усидчивости, вниманию и умению 
                работать в группе.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="prep-express" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>📚</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>5–7 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>📅</span><div><span className={styles.badgeLabel}>Длительность</span><span className={styles.badgeValue}>6 месяцев</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>60 мин</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Экспресс-курс подготовки к школе" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>📖</span><div><h3>Обучение чтению</h3><p>Буквы, слоги, слова — быстрый путь к осознанному чтению</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔢</span><div><h3>Математика</h3><p>Счёт, состав числа, простые задачи — акцент на школьный минимум</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>✏️</span><div><h3>Подготовка к письму</h3><p>Захват карандаша, элементы букв, письмо в клетку и линейку</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>💬</span><div><h3>Развитие речи</h3><p>Связная речь, пересказ, ответы на вопросы</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🧠</span><div><h3>Внимание и память</h3><p>Концентрация и учебные навыки в интенсивном формате</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>⚡</span><div><h3>Интенсивный темп</h3><p>Сжатая программа без «воды» — максимум пользы за 6 месяцев</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Кому подходит экспресс-курс?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>До школы осталось меньше года</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Нужно быстро подтянуть чтение и счёт</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Ребёнок готов к более плотному темпу занятий</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Хотите сфокусироваться на ключевых навыках первого класса</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="prep-express" ageRange="5-10" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="prep-express" ageRange="5-10" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Экспресс-курс подготовки к школе" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrepExpress;
