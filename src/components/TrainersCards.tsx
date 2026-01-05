import styles from './TrainersCards.module.css';

interface Trainer {
  id: number;
  slug: string;
  title: string;
  lead: string;
  image: string;
  external_url?: string;
  program: string;
  accent_color: string;
}

interface TrainersCardsProps {
  trainers?: Trainer[];
}

// Моковые данные для демонстрации (позже будут загружаться с API)
const mockTrainers: Trainer[] = [
  // Скорочтение
  {
    id: 1,
    slug: 'fading-text',
    title: 'Исчезающий текст',
    lead: 'Упражнение помогает развивать скорость и технику чтения: ребёнку нужно успеть прочитать фразу до того, как она исчезнет',
    image: '/img/trainers/speed-reading/fading-text.svg',
    program: 'Скорочтение',
    accent_color: '#FF6B35'
  },
  {
    id: 2,
    slug: 'schulte-table',
    title: 'Таблица Шульте',
    lead: 'Классическая таблица Шульте учит концентрироваться и держать взгляд на всей поверхности поля',
    image: '/img/trainers/speed-reading/schulte-table.svg',
    program: 'Скорочтение',
    accent_color: '#FF6B35'
  },
  {
    id: 3,
    slug: 'stroop-test',
    title: 'Тест Струпа',
    lead: 'Карточки с названиями цветов, написанными разными оттенками, развивают переключаемость внимания',
    image: '/img/trainers/speed-reading/stroop-test.svg',
    program: 'Скорочтение',
    accent_color: '#FF6B35'
  },
  {
    id: 4,
    slug: 'flash-words',
    title: 'Флеш-слова',
    lead: 'На экране всплывают слова с заданной скоростью. Их нужно запомнить и воспроизвести в той же последовательности',
    image: '/img/trainers/speed-reading/flash-words.svg',
    program: 'Скорочтение',
    accent_color: '#FF6B35'
  },
  {
    id: 5,
    slug: 'distribute-words',
    title: 'Распредели слова',
    lead: 'Нужно быстро разложить слова по заданным категориям. Задание прокачивает умение анализировать и классифицировать информацию',
    image: '/img/trainers/speed-reading/distribute-words.svg',
    program: 'Скорочтение',
    accent_color: '#FF6B35'
  },
  {
    id: 6,
    slug: 'brain-buttons',
    title: 'Кнопки мозга',
    lead: 'На экране мелькают ладошки с разными жестами, которые нужно тут же повторять. Развивает ловкость и координацию',
    image: '/img/trainers/speed-reading/brain-buttons.svg',
    program: 'Скорочтение',
    accent_color: '#FF6B35'
  },
  // Ментальная арифметика
  {
    id: 7,
    slug: 'prosto',
    title: 'Просто',
    lead: 'Тренировки на базовые вычисления и уверенную работу с маленькими числами. Подходит для быстрого разогрева',
    image: '/img/trainers/mental-arithmetic/prosto.svg',
    program: 'Ментальная арифметика',
    accent_color: '#FF6B35'
  },
  {
    id: 8,
    slug: 'brothers',
    title: 'Братья',
    lead: 'Учимся находить связи между соседними числами и быстро определять результат без механического пересчёта',
    image: '/img/trainers/mental-arithmetic/brothers.svg',
    program: 'Ментальная арифметика',
    accent_color: '#FF6B35'
  },
  {
    id: 9,
    slug: 'friends',
    title: 'Друзья',
    lead: 'Ищем пары чисел, которые составляют заданную сумму. Развивает внимательность и мгновенное узнавание комбинаций',
    image: '/img/trainers/mental-arithmetic/friends.svg',
    program: 'Ментальная арифметика',
    accent_color: '#FF6B35'
  },
  {
    id: 10,
    slug: 'friend-brother',
    title: 'Друг+брат',
    lead: 'Комбинируем сразу две стратегии: находим «друзей» и «братьев» в одном задании. Тренирует переключение внимания',
    image: '/img/trainers/mental-arithmetic/friend-brother.svg',
    program: 'Ментальная арифметика',
    accent_color: '#FF6B35'
  },
  {
    id: 11,
    slug: 'multiplication-table',
    title: 'Таблица умножения',
    lead: 'Повторяем классическую таблицу умножения в игровом формате. Закрепляем память и скорость воспроизведения фактов',
    image: '/img/trainers/mental-arithmetic/multiplication-table.svg',
    program: 'Ментальная арифметика',
    accent_color: '#FF6B35'
  },
  {
    id: 12,
    slug: 'multiplication',
    title: 'Умножение',
    lead: 'Практикуем перемножение двузначных и трёхзначных чисел в уме. Укрепляем арифметику и концентрацию',
    image: '/img/trainers/mental-arithmetic/multiplication.svg',
    program: 'Ментальная арифметика',
    accent_color: '#FF6B35'
  },
  {
    id: 13,
    slug: 'multiplication-20',
    title: 'Умножение до 20',
    lead: 'Особый тренажёр на быстрый счёт в пределах двадцати. Помогает уверенно переходить к большим числам',
    image: '/img/trainers/mental-arithmetic/multiplication-20.svg',
    program: 'Ментальная арифметика',
    accent_color: '#FF6B35'
  },
  {
    id: 14,
    slug: 'base-multiplication',
    title: 'Умножение от базы',
    lead: 'Осваиваем технику умножения от ближайшей базы (10, 50, 100). Идеально для олимпиадных задач',
    image: '/img/trainers/mental-arithmetic/base-multiplication.svg',
    program: 'Ментальная арифметика',
    accent_color: '#FF6B35'
  },
  {
    id: 15,
    slug: 'tricks',
    title: 'Хитрости',
    lead: 'Собираем математические лайфхаки: сокращения, приёмы и быстрые способы решений, чтобы считать непривычные примеры',
    image: '/img/trainers/mental-arithmetic/tricks.svg',
    program: 'Ментальная арифметика',
    accent_color: '#FF6B35'
  },
  {
    id: 16,
    slug: 'squares',
    title: 'Квадраты',
    lead: 'Запоминаем квадраты чисел и учимся находить их в голову. Поможет в алгебраических преобразованиях',
    image: '/img/trainers/mental-arithmetic/squares.svg',
    program: 'Ментальная арифметика',
    accent_color: '#FF6B35'
  },
  {
    id: 17,
    slug: 'flashcards',
    title: 'Флэшкарты',
    lead: 'Комбинируем визуальные карточки с числами и ответами. Отличный способ отработать реакции и закрепить результаты',
    image: '/img/trainers/mental-arithmetic/flashcards.svg',
    program: 'Ментальная арифметика',
    accent_color: '#FF6B35'
  }
];

const TrainersCards = ({ trainers = mockTrainers }: TrainersCardsProps) => {
  // Группируем тренажеры по программам
  const trainersByProgram = trainers.reduce((acc, trainer) => {
    if (!acc[trainer.program]) {
      acc[trainer.program] = [];
    }
    acc[trainer.program].push(trainer);
    return acc;
  }, {} as Record<string, Trainer[]>);

  const handleTrainerClick = (trainer: Trainer) => {
    if (trainer.external_url) {
      window.open(trainer.external_url, '_blank');
    } else {
      // Позже будет навигация на страницу тренажера
      console.log('Navigate to trainer:', trainer.slug);
    }
  };

  return (
    <section className={styles.trainersSection}>
      <div className={styles.trainersContainer}>
        <h2 className={styles.trainersTitle}>Тренажеры развития</h2>
        
        {Object.entries(trainersByProgram).map(([program, programTrainers]) => (
          <div key={program} className={styles.programGroup}>
            <h3 className={styles.programTitle}>{program}</h3>
            <div className={styles.trainersGrid}>
              {programTrainers.map((trainer) => (
                <div
                  key={trainer.id}
                  className={styles.trainerCard}
                  onClick={() => handleTrainerClick(trainer)}
                  style={{
                    '--accent-color': trainer.accent_color,
                  } as React.CSSProperties}
                >
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={trainer.image}
                      alt={trainer.title}
                      className={styles.cardImage}
                      onError={(e) => {
                        const img = e.currentTarget;
                        // Предотвращаем бесконечный цикл ошибок
                        if (img.src.includes('placeholder.svg')) {
                          img.style.display = 'none';
                          return;
                        }
                        img.src = '/img/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h4 className={styles.cardTitle}>{trainer.title}</h4>
                    <p className={styles.cardLead}>{trainer.lead}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardButton}>Начать тренировку</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrainersCards;

