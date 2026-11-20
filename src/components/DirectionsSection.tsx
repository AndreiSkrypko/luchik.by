import { useNavigate } from 'react-router-dom';
import {
  fallbackOnOptimizedImageError,
  optimizedImageSrc,
} from '@/lib/optimizedImage';
import styles from './DirectionsSection.module.css';

const CARD_DECORATIONS = [
  {
    webp: optimizedImageSrc('/img/directions/card-1.svg'),
    original: '/img/directions/card-1.svg',
    alt: 'Возрастная категория: 1-5 лет',
  },
  {
    webp: optimizedImageSrc('/img/directions/card-2.svg'),
    original: '/img/directions/card-2.svg',
    alt: 'Возрастная категория: 5-10 лет',
  },
  {
    webp: optimizedImageSrc('/img/directions/card-3.svg'),
    original: '/img/directions/card-3.svg',
    alt: 'Возрастная категория: 10-17 лет',
  },
] as const;

const DirectionsSection = () => {
  const navigate = useNavigate();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Failed to load image:', e.currentTarget.src);
  };

  const handleCardDecorationError =
    (original: string) => (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      fallbackOnOptimizedImageError(e, original);
    };

  const handleCardClick = (ageRange: string) => {
    navigate(`/age/${ageRange}`);
  };

  return (
    <section className={styles.directionsSection} id="directions">
      <div className={styles.directionsContainer}>
        <h2 className={styles.directionsTitle}>Направления обучения</h2>
        <div className={styles.directionsCards}>
          <div className={styles.directionCard} onClick={() => handleCardClick('1-5')} style={{ cursor: 'pointer' }}>
            <div className={styles.cloudWrapper}>
              <img
                src="/img/footer/oblako1.webp"
                alt="Направления детского центра Лучик в Лиде"
                width={80}
                height={50}
                className={styles.cloud}
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
                src="/img/directions/1-5.svg"
                alt="1-5 лет"
                className={styles.ageText2}
                onError={handleImageError}
              />
            </div>
            <img
              src="/img/directions/card-base.svg"
              alt="Декоративная основа карточки 1-5 лет"
              className={styles.cardBase}
              onError={handleImageError}
            />
            <img
              src={CARD_DECORATIONS[0].webp}
              alt={CARD_DECORATIONS[0].alt}
              className={styles.cardDecoration}
              onError={handleCardDecorationError(CARD_DECORATIONS[0].original)}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className={styles.directionCard} onClick={() => handleCardClick('5-10')} style={{ cursor: 'pointer' }}>
            <div className={styles.romashkaWrapper}>
              <img
                src="/img/directions/romashka.svg"
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
                src="/img/directions/5-10.svg"
                alt="5-10 лет"
                className={styles.ageText2}
                onError={handleImageError}
              />
            </div>
            <img
              src="/img/directions/card-base.svg"
              alt="Декоративная основа карточки 5-10 лет"
              className={styles.cardBase}
              onError={handleImageError}
            />
            <img
              src={CARD_DECORATIONS[1].webp}
              alt={CARD_DECORATIONS[1].alt}
              className={styles.cardDecoration}
              onError={handleCardDecorationError(CARD_DECORATIONS[1].original)}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className={styles.directionCard} onClick={() => handleCardClick('10-17')} style={{ cursor: 'pointer' }}>
            <div className={styles.vzikWrapper}>
              <img
                src="/img/directions/vzik.svg"
                alt="Персонаж Вжик — детский центр Лучик в Лиде"
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
                src="/img/directions/10-17.svg"
                alt="10-17 лет"
                className={styles.ageText2}
                onError={handleImageError}
              />
            </div>
            <img
              src="/img/directions/card-base.svg"
              alt="Декоративная основа карточки 10-17 лет"
              className={styles.cardBase}
              onError={handleImageError}
            />
            <img
              src={CARD_DECORATIONS[2].webp}
              alt={CARD_DECORATIONS[2].alt}
              className={styles.cardDecoration}
              onError={handleCardDecorationError(CARD_DECORATIONS[2].original)}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectionsSection;