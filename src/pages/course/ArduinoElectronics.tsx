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
import arduinoElectronicsImg from '@/assets/directions/arduino-electronics.webp';
import styles from './CoursePage.module.css';

const ArduinoElectronics = () => {
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
            <h1 className={styles.pageTitle}>Электроника и Arduino</h1>
            <p className={styles.pageDescription}>Основы электроники, микроконтроллеры, умные устройства</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={arduinoElectronicsImg} alt="Arduino и электроника в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Arduino — платформа для создания электронных проектов. Подростки учатся собирать схемы, 
                подключать датчики и светодиоды, писать код на C/C++. Создают термометры, метеостанции, 
                умные лампы, роботов на колёсах и другие устройства.
              </p>
              <p className={styles.aboutText}>
                Курс даёт основы электроники: ток, напряжение, резисторы, транзисторы. Ребята читают 
                схемы, паяют и программируют. Идеально для тех, кто хочет понимать, как устроены 
                гаджеты, и создавать свои.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <CoursePriceGallery courseId="arduino-electronics" />
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>⚡</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>10–17 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>60–90 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🔌</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Arduino, пайка</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Электроника и Arduino" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>⚡</span><div><h3>Основы электроники</h3><p>Ток, напряжение, закон Ома</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>💻</span><div><h3>Arduino</h3><p>Программирование на C, пины, Serial</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📡</span><div><h3>Датчики</h3><p>Температура, свет, движение</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🔩</span><div><h3>Пайка</h3><p>Монтажная плата, провода</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🏠</span><div><h3>Проекты</h3><p>Умный дом, метеостанция</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>📐</span><div><h3>Схемотехника</h3><p>Чтение и рисование схем</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем электроника подростку?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Понимание мира — как работает техника</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Программирование + физика в одном</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Свои проекты — от идеи до устройства</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Подготовка к инженерии и IT</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="arduino-electronics" ageRange="10-17" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="arduino-electronics" ageRange="10-17" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Электроника и Arduino" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArduinoElectronics;
