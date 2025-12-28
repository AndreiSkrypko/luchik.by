import styles from './WhyUsSection.module.css';

const WhyUsSection = () => {
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
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;

