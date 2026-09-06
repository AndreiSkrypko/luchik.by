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
import legoRazvivaykaImg from '@/assets/directions/lego-razvivayka.webp';
import styles from './LegoRazvivayka.module.css';

const LegoRazvivayka = () => {
    const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleContacts = () => setIsContactsOpen(!isContactsOpen);
  const closeContacts = () => setIsContactsOpen(false);
  const handleFormSuccess = () => {
    setIsFormOpen(false);
  };

  return (
    <div className={styles.legoRazvivaykaPage}>
      <Header onContactsClick={toggleContacts} />
      <main>
        <div className={styles.legoRazvivaykaMain}>
          <div className={styles.titleSection}>
            <div className={styles.breadcrumbWrapper}>
              <CourseBreadcrumb to="/age/1-5" label="К программам 1-5 лет" />
            </div>
            <h1 className={styles.pageTitle}>Лего-развивайка</h1>
            <p className={styles.pageDescription}>Lego Duplo для 2,5–3 лет — моторика, логика, творчество</p>
          </div>

          <div className={styles.topGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.heroImage}>
                <img src={legoRazvivaykaImg} alt="Лего-развивайка в Лиде, детский центр Лучик" loading="lazy" decoding="async" />
              </div>
              <p className={styles.aboutText}>
                Лего-развивайка — программа для детей 2,5–3 лет, где конструирование становится инструментом 
                развития. В этом возрасте ребёнок готов соединять детали, фантазировать и следовать простым 
                инструкциям. Занятия с кубиками Lego Duplo идеально подходят для маленьких пальчиков.
              </p>
              <p className={styles.aboutText}>
                Мы предлагаем задания, которые развивают мелкую моторику, пространственное мышление и умение 
                доводить дело до конца. Дети учатся различать цвета и формы, собирать по образцу и создавать 
                свои первые постройки. Всё происходит в игровой форме — ребёнок не чувствует давления и с 
                удовольствием возвращается на занятия.
              </p>
              <button
                type="button"
                className={styles.mobileEnrollBtn}
                onClick={() => setIsFormOpen(true)}
                aria-label="Записаться"
              >
                Записаться
              </button>
              <CoursePriceGallery courseId="lego-razvivayka" />
              <div className={styles.badges}>
                <div className={styles.badge}>
                  <span className={styles.badgeIcon}>🧒</span>
                  <div><span className={styles.badgeLabel}>Возраст</span><span className={styles.badgeValue}>2,5–3 года</span></div>
                </div>
                <div className={styles.badge}>
                  <span className={styles.badgeIcon}>⏱</span>
                  <div><span className={styles.badgeLabel}>Занятие</span><span className={styles.badgeValue}>60 мин</span></div>
                </div>
                <div className={styles.badge}>
                  <span className={styles.badgeIcon}>🧱</span>
                  <div><span className={styles.badgeLabel}>Формат</span><span className={styles.badgeValue}>Lego Duplo</span></div>
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
                courseName="Лего-развивайка" 
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
                  <p>Соединение и разъединение кубиков, работа с крупными деталями Duplo — подготовка руки к письму</p>
                </div>
              </div>
              <div className={styles.programItem}>
                <span className={styles.programEmoji}>🎯</span>
                <div>
                  <h3>Пространственное мышление</h3>
                  <p>Ориентация в пространстве: верх-низ, лево-право, внутри-снаружи через постройки</p>
                </div>
              </div>
              <div className={styles.programItem}>
                <span className={styles.programEmoji}>🧩</span>
                <div>
                  <h3>Логика и последовательность</h3>
                  <p>Сборка по образцу, следование простой инструкции — развитие внимания и усидчивости</p>
                </div>
              </div>
              <div className={styles.programItem}>
                <span className={styles.programEmoji}>🌈</span>
                <div>
                  <h3>Цвета и формы</h3>
                  <p>Знакомство с основными цветами, формами и размерами в практической игре</p>
                </div>
              </div>
              <div className={styles.programItem}>
                <span className={styles.programEmoji}>✨</span>
                <div>
                  <h3>Творческое конструирование</h3>
                  <p>Свободное строительство — ребёнок придумывает и воплощает свои идеи</p>
                </div>
              </div>
              <div className={styles.programItem}>
                <span className={styles.programEmoji}>🔧</span>
                <div>
                  <h3>Первые инженерные навыки</h3>
                  <p>Простые механизмы, устойчивость конструкций — основа для будущего интереса к технике</p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.whySection}>
            <h2 className={styles.sectionHeading}>Зачем малышу Lego?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}>
                <span className={styles.whyCheck}>✓</span>
                <p>Кубики Duplo крупные и безопасные — удобно держать в руке, невозможно проглотить</p>
              </div>
              <div className={styles.whyItem}>
                <span className={styles.whyCheck}>✓</span>
                <p>Мгновенный результат — ребёнок видит, что его действие создало что-то новое</p>
              </div>
              <div className={styles.whyItem}>
                <span className={styles.whyCheck}>✓</span>
                <p>Развитие логики без скуки — игра и учёба идут рука об руку</p>
              </div>
              <div className={styles.whyItem}>
                <span className={styles.whyCheck}>✓</span>
                <p>Подготовка к школе — усидчивость, внимание и умение следовать инструкциям</p>
              </div>
            </div>
          </section>

          <RelatedCourses currentCourseId="lego-razvivayka" />

          <section className={styles.locationBar}>
            <span>📍 г. Лида · Детский центр «Лучик» · Небольшие группы</span>
          </section>

          <CourseNav currentCourseId="lego-razvivayka" />
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
            courseName="Лего-развивайка"
            compact
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LegoRazvivayka;
