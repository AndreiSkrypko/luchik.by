import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './ContactsPanel.module.css';

interface ContactsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactsPanel = ({ isOpen, onClose }: ContactsPanelProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    // Если мы уже на главной странице, просто скроллим наверх
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Очищаем hash из URL если есть
      if (window.location.hash) {
        window.history.replaceState(null, '', '/');
      }
    } else {
      // Если на другой странице, переходим на главную
      navigate('/', { replace: true });
      // Скроллим наверх после перехода
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 100);
    }
  };
  // Предзагрузка SVG изображений при открытии панели
  useEffect(() => {
    if (isOpen) {
      const svgImages = [
        '/img/socseti/inst.svg',
        '/img/socseti/vk.svg',
        '/img/socseti/ok.svg'
      ];
      
      svgImages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [isOpen]);

  // Добавляем/удаляем data-атрибут на body для скрытия EnrollmentCard при открытой панели контактов
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isOpen) {
        document.body.setAttribute('data-contacts-open', 'true');
      } else {
        document.body.removeAttribute('data-contacts-open');
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    console.error('Failed to load image:', img.src);
    console.error('Image natural dimensions:', img.naturalWidth, 'x', img.naturalHeight);
    console.error('Image complete:', img.complete);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log('Successfully loaded image:', e.currentTarget.src);
  };

  return (
    <>
      <div className={styles.contactsOverlay} onClick={onClose} />
      <div className={styles.contactsPanel}>
        {/* Кнопка закрытия для мобильных */}
        {isMobile && (
          <button
            className={styles.contactsCloseButton}
            onClick={onClose}
            aria-label="Закрыть контакты"
          >
            <span></span>
            <span></span>
          </button>
        )}
        <div className={styles.contactsPanelHeader}>
          {isMobile ? (
            /* Логотип для мобильных */
            <Link
              to="/"
              className={styles.contactsMobileLogo}
              onClick={handleLogoClick}
              aria-label="На главную"
            >
              <img
                src="/img/main/logo.webp"
                alt="Логотип «Лучик»"
                width={200}
                height={62}
                loading="eager"
              />
            </Link>
          ) : (
            /* Облако с заголовком для десктопа */
            <div className={styles.contactsCloudContainer}>
              <img
                src="/img/main/cloud-white.webp"
                alt="Облако"
                width={250}
                height={125}
                className={styles.contactsCloud}
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
              <div className={styles.contactsCloudTitle}>Контакты</div>
              <img
                src="/img/main/cloud-1.webp"
                alt="Белое облако"
                width={70}
                height={55}
                className={styles.contactsWhiteCloud}
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            </div>
          )}
        </div>
        <div className={styles.contactsPanelContent}>
          <div className={styles.contactsFrame}>
            <svg
              width="350"
              height="280"
              viewBox="0 0 350 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.contactsFrameImage}
            >
              <rect opacity="0.65" width="350" height="280" rx="22" fill="white" />
            </svg>
            <img
              src="/img/contacts/cow.webp"
              alt="Коровка"
              width={78}
              height={78}
              className={styles.contactsCow}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            <div className={styles.contactsContent}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <img
                    src="/img/contacts/adress2.webp"
                    alt="Адрес"
                    width={20}
                    height={26}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className={styles.contactInfo}>
                  <div className={styles.contactAddress}>Замковая, 4</div>
                  <a href="tel:+375445523267" className={styles.contactPhone}>+375445523267</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <img
                    src="/img/contacts/adress2.webp"
                    alt="Адрес"
                    width={20}
                    height={26}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className={styles.contactInfo}>
                  <div className={styles.contactAddress}>Кооперативная, 56</div>
                  <a href="tel:+375298667663" className={styles.contactPhone}>+375298667663</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <img
                    src="/img/contacts/mail.webp"
                    alt="Email"
                    width={25}
                    height={25}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className={styles.contactInfo}>
                  <a href="mailto:luchik@.com" className={styles.contactEmail}>luchik@.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/img/contacts/leaf1.webp"
          alt="Листик"
          width={61}
          height={75}
          className={styles.contactsLeaf}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        <div className={styles.contactsSocials}>
          <div className={styles.contactsSocialItem}>
            <div className={styles.contactsSocialIconContainer}>
              <a
                href="https://instagram.com/lu4ik_lida"
                target="_blank"
                rel="noreferrer"
                className={styles.contactsSocialIconLink}
                aria-label="Instagram"
              >
                <img
                  src="/img/socseti/inst.svg"
                  alt="Instagram"
                  width={32}
                  height={32}
                  className={styles.contactsSocialIcon}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </a>
            </div>
            <div className={styles.contactsSocialUsername}>lu4ik_lida</div>
          </div>
          <div className={styles.contactsSocialItem}>
            <div className={styles.contactsSocialIconContainer}>
              <a
                href="https://vk.com/luchiklida"
                target="_blank"
                rel="noreferrer"
                className={styles.contactsSocialIconLink}
                aria-label="VK"
              >
                <img
                  src="/img/socseti/vk.svg"
                  alt="ВКонтакте"
                  width={32}
                  height={32}
                  className={styles.contactsSocialIcon}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </a>
              <a
                href="https://ok.ru/luchiklida"
                target="_blank"
                rel="noreferrer"
                className={styles.contactsSocialIconLink}
                aria-label="Odnoklassniki"
              >
                <img
                  src="/img/socseti/ok.svg"
                  alt="Одноклассники"
                  width={32}
                  height={32}
                  className={styles.contactsSocialIcon}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </a>
            </div>
            <div className={styles.contactsSocialUsername}>luchiklida</div>
          </div>
        </div>
        <div className={styles.contactsScheduleFrame}>
          <div className={styles.contactsScheduleFrameWrapper}>
            <svg
              width="291"
              height="83"
              viewBox="0 0 291 83"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.contactsScheduleFrameBg}
            >
              <rect x="1" y="1" width="289" height="81" rx="40.5" stroke="#777777" strokeWidth="2" />
            </svg>
            <div className={styles.contactsScheduleText}>
              <div className={styles.contactsScheduleLine}>Пн-Пт с 9.00 до 20.00</div>
              <div className={styles.contactsScheduleLine}>Сб,Вс с 10.00 до 18.00</div>
            </div>
            <img
              src="/img/contacts/leaf2.webp"
              alt="Лист"
              width={78}
              height={68}
              className={styles.contactsScheduleLeaf}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactsPanel;

