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
    <div className={styles.hero}>
      {/* Основной заголовок - LCP элемент */}
      <section className={styles.mainTitleSection}>
        <h1 className={styles.mainTitleText} itemProp="name">
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
          width={144}
          height={144}
          className={styles.ladybug}
          loading="lazy"
          fetchPriority="low"
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
            loading="eager"
            fetchPriority="high"
          />
          <span className={styles.ctaButtonText}>ОСТАВИТЬ ЗАЯВКУ</span>
        </button>
      </section>

      {/* Модальное окно с формой */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle className={styles.dialogTitle}>Оставить заявку</DialogTitle>
            <DialogDescription className={styles.dialogDescription}>
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="занятия в детском центре" compact={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroSection;
