import { Link } from 'react-router-dom';
import { courseMeta } from '@/data/courseMeta';
import styles from '@/pages/course/CoursePage.module.css';

interface CoursePriceGalleryProps {
  courseId: string;
}

const CoursePriceGallery = ({ courseId }: CoursePriceGalleryProps) => {
  const meta = courseMeta[courseId];
  if (!meta) return null;

  const { price, priceDisplay, priceDisplayLines, priceSectionLabel, galleryPath } = meta;
  const lines =
    priceDisplayLines && priceDisplayLines.length > 0
      ? priceDisplayLines
      : [priceDisplay ?? `${price} руб/мес`];

  return (
    <div className={styles.priceAndGallery}>
      <div className={styles.priceBadge}>
        <span className={styles.priceIcon}>💰</span>
        <div>
          <span className={styles.priceLabel}>{priceSectionLabel ?? 'Абонемент'}</span>
          <div className={styles.priceValueStack}>
            {lines.map((line, i) => (
              <span key={i} className={styles.priceValue}>
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Link to={`${galleryPath}?from=/course/${courseId}`} className={styles.galleryLink}>
        <span className={styles.galleryLinkIcon}>📷</span>
        Фото в галерее
      </Link>
    </div>
  );
};

export default CoursePriceGallery;
