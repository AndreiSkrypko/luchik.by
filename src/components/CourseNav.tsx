import { Link } from 'react-router-dom';
import { courseOrder } from '@/data/courseNav';
import styles from './CourseNav.module.css';

interface CourseNavProps {
  currentCourseId: string;
}

const CourseNav = ({ currentCourseId }: CourseNavProps) => {
  const idx = courseOrder.findIndex((c) => c.id === currentCourseId);
  if (idx < 0) return null;

  const prev = idx > 0 ? courseOrder[idx - 1] : null;
  const next = idx < courseOrder.length - 1 ? courseOrder[idx + 1] : null;

  return (
    <nav className={styles.courseNav} aria-label="Навигация по курсам">
      <div className={styles.courseNavInner}>
        {prev ? (
          <Link to={prev.path} className={styles.navLink} data-direction="prev">
            <span className={styles.navLabel}>← Предыдущий курс</span>
            <span className={styles.navTitle}>{prev.title}</span>
          </Link>
        ) : (
          <div className={styles.navPlaceholder} />
        )}
        <Link to="/age/1-5" className={styles.navAll}>
          Все курсы 1–5 лет
        </Link>
        {next ? (
          <Link to={next.path} className={styles.navLink} data-direction="next">
            <span className={styles.navLabel}>Следующий курс →</span>
            <span className={styles.navTitle}>{next.title}</span>
          </Link>
        ) : (
          <div className={styles.navPlaceholder} />
        )}
      </div>
    </nav>
  );
};

export default CourseNav;
