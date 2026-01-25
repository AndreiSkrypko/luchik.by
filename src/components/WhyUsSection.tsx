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

