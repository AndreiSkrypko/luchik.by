import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import EnrollmentForm from '@/components/EnrollmentForm';
import styles from './WhyUsSection.module.css';
import modalStyles from './EnrollmentModal.module.css';

const WhyUsSection = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormSuccess = () => {
    setIsFormOpen(false);
  };

  return (
    <section className={styles.whyUsSection}>
      <div className={styles.whyUsContainer}>
        <div className={styles.whyUsContent}>
          <img
            src="/img/why_we/cards.svg"
            alt="Почему выбирают детский центр Лучик в Лиде"
            className={styles.whyUsCards}
          />
          <img
            src="/img/why_we/boy.svg"
            alt="Ребёнок на занятиях в детском центре Лучик"
            className={styles.whyUsBoy}
          />
          <button 
            className={styles.ctaButton} 
            type="button"
            onClick={() => setIsFormOpen(true)}
            aria-label="Записаться на пробное занятие"
          >
            <span className={styles.ctaButtonText}>ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ</span>
          </button>
        </div>
      </div>

      {/* Mobile layout: show boy image and concise text side-by-side */}
      <div className={styles.mobileWhyUs}>
        <h2 className={styles.mobileWhyTitle}>Почему мы</h2>
        <div className={styles.mobileInner}>
          <img src="/img/why_we/boy.svg" alt="Ребёнок в детском центре Лучик, Лида" className={styles.mobileBoy} />
          <div className={styles.mobileWhyText}>
            <ul className={styles.mobileWhyList}>
              <li>Практические проекты</li>
              <li>Результаты</li>
              <li>Онлайн и офлайн</li>
              <li>Регулярные отчёты</li>
            </ul>
            <button
              className={styles.mobileCta}
              type="button"
              onClick={() => setIsFormOpen(true)}
              aria-label="Записаться на пробное занятие"
            >
              Записаться
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно с формой */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className={modalStyles.content}>
          <DialogHeader className={modalStyles.header}>
            <DialogTitle className={modalStyles.title}>Записаться на пробное занятие</DialogTitle>
            <DialogDescription className={modalStyles.description}>
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="пробное занятие" compact={true} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default WhyUsSection;

