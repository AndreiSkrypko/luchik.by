import { useEffect, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import styles from './ImageLightbox.module.css';

export interface ImageLightboxProps {
  images: { src: string; alt: string; title?: string }[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

const SWIPE_THRESHOLD = 50;

const ImageLightbox = ({ images, currentIndex, onClose, onIndexChange }: ImageLightboxProps) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentImage = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) {
      const next = currentIndex - 1;
      onIndexChange?.(next);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [currentIndex, hasPrev, onIndexChange]);

  const goNext = useCallback(() => {
    if (hasNext) {
      const next = currentIndex + 1;
      onIndexChange?.(next);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [currentIndex, hasNext, onIndexChange]);

  const handleZoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
  const handleZoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => {
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z + delta));
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (zoom > 1) {
      setIsDragging(true);
      dragStart.current = { x: t.clientX - position.x, y: t.clientY - position.y };
    } else {
      touchStartRef.current = { x: t.clientX, y: t.clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (zoom > 1 && isDragging) {
      const t = e.touches[0];
      setPosition({ x: t.clientX - dragStart.current.x, y: t.clientY - dragStart.current.y });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (zoom > 1) {
      setIsDragging(false);
      return;
    }
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const deltaX = t.clientX - start.x;
    const deltaY = t.clientY - start.y;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0 && hasPrev) goPrev();
      else if (deltaX < 0 && hasNext) goNext();
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    },
    [onClose, goPrev, goNext]
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!currentImage) return null;

  const content = (
    <div
      ref={containerRef}
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Закрыть"
      >
        <X size={28} />
      </button>

      {hasPrev && (
        <button
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={goPrev}
          aria-label="Предыдущее фото"
        >
          <ChevronLeft size={36} />
        </button>
      )}

      <div className={styles.imageContainer}>
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          title={currentImage.title ?? currentImage.alt}
          className={styles.image}
          style={{
            transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
            cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
          }}
          draggable={false}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {hasNext && (
        <button
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={goNext}
          aria-label="Следующее фото"
        >
          <ChevronRight size={36} />
        </button>
      )}

      <div className={styles.controls}>
        <div className={styles.zoomControls}>
          <button onClick={handleZoomOut} aria-label="Уменьшить" disabled={zoom <= MIN_ZOOM}>
            <ZoomOut size={22} />
          </button>
          <span className={styles.zoomValue}>{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn} aria-label="Увеличить" disabled={zoom >= MAX_ZOOM}>
            <ZoomIn size={22} />
          </button>
        </div>
        <span className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default ImageLightbox;
