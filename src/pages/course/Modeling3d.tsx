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
import modeling3dImg from '@/assets/directions/3d-modeling.webp';
import styles from './CoursePage.module.css';

const Modeling3d = () => {
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
            <h1 className={styles.pageTitle}>3D-моделирование</h1>
            <p className={styles.pageDescription}>Создание 3D-моделей, дизайн и основы печати — 5–10 лет</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={modeling3dImg} alt="3D-моделирование в Лиде, детский центр Лучик" loading="eager" />
              </div>
              <p className={styles.aboutText}>
                3D-моделирование — создание объёмных объектов на компьютере. Дети работают в программах 
                Tinkercad, Sculptris или аналогах: рисуют фигуры, добавляют объём, комбинируют объекты. 
                Модели можно распечатать на 3D-принтере и держать в руках.
              </p>
              <p className={styles.aboutText}>
                Курс развивает пространственное мышление, чувство пропорций и основу цифрового дизайна. 
                Ребята создают брелоки, подставки, игрушки — всё, что захотят. Понимают, как устроена 
                3D-печать и где она применяется в жизни.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🧊</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>5–10 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>45–60 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🖨</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>3D, печать</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="3D-моделирование" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>📐</span><div><h3>Основы 3D</h3><p>Примитивы, объём, масштаб</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>✂️</span><div><h3>Редактирование</h3><p>Объединение, вычитание форм</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎨</span><div><h3>Дизайн</h3><p>Пропорции, симметрия, детали</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🖨</span><div><h3>3D-печать</h3><p>Подготовка к печати, материалы</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🏠</span><div><h3>Проекты</h3><p>Брелоки, подставки, игрушки</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🌐</span><div><h3>Связь с играми</h3><p>Модели для Roblox, Minecraft</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем 3D детям?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Пространственное мышление — видеть объект в объёме</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Творчество — от идеи до реального предмета</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Актуальный навык — 3D в играх, кино, медицине</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Связь с программированием и дизайном</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="3d-modeling" ageRange="5-10" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="3d-modeling" ageRange="5-10" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="3D-моделирование" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modeling3d;
