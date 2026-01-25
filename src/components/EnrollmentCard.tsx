import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import styles from './EnrollmentCard.module.css';

const EnrollmentCard = () => {
  const navigate = useNavigate();

  const cardContent = (
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

  // Рендерим через portal в body, чтобы карточка была вне всех stacking contexts
  if (typeof window !== 'undefined') {
    return createPortal(cardContent, document.body);
  }

  return null;
};

export default EnrollmentCard;
