import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import EnrollmentCard from '@/components/EnrollmentCard';
import ImageLightbox from '@/components/ImageLightbox';
import { ChevronLeft } from 'lucide-react';
import styles from '@/pages/GalleryMasterclass.module.css';

const PHOTOS_PER_PAGE = 12;

function GalleryImageCard({
  photo,
  index,
  onOpen,
  onLoadError,
}: {
  photo: { src: string; alt: string; title?: string };
  index: number;
  onOpen: (idx: number) => void;
  onLoadError: () => void;
}) {
  return (
    <button
      type="button"
      className={styles.card}
      onClick={() => onOpen(index)}
    >
      <div className={styles.imageWrap}>
        <img
          src={photo.src.replace(/\.\w+$/, '_opt.webp')}
          alt={photo.alt}
          title={photo.title ?? photo.alt}
          className={styles.image}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const imgEl = e.currentTarget as HTMLImageElement;
            // If optimized variant failed, try original; otherwise mark as failed
            if (!imgEl.dataset.fallbackTried) {
              imgEl.dataset.fallbackTried = '1';
              imgEl.src = photo.src;
              return;
            }
            onLoadError();
          }}
        />
      </div>
      <span className={styles.viewHint}>Нажмите для просмотра</span>
    </button>
  );
}

export interface GalleryCategoryProps {
  title: string;
  description: string;
  photos: { src: string; alt: string; title?: string }[];
}

const GalleryCategory = ({ title, description, photos }: GalleryCategoryProps) => {
  const [searchParams] = useSearchParams();
  const rawFrom = searchParams.get('from');
  // Разрешаем только внутренние пути вида /course/xxx
  const fromCourse = rawFrom?.startsWith('/course/') && !rawFrom.includes('//') ? rawFrom : null;
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [failedIndices, setFailedIndices] = useState<Set<number>>(() => new Set());

  const toggleContacts = () => setIsContactsOpen(!isContactsOpen);
  const closeContacts = () => setIsContactsOpen(false);

  const visiblePhotos = photos.filter((_, i) => !failedIndices.has(i));
  const totalPages = Math.max(1, Math.ceil(visiblePhotos.length / PHOTOS_PER_PAGE));
  const startIdx = (currentPage - 1) * PHOTOS_PER_PAGE;
  const photosOnPage = visiblePhotos.slice(startIdx, startIdx + PHOTOS_PER_PAGE);

  const openLightbox = (index: number) => {
    setLightboxIndex(startIdx + index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const handleLightboxIndexChange = (index: number) => {
    setLightboxIndex(index);
    const newPage = Math.floor(index / PHOTOS_PER_PAGE) + 1;
    if (newPage !== currentPage) setCurrentPage(newPage);
  };

  const handleLoadError = (originalIndex: number) => {
    setFailedIndices((prev) => new Set(prev).add(originalIndex));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages >= 1) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className={styles.page}>
      <Header onContactsClick={toggleContacts} />
      <main>
        <div className={styles.main}>
          <div className={styles.titleSection}>
            <div className={styles.breadcrumbWrapper}>
              {fromCourse ? (
                <Link to={fromCourse} className={styles.backLink}>
                  ← Назад к курсу
                </Link>
              ) : (
                <Link to="/gallery" className={styles.backLink}>
                  ← Назад в галерею
                </Link>
              )}
            </div>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>

            <div className={styles.grid}>
              {photosOnPage.length > 0 ? (
                photosOnPage.map((photo, idx) => {
                  const originalIndex = photos.indexOf(photo);
                  return (
                    <GalleryImageCard
                      key={originalIndex}
                      photo={photo}
                      index={idx}
                      onOpen={openLightbox}
                      onLoadError={() => handleLoadError(originalIndex)}
                    />
                  );
                })
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

      {lightboxIndex !== null && visiblePhotos.length > 0 && (
        <ImageLightbox
          images={visiblePhotos}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onIndexChange={handleLightboxIndexChange}
        />
      )}
    </div>
  );
};

export default GalleryCategory;
