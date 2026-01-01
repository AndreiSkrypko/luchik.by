import styles from './HeroSection.module.css';

const HeroSection = () => {
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
          Детский центр "Лучик" - вместе с нами в школе и в жизни
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
