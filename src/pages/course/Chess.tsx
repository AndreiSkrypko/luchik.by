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
import chessImg from '@/assets/directions/chess.webp';
import styles from './CoursePage.module.css';

const Chess = () => {
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
            <h1 className={styles.pageTitle}>Шахматы</h1>
            <p className={styles.pageDescription}>Стратегия, память, концентрация — развитие через игру</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={chessImg} alt="Шахматы в Лиде, детский центр Лучик" loading="eager" />
              </div>
              <p className={styles.aboutText}>
                Шахматы — это спорт, игра и мощный тренажёр для мозга. Курс развивает логическое мышление, 
                умение планировать, память и концентрацию. Дети учатся думать на несколько ходов вперёд, 
                анализировать позиции и принимать решения.
              </p>
              <p className={styles.aboutText}>
                Занятия проходят в группах: теория сочетается с практическими партиями и разбором позиций. 
                Педагог объясняет базовые дебюты, типичные комбинации и эндшпили. Даже дети без опыта 
                быстро осваивают правила и начинают играть осознанно.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>♟</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>5–10 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>45–60 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🏆</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Теория + партии</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Шахматы" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>📐</span><div><h3>Правила и основы</h3><p>Ходы фигур, шах, мат, пат — от нуля до уверенной игры</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎯</span><div><h3>Дебюты</h3><p>Простые дебютные схемы и идеи</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>⚡</span><div><h3>Тактика</h3><p>Комбинации, двойной удар, вилка</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>👑</span><div><h3>Эндшпиль</h3><p>Проигранные и выигранные окончания</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🧩</span><div><h3>Решение задач</h3><p>Игры на разбор позиций и поиск лучшего хода</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>⚔️</span><div><h3>Турнирная практика</h3><p>Партии с соперниками, учёт времени</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Чем полезны шахматы?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Логика и стратегия — переносятся на учёбу и жизнь</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Память и внимание — запоминание позиций и вариантов</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Усидчивость — умение думать и не сдаваться</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Дисциплина и ответственность — за каждый ход</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="chess" ageRange="5-10" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="chess" ageRange="5-10" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Шахматы" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chess;
