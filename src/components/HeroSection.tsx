import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import EnrollmentForm from '@/components/EnrollmentForm';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onContactsClick?: () => void;
}

const HeroSection = ({ onContactsClick }: HeroSectionProps) => {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    navigate('/thank-you');
  };

  return (
    <>
      {/* Основной заголовок */}
      <section className={styles.mainTitleSection}>
        <h1 className={styles.mainTitleText}>
          Детский центр
          <br />
          современных знаний
        </h1>
      </section>

      {/* Подзаголовок с божьей коровкой */}
      <section className={styles.subtitleSection}>
        <p className={styles.subtitleText}>
          Детский центр "Лучик"
          <br />
          ваш надёжный спутник в школе и в жизни
        </p>
        <img
          src="/img/main/ladybug.webp"
          alt="Божья коровка"
          width={80}
          height={80}
          className={styles.ladybug}
        />
      </section>
      
      {/* Кнопка CTA */}
      <section className={styles.ctaSection}>
        <button 
          className={styles.ctaButton} 
          type="button"
          onClick={() => setIsFormOpen(true)}
        >
          <img
            src="/img/main/cta-button.webp"
            alt="Оставить заявку"
            width={371}
            height={82}
            className={styles.ctaButtonImage}
          />
          <span className={styles.ctaButtonText}>ОСТАВИТЬ ЗАЯВКУ</span>
        </button>
      </section>

      {/* Модальное окно с формой */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle className={styles.dialogTitle}>Запись на подготовку к школе</DialogTitle>
            <DialogDescription className={styles.dialogDescription}>
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>
          <EnrollmentForm onSuccess={handleFormSuccess} compact={true} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeroSection;
