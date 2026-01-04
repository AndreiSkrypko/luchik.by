import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FlashWordsTrainer.module.css';

const SPEED_MIN = 0.05;
const SPEED_MAX = 4.0;
const SPEED_STEP = 0.05;
const SPEED_MID = 0.8;
const SPEED_SLIDER_MIN = SPEED_MIN / SPEED_STEP; // 1
const SPEED_SLIDER_MAX = SPEED_MAX / SPEED_STEP; // 80
const SPEED_SLIDER_STEP = 1;

const MIN_WORDS = 2;

type Stage = 'idle' | 'setup' | 'show' | 'recall' | 'result';

type SessionWord = {
  id: number;
  text: string;
};

type DeckCard = {
  id: number;
  front_text: string;
  back_text: string;
  hint: string;
  order: number;
};

type RecallWord = SessionWord & {
  status: 'idle' | 'correct' | 'incorrect';
};

type Deck = {
  id: number;
  slug: string;
  title: string;
  description: string;
  accent_color?: string | null;
  cards: DeckCard[];
};

type SessionPayload = {
  deck: {
    slug: string;
    title: string;
    accent_color?: string | null;
  };
  speed: number;
  word_count: number;
  sequence: SessionWord[];
  recall: SessionWord[];
};

// Хардкод колод из миграции
const HARDCODED_DECKS: Deck[] = [
  {
    id: 1,
    slug: 'flash-words-level-1',
    title: 'а, у, о, м, с (1) — 11 слов(а)',
    description: 'Комбинации букв а, у, о, м, с для тренировки памяти.',
    accent_color: '#FF9F68',
    cards: [
      { id: 1, front_text: 'ас', back_text: '', hint: '', order: 1 },
      { id: 2, front_text: 'ам', back_text: '', hint: '', order: 2 },
      { id: 3, front_text: 'ум', back_text: '', hint: '', order: 3 },
      { id: 4, front_text: 'ус', back_text: '', hint: '', order: 4 },
      { id: 5, front_text: 'ос', back_text: '', hint: '', order: 5 },
      { id: 6, front_text: 'ом', back_text: '', hint: '', order: 6 },
      { id: 7, front_text: 'ма', back_text: '', hint: '', order: 7 },
      { id: 8, front_text: 'со', back_text: '', hint: '', order: 8 },
      { id: 9, front_text: 'су', back_text: '', hint: '', order: 9 },
      { id: 10, front_text: 'му', back_text: '', hint: '', order: 10 },
      { id: 11, front_text: 'са', back_text: '', hint: '', order: 11 },
    ],
  },
  {
    id: 2,
    slug: 'flash-words-set-1',
    title: 'Набор 1 (4 буквы) — 15 слов(а)',
    description: 'Подборка коротких слов из четырёх букв.',
    accent_color: '#FF9F68',
    cards: [
      { id: 12, front_text: 'День', back_text: '', hint: '', order: 1 },
      { id: 13, front_text: 'Груз', back_text: '', hint: '', order: 2 },
      { id: 14, front_text: 'Туча', back_text: '', hint: '', order: 3 },
      { id: 15, front_text: 'Печь', back_text: '', hint: '', order: 4 },
      { id: 16, front_text: 'Мыло', back_text: '', hint: '', order: 5 },
      { id: 17, front_text: 'Шило', back_text: '', hint: '', order: 6 },
      { id: 18, front_text: 'Рама', back_text: '', hint: '', order: 7 },
      { id: 19, front_text: 'Очки', back_text: '', hint: '', order: 8 },
      { id: 20, front_text: 'Аист', back_text: '', hint: '', order: 9 },
      { id: 21, front_text: 'Мост', back_text: '', hint: '', order: 10 },
      { id: 22, front_text: 'Небо', back_text: '', hint: '', order: 11 },
      { id: 23, front_text: 'Крот', back_text: '', hint: '', order: 12 },
      { id: 24, front_text: 'Лифт', back_text: '', hint: '', order: 13 },
      { id: 25, front_text: 'Соль', back_text: '', hint: '', order: 14 },
      { id: 26, front_text: 'Волк', back_text: '', hint: '', order: 15 },
    ],
  },
  {
    id: 3,
    slug: 'flash-words-set-2',
    title: 'Набор 2 (3 буквы) — 15 слов(а)',
    description: 'Подборка коротких слов из трёх букв.',
    accent_color: '#FF9F68',
    cards: [
      { id: 27, front_text: 'Лес', back_text: '', hint: '', order: 1 },
      { id: 28, front_text: 'Мак', back_text: '', hint: '', order: 2 },
      { id: 29, front_text: 'Дым', back_text: '', hint: '', order: 3 },
      { id: 30, front_text: 'Сок', back_text: '', hint: '', order: 4 },
      { id: 31, front_text: 'Рак', back_text: '', hint: '', order: 5 },
      { id: 32, front_text: 'Пар', back_text: '', hint: '', order: 6 },
      { id: 33, front_text: 'Мяч', back_text: '', hint: '', order: 7 },
      { id: 34, front_text: 'Бак', back_text: '', hint: '', order: 8 },
      { id: 35, front_text: 'Зуб', back_text: '', hint: '', order: 9 },
      { id: 36, front_text: 'Дуб', back_text: '', hint: '', order: 10 },
      { id: 37, front_text: 'Дом', back_text: '', hint: '', order: 11 },
      { id: 38, front_text: 'Лак', back_text: '', hint: '', order: 12 },
      { id: 39, front_text: 'Чек', back_text: '', hint: '', order: 13 },
      { id: 40, front_text: 'Лук', back_text: '', hint: '', order: 14 },
      { id: 41, front_text: 'Пёс', back_text: '', hint: '', order: 15 },
    ],
  },
  {
    id: 4,
    slug: 'flash-words-colors',
    title: 'Цвета — 15 слов(а)',
    description: 'Цвета и оттенки для запоминания.',
    accent_color: '#FF9F68',
    cards: [
      { id: 42, front_text: 'синий', back_text: '', hint: '', order: 1 },
      { id: 43, front_text: 'красный', back_text: '', hint: '', order: 2 },
      { id: 44, front_text: 'желтый', back_text: '', hint: '', order: 3 },
      { id: 45, front_text: 'оранжевый', back_text: '', hint: '', order: 4 },
      { id: 46, front_text: 'фиолетовый', back_text: '', hint: '', order: 5 },
      { id: 47, front_text: 'чёрный', back_text: '', hint: '', order: 6 },
      { id: 48, front_text: 'коричневый', back_text: '', hint: '', order: 7 },
      { id: 49, front_text: 'бирюзовый', back_text: '', hint: '', order: 8 },
      { id: 50, front_text: 'розовый', back_text: '', hint: '', order: 9 },
      { id: 51, front_text: 'белый', back_text: '', hint: '', order: 10 },
      { id: 52, front_text: 'голубой', back_text: '', hint: '', order: 11 },
      { id: 53, front_text: 'салатовый', back_text: '', hint: '', order: 12 },
      { id: 54, front_text: 'горчичный', back_text: '', hint: '', order: 13 },
      { id: 55, front_text: 'пудровый', back_text: '', hint: '', order: 14 },
      { id: 56, front_text: 'зелёный', back_text: '', hint: '', order: 15 },
    ],
  },
];

const formatSeconds = (value: number): string => {
  if (value < 1) {
    return `${(value * 1000).toFixed(0)} мс`;
  }
  return `${value.toFixed(2)} сек.`;
};

const formatDuration = (milliseconds: number): string => {
  const totalSeconds = Math.round(milliseconds / 100) / 10;
  if (totalSeconds < 1) {
    return `${milliseconds.toFixed(0)} мс`;
  }
  return `${totalSeconds.toFixed(1)} сек.`;
};

const speedToSlider = (speed: number) => Math.round(speed / SPEED_STEP);
const sliderToSpeed = (value: number) => value * SPEED_STEP;

const shuffleArray = <T,>(input: T[]): T[] => {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const FlashWordsTrainer = () => {
  const navigate = useNavigate();
  const [decks] = useState<Deck[]>(HARDCODED_DECKS);
  const [activeDeckSlug, setActiveDeckSlug] = useState<string | null>(null);

  const [speedSliderValue, setSpeedSliderValue] = useState(speedToSlider(0.8));
  const speedSeconds = useMemo(() => sliderToSpeed(speedSliderValue), [speedSliderValue]);

  const [wordCount, setWordCount] = useState<number>(MIN_WORDS);
  const [stage, setStage] = useState<Stage>('idle');
  const [isTrainingView, setIsTrainingView] = useState(false);
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recallWords, setRecallWords] = useState<RecallWord[]>([]);
  const [expectedIndex, setExpectedIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [recallDurationMs, setRecallDurationMs] = useState(0);
  const recallStartRef = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const activeDeck = useMemo(() => decks.find((deck) => deck.slug === activeDeckSlug) ?? null, [activeDeckSlug, decks]);
  const maxWordCount = useMemo(() => (activeDeck ? Math.max(MIN_WORDS, activeDeck.cards.length) : MIN_WORDS), [activeDeck]);
  const midWordMark = useMemo(() => {
    const max = Math.max(MIN_WORDS, maxWordCount);
    return Math.max(MIN_WORDS, Math.round((MIN_WORDS + max) / 2));
  }, [maxWordCount]);

  useEffect(() => {
    if (!activeDeck) {
      setWordCount(MIN_WORDS);
      return;
    }
    if (wordCount > activeDeck.cards.length) {
      setWordCount(Math.max(MIN_WORDS, activeDeck.cards.length));
    }
  }, [activeDeck, wordCount]);

  useEffect(() => {
    if (stage !== 'show' && stage !== 'recall') {
      return;
    }
    stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [stage]);

  const applyDeckSelection = useCallback((deck: Deck) => {
    setActiveDeckSlug(deck.slug);
    setWordCount((previous) => {
      const limit = Math.max(MIN_WORDS, deck.cards.length);
      return Math.min(limit, Math.max(MIN_WORDS, previous));
    });
  }, []);

  const handleSelectDeck = useCallback(
    (deck: Deck) => {
      if (stage === 'show' || stage === 'recall') {
        return;
      }
      applyDeckSelection(deck);
    },
    [applyDeckSelection, stage],
  );

  const generateSession = useCallback(
    (deck: Deck, speed: number, count: number): SessionPayload => {
      const selectedCards = shuffleArray(deck.cards).slice(0, count);
      const sequence: SessionWord[] = selectedCards.map((card, index) => ({
        id: card.id,
        text: card.front_text,
      }));
      const recall: SessionWord[] = shuffleArray([...sequence]);

      return {
        deck: {
          slug: deck.slug,
          title: deck.title,
          accent_color: deck.accent_color,
        },
        speed,
        word_count: count,
        sequence,
        recall,
      };
    },
    []
  );

  const startSession = useCallback(
    (deckSlug?: string, options?: { wordCount?: number }) => {
      const targetSlug = deckSlug ?? activeDeckSlug;
      if (!targetSlug) {
        return;
      }

      const targetDeck = decks.find((deck) => deck.slug === targetSlug) ?? null;
      if (!targetDeck) {
        return;
      }
      if (!targetDeck.cards.length) {
        return;
      }

      const deckLimit = Math.max(MIN_WORDS, targetDeck.cards.length);
      const resolvedWordCount = Math.min(deckLimit, Math.max(MIN_WORDS, options?.wordCount ?? wordCount));

      applyDeckSelection(targetDeck);

      const payload = generateSession(targetDeck, speedSeconds, resolvedWordCount);
      setSession(payload);
      setStage('show');
      setCurrentIndex(0);
      setExpectedIndex(0);
      setMistakes(0);
      setRecallDurationMs(0);
      setRecallWords([]);
      recallStartRef.current = null;
      setWordCount(resolvedWordCount);
      setIsTrainingView(true);
    },
    [activeDeckSlug, applyDeckSelection, decks, speedSeconds, wordCount, generateSession],
  );

  const handleApplyTrainingSettings = useCallback(() => {
    if (!activeDeckSlug) {
      return;
    }
    startSession(activeDeckSlug, { wordCount });
  }, [activeDeckSlug, startSession, wordCount]);

  const handleRecallClick = useCallback(
    (word: RecallWord) => {
      if (stage !== 'recall' || !session) {
        return;
      }
      if (word.status === 'correct') {
        return;
      }

      const expectedWord = session.sequence[expectedIndex];
      if (!expectedWord) {
        return;
      }

      if (word.id === expectedWord.id) {
        setRecallWords((prev) =>
          prev.map((item) => {
            if (item.id === word.id) {
              return { ...item, status: 'correct' };
            }
            if (item.status === 'incorrect') {
              return { ...item, status: 'idle' };
            }
            return item;
          })
        );

        const nextIndex = expectedIndex + 1;
        setExpectedIndex(nextIndex);

        if (nextIndex >= session.sequence.length) {
          setStage('result');
          if (recallStartRef.current != null) {
            setRecallDurationMs(performance.now() - recallStartRef.current);
          }
        }
      } else {
        setMistakes((prev) => prev + 1);
        setRecallWords((prev) =>
          prev.map((item) => (item.id === word.id ? { ...item, status: 'incorrect' } : item))
        );
      }
    },
    [expectedIndex, session, stage]
  );

  const handleStartDeck = useCallback(
    (deck: Deck) => {
      applyDeckSelection(deck);
      setSession(null);
      setStage('setup');
      setIsTrainingView(true);
      setCurrentIndex(0);
      setExpectedIndex(0);
      setMistakes(0);
      setRecallWords([]);
      setRecallDurationMs(0);
      recallStartRef.current = null;
    },
    [applyDeckSelection],
  );

  const resetSession = useCallback(() => {
    setStage('idle');
    setSession(null);
    setRecallWords([]);
    setCurrentIndex(0);
    setExpectedIndex(0);
    setMistakes(0);
    setRecallDurationMs(0);
    recallStartRef.current = null;
    setIsTrainingView(false);
  }, []);

  const handleBackClick = useCallback(() => {
    navigate('/trainers/speed-reading');
  }, [navigate]);

  useEffect(() => {
    if (stage === 'idle') {
      setIsTrainingView(false);
    }
  }, [stage]);

  useEffect(() => {
    if (!isTrainingView) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isTrainingView]);

  useEffect(() => {
    if (stage !== 'show' || !session) {
      return;
    }

    if (currentIndex >= session.sequence.length) {
      const shuffled = session.recall.map((word) => ({ ...word, status: 'idle' as const }));
      setRecallWords(shuffled);
      setStage('recall');
      setExpectedIndex(0);
      recallStartRef.current = performance.now();
      return;
    }

    const timer = window.setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, Math.max(10, session.speed * 1000));

    return () => window.clearTimeout(timer);
  }, [currentIndex, session, stage]);

  const displayedWord = useMemo(() => {
    if (stage !== 'show' || !session) {
      return null;
    }
    if (currentIndex >= session.sequence.length) {
      return null;
    }
    return session.sequence[currentIndex];
  }, [currentIndex, session, stage]);

  const totalShowDurationMs = useMemo(() => {
    if (!session) {
      return 0;
    }
    return session.speed * session.word_count * 1000;
  }, [session]);

  const accuracyPercent = useMemo(() => {
    if (!session) {
      return null;
    }
    const totalAttempts = session.word_count + mistakes;
    if (!totalAttempts) {
      return null;
    }
    return Math.round((session.word_count / totalAttempts) * 100);
  }, [mistakes, session]);

  const renderTrainingContent = () => {
    if (stage === 'setup') {
      return (
        <div className={styles.setupPlaceholder}>
          <p>Настройте скорость показа и количество слов, затем нажмите «Применить настройки», чтобы начать тренировку.</p>
          {activeDeck && <p className={styles.setupDetails}>В наборе «{activeDeck.title}» доступно {activeDeck.cards.length} слов.</p>}
        </div>
      );
    }

    if (!session) {
      return null;
    }

    if (stage === 'show') {
      return (
        <div className={styles.showStage}>
          <span className={styles.showHint}>Запомните слово № {Math.min(currentIndex + 1, session.word_count)}</span>
          <div className={styles.wordDisplay}>
            <span>{displayedWord ? displayedWord.text : '...'}</span>
          </div>
          <p className={styles.showFooter}>
            Осталось слов: {Math.max(0, session.word_count - currentIndex)} из {session.word_count}
          </p>
        </div>
      );
    }

    if (stage === 'recall') {
      return (
        <div className={styles.recallStage}>
          <h2>Восстановите последовательность слов</h2>
          <p>Нажимайте на карточки по порядку показа.</p>
          <div className={styles.recallGrid}>
            {recallWords.map((word) => (
              <button
                key={word.id}
                type="button"
                className={`${styles.recallCard} ${styles[`recallCard_${word.status}`]}`}
                onClick={() => handleRecallClick(word)}
              >
                {word.text}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (stage === 'result' && session) {
      return (
        <div className={styles.resultStage}>
          <h2>Результаты тренировки</h2>
          <div className={styles.resultStats}>
            <div className={styles.statBlock}>
              <span className={styles.statLabel}>Слов в показе</span>
              <span className={styles.statValue}>{session.word_count}</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statLabel}>Ошибок</span>
              <span className={styles.statValue}>{mistakes}</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statLabel}>Показ слов</span>
              <span className={styles.statValue}>{formatDuration(totalShowDurationMs)}</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statLabel}>Повторение</span>
              <span className={styles.statValue}>{formatDuration(recallDurationMs)}</span>
            </div>
            {accuracyPercent != null && (
              <div className={styles.statBlock}>
                <span className={styles.statLabel}>Точность</span>
                <span className={styles.statValue}>{accuracyPercent}%</span>
              </div>
            )}
          </div>

          <h3 className={styles.sequenceTitle}>Правильная последовательность</h3>
          <ol className={styles.sequenceList}>
            {session.sequence.map((word, index) => (
              <li key={word.id}>
                <span>{index + 1}.</span>
                {word.text}
              </li>
            ))}
          </ol>

          <div className={styles.resultActions}>
            <button type="button" className={styles.controlButton} onClick={() => startSession()}>
              Повторить тренировку
            </button>
            <button type="button" className={styles.flashControlSecondary} onClick={resetSession}>
              Настроить заново
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  const trainingContent = renderTrainingContent();
  const shouldRenderOverlay = isTrainingView && (stage === 'setup' || Boolean(session));
  const overlayTitle = session?.deck.title ?? activeDeck?.title ?? 'Тренировка';
  const overlayWordCount = session?.word_count ?? wordCount;

  return (
    <section className={styles.trainerSection}>
      <div className={styles.trainerContainer}>
        <div className={styles.headerSection}>
          <button className={styles.backButton} onClick={handleBackClick}>
            ← К выбору тренажера
          </button>
          <div className={styles.titleSection}>
            <h2 className={styles.trainerTitle}>Тренажер «Флеш-слова»</h2>
            <p className={styles.trainerSubtitle}>
              Настраивайте скорость показа и количество слов. Запоминайте последовательность и восстановите её после демонстрации.
            </p>
            <p className={styles.trainerSubtitle}>
              Сначала выберите уровень и настройте слайдеры — после запуска тренажёр покажет слова с заданной скоростью.
            </p>
          </div>
        </div>

        <section className={styles.configSection}>
          <div className={styles.levelsBlock}>
            <span className={styles.sectionLabel}>Уровни</span>
            {decks.length ? (
              <div className={styles.difficultyList}>
                {decks.map((deck) => {
                  const preview = deck.cards
                    .slice(0, 8)
                    .map((card) => card.front_text)
                    .filter((word) => word.trim().length > 0)
                    .join(', ');
                  const isActive = activeDeckSlug === deck.slug;
                  return (
                    <article
                      key={deck.slug}
                      className={`${styles.difficultyCard} ${isActive ? styles.difficultyCardActive : ''}`}
                      onClick={() => handleSelectDeck(deck)}
                    >
                      <div className={styles.difficultyHeading}>
                        <h3>{deck.title}</h3>
                        <span>{deck.cards.length} слов</span>
                      </div>
                      <p className={styles.difficultySample} title={preview || 'Набор пока пустой'}>
                        {preview || 'Карточки для этого уровня появятся совсем скоро.'}
                      </p>
                      <div className={styles.difficultyActions}>
                        <button
                          type="button"
                          className={styles.startButton}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleStartDeck(deck);
                          }}
                          disabled={stage !== 'idle'}
                        >
                          Запустить тренажер
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className={styles.error}>Уровни для тренажера появятся совсем скоро.</div>
            )}
          </div>

          <div className={styles.settingsWrapper}>
            {activeDeck ? (
              <>
                <div className={styles.selectedDeckBanner}>
                  <span className={styles.selectedDeckLabel}>Выбран уровень</span>
                  <strong>{activeDeck.title}</strong>
                  <span className={styles.selectedDeckMeta}>{activeDeck.cards.length} слов в наборе</span>
                </div>

                <div className={styles.settingsPanel}>
                  <div className={styles.speedControl}>
                    <label htmlFor="flash-speed" className={styles.speedLabel}>
                      Скорость показа
                      <span className={styles.speedValue}>{formatSeconds(speedSeconds)}</span>
                    </label>
                    <input
                      id="flash-speed"
                      className={styles.speedSlider}
                      type="range"
                      min={SPEED_SLIDER_MIN}
                      max={SPEED_SLIDER_MAX}
                      step={SPEED_SLIDER_STEP}
                      value={speedSliderValue}
                      onChange={(event) => setSpeedSliderValue(Number(event.target.value))}
                      disabled={!activeDeck || stage !== 'idle'}
                    />
                    <div className={styles.speedScale}>
                      <span>{SPEED_MIN.toFixed(2)}</span>
                      <span>{SPEED_MID.toFixed(2)}</span>
                      <span>{SPEED_MAX.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className={styles.speedControl}>
                    <label htmlFor="flash-word-count" className={styles.speedLabel}>
                      Количество слов
                      <span className={styles.speedValue}>{wordCount}</span>
                    </label>
                    <input
                      id="flash-word-count"
                      className={styles.speedSlider}
                      type="range"
                      min={MIN_WORDS}
                      max={maxWordCount}
                      step={1}
                      value={wordCount}
                      onChange={(event) => setWordCount(Number(event.target.value))}
                      disabled={!activeDeck || stage !== 'idle'}
                    />
                    <div className={styles.speedScale}>
                      <span>{MIN_WORDS}</span>
                      <span>{midWordMark}</span>
                      <span>{maxWordCount}</span>
                    </div>
                  </div>

                  <div className={styles.actionPanel}>
                    <span className={styles.speedLabel}>Действие</span>
                    {stage === 'show' || stage === 'recall' ? (
                      <button type="button" className={styles.flashControlSecondary} onClick={resetSession}>
                        Прервать тренировку
                      </button>
                    ) : (
                      <p className={styles.speedHint}>Нажмите «Запустить тренажер» на выбранном уровне, чтобы начать.</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.settingsPlaceholder}>
                <p>Сначала выберите уровень, чтобы настроить скорость и количество слов для показа.</p>
              </div>
            )}
          </div>
        </section>

        <section ref={stageRef} className={styles.stage}>
          {stage === 'idle' ? (
            <div className={styles.stagePlaceholder}>
              <p>Экран тренировки появится сразу после запуска уровня.</p>
            </div>
          ) : stage === 'setup' ? (
            <div className={styles.stagePlaceholder}>
              <p>Настройте параметры в открывшемся окне, затем начните тренировку.</p>
            </div>
          ) : (
            <div className={styles.stagePlaceholder}>
              <p>Тренировка отображается в отдельном окне выше.</p>
            </div>
          )}
        </section>
      </div>

      {shouldRenderOverlay && (
        <div className={styles.trainingOverlay} role="dialog" aria-modal="true">
          <div className={styles.trainingModal}>
            <header className={styles.trainingHeader}>
              <div>
                <span className={styles.trainingBadge}>Выбранный уровень</span>
                <h2>{overlayTitle}</h2>
                <p className={styles.trainingMeta}>
                  скорость {formatSeconds(speedSeconds)} • слов {overlayWordCount}
                </p>
              </div>
              <button type="button" className={styles.trainingClose} onClick={resetSession} aria-label="Закрыть тренировку">
                ×
              </button>
            </header>

            {activeDeck && (
              <div className={styles.trainingSettings}>
                <div className={styles.trainingControl}>
                  <label htmlFor="training-speed" className={styles.trainingLabel}>
                    Скорость показа
                    <span className={styles.trainingValue}>{formatSeconds(speedSeconds)}</span>
                  </label>
                  <input
                    id="training-speed"
                    type="range"
                    min={SPEED_SLIDER_MIN}
                    max={SPEED_SLIDER_MAX}
                    step={SPEED_SLIDER_STEP}
                    value={speedSliderValue}
                    onChange={(event) => setSpeedSliderValue(Number(event.target.value))}
                  />
                  <div className={styles.speedScale}>
                    <span>{SPEED_MIN.toFixed(2)}</span>
                    <span>{SPEED_MID.toFixed(2)}</span>
                    <span>{SPEED_MAX.toFixed(1)}</span>
                  </div>
                </div>

                <div className={styles.trainingControl}>
                  <label htmlFor="training-word-count" className={styles.trainingLabel}>
                    Количество слов
                    <span className={styles.trainingValue}>{wordCount}</span>
                  </label>
                  <input
                    id="training-word-count"
                    type="range"
                    min={MIN_WORDS}
                    max={maxWordCount}
                    step={1}
                    value={wordCount}
                    onChange={(event) => setWordCount(Number(event.target.value))}
                  />
                  <div className={styles.speedScale}>
                    <span>{MIN_WORDS}</span>
                    <span>{midWordMark}</span>
                    <span>{maxWordCount}</span>
                  </div>
                </div>

                <div className={styles.trainingActions}>
                  <button type="button" className={styles.controlButton} onClick={handleApplyTrainingSettings}>
                    Применить настройки
                  </button>
                  <button type="button" className={styles.flashControlSecondary} onClick={resetSession}>
                    Завершить тренировку
                  </button>
                </div>
              </div>
            )}

            <div className={styles.trainingBody}>{trainingContent}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FlashWordsTrainer;

