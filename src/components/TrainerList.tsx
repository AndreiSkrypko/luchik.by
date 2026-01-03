import { useParams, useNavigate } from 'react-router-dom';
import styles from './TrainerList.module.css';

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

// Все тренажеры
const allTrainers: Trainer[] = [
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

// Маппинг роутов к названиям программ
const programMap: Record<string, string> = {
  'speed-reading': 'Скорочтение',
  'mental-arithmetic': 'Ментальная арифметика'
};

const TrainerList = () => {
  const { program } = useParams<{ program: string }>();
  const navigate = useNavigate();

  const programName = program ? programMap[program] : null;
  const trainers = programName 
    ? allTrainers.filter(t => t.program === programName)
    : [];

  const handleTrainerClick = (trainer: Trainer) => {
    if (trainer.external_url) {
      window.open(trainer.external_url, '_blank');
    } else {
      // Позже будет навигация на страницу тренажера
      console.log('Navigate to trainer:', trainer.slug);
    }
  };

  const handleBackClick = () => {
    navigate('/trainers');
  };

  if (!programName) {
    return (
      <section className={styles.trainerListSection}>
        <div className={styles.trainerListContainer}>
          <p>Направление не найдено</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.trainerListSection}>
      <div className={styles.trainerListContainer}>
        <div className={styles.headerSection}>
          <button className={styles.backButton} onClick={handleBackClick}>
            ← К выбору тренажера
          </button>
          <div className={styles.titleSection}>
            <h2 className={styles.trainerListTitle}>{programName}</h2>
            <p className={styles.trainerListSubtitle}>
              Выберите тренажер для начала тренировки
            </p>
          </div>
        </div>
        <div className={styles.decorations}>
          <div className={styles.beeWrapper}>
            <img
              src="/img/main/bee.webp"
              alt="Пчела"
              width={88}
              height={92}
              className={styles.bee}
            />
          </div>
          <div className={styles.cloudWrapper}>
            <img
              src="/img/main/cloud-2.webp"
              alt="Облако"
              width={200}
              height={120}
              className={styles.cloud}
            />
          </div>
        </div>
        <div className={styles.trainersGrid}>
          {trainers.map((trainer) => (
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
                    e.currentTarget.src = '/img/placeholder.svg';
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
    </section>
  );
};

export default TrainerList;

