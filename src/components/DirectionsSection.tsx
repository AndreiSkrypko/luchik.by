import styles from './DirectionsSection.module.css';

const DirectionsSection = () => {
  return (
    <section className={styles.directionsSection} id="directions">
      <div className={styles.directionsContainer}>
        <img
          src="/img/directions/title.svg"
          alt="Направления обучения"
          className={styles.directionsTitle}
        />
        <div className={styles.directionsCards}>
          <div className={styles.directionCard}>
            <img
              src="/img/directions/card-base.svg"
              alt=""
              className={styles.cardBase}
            />
            <img
              src="/img/directions/card-1.svg"
              alt="Возрастная категория: 1-5 лет"
              className={styles.cardDecoration}
            />
          </div>
          <div className={styles.directionCard}>
            <img
              src="/img/directions/card-base.svg"
              alt=""
              className={styles.cardBase}
            />
            <img
              src="/img/directions/card-2.svg"
              alt="Возрастная категория: 5-10 лет"
              className={styles.cardDecoration}
            />
            <img
              src="/img/2card/3.svg"
              alt=""
              className={styles.cardCloud}
            />
          </div>
          <div className={styles.directionCard}>
            <img
              src="/img/directions/card-base.svg"
              alt=""
              className={styles.cardBase}
            />
            <img
              src="/img/directions/card-3.svg"
              alt="Возрастная категория: 10-17 лет"
              className={styles.cardDecoration}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectionsSection;

