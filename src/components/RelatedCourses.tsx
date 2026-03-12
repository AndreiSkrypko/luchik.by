import { Link } from 'react-router-dom';
import { courseOrder, courseOrder5_10, courseOrder10_17, relatedCourses, relatedCourses5_10, relatedCourses10_17, type CourseNavItem } from '@/data/courseNav';
import styles from './RelatedCourses.module.css';

interface RelatedCoursesProps {
  currentCourseId: string;
  ageRange?: '1-5' | '5-10' | '10-17';
}

const RelatedCourses = ({ currentCourseId, ageRange = '1-5' }: RelatedCoursesProps) => {
  const order = ageRange === '10-17' ? courseOrder10_17 : ageRange === '5-10' ? courseOrder5_10 : courseOrder;
  const related = ageRange === '10-17' ? relatedCourses10_17 : ageRange === '5-10' ? relatedCourses5_10 : relatedCourses;
  const ids = related[currentCourseId];
  if (!ids?.length) return null;

  const courses = ids
    .map((id) => order.find((c) => c.id === id))
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
