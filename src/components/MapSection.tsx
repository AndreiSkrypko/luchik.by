import { useEffect, useRef } from 'react';
import styles from './MapSection.module.css';

// API ключ Яндекс.Карт из переменных окружения или используйте свой
const YANDEX_MAP_API_KEY = import.meta.env.VITE_YANDEX_MAP_API_KEY || '';

// Адрес центра
const MAP_ADDRESS = 'Замковая улица, 4, Лида, Гродненская область, Беларусь';
// Точные координаты для Замковой, 4, Лида
const FALLBACK_CENTER: [number, number] = [53.887889, 25.301733];

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const initMap = (coordinates: [number, number]) => {
      if (mapRef.current && !mapInstanceRef.current) {
        mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
          center: coordinates,
          zoom: 16,
          controls: ['zoomControl', 'fullscreenControl'],
        });

        // Добавляем маркер
        const placemark = new window.ymaps.Placemark(
          coordinates,
          {
            balloonContent: `Детский центр "Лучик"<br>${MAP_ADDRESS}`,
          },
          {
            preset: 'islands#redIcon',
          }
        );

        mapInstanceRef.current.geoObjects.add(placemark);
      }
    };

    // Проверяем, загружена ли уже библиотека Яндекс.Карт
    if (window.ymaps) {
      window.ymaps.ready(() => {
        // Пытаемся геокодировать адрес
        window.ymaps.geocode(MAP_ADDRESS)
          .then((result: any) => {
            const firstGeoObject = result.geoObjects.get(0);
            if (firstGeoObject) {
              const coordinates = firstGeoObject.geometry.getCoordinates();
              initMap(coordinates);
            } else {
              initMap(FALLBACK_CENTER);
            }
          })
          .catch(() => {
            // Если геокодирование не сработало, используем запасные координаты
            initMap(FALLBACK_CENTER);
          });
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
          const initMap = (coordinates: [number, number]) => {
            if (mapRef.current && !mapInstanceRef.current) {
              mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
                center: coordinates,
                zoom: 16,
                controls: ['zoomControl', 'fullscreenControl'],
              });

              // Добавляем маркер
              const placemark = new window.ymaps.Placemark(
                coordinates,
                {
                  balloonContent: `Детский центр "Лучик"<br>${MAP_ADDRESS}`,
                },
                {
                  preset: 'islands#redIcon',
                }
              );

              mapInstanceRef.current.geoObjects.add(placemark);
            }
          };

          // Пытаемся геокодировать адрес
          window.ymaps.geocode(MAP_ADDRESS)
            .then((result: any) => {
              const firstGeoObject = result.geoObjects.get(0);
              if (firstGeoObject) {
                const coordinates = firstGeoObject.geometry.getCoordinates();
                initMap(coordinates);
              } else {
                initMap(FALLBACK_CENTER);
              }
            })
            .catch(() => {
              // Если геокодирование не сработало, используем запасные координаты
              initMap(FALLBACK_CENTER);
            });
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
        <div ref={mapRef} className={styles.map}>
          <div className={styles.mapOverlay}>
            <div className={styles.overlayCard}>
              <div className={styles.locationIcon}>
                <img
                  src="/img/map/location-icon.svg"
                  alt="Локация"
                  className={styles.locationIconImage}
                  onError={handleImageError}
                />
              </div>
              <div className={styles.cityName}>г. Лида</div>
              <div className={styles.addressFields}>
                <div className={styles.addressField}>ул. Замковая, 4</div>
                <div className={styles.addressField}>ул. Кооперативная, 36</div>
              </div>
            </div>
          </div>
          <div className={styles.cowWrapper}>
            <img
              src="/img/map/korovka.svg"
              alt=""
              className={styles.cowImage}
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

