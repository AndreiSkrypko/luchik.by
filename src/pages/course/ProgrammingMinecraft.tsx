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
import programmingMinecraftImg from '@/assets/directions/programming-minecraft.webp';
import styles from './CoursePage.module.css';

const ProgrammingMinecraft = () => {
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
            <h1 className={styles.pageTitle}>Программирование Minecraft</h1>
            <p className={styles.pageDescription}>Программирование в игровой среде — логика и креативность</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={programmingMinecraftImg} alt="Minecraft" loading="eager" />
              </div>
              <p className={styles.aboutText}>
                Minecraft Education Edition и MakeCode позволяют программировать внутри популярной игры. 
                Дети управляют персонажем с помощью кода: строят автоматические фермы, создают мини-игры 
                и решают логические задачи в знакомом мире кубиков.
              </p>
              <p className={styles.aboutText}>
                Курс сочетает увлечение Minecraft с обучением программированию. Дети пишут блоки кода, 
                видят результат в реальном времени и быстро понимают связь между командами и действиями. 
                Отличная мотивация для изучения алгоритмов и логики.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>⛏</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>5–10 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>45–60 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🎮</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Minecraft + код</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Программирование Minecraft" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>🖱</span><div><h3>MakeCode</h3><p>Блочное программирование в Minecraft</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🤖</span><div><h3>Автоматизация</h3><p>Скрипты для строительства и ферм</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔄</span><div><h3>Циклы и условия</h3><p>Повторение действий, выбор пути</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎯</span><div><h3>Мини-игры</h3><p>Создание своих игровых механик</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🧩</span><div><h3>Алгоритмы</h3><p>Последовательность, логика, отладка</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🚀</span><div><h3>Проекты</h3><p>Собственные миры и сценарии</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Почему Minecraft?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Знакомая среда — дети сразу включены</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Наглядный результат — код превращается в действие</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Творчество + логика в одном курсе</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Переход к Roblox и Python — следующая ступень</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="programming-minecraft" ageRange="5-10" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="programming-minecraft" ageRange="5-10" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Программирование Minecraft" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgrammingMinecraft;
