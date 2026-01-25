import { useNavigate, useLocation } from 'react-router-dom';
import styles from './EnrollmentCard.module.css';

const EnrollmentCard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Не показываем карточку на странице записи
  if (location.pathname === '/enrollment') {
    return null;
  }

  return (
    <button
      className={styles.enrollmentCard}
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
};

export default EnrollmentCard;
