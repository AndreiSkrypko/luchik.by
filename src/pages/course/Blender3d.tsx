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
import CourseBreadcrumb from '@/components/CourseBreadcrumb';
import blender3dImg from '@/assets/directions/3d-blender.webp';
import styles from './CoursePage.module.css';

const Blender3d = () => {
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
              <CourseBreadcrumb to="/age/10-17" label="К программам 10-17 лет" />
            </div>
            <h1 className={styles.pageTitle}>3D-моделирование в Blender</h1>
            <p className={styles.pageDescription}>Модели, анимация, рендеринг — профессиональный 3D</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={blender3dImg} alt="Blender 3D в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Blender — бесплатный профессиональный редактор 3D. Подростки учатся создавать модели, 
                настраивать материалы, освещение и рендерить изображения. Blender используется в кино, 
                играх, рекламе и архитектурной визуализации.
              </p>
              <p className={styles.aboutText}>
                Курс охватывает полигональное моделирование, скульптинг, текстурирование и анимацию. 
                Ребята создают персонажей, сцены, короткие анимации. Понимают пайплайн 3D-художника 
                и могут развиваться в геймдеве, VFX или архитектуре.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="3d-blender" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🟠</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>10–17 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>75 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🎬</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Blender 3D</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="3D-моделирование в Blender" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>📐</span><div><h3>Моделирование</h3><p>Полигоны, модификаторы, скульпт</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎨</span><div><h3>Материалы</h3><p>Shading, текстуры, UV</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>💡</span><div><h3>Освещение</h3><p>Свет, тени, HDRI</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🖼</span><div><h3>Рендеринг</h3><p>Cycles, Eevee</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎞</span><div><h3>Анимация</h3><p>Ключевые кадры, риг</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎮</span><div><h3>Экспорт</h3><p>Для игр и VR</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем Blender?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Бесплатно и мощно — индустриальный стандарт</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Кино, игры, архитектура — широкое применение</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Подготовка к геймдеву и VFX</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Связь с VR и геймдизайном</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="3d-blender" ageRange="10-17" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="3d-blender" ageRange="10-17" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="3D-моделирование в Blender" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blender3d;
