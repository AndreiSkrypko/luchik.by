import { useNavigate } from 'react-router-dom';
import styles from './ProgramCards.module.css';

interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  route: string;
}

const programs: Program[] = [
  {
    id: 'speed-reading',
    title: 'Скорочтение',
    description: 'Тренажеры для развития быстрого чтения, концентрации внимания и улучшения памяти',
    image: '/img/trainers/speed-reading/fading-text.svg',
    route: '/trainers/speed-reading'
  },
  {
    id: 'mental-arithmetic',
    title: 'Ментальная арифметика',
    description: 'Тренажеры для тренировки устного счёта и развития математических навыков',
    image: '/img/trainers/mental-arithmetic/multiplication-table.svg',
    route: '/trainers/mental-arithmetic'
  }
  ,
  {
    id: 'languages',
    title: 'Английский язык',
    description: 'Тренажеры для изучения иностранных языков: флеш-карточки и упражнения на запоминание слов',
    image: '/img/trainers/mental-arithmetic/multiplication-table.svg',
    route: '/trainers/languages'
  }
];

const ProgramCards = () => {
  const navigate = useNavigate();

  const handleProgramClick = (route: string) => {
    navigate(route);
  };

  return (
    <section className={styles.programsSection}>
      <div className={styles.programsContainer}>
        <div className={styles.titleSection}>
          <h2 className={styles.programsTitle}>Тренажеры развития</h2>
          <p className={styles.programsDescription}>
            Здесь собраны тренажеры, по которым занимаются наши ученики. 
            Каждый тренажер помогает развивать важные навыки: скорость чтения, 
            концентрацию внимания, память и математические способности.
          </p>
          </div>
        <div className={styles.programsGrid}>
          {programs.map((program) => (
            <div
              key={program.id}
              className={styles.programCard}
              onClick={() => handleProgramClick(program.route)}
            >
              <div className={styles.cardImageWrapper}>
                <img
                  src={program.image}
                  alt={program.title}
                  className={styles.cardImage}
                  loading="eager"
                  onError={(e) => {
                    const img = e.currentTarget;
                    // Предотвращаем бесконечный цикл ошибок
                    if (img.src.includes('placeholder.svg') || img.dataset.fallback === 'used') {
                      img.style.display = 'none';
                      return;
                    }
                    img.dataset.fallback = 'used';
                    img.src = '/img/placeholder.svg';
                  }}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{program.title}</h3>
                <p className={styles.cardDescription}>{program.description}</p>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.cardButton}>Перейти к тренажерам</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramCards;

