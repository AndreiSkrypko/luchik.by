import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
  ,
  {
    id: 18,
    slug: 'english-words',
    title: 'Английский язык',
    lead: 'Тренажёр для развития словарного запаса, чтения и аудирования для детей',
    image: '/img/trainers/english/english.svg',
    program: 'Английский язык',
    accent_color: '#4B9CF5'
  }
];

// Маппинг роутов к названиям программ
const programMap: Record<string, string> = {
  'speed-reading': 'Скорочтение',
  'mental-arithmetic': 'Ментальная арифметика'
  ,'english': 'Английский язык'
};

const TrainerList = () => {
  const { program, classNumber } = useParams<{ program?: string; classNumber?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Detect if we're on English page (either /trainers/english or /trainers/english/class/X)
  const isEnglishPage = location.pathname.startsWith('/trainers/english');
  const effectiveProgram = isEnglishPage ? 'english' : program;
  
  const programName = effectiveProgram ? programMap[effectiveProgram] : null;
  const trainers = programName 
    ? allTrainers.filter(t => t.program === programName)
    : [];
  
  // detect class selection for English: /trainers/english/class/3
  const selectedClass = classNumber || (location.pathname.match(/\/trainers\/english\/class\/([1-9])/)?.[1] ?? null);

  const handleTrainerClick = (trainer: Trainer) => {
    if (trainer.external_url) {
      window.open(trainer.external_url, '_blank');
    } else {
      // Навигация на страницу тренажера
      if (trainer.slug === 'fading-text' && program === 'speed-reading') {
        navigate('/trainers/speed-reading/fading-text');
      } else if (trainer.slug === 'schulte-table' && program === 'speed-reading') {
        navigate('/trainers/speed-reading/schulte-table');
      } else if (trainer.slug === 'stroop-test' && program === 'speed-reading') {
        navigate('/trainers/speed-reading/stroop-test');
      } else if (trainer.slug === 'flash-words' && program === 'speed-reading') {
        navigate('/trainers/speed-reading/flash-words');
      } else if (trainer.slug === 'distribute-words' && program === 'speed-reading') {
        navigate('/trainers/speed-reading/distribute-words');
      } else if (trainer.slug === 'brain-buttons' && program === 'speed-reading') {
        navigate('/trainers/speed-reading/brain-buttons');
      } else if (trainer.slug === 'prosto' && program === 'mental-arithmetic') {
        navigate('/trainers/mental-arithmetic/prosto');
      } else if (trainer.slug === 'brothers' && program === 'mental-arithmetic') {
        navigate('/trainers/mental-arithmetic/brothers');
      } else if (trainer.slug === 'friends' && program === 'mental-arithmetic') {
        navigate('/trainers/mental-arithmetic/friends');
      } else if (trainer.slug === 'friend-brother' && program === 'mental-arithmetic') {
        navigate('/trainers/mental-arithmetic/friend-brother');
      } else if (trainer.slug === 'multiplication-table' && program === 'mental-arithmetic') {
        navigate('/trainers/mental-arithmetic/multiplication-table');
      } else if (trainer.slug === 'multiplication' && program === 'mental-arithmetic') {
        navigate('/trainers/mental-arithmetic/multiplication');
      } else if (trainer.slug === 'multiplication-20' && program === 'mental-arithmetic') {
        navigate('/trainers/mental-arithmetic/multiplication-20');
      } else if (trainer.slug === 'base-multiplication' && program === 'mental-arithmetic') {
        navigate('/trainers/mental-arithmetic/base-multiplication');
      } else if (trainer.slug === 'tricks' && program === 'mental-arithmetic') {
        navigate('/trainers/mental-arithmetic/tricks');
      } else if (trainer.slug === 'squares' && program === 'mental-arithmetic') {
        navigate('/trainers/mental-arithmetic/squares');
      } else if (trainer.slug === 'flashcards' && program === 'mental-arithmetic') {
        navigate('/trainers/mental-arithmetic/flashcards');
      } else {
        // Для других тренажеров - пока заглушка
        console.log('Navigate to trainer:', trainer.slug);
      }
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

  // Special flow for English: choose class 1-9 first
  if (effectiveProgram === 'english' && !selectedClass) {
    const classes = Array.from({ length: 9 }, (_, i) => i + 1);
    return (
      <section className={styles.trainerListSection}>
        <div className={styles.trainerListContainer}>
          <div className={styles.headerSection}>
            <button className={styles.backButton} onClick={handleBackClick}>
              ← К выбору тренажера
            </button>
            <div className={styles.titleSection}>
              <h2 className={styles.trainerListTitle}>Английский язык</h2>
            </div>
          </div>
          <div className={styles.trainersGrid}>
            {classes.map((cls) => (
              <div
                key={cls}
                className={styles.trainerCard}
                onClick={() => navigate(`/trainers/english/class/${cls}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>Класс {cls}</h4>
                  <p className={styles.cardLead}>Тренажёры для {cls}‑го класса</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If a class is selected, show (placeholder) list of trainers for that class
  if (effectiveProgram === 'english' && selectedClass) {
    return (
      <section className={styles.trainerListSection}>
        <div className={styles.trainerListContainer}>
          <div className={styles.headerSection}>
            <button className={styles.backButton} onClick={() => navigate('/trainers/english')}>
              ← К выбору класса
            </button>
            <div className={styles.titleSection}>
              <h2 className={styles.trainerListTitle}>Английский — класс {selectedClass}</h2>
            </div>
          </div>
          <div className={styles.trainersGrid}>
            {/* Пока-заглушки: позже добавим реальные тренажёры для каждого класса */}
            <div className={styles.trainerCard}>
              <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>Словарные карточки</h4>
                <p className={styles.cardLead}>Работа со словарным запасом — упражнения и игры</p>
              </div>
            </div>
            <div className={styles.trainerCard}>
              <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>Чтение</h4>
                <p className={styles.cardLead}>Тексты и задания по чтению для уровня класса</p>
              </div>
            </div>
            <div className={styles.trainerCard}>
              <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>Аудирование</h4>
                <p className={styles.cardLead}>Короткие аудио‑упражнения на понимание</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default trainers list for other programs
  return (
    <section className={styles.trainerListSection}>
      <div className={styles.trainerListContainer}>
        <div className={styles.headerSection}>
          <button className={styles.backButton} onClick={handleBackClick}>
            ← К выбору тренажера
          </button>
          <div className={styles.titleSection}>
            <h2 className={styles.trainerListTitle}>{programName}</h2>
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
    </section>
  );
};

export default TrainerList;

