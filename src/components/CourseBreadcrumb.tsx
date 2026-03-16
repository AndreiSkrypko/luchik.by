import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import styles from '@/pages/course/CoursePage.module.css';

interface CourseBreadcrumbProps {
  to: string;
  label: string;
}

/**
 * Хлебная крошка «Назад к программам» — рендерим через portal в body,
 * чтобы не пряталась за карточками при прокрутке на мобильных.
 */
const CourseBreadcrumb = ({ to, label }: CourseBreadcrumbProps) => {
  const navigate = useNavigate();

  const button = (
    <button
      className={styles.backButton}
      onClick={() => navigate(to)}
      aria-label={label}
    >
      ← {label}
    </button>
  );

  return typeof document !== 'undefined'
    ? createPortal(button, document.body)
    : null;
};

export default CourseBreadcrumb;
