import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
  onContactsClick?: () => void;
}

const Header = ({ onContactsClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleContactsClick = () => {
    if (onContactsClick) {
      onContactsClick();
    }
    closeMobileMenu();
  };

  const navLinksContent = (
    <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.navLinksOpen : ''}`}>
      <button
        className={styles.closeButton}
        onClick={closeMobileMenu}
        aria-label="Закрыть меню"
      >
        <span></span>
        <span></span>
      </button>
      <a href="#about" className={styles.navTextLink} onClick={closeMobileMenu}>
        О нас
      </a>
      <a href="#directions" className={styles.navTextLink} onClick={closeMobileMenu}>
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
        <Link to="/" className={styles.logoLink} aria-label="На главную">
          <div className={styles.logo}>
            <img
              src="/img/main/logo.webp"
              alt="Логотип «Лучик»"
              width={260}
              height={80}
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
        <button
          className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.mobileMenuButtonOpen : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

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
          />
        </div>

        {/* Маленькое облако под логотипом */}
        <div className={styles.cloudOne}>
          <img
            src="/img/main/cloud-1.webp"
            alt="Облако"
            width={174}
            height={138}
          />
        </div>

        {/* Пчела слева внизу */}
        <div className={styles.bee}>
          <img
            src="/img/main/bee.webp"
            alt="Пчела"
            width={88}
            height={92}
          />
        </div>

        {/* Облако 2 справа внизу */}
        <div className={styles.cloudTwo}>
          <img
            src="/img/main/cloud-2.webp"
            alt="Облако"
            width={200}
            height={120}
          />
        </div>

        {/* Солнце */}
        <div className={styles.sunContainer}>
          <img
            src="/img/main/sun.webp"
            alt="Солнце"
            width={100}
            height={100}
            className={styles.sun}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
