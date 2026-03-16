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
import prepSchoolImg from '@/assets/directions/prep-school.webp';
import styles from './CoursePage.module.css';

const PrepSchool = () => {
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
              <button className={styles.backButton} onClick={() => navigate('/age/1-5')} aria-label="К программам 1-5 лет">← К программам 1-5 лет</button>
            </div>
            <h1 className={styles.pageTitle}>Подготовка к школе</h1>
            <p className={styles.pageDescription}>Чтение, счёт, письмо — готовность к школе, 5–7 лет</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={prepSchoolImg} alt="Подготовка к школе в Лиде, детский центр Лучик" loading="eager" />
              </div>
              <p className={styles.aboutText}>
                Подготовка к школе — интенсивный курс для будущих первоклассников. За год до школы мы даём ребёнку 
                все необходимые навыки: чтение, счёт, основы письма, умение работать в учебном режиме. Курс 
                подходит и тем, кто уже ходил на двухгодичную подготовку, и тем, кто начинает с нуля.
              </p>
              <p className={styles.aboutText}>
                Занятия строятся с учётом требований современной школы. Педагоги используют проверенные методики 
                и уделяют внимание не только знаниям, но и психологической готовности: умению слушать, следовать 
                инструкциям, справляться с нагрузкой и общаться с одноклассниками.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>📚</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>5–7 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>45–60 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🎯</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Чтение, счёт, письмо</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Подготовка к школе" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>📖</span><div><h3>Обучение чтению</h3><p>От букв к слогам, от слогов к словам — осознанное чтение</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔢</span><div><h3>Математика</h3><p>Счёт до 20, состав числа, простые задачи, геометрические фигуры</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>✏️</span><div><h3>Подготовка к письму</h3><p>Правильный захват карандаша, элементы букв, письмо в клетку и линейку</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>💬</span><div><h3>Развитие речи</h3><p>Связная речь, пересказ, ответы на вопросы</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🧠</span><div><h3>Внимание и память</h3><p>Учебные навыки — концентрация, запоминание, следование правилам</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📋</span><div><h3>Психологическая готовность</h3><p>Усидчивость, мотивация, умение работать в группе</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Почему важна подготовка?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Уверенный старт — ребёнок не отстаёт с первого дня</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Снижение стресса — знакомый формат облегчает адаптацию</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Интерес к учёбе — занятия в игровой форме формируют позитивное отношение</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Прочная база — навыки закрепляются и переносятся в школу</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="prep-school" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="prep-school" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Подготовка к школе" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrepSchool;
