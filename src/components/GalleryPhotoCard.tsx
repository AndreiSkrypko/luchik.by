import { Link } from 'react-router-dom';
import styles from './GalleryPhotoCard.module.css';

export interface GalleryPhotoCardProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  href?: string;
}

const GalleryPhotoCard = ({ src, alt, title, description, href }: GalleryPhotoCardProps) => {
  const content = (
    <>
      <div className={styles.imageWrap}>
        <img
          src={src}
          alt={alt}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
      </div>
      {(title || description) && (
        <div className={styles.caption}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link to={href} className={styles.card}>
        {content}
      </Link>
    );
  }

  return <article className={styles.card}>{content}</article>;
};

export default GalleryPhotoCard;
