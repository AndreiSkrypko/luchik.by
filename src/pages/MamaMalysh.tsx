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
import mamaMalyshImg from '@/assets/directions/mama-malysh.webp';
import styles from './MamaMalysh.module.css';

const MamaMalysh = () => {
  const navigate = useNavigate();
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleContacts = () => setIsContactsOpen(!isContactsOpen);
  const closeContacts = () => setIsContactsOpen(false);
  const handleFormSuccess = () => {
    setIsFormOpen(false);
    navigate('/thank-you');
  };

  return (
    <div className={styles.mamaMalyshPage}>
      <Header onContactsClick={toggleContacts} />
      <main>
        <div className={styles.mamaMalyshMain}>
          <div className={styles.titleSection}>
            <div className={styles.breadcrumbWrapper}>
              <CourseBreadcrumb to="/age/1-5" label="К программам 1-5 лет" />
            </div>
            <h1 className={styles.pageTitle}>Клуб «Мама и малыш»</h1>
            <p className={styles.pageDescription}>Мама и малыш 1,5–3 лет — развитие через игру</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={mamaMalyshImg} alt="Клуб Мама и малыш в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Клуб «Мама и малыш» создан для родителей и детей 1,5–3 лет. Это идеальный возраст, 
                когда ребёнок активно познаёт мир, учится общаться и нуждается в поддержке самого 
                близкого человека.
              </p>
              <p className={styles.aboutText}>
                На занятиях вы находитесь рядом с малышом — вместе играете, лепите, рисуете, поёте 
                и танцуете. Педагог подбирает задания с учётом возраста каждой группы, а вы получаете 
                идеи, которые легко повторить дома. Такой формат помогает малышу чувствовать себя 
                в безопасности, а вам — лучше понимать, как поддерживать его развитие в повседневной жизни.
              </p>
              <button
                type="button"
                className={styles.mobileEnrollBtn}
                onClick={() => setIsFormOpen(true)}
                aria-label="Записаться"
              >
                Записаться
              </button>
              <CoursePriceGallery courseId="mama-malysh" />
              <div className={styles.badges}>
                <div className={styles.badge}>
                  <span className={styles.badgeIcon}>👶</span>
                  <div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>1,5–3 года</span></div>
                </div>
                <div className={styles.badge}>
                  <span className={styles.badgeIcon}>⏱</span>
                  <div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>60 мин</span></div>
                </div>
                <div className={styles.badge}>
                  <span className={styles.badgeIcon}>👩‍👧</span>
                  <div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Мама + малыш</span></div>
                </div>
              </div>
            </div>

            <div className={styles.rightColumn} id="enrollment-form">
              <h2 className={styles.formTitle}>Записаться на занятие</h2>
              <p className={styles.formSubtitle}>
                Оставьте заявку — мы перезвоним и подберём удобное время
              </p>
              <EnrollmentForm 
                onSuccess={handleFormSuccess} 
                courseName="Клуб «Мама и малыш»" 
              />
            </div>
          </div>

          <section className={styles.programSection}>
            <h2 className={styles.sectionHeading}>Что включает программа</h2>
            <div className={styles.programGrid}>
              <div className={styles.programItem}>
                <span className={styles.programEmoji}>👐</span>
                <div>
                  <h3>Мелкая моторика</h3>
                  <p>Пальчиковые игры, лепка, рисование ладошками — развитие рук и подготовка к письму</p>
                </div>
              </div>
              <div className={styles.programItem}>
                <span className={styles.programEmoji}>💬</span>
                <div>
                  <h3>Речь и общение</h3>
                  <p>Стишки, потешки, песенки — стимулируем говорение и понимание речи</p>
                </div>
              </div>
              <div className={styles.programItem}>
                <span className={styles.programEmoji}>🎵</span>
                <div>
                  <h3>Музыка и движение</h3>
                  <p>Танцы, хороводы, музыкальные инструменты — координация и чувство ритма</p>
                </div>
              </div>
              <div className={styles.programItem}>
                <span className={styles.programEmoji}>🌈</span>
                <div>
                  <h3>Сенсорика и творчество</h3>
                  <p>Знакомство с цветами, формами, текстурами через игру и поделки</p>
                </div>
              </div>
              <div className={styles.programItem}>
                <span className={styles.programEmoji}>💝</span>
                <div>
                  <h3>Связь мама — малыш</h3>
                  <p>Совместное время укрепляет доверие и создаёт тёплую атмосферу</p>
                </div>
              </div>
              <div className={styles.programItem}>
                <span className={styles.programEmoji}>👥</span>
                <div>
                  <h3>Первые друзья</h3>
                  <p>Мягкая адаптация к группе — ребёнок учится играть рядом с другими</p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Почему важно начинать с мамой?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}>
                <span className={styles.whyCheck}>✓</span>
                <p>Малыш чувствует себя в безопасности и охотнее участвует в играх</p>
              </div>
              <div className={styles.whyItem}>
                <span className={styles.whyCheck}>✓</span>
                <p>Вы получаете идеи для занятий дома — повторяйте игры и забавы</p>
              </div>
              <div className={styles.whyItem}>
                <span className={styles.whyCheck}>✓</span>
                <p>Педагог подскажет, как поддерживать развитие ребёнка в быту</p>
              </div>
              <div className={styles.whyItem}>
                <span className={styles.whyCheck}>✓</span>
                <p>Постепенный переход к самостоятельным занятиям — без стресса</p>
              </div>
            </div>
          </section>

          <RelatedCourses currentCourseId="mama-malysh" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="mama-malysh" />
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
            <DialogDescription className={styles.formDialogDesc}>
              Оставьте заявку — мы перезвоним и подберём удобное время
            </DialogDescription>
          </DialogHeader>
          <EnrollmentForm
            onSuccess={handleFormSuccess}
            courseName="Клуб «Мама и малыш»"
            compact
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MamaMalysh;
