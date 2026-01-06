import { useNavigate } from 'react-router-dom';
import styles from './DirectionsSection.module.css';

const DirectionsSection = () => {
  const navigate = useNavigate();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Failed to load image:', e.currentTarget.src);
  };

  const handleCardClick = (ageRange: string) => {
    navigate(`/age/${ageRange}`);
  };

  return (
    <section className={styles.directionsSection} id="directions">
      <div className={styles.directionsContainer}>
        <h2 className={styles.directionsTitle}>Направления обучения</h2>
        <div className={styles.directionsCards}>
          <div className={styles.cloudWrapper}>
            <img
              src="/img/footer/oblako1.webp"
              alt="Облако"
              width={80}
              height={50}
              className={styles.cloud}
              onError={handleImageError}
            />
          </div>
          <div className={styles.directionCard} onClick={() => handleCardClick('1-5')} style={{ cursor: 'pointer' }}>
            <div className={styles.ageTextWrapper}>
              <img
                src="/img/directions/age-1-5.svg"
                alt="1-5 лет"
                className={styles.ageText}
                onError={handleImageError}
              />
            </div>
            <div className={styles.ageTextWrapper2}>
              <img
                src="/img/1-5.svg"
                alt="1-5 лет"
                className={styles.ageText2}
                onError={handleImageError}
              />
            </div>
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
          <div className={styles.directionCard} onClick={() => handleCardClick('5-10')} style={{ cursor: 'pointer' }}>
            <div className={styles.romashkaWrapper}>
              <img
                src="/img/romashka.svg"
                alt="Ромашка"
                className={styles.romashka}
                onError={handleImageError}
              />
            </div>
            <div className={styles.ageTextWrapper}>
              <img
                src="/img/directions/age-1-5.svg"
                alt="1-5 лет"
                className={styles.ageText}
                onError={handleImageError}
              />
            </div>
            <div className={styles.ageTextWrapper2}>
              <img
                src="/img/5-10.svg"
                alt="5-10 лет"
                className={styles.ageText2}
                onError={handleImageError}
              />
            </div>
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
          </div>
          <div className={styles.directionCard} onClick={() => handleCardClick('10-17')} style={{ cursor: 'pointer' }}>
            <div className={styles.vzikWrapper}>
              <img
                src="/img/vzik.svg"
                alt="Взъик"
                className={styles.vzik}
                onError={handleImageError}
              />
            </div>
            <div className={styles.ageTextWrapper}>
              <img
                src="/img/directions/age-1-5.svg"
                alt="1-5 лет"
                className={styles.ageText}
                onError={handleImageError}
              />
            </div>
            <div className={styles.ageTextWrapper2}>
              <img
                src="/img/10-17.svg"
                alt="10-17 лет"
                className={styles.ageText2}
                onError={handleImageError}
              />
            </div>
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

