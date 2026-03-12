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
import legoMathImg from '@/assets/directions/lego-math.webp';
import styles from './CoursePage.module.css';

const LegoMath = () => {
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
            <h1 className={styles.pageTitle}>Лего-математика</h1>
            <p className={styles.pageDescription}>Математика через Lego — числа, логика, 5–7 лет</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={legoMathImg} alt="Лего-математика в Лиде, детский центр Лучик" loading="eager" />
              </div>
              <p className={styles.aboutText}>
                Лего-математика — курс, где дети изучают числа, формы, логику и простые математические операции 
                через конструирование. Lego становится инструментом познания: считаем детали, сравниваем высоту 
                башен, решаем задачи на сложение и вычитание с помощью кубиков.
              </p>
              <p className={styles.aboutText}>
                Такой подход делает математику наглядной и понятной. Ребёнок не просто запоминает цифры, а 
                чувствует количество, видит разницу между «больше» и «меньше», понимает состав числа. Курс 
                идеально дополняет подготовку к школе и развивает логическое мышление.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🔢</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>5–7 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>45–60 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🧱</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Lego + математика</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Лего-математика" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔢</span><div><h3>Счёт и числа</h3><p>Количество, нумерация, сравнение — через постройки из Lego</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>➕</span><div><h3>Сложение и вычитание</h3><p>Наглядное представление операций с помощью кубиков</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📐</span><div><h3>Геометрические фигуры</h3><p>Квадрат, прямоугольник, симметрия — в конструкциях</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📏</span><div><h3>Измерения</h3><p>Длина, высота, сравнение «больше-меньше»</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🧩</span><div><h3>Логика и последовательности</h3><p>Паттерны, закономерности, задачи на поиск решения</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎲</span><div><h3>Состав числа</h3><p>Разложение на части, подготовка к таблице сложения</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Почему Lego для математики?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Наглядность — абстрактные понятия становятся осязаемыми</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Интерес — дети охотнее считают и решают в игре</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Понимание — не заучивание, а осознание математических связей</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Моторика + логика — комплексное развитие</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="lego-math" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="lego-math" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Лего-математика" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LegoMath;
