import { useEffect, useRef, useState } from 'react';
import styles from './MapSection.module.css';

const YANDEX_MAP_API_KEY = import.meta.env.VITE_YANDEX_MAP_API_KEY || '';

const ADDRESS_1 = 'Замковая улица, 4, Лида, Гродненская область, Беларусь';
const ADDRESS_2 = 'улица Тухачевского, 49А, Лида, Гродненская область, Беларусь';

const COORDINATES_1: [number, number] = [53.887889, 25.301733];
const COORDINATES_2: [number, number] = [53.898, 25.2643];

const MAP_ADDRESS = ADDRESS_1;
const DEFAULT_CENTER: [number, number] = COORDINATES_1;

let ymapsLoadPromise: Promise<void> | null = null;

function loadYmapsScript(): Promise<void> {
  if (typeof window !== 'undefined' && window.ymaps) {
    return Promise.resolve();
  }
  if (ymapsLoadPromise) return ymapsLoadPromise;

  ymapsLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-yandex-maps="luchik"]',
    );
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('ymaps load failed')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    const apiKeyParam = YANDEX_MAP_API_KEY ? `&apikey=${YANDEX_MAP_API_KEY}` : '';
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU${apiKeyParam}`;
    script.async = true;
    script.dataset.yandexMaps = 'luchik';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('ymaps load failed'));
    document.head.appendChild(script);
  });

  return ymapsLoadPromise;
}

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const placemarkRef = useRef<any>(null);
  const [mapInView, setMapInView] = useState(false);

  const goToAddress = (coordinates: [number, number], address: string) => {
    if (!mapInstanceRef.current || !window.ymaps) return;

    if (placemarkRef.current) {
      mapInstanceRef.current.geoObjects.remove(placemarkRef.current);
    }

    mapInstanceRef.current.setCenter(coordinates, 17, { duration: 500 });

    const placemark = new window.ymaps.Placemark(
      coordinates,
      { balloonContent: `Детский центр "Лучик"<br>${address}` },
      { preset: 'islands#redIcon' },
    );

    mapInstanceRef.current.geoObjects.add(placemark);
    placemarkRef.current = placemark;
  };

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMapInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mapInView) return;

    let cancelled = false;

    const initMap = () => {
      if (cancelled || !mapRef.current || mapInstanceRef.current || !window.ymaps) return;

      mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
        center: DEFAULT_CENTER,
        zoom: 16,
        controls: ['zoomControl', 'fullscreenControl'],
      });

      const placemark = new window.ymaps.Placemark(
        DEFAULT_CENTER,
        { balloonContent: `Детский центр "Лучик"<br>${MAP_ADDRESS}` },
        { preset: 'islands#redIcon' },
      );

      mapInstanceRef.current.geoObjects.add(placemark);
      placemarkRef.current = placemark;
    };

    loadYmapsScript()
      .then(() => {
        if (cancelled) return;
        window.ymaps.ready(initMap);
      })
      .catch(() => {
        /* карта не критична для страницы */
      });

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
      placemarkRef.current = null;
    };
  }, [mapInView]);

  const handleAddress1Click = () => {
    if (!mapInView) setMapInView(true);
    window.ymaps?.ready(() => goToAddress(COORDINATES_1, ADDRESS_1));
  };

  const handleAddress2Click = () => {
    if (!mapInView) setMapInView(true);
    window.ymaps?.ready(() => goToAddress(COORDINATES_2, ADDRESS_2));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Failed to load image:', e.currentTarget.src);
  };

  return (
    <section className={styles.mapSection}>
      <div className={styles.mapContainer}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.mapTitle}>Мы на карте</h2>
          <img
            src="/img/map/airplane.svg"
            alt="Самолёт — детский центр Лучик на карте Лиды"
            className={styles.airplane}
            onError={handleImageError}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div ref={mapRef} className={styles.map}>
          <div className={styles.mapOverlay}>
            <div className={styles.overlayCard}>
              <div className={styles.locationIcon}>
                <img
                  src="/img/map/location-icon.svg"
                  alt="Локация детского центра Лучик в Лиде"
                  className={styles.locationIconImage}
                  onError={handleImageError}
                />
              </div>
              <div className={styles.cityName}>г. Лида</div>
              <div className={styles.addressFields}>
                <div className={styles.addressField} onClick={handleAddress1Click}>
                  ул. Замковая, 4
                </div>
                <div className={styles.addressField} onClick={handleAddress2Click}>
                  ул. Тухачевского, 49А
                </div>
              </div>
            </div>
          </div>
          <div className={styles.cowWrapper}>
            <img
              src="/img/map/korovka.svg"
              alt="Божья коровка — символ детского центра Лучик в Лиде"
              className={styles.cowImage}
              onError={handleImageError}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className={styles.boyWrapper}>
            <img
              src="/img/map/boy.svg"
              alt="Ребёнок — детский центр Лучик в Лиде"
              className={styles.boyImage}
              onError={handleImageError}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;

declare global {
  interface Window {
    ymaps: any;
  }
}