import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import EnrollmentCard from '@/components/EnrollmentCard';
import ImageLightbox from '@/components/ImageLightbox';
import { ChevronLeft } from 'lucide-react';
import styles from '@/pages/GalleryMasterclass.module.css';

const PHOTOS_PER_PAGE = 12;

export interface GalleryCategoryProps {
  title: string;
  description: string;
  photos: { src: string; alt: string }[];
}

const GalleryCategory = ({ title, description, photos }: GalleryCategoryProps) => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleContacts = () => setIsContactsOpen(!isContactsOpen);
  const closeContacts = () => setIsContactsOpen(false);

  const totalPages = Math.max(1, Math.ceil(photos.length / PHOTOS_PER_PAGE));
  const startIdx = (currentPage - 1) * PHOTOS_PER_PAGE;
  const photosOnPage = photos.slice(startIdx, startIdx + PHOTOS_PER_PAGE);

  const openLightbox = (index: number) => {
    setLightboxIndex(startIdx + index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const handleLightboxIndexChange = (index: number) => {
    setLightboxIndex(index);
    const newPage = Math.floor(index / PHOTOS_PER_PAGE) + 1;
    if (newPage !== currentPage) setCurrentPage(newPage);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className={styles.page}>
      <Header onContactsClick={toggleContacts} />
      <main>
        <div className={styles.main}>
          <div className={styles.titleSection}>
            <Link to="/gallery" className={styles.backLink}>
              <ChevronLeft size={20} />
              <span>Назад в галерею</span>
            </Link>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>

            <div className={styles.grid}>
              {photosOnPage.length > 0 ? (
                photosOnPage.map((photo, idx) => (
                  <button
                    key={startIdx + idx}
                    type="button"
                    className={styles.card}
                    onClick={() => openLightbox(idx)}
                  >
                    <div className={styles.imageWrap}>
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className={styles.image}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <span className={styles.viewHint}>Нажмите для просмотра</span>
                  </button>
                ))
              ) : (
                <p className={styles.emptyHint}>
                  Фото скоро появятся. Добавьте их в массив PHOTOS в файле страницы.
                </p>
              )}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  type="button"
                  className={styles.pageBtn}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Предыдущая страница"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className={styles.pageInfo}>
                  {currentPage} из {totalPages}
                </span>
                <button
                  type="button"
                  className={styles.pageBtn}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Следующая страница"
                >
                  <ChevronLeft size={20} style={{ transform: 'rotate(180deg)' }} />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer onContactsClick={toggleContacts} />
      <ContactsPanel isOpen={isContactsOpen} onClose={closeContacts} />
      <ScrollToTop />
      <EnrollmentCard />

      {lightboxIndex !== null && photos.length > 0 && (
        <ImageLightbox
          images={photos}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onIndexChange={handleLightboxIndexChange}
        />
      )}
    </div>
  );
};

export default GalleryCategory;
