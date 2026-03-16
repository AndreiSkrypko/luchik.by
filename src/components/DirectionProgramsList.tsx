import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import EnrollmentForm from '@/components/EnrollmentForm';
import { directionPrograms } from '@/data/directionPrograms';
import type { DirectionProgram } from '@/data/directionPrograms';
import styles from './DirectionProgramsList.module.css';
import modalStyles from './EnrollmentModal.module.css';

import mamaMalyshImg from '@/assets/directions/mama-malysh.webp';
import legoRazvivaykaImg from '@/assets/directions/lego-razvivayka.webp';
import complexImg from '@/assets/directions/complex.webp';
import logopedImg from '@/assets/directions/logoped.webp';
import artStudioImg from '@/assets/directions/art-studio.webp';
import legoLogopedImg from '@/assets/directions/lego-logoped.webp';
import prep2yearImg from '@/assets/directions/prep-2year.webp';
import prepSchoolImg from '@/assets/directions/prep-school.webp';
import legoMathImg from '@/assets/directions/lego-math.webp';
import logicSpeedReadingImg from '@/assets/directions/logic-speed-reading.webp';
import englishImg from '@/assets/directions/english.webp';
import chessImg from '@/assets/directions/chess.webp';
import programmingScratchImg from '@/assets/directions/programming-scratch.webp';
import programmingMinecraftImg from '@/assets/directions/programming-minecraft.webp';
import programmingRobloxImg from '@/assets/directions/programming-roblox.webp';
import programmingVrImg from '@/assets/directions/programming-vr.webp';
import roboticsImg from '@/assets/directions/robotics.webp';
import mentalArithmeticImg from '@/assets/directions/mental-arithmetic.webp';
import tutorImg from '@/assets/directions/tutor.webp';
import modeling3dImg from '@/assets/directions/3d-modeling.webp';
import robotics10_17Img from '@/assets/directions/robotics-10-17.webp';
import arduinoElectronicsImg from '@/assets/directions/arduino-electronics.webp';
import programmingPythonImg from '@/assets/directions/programming-python.webp';
import programmingJavascriptImg from '@/assets/directions/programming-javascript.webp';
import webDevelopmentImg from '@/assets/directions/web-development.webp';
import modeling3dBlenderImg from '@/assets/directions/3d-blender.webp';
import programmingVr10_17Img from '@/assets/directions/programming-vr-10-17.webp';
import programmingRoblox10_17Img from '@/assets/directions/programming-roblox-10-17.webp';
import circuitDesignImg from '@/assets/directions/circuit-design.webp';
import artificialIntelligenceImg from '@/assets/directions/artificial-intelligence.webp';

const BUTTON_COLORS = ['#FF6B35', '#4B9CF5', '#27AE60', '#9B59B6', '#E74C3C', '#F39C12'];

const directionImageOverrides: Record<string, string> = {
  'mama-malysh': mamaMalyshImg,
  'lego-razvivayka': legoRazvivaykaImg,
  'complex': complexImg,
  'logoped': logopedImg,
  'art-studio': artStudioImg,
  'lego-logoped': legoLogopedImg,
  'prep-2year': prep2yearImg,
  'prep-school': prepSchoolImg,
  'lego-math': legoMathImg,
  'logic-speed-reading': logicSpeedReadingImg,
  'english': englishImg,
  'chess': chessImg,
  'programming-scratch': programmingScratchImg,
  'programming-minecraft': programmingMinecraftImg,
  'programming-roblox': programmingRobloxImg,
  'programming-vr': programmingVrImg,
  'robotics': roboticsImg,
  'mental-arithmetic': mentalArithmeticImg,
  'tutor': tutorImg,
  '3d-modeling': modeling3dImg,
  'robotics-10-17': robotics10_17Img,
  'arduino-electronics': arduinoElectronicsImg,
  'programming-python': programmingPythonImg,
  'programming-javascript': programmingJavascriptImg,
  'web-development': webDevelopmentImg,
  '3d-blender': modeling3dBlenderImg,
  'programming-vr-10-17': programmingVr10_17Img,
  'programming-roblox-10-17': programmingRoblox10_17Img,
  'circuit-design': circuitDesignImg,
  'artificial-intelligence': artificialIntelligenceImg,
};

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

  const breadcrumbButton = (
    <button
      className={styles.backButton}
      onClick={handleBackClick}
      aria-label="К направлениям"
    >
      ← К направлениям
    </button>
  );

  return (
    <>
      {typeof document !== 'undefined' && createPortal(breadcrumbButton, document.body)}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.heroSection}>
            <div className={styles.breadcrumbWrapper} aria-hidden="true" />

            <div className={styles.hero}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>{config.title}</h1>
              <p className={styles.description}>{config.description}</p>
            </div>
          </div>
          </div>

          <div className={styles.programsGrid}>
            {config.programs.map((program, index) => (
              <article
                key={program.id}
                className={styles.programCard}
                onClick={() => handleProgramClick(program)}
                style={{ '--accent-color': BUTTON_COLORS[index % BUTTON_COLORS.length] } as React.CSSProperties}
              >
                <div className={styles.cardImageWrapper}>
                  <img
                    src={directionImageOverrides[program.id] ?? program.image}
                    alt={`${program.title} в Лиде, детский центр Лучик`}
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
        <DialogContent className={modalStyles.content}>
          <DialogHeader className={modalStyles.header}>
            <DialogTitle className={modalStyles.title}>Записаться на пробное занятие</DialogTitle>
            <DialogDescription className={modalStyles.description}>
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
