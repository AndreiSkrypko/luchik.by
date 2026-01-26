import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import styles from './EnrollmentCard.module.css';

const EnrollmentCard = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;

    // Функция для скрытия карточки через 3 секунды
    const scheduleHide = () => {
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    // Первоначальное скрытие через 3 секунды
    scheduleHide();

    // Обработчик прокрутки
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Прокрутили вниз - показываем карточку
        clearTimeout(hideTimer);
        setIsVisible(true);
        setHasScrolled(true);
      } else {
        // Прокрутили обратно наверх - снова скрываем через 3 секунды
        setHasScrolled(false);
        scheduleHide();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(hideTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cardContent = (
    <button
      className={`${styles.enrollmentCard} ${isVisible ? styles.visible : styles.hidden}`}
      type="button"
      onClick={() => {
        navigate('/enrollment');
      }}
      aria-label="Записаться на подготовку к школе"
    >
      <span className={styles.enrollmentCardBadge}>
        ✨ Актуальный набор
        <span className={styles.clickHint}> → Кликните для записи</span>
      </span>
      <span className={styles.enrollmentCardTitle}>Набор на подготовку к школе</span>
    </button>
  );

  // Рендерим через portal в body, чтобы карточка была вне всех stacking contexts
  if (typeof window !== 'undefined') {
    return createPortal(cardContent, document.body);
  }

  return null;
};

export default EnrollmentCard;
