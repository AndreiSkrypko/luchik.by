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
import artStudioImg from '@/assets/directions/art-studio.webp';
import styles from './CoursePage.module.css';

const ArtStudio = () => {
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
            <h1 className={styles.pageTitle}>Арт-студия</h1>
            <p className={styles.pageDescription}>Рисование, лепка, аппликации — творчество для 3–5 лет</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={artStudioImg} alt="Арт-студия в Лиде, детский центр Лучик" loading="eager" />
              </div>
              <p className={styles.aboutText}>
                Арт-студия — пространство, где ребёнок раскрывает творческий потенциал через рисование, лепку и 
                аппликации. В возрасте 3–5 лет дети охотно экспериментируют с материалами, учатся видеть красоту 
                и выражать эмоции через искусство.
              </p>
              <p className={styles.aboutText}>
                Мы используем разные техники: акварель, гуашь, пастель, пластилин, аппликации из бумаги и природных 
                материалов. Занятия развивают мелкую моторику, цветовосприятие, фантазию и умение доводить работу 
                до конца. Каждое занятие — новая интересная тема.
              </p>
              <button type="button" className={styles.mobileEnrollBtn} onClick={() => setIsFormOpen(true)} aria-label="Записаться">Записаться</button>
              <div className={styles.badges}>
                <div className={styles.badge}><span className={styles.badgeIcon}>🎨</span><div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>3–5 лет</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>⏱</span><div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>45–60 мин</span></div></div>
                <div className={styles.badge}><span className={styles.badgeIcon}>🖌</span><div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Творчество</span></div></div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>Оставьте заявку — мы перезвоним и подберём удобное время</p>
              <EnrollmentForm onSuccess={handleFormSuccess} courseName="Арт-студия" />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}><span className={styles.programEmoji}>🖌</span><div><h3>Рисование</h3><p>Акварель, гуашь, пастель — разные техники и темы</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🧱</span><div><h3>Лепка</h3><p>Пластилин, глина — развитие моторики и объёмного мышления</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>✂️</span><div><h3>Аппликации</h3><p>Бумага, ткань, природные материалы — композиция и аккуратность</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🌈</span><div><h3>Цвет и композиция</h3><p>Знакомство с цветовым кругом, сочетание цветов, построение кадра</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>✨</span><div><h3>Творческая свобода</h3><p>Свободные темы и эксперименты с материалами</p></div></div>
              <div className={styles.programItem}><span className={styles.programEmoji}>🎁</span><div><h3>Подарки своими руками</h3><p>Открытки, поделки к праздникам — радость творчества и дарения</p></div></div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем ребёнку творчество?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Развитие мелкой моторики — основа для письма и бытовых навыков</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Воображение и креативное мышление — навыки на всю жизнь</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Эмоциональная разгрузка — искусство помогает выразить чувства</p></div>
              <div className={styles.whyItem}><span className={styles.whyCheck}>✓</span><p>Уверенность — ребёнок гордится своими работами</p></div>
            </div>
          </section>

          <RelatedCourses currentCourseId="art-studio" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="art-studio" />
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
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="Арт-студия" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtStudio;
