import { Link } from 'react-router-dom';
import { courseOrder, relatedCourses, type CourseNavItem } from '@/data/courseNav';
import styles from './RelatedCourses.module.css';

interface RelatedCoursesProps {
  currentCourseId: string;
}

const RelatedCourses = ({ currentCourseId }: RelatedCoursesProps) => {
  const ids = relatedCourses[currentCourseId];
  if (!ids?.length) return null;

  const courses = ids
    .map((id) => courseOrder.find((c) => c.id === id))
    .filter((c): c is CourseNavItem => c != null);

  if (!courses.length) return null;

  return (
    <section className={styles.relatedSection} aria-label="Похожие курсы">
      <h2 className={styles.relatedHeading}>Смотрите также</h2>
      <div className={styles.relatedGrid}>
        {courses.map((course) => (
          <Link
            key={course.id}
            to={course.path}
            className={styles.relatedCard}
          >
            <span className={styles.relatedTitle}>{course.title}</span>
            <span className={styles.relatedArrow}>→</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedCourses;
