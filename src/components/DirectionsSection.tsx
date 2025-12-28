import styles from './DirectionsSection.module.css';

const DirectionsSection = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Failed to load image:', e.currentTarget.src);
  };

  return (
    <section className={styles.directionsSection} id="directions">
      <div className={styles.directionsContainer}>
        <img
          src="/img/directions/title.svg"
          alt="Направления обучения"
          className={styles.directionsTitle}
          onError={handleImageError}
        />
        <div className={styles.directionsCards}>
          <div className={styles.directionCard}>
            <img
              src="/img/directions/card-base.svg"
              alt=""
              className={styles.cardBase}
              onError={handleImageError}
            />
            <img
              src="/img/directions/card-1.svg"
              alt="Возрастная категория: 1-5 лет"
              className={styles.cardDecoration}
              onError={handleImageError}
              loading="lazy"
            />
          </div>
          <div className={styles.directionCard}>
            <img
              src="/img/directions/card-base.svg"
              alt=""
              className={styles.cardBase}
              onError={handleImageError}
            />
            <img
              src="/img/directions/card-2.svg"
              alt="Возрастная категория: 5-10 лет"
              className={styles.cardDecoration}
              onError={handleImageError}
              loading="lazy"
            />
            <img
              src="/img/2card/3.svg"
              alt=""
              className={styles.cardCloud}
              onError={handleImageError}
              loading="lazy"
            />
          </div>
          <div className={styles.directionCard}>
            <img
              src="/img/directions/card-base.svg"
              alt=""
              className={styles.cardBase}
              onError={handleImageError}
            />
            <img
              src="/img/directions/card-3.svg"
              alt="Возрастная категория: 10-17 лет"
              className={styles.cardDecoration}
              onError={handleImageError}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectionsSection;

