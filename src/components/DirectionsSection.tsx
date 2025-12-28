import styles from './DirectionsSection.module.css';

const DirectionsSection = () => {
  return (
    <section className={styles.directionsSection} id="directions">
      <div className={styles.directionsContainer}>
        <h2 className={styles.directionsTitle}>Направления обучения</h2>
        <div className={styles.directionsCards}>
          <div className={styles.directionCard}>
            <div className={styles.cardImageWrapper}>
              <img
                src="/img/main/direction-1-placeholder.webp"
                alt="Дети 1-5 лет"
                className={styles.cardImage}
              />
              <div className={styles.cardCloud}></div>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardAge}>
                Возрастная категория: <span className={styles.cardAgeHighlight}>1-5 лет</span>
              </p>
            </div>
          </div>

          <div className={styles.directionCard}>
            <div className={styles.cardImageWrapper}>
              <img
                src="/img/main/direction-2-placeholder.webp"
                alt="Дети 5-10 лет"
                className={styles.cardImage}
              />
              <div className={styles.cardDaisy}></div>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardAge}>
                Возрастная категория: <span className={styles.cardAgeHighlightBlue}>5-10 лет</span>
              </p>
            </div>
          </div>

          <div className={styles.directionCard}>
            <div className={styles.cardImageWrapper}>
              <img
                src="/img/main/direction-3-placeholder.webp"
                alt="Дети 10-17 лет"
                className={styles.cardImage}
              />
              <div className={styles.cardBee}></div>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardAge}>
                Возрастная категория: <span className={styles.cardAgeHighlightGreen}>10-17 лет</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectionsSection;

