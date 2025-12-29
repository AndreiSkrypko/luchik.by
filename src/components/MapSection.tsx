import { useEffect, useRef } from 'react';
import styles from './MapSection.module.css';

// API ключ Яндекс.Карт из переменных окружения или используйте свой
const YANDEX_MAP_API_KEY = import.meta.env.VITE_YANDEX_MAP_API_KEY || '';

// Координаты центра карты (замените на координаты вашего центра)
const MAP_CENTER: [number, number] = [53.9045, 27.5615]; // Минск, Беларусь

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Проверяем, загружена ли уже библиотека Яндекс.Карт
    if (window.ymaps) {
      window.ymaps.ready(() => {
        if (mapRef.current && !mapInstanceRef.current) {
          mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
            center: MAP_CENTER,
            zoom: 15,
            controls: ['zoomControl', 'fullscreenControl'],
          });

          // Добавляем маркер
          const placemark = new window.ymaps.Placemark(
            MAP_CENTER,
            {
              balloonContent: 'Детский центр "Лучик"',
            },
            {
              preset: 'islands#redIcon',
            }
          );

          mapInstanceRef.current.geoObjects.add(placemark);
        }
      });
      return;
    }

    // Загружаем скрипт Яндекс.Карт
    const script = document.createElement('script');
    const apiKeyParam = YANDEX_MAP_API_KEY ? `&apikey=${YANDEX_MAP_API_KEY}` : '';
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU${apiKeyParam}`;
    script.async = true;
    script.onload = () => {
      if (window.ymaps && mapRef.current) {
        window.ymaps.ready(() => {
          if (mapRef.current && !mapInstanceRef.current) {
            mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
              center: MAP_CENTER,
              zoom: 15,
              controls: ['zoomControl', 'fullscreenControl'],
            });

            // Добавляем маркер
            const placemark = new window.ymaps.Placemark(
              MAP_CENTER,
              {
                balloonContent: 'Детский центр "Лучик"',
              },
              {
                preset: 'islands#redIcon',
              }
            );

            mapInstanceRef.current.geoObjects.add(placemark);
          }
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Очистка при размонтировании
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Failed to load image:', e.currentTarget.src);
  };

  return (
    <section className={styles.mapSection}>
      <div className={styles.mapContainer}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.mapTitle}>Мы на карте</h2>
          <img
            src="/img/airplane.svg"
            alt="Самолет"
            className={styles.airplane}
            onError={handleImageError}
          />
        </div>
        <div ref={mapRef} className={styles.map} />
        <div className={styles.mapOverlay}>
          <img
            src="/img/map/overlay.svg"
            alt=""
            className={styles.overlayImage}
            onError={handleImageError}
          />
        </div>
        <div className={styles.boyWrapper}>
          <img
            src="/img/map/boy.svg"
            alt=""
            className={styles.boyImage}
            onError={handleImageError}
          />
        </div>
      </div>
    </section>
  );
};

export default MapSection;

// Расширяем интерфейс Window для TypeScript
declare global {
  interface Window {
    ymaps: any;
  }
}

