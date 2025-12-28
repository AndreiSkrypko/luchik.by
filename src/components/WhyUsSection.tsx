import styles from './WhyUsSection.module.css';

interface WhyUsSectionProps {
  onContactsClick?: () => void;
}

const WhyUsSection = ({ onContactsClick }: WhyUsSectionProps) => {
  const handleButtonClick = () => {
    if (onContactsClick) {
      onContactsClick();
    }
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
            onClick={handleButtonClick}
            aria-label="Записаться на пробное занятие"
          >
            <img
              src="/img/why_we/button.svg"
              alt=""
              className={styles.ctaButtonImage}
            />
            <span className={styles.ctaButtonText}>ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;

