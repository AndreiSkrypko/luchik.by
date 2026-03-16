import { Link } from 'react-router-dom';
import { courseMeta } from '@/data/courseMeta';
import styles from '@/pages/course/CoursePage.module.css';

interface CoursePriceGalleryProps {
  courseId: string;
}

const CoursePriceGallery = ({ courseId }: CoursePriceGalleryProps) => {
  const meta = courseMeta[courseId];
  if (!meta) return null;

  const { price, galleryPath } = meta;

  return (
    <div className={styles.priceAndGallery}>
      <div className={styles.priceBadge}>
        <span className={styles.priceIcon}>💰</span>
        <div>
          <span className={styles.priceLabel}>Абонемент</span>
          <span className={styles.priceValue}>{price} руб/мес</span>
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
