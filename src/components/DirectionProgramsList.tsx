import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import EnrollmentForm from '@/components/EnrollmentForm';
import { directionPrograms } from '@/data/directionPrograms';
import type { DirectionProgram } from '@/data/directionPrograms';
import styles from './DirectionProgramsList.module.css';

interface DirectionProgramsListProps {
  ageRange: string;
}

const DirectionProgramsList = ({ ageRange }: DirectionProgramsListProps) => {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('пробное занятие');

  const config = directionPrograms[ageRange];
  if (!config) return null;

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    navigate('/thank-you');
  };

  const handleProgramClick = (program: DirectionProgram) => {
    if (program.linkTo) {
      navigate(program.linkTo);
    } else {
      setSelectedCourse(program.title);
      setIsFormOpen(true);
    }
  };

  const handleBackClick = () => {
    navigate('/');
    setTimeout(() => document.getElementById('directions')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.heroSection}>
            <button
              className={styles.backButton}
              onClick={handleBackClick}
              aria-label="К направлениям"
            >
              ← К направлениям
            </button>

            <div className={styles.hero}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>{config.title}</h1>
              <p className={styles.description}>{config.description}</p>
            </div>
          </div>
          </div>

          <div className={styles.programsGrid}>
            {config.programs.map((program) => (
              <article
                key={program.id}
                className={styles.programCard}
                onClick={() => handleProgramClick(program)}
                style={{ '--accent-color': program.accentColor || '#FF6B35' } as React.CSSProperties}
              >
                <div className={styles.cardImageWrapper}>
                  <img
                    src={program.image}
                    alt=""
                    className={styles.cardImage}
                    loading="lazy"
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{program.title}</h3>
                  <p className={styles.cardLead}>{program.lead}</p>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.cardButton}>
                    {program.linkTo ? 'Подробнее' : 'Записаться'}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.ctaWrapper}>
            <button
              className={styles.ctaButton}
              type="button"
              onClick={() => { setSelectedCourse('пробное занятие'); setIsFormOpen(true); }}
              aria-label="Записаться на пробное занятие"
            >
              Записаться на пробное занятие
            </button>
          </div>
        </div>
      </section>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle className={styles.dialogTitle}>Записаться на пробное занятие</DialogTitle>
            <DialogDescription className={styles.dialogDescription}>
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>
          <EnrollmentForm onSuccess={handleFormSuccess} courseName={selectedCourse} compact={true} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DirectionProgramsList;
