import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import EnrollmentForm from '@/components/EnrollmentForm';
import styles from './WhyUsSection.module.css';

const WhyUsSection = () => {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    navigate('/thank-you');
  };

  return (
    <section className={styles.whyUsSection}>
      <div className={styles.whyUsContainer}>
        <div className={styles.whyUsContent}>
          <img
            src="/img/why_we/cards.svg"
            alt="Почему мы?"
            className={styles.whyUsCards}
          />
          <img
            src="/img/why_we/boy.svg"
            alt="Мальчик"
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
          <img src="/img/why_we/boy.svg" alt="Ребёнок" className={styles.mobileBoy} />
          <div className={styles.mobileWhyText}>
            <ul className={styles.mobileWhyList}>
              <li>Для детей 1–12 лет</li>
              <li>Опытные педагоги и логопеды</li>
              <li>Индивидуальный подход</li>
              <li>Тёплая семейная атмосфера</li>
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
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle className={styles.dialogTitle}>Записаться на пробное занятие</DialogTitle>
            <DialogDescription className={styles.dialogDescription}>
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

