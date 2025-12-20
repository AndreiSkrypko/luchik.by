import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <>
      {/* Основной заголовок */}
      <section className={styles.mainTitleSection}>
        <img
          src="/img/main/title.webp"
          alt="Детский центр современных знаний"
          width={873}
          height={176}
          className={styles.mainTitleImage}
        />
      </section>

      {/* Подзаголовок с божьей коровкой */}
      <section className={styles.subtitleSection}>
        <p className={styles.subtitleText}>
          Откройте мир технологий и креативности
          <br />
          вашего ребёнка!
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
        <button className={styles.ctaButton} type="button">
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
    </>
  );
};

export default HeroSection;
