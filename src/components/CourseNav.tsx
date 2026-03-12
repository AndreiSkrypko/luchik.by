import { Link } from 'react-router-dom';
import { courseOrder, courseOrder5_10, courseOrder10_17 } from '@/data/courseNav';
import styles from './CourseNav.module.css';

interface CourseNavProps {
  currentCourseId: string;
  ageRange?: '1-5' | '5-10' | '10-17';
}

const CourseNav = ({ currentCourseId, ageRange = '1-5' }: CourseNavProps) => {
  const order = ageRange === '10-17' ? courseOrder10_17 : ageRange === '5-10' ? courseOrder5_10 : courseOrder;
  const listPath = ageRange === '10-17' ? '/age/10-17' : ageRange === '5-10' ? '/age/5-10' : '/age/1-5';
  const listLabel = ageRange === '10-17' ? 'Все курсы 10–17 лет' : ageRange === '5-10' ? 'Все курсы 5–10 лет' : 'Все курсы 1–5 лет';

  const idx = order.findIndex((c) => c.id === currentCourseId);
  if (idx < 0) return null;

  const prev = idx > 0 ? order[idx - 1] : null;
  const next = idx < order.length - 1 ? order[idx + 1] : null;

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
        <Link to={listPath} className={styles.navAll}>
          {listLabel}
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
