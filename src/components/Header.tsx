import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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

  const handleContactsClick = () => {
    // Закрываем меню сначала
    closeMobileMenu();
    // Затем открываем панель контактов с небольшой задержкой
    // чтобы меню успело закрыться
    setTimeout(() => {
      if (onContactsClick) {
        onContactsClick();
      }
    }, 150);
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
            alt="Логотип «Лучик»"
            width={520}
            height={138}
            loading="eager"
            fetchPriority="high"
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
      <Link to="/trainers" className={styles.navTextLink} onClick={closeMobileMenu}>
        Тренажеры
      </Link>
      <button
        onClick={handleContactsClick}
        className={styles.navTextLink}
      >
        Контакты
      </button>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerBackground}>
        {/* Логотип слева сверху */}
        <Link to="/" className={styles.logoLink} aria-label="На главную" onClick={handleLogoClick}>
          <div className={styles.logo}>
            <img
              src="/img/main/logo.webp"
              alt="Логотип «Лучик»"
              width={520}
              height={138}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </div>
        </Link>

        {/* Навигация и кнопка «Контакты» */}
        <nav className={styles.navbarRow} aria-label="Основная навигация">
          {isMobile && typeof window !== 'undefined' ? createPortal(navLinksContent, document.body) : navLinksContent}

          <div className={styles.navbarRight}>
            <div className={styles.socials}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIconLink}
                aria-label="Мы в Instagram"
              >
                <img
                  src="/img/socseti/inst.svg"
                  alt="Instagram"
                  width={32}
                  height={32}
                  className={styles.socialIcon}
                />
              </a>
              <a
                href="https://vk.com"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIconLink}
                aria-label="Мы во ВКонтакте"
              >
                <img
                  src="/img/socseti/vk.svg"
                  alt="ВКонтакте"
                  width={32}
                  height={32}
                  className={styles.socialIcon}
                />
              </a>
              <a
                href="https://ok.ru"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIconLink}
                aria-label="Мы в Одноклассниках"
              >
                <img
                  src="/img/socseti/ok.svg"
                  alt="Одноклассники"
                  width={32}
                  height={32}
                  className={styles.socialIcon}
                />
              </a>
            </div>
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

        {/* Overlay для закрытия меню */}
        {isMobileMenuOpen && (
          <div
            className={styles.mobileMenuOverlay}
            onClick={closeMobileMenu}
          />
        )}

        {/* Большие тучи по низу шапки */}
        <div className={styles.clouds}>
          <img
            src="/img/main/clouds.webp"
            alt="Тучи"
            width={1480}
            height={338}
            className={styles.cloudsImage}
            loading="eager"
            fetchPriority="high"
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
            loading="eager"
            fetchPriority="low"
            decoding="async"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
