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
import complexImg from '@/assets/directions/complex.webp';
import styles from './CoursePage.module.css';

const Complex = () => {
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
            <h1 className={styles.pageTitle}>Комплексные развивающие занятия</h1>
            <p className={styles.pageDescription}>Речь, моторика, творчество — комплексный курс для 3–4 лет</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={complexImg} alt="Комплексные занятия в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Комплексные развивающие занятия — это гармоничное сочетание разных направлений развития в одном курсе. 
                В возрасте 3–4 лет ребёнок готов к более структурированным заданиям и активно расширяет словарный запас, 
                совершенствует моторику и логическое мышление.
              </p>
              <p className={styles.aboutText}>
                На каждом занятии мы чередуем блоки: развитие речи, творчество, логика, сенсорика. Такой подход 
                поддерживает интерес ребёнка и даёт всестороннюю подготовку к детскому саду и школе. Педагог 
                подбирает задания с учётом возраста и индивидуальных особенностей группы.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="complex" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>👧</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>3–4 года</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>60 / 90 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>📚</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Комплекс</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Комплексные развивающие занятия" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>💬</span><div><h3>Развитие речи</h3><p>Артикуляционная гимнастика, расширение словаря, правильное произношение звуков</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>✏️</span><div><h3>Мелкая моторика</h3><p>Лепка, аппликации, работа с карандашом — подготовка руки к письму</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🧩</span><div><h3>Логика и мышление</h3><p>Простые задачи, сравнения, последовательности — основы математического мышления</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎨</span><div><h3>Творчество</h3><p>Рисование, лепка, аппликации — развитие воображения и креативности</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🌈</span><div><h3>Сенсорика</h3><p>Цвета, формы, размеры — познание мира через органы чувств</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>👥</span><div><h3>Социализация</h3><p>Игры в группе, правила общения, умение договариваться</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Почему комплексные занятия?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Один курс — несколько направлений развития, экономия времени</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Чередование активностей сохраняет интерес и концентрацию</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Гармоничное развитие без перегрузки в одном направлении</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Подготовка к детскому саду и школе в игровом формате</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="complex" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="complex" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Комплексные развивающие занятия" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Complex;
