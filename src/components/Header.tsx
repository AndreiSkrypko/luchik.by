import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { contacts } from '@/data/contacts';
import styles from './Header.module.css';

interface HeaderProps {
  onContactsClick?: () => void;
  hideDecorations?: boolean;
}

const Header = ({ onContactsClick, hideDecorations = false }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Добавляем/удаляем data-атрибут на body для скрытия EnrollmentCard при открытом меню
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isMobileMenuOpen) {
        document.body.setAttribute('data-mobile-menu-open', 'true');
      } else {
        document.body.removeAttribute('data-mobile-menu-open');
      }
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const phoneNumber = e.currentTarget.getAttribute('href')?.replace('tel:', '') || 'unknown';
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17904651267',
        'event_category': 'phone',
        'event_label': 'header_phone_click',
        'phone_number': phoneNumber,
        'value': 1.0,
        'currency': 'BYN'
      });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
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

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Если мы на главной странице, скроллим к секции "О нас"
    if (location.pathname === '/') {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Если на другой странице, переходим на главную с якорем
      navigate('/#about', { replace: false });
      // После перехода скроллим к секции
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
    closeMobileMenu();
  };

  const handleDirectionsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Если мы на главной странице, скроллим к секции направлений
    if (location.pathname === '/') {
      const directionsSection = document.getElementById('directions');
      if (directionsSection) {
        directionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Если на другой странице, переходим на главную с якорем
      navigate('/#directions', { replace: false });
      // После перехода скроллим к секции
      setTimeout(() => {
        const directionsSection = document.getElementById('directions');
        if (directionsSection) {
          directionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
    closeMobileMenu();
  };

  const phonesBlock = (
    <div className={styles.phones} aria-label="Телефоны">
      {isMobile ? (
        <a
          href={`tel:${contacts.phoneA1.number}`}
          className={styles.phoneCallBtn}
          onClick={handlePhoneClick}
          aria-label={`Позвонить: ${contacts.phoneA1.display}`}
        >
          <svg className={styles.phoneCallIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.4 21 3 13.6 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.02l-2.2 2.19z"
              fill="currentColor"
            />
          </svg>
          Позвонить
        </a>
      ) : (
        contacts.phones.map((phone) => (
          <a
            key={phone.number}
            href={`tel:${phone.number}`}
            className={styles.phoneLink}
            onClick={handlePhoneClick}
            aria-label={`Позвонить: ${phone.display}`}
          >
            {phone.display}
          </a>
        ))
      )}
    </div>
  );

  const navLinksContent = (
    <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.navLinksOpen : ''}`}>
      {/* Логотип для мобильного меню */}
      {isMobile && (
        <Link
          to="/"
          className={styles.mobileMenuLogo}
          onClick={(e) => {
            handleLogoClick(e);
            closeMobileMenu();
          }}
          aria-label="На главную"
        >
          <img
            src="/img/main/logo.webp"
            alt="Логотип детского центра Лучик в Лиде"
            width={520}
            height={138}
            loading="eager"
            fetchpriority="high"
          />
        </Link>
      )}
      <a href="#about" className={styles.navTextLink} onClick={handleAboutClick}>
        О нас
      </a>
      <a href="#directions" className={styles.navTextLink} onClick={handleDirectionsClick}>
        Направления
      </a>
      <Link to="/gallery" className={styles.navTextLink} onClick={closeMobileMenu}>
        Галерея
      </Link>
      <a href="https://mentor-orpin-two.vercel.app/" className={styles.navTextLink} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
        Обучающая платформа
      </a>
      <Link to="/contacts" className={styles.navTextLink} onClick={closeMobileMenu}>
        Контакты
      </Link>
      {isMobile && (
        <a
          href={`tel:${contacts.phoneA1.number}`}
          className={styles.navTextLink}
          onClick={(e) => {
            handlePhoneClick(e);
            closeMobileMenu();
          }}
        >
          Позвонить
        </a>
      )}
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerBackground}>
        {/* Логотип слева сверху — рендерим через portal в body чтобы быть вне stacking contexts */}
        {typeof window !== 'undefined' &&
          createPortal(
            <Link to="/" className={styles.logoLink} aria-label="На главную" onClick={handleLogoClick}>
              <div className={styles.logo}>
                <img
                  src="/img/main/logo.webp"
                  alt="Логотип детского центра Лучик в Лиде"
                  width={520}
                  height={138}
                  loading="eager"
                  decoding="sync"
                />
              </div>
            </Link>,
            document.body
          )
        }

        {/* Навигация и телефоны */}
        <nav className={styles.navbarRow} aria-label="Основная навигация">
          {isMobile && typeof window !== 'undefined' ? createPortal(navLinksContent, document.body) : navLinksContent}

          <div className={styles.navbarRight}>
            {phonesBlock}
          </div>
        </nav>

        {/* Бургер меню справа вверху */}
        {isMobile && typeof window !== 'undefined' ? (
          createPortal(
            <button
              className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.mobileMenuButtonOpen : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Меню"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>,
            document.body
          )
        ) : (
          <button
            className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.mobileMenuButtonOpen : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        {/* Overlay для закрытия меню (в portal, чтобы быть выше хлебных крошек) */}
        {isMobileMenuOpen &&
          isMobile &&
          typeof window !== 'undefined' &&
          createPortal(
            <div
              className={styles.mobileMenuOverlay}
              onClick={closeMobileMenu}
            />,
            document.body
          )}

        {/* Большие тучи по низу шапки */}
        <div className={styles.clouds}>
            <img
              src="/img/main/clouds.webp"
              alt="Тучи"
              width={1480}
              height={338}
              className={styles.cloudsImage}
              loading="lazy"
              decoding="async"
            />
        </div>

        {/* Маленькое облако под логотипом */}
        {!hideDecorations && (
          <div className={styles.cloudOne}>
            <img
              src="/img/main/cloud-1.webp"
              alt="Облако"
              width={174}
              height={138}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        {/* Пчела слева внизу */}
        {!hideDecorations && (
          <div className={styles.bee}>
            <img
              src="/img/main/bee.webp"
              width={176}
              height={186}
              alt="Пчела"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        {/* Облако 2 справа внизу */}
        {!hideDecorations && (
          <div className={styles.cloudTwo}>
            <img
              src="/img/main/cloud-2.webp"
              alt="Облако"
              width={200}
              height={120}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        {/* Солнце */}
        <div className={styles.sunContainer}>
            <img
              src="/img/main/sun.webp"
              alt="Солнце"
              width={1200}
              height={1184}
              className={styles.sun}
              loading="lazy"
              decoding="async"
            />
        </div>
      </div>
    </header>
  );
};

export default Header;
