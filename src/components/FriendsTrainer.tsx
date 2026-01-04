import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FriendsTrainer.module.css';

type Stage = 'settings' | 'countdown' | 'play' | 'answer' | 'result';

type FriendsSettings = {
  friend: number; // 6, 7, 8, или 9
  digitRange: string; // '1..10', '10..100', '100..1000', '1000..10000'
  count: number;
  speed: number;
};

type FriendsQuestion = {
  displayNumber: string; // '+16', '-27', etc.
  originalNumber: number;
  correctAnswer: number; // Результат после применения метода друга
  steps: number[];
  usedFriendMethod: boolean;
};

type FriendsSession = {
  settings: FriendsSettings;
  questions: FriendsQuestion[];
  totalSum: number;
};

const RANGE_OPTIONS = [
  { key: '1..10', label: 'от 1 до 10' },
  { key: '10..100', label: 'от 10 до 100' },
  { key: '100..1000', label: 'от 100 до 1000' },
  { key: '1000..10000', label: 'от 1000 до 10000' },
];

const FRIEND_OPTIONS = [
  { value: 6, label: 'Друг 6' },
  { value: 7, label: 'Друг 7' },
  { value: 8, label: 'Друг 8' },
  { value: 9, label: 'Друг 9' },
];

const formatNumber = (value: number) => (value > 0 ? `+${value}` : value.toString());

// Функция для применения метода друга к числу
function applyFriendMethod(number: number, friend: number): {
  result: number;
  steps: number[];
  usedFriendMethod: boolean;
} {
  const absNumber = Math.abs(number);
  const lastDigit = absNumber % 10;
  const sign = number >= 0 ? 1 : -1;

  // Проверяем, заканчивается ли число на выбранного друга
  if (lastDigit === friend) {
    // Применяем метод друга только к последней цифре
    const basePart = Math.floor(absNumber / 10) * 10 * sign;

    // Разложение последней цифры через 10
    // +6 = +10-4, +7 = +10-3, +8 = +10-2, +9 = +10-1
    // -6 = -10+4, -7 = -10+3, -8 = -10+2, -9 = -10+1
    const step1 = sign * 10;
    const step2 = -sign * (10 - friend);

    // Результат: базовая часть + разложение последней цифры
    const result = basePart + step1 + step2;

    return {
      result: result,
      steps: basePart !== 0 ? [basePart, step1, step2] : [step1, step2],
      usedFriendMethod: true,
    };
  } else {
    // Обычное число, не применяем метод друга
    return {
      result: number,
      steps: [number],
      usedFriendMethod: false,
    };
  }
}

// Функция для генерации сессии
function generateSession(settings: FriendsSettings): FriendsSession {
  const tasks: FriendsQuestion[] = [];

  const ranges: Record<string, { min: number; max: number }> = {
    '1..10': { min: 1, max: 10 },
    '10..100': { min: 10, max: 100 },
    '100..1000': { min: 100, max: 1000 },
    '1000..10000': { min: 1000, max: 10000 },
  };

  const range = ranges[settings.digitRange];

  for (let i = 0; i < settings.count; i++) {
    // Генерируем число, которое заканчивается на выбранного друга
    let randomNumber: number;

    if (settings.digitRange === '1..10') {
      randomNumber = settings.friend;
    } else if (settings.digitRange === '10..100') {
      const minTens = Math.ceil(range.min / 10);
      const maxTens = Math.floor(range.max / 10);
      const tens = Math.floor(Math.random() * (maxTens - minTens + 1)) + minTens;
      randomNumber = tens * 10 + settings.friend;
      if (randomNumber < range.min) {
        randomNumber = Math.ceil(range.min / 10) * 10 + settings.friend;
        if (randomNumber < range.min) randomNumber += 10;
      }
      if (randomNumber > range.max) {
        randomNumber = Math.floor(range.max / 10) * 10 + settings.friend;
        if (randomNumber > range.max) randomNumber -= 10;
      }
    } else if (settings.digitRange === '100..1000') {
      const minHundreds = Math.ceil(range.min / 100);
      const maxHundreds = Math.floor(range.max / 100);
      const hundreds = Math.floor(Math.random() * (maxHundreds - minHundreds + 1)) + minHundreds;
      const tens = Math.floor(Math.random() * 10);
      randomNumber = hundreds * 100 + tens * 10 + settings.friend;
      if (randomNumber < range.min) {
        randomNumber = Math.ceil(range.min / 10) * 10 + settings.friend;
        if (randomNumber < range.min) randomNumber += 10;
      }
      if (randomNumber > range.max) {
        randomNumber = Math.floor(range.max / 10) * 10 + settings.friend;
        if (randomNumber > range.max) randomNumber -= 10;
      }
    } else if (settings.digitRange === '1000..10000') {
      const minThousands = Math.ceil(range.min / 1000);
      const maxThousands = Math.floor(range.max / 1000);
      const thousands = Math.floor(Math.random() * (maxThousands - minThousands + 1)) + minThousands;
      const hundreds = Math.floor(Math.random() * 10);
      const tens = Math.floor(Math.random() * 10);
      randomNumber = thousands * 1000 + hundreds * 100 + tens * 10 + settings.friend;
      if (randomNumber < range.min) {
        randomNumber = Math.ceil(range.min / 10) * 10 + settings.friend;
        if (randomNumber < range.min) randomNumber += 10;
      }
      if (randomNumber > range.max) {
        randomNumber = Math.floor(range.max / 10) * 10 + settings.friend;
        if (randomNumber > range.max) randomNumber -= 10;
      }
    } else {
      randomNumber = settings.friend;
    }

    // Случайно выбираем знак (балансируем положительные и отрицательные)
    let op: '+' | '-';
    if (i < settings.count / 2) {
      op = Math.random() < 0.6 ? '+' : '-';
    } else {
      op = Math.random() < 0.4 ? '+' : '-';
    }
    const signedNumber = op === '+' ? randomNumber : -randomNumber;

    // Применяем метод друга
    const result = applyFriendMethod(signedNumber, settings.friend);

    tasks.push({
      displayNumber: `${op}${randomNumber}`,
      originalNumber: signedNumber,
      correctAnswer: result.result,
      steps: result.steps,
      usedFriendMethod: result.usedFriendMethod,
    });
  }

  const totalSum = tasks.reduce((sum, question) => sum + question.correctAnswer, 0);

  return {
    settings,
    questions: tasks,
    totalSum,
  };
}

const FriendsTrainer = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>('settings');
  const [formState, setFormState] = useState<FriendsSettings>({
    friend: 6,
    digitRange: '1..10',
    count: 10,
    speed: 1.5,
  });
  const [session, setSession] = useState<FriendsSession | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [userIsCorrect, setUserIsCorrect] = useState<boolean | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const timerRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  const currentQuestion = session?.questions[currentIndex];
  const totalQuestions = session?.questions.length ?? 0;

  const rangeDescription = useMemo(() => {
    const option = RANGE_OPTIONS.find((opt) => opt.key === formState.digitRange);
    return option?.label ?? RANGE_OPTIONS[0].label;
  }, [formState.digitRange]);

  const resetGame = useCallback(() => {
    setStage('settings');
    setSession(null);
    setCurrentIndex(0);
    setUserAnswer('');
    setUserIsCorrect(null);
    setShowBreakdown(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  const startSession = () => {
    const newSession = generateSession(formState);
    setSession(newSession);
    setCountdown(3);
    setStage('countdown');
  };

  const checkAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session) return;

    const numericAnswer = parseInt(userAnswer, 10);
    if (Number.isNaN(numericAnswer)) {
      return;
    }

    setUserIsCorrect(numericAnswer === session.totalSum);
    setStage('result');
  };

  const handleBackClick = useCallback(() => {
    navigate('/trainers/mental-arithmetic');
  }, [navigate]);

  useEffect(() => {
    if (stage !== 'countdown') return undefined;
    setCountdown(3);
    countdownIntervalRef.current = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
          }
          setStage('play');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    };
  }, [stage]);

  useEffect(() => {
    if (stage !== 'play' || !session) return undefined;

    setCurrentIndex(0);

    const scheduleNext = (index: number) => {
      timerRef.current = window.setTimeout(() => {
        const nextIndex = index + 1;
        if (!session || nextIndex >= session.questions.length) {
          setStage('answer');
          return;
        }
        setCurrentIndex(nextIndex);
        scheduleNext(nextIndex);
      }, session.settings.speed * 1000);
    };

    scheduleNext(0);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [session, stage]);

  const progressPercent = totalQuestions ? Math.round(((currentIndex + 1) / totalQuestions) * 100) : 0;

  const isSettingsOnly = stage === 'settings';

  return (
    <section className={styles.trainerSection}>
      <div className={styles.trainerContainer}>
        <div className={styles.headerSection}>
          <button className={styles.backButton} onClick={handleBackClick}>
            ← К выбору тренажера
          </button>
          <div className={styles.titleSection}>
            <h2 className={styles.trainerTitle}>Тренажер «Друзья»</h2>
            <p className={styles.trainerSubtitle}>
              Изучайте метод разложения чисел через «друзей» — простой способ упростить вычисления через 10. Выберите друга для изучения, и все числа будут заканчиваться на эту цифру.
            </p>
          </div>
        </div>

        <section className={`${styles.layout} ${isSettingsOnly ? styles.layoutSingle : ''}`}>
          <div className={`${styles.settingsColumn} ${isSettingsOnly ? styles.settingsColumnWide : ''}`}>
            <div className={styles.panel}>
              {stage === 'settings' ? (
                <form
                  className={styles.settingsForm}
                  onSubmit={(event) => {
                    event.preventDefault();
                    startSession();
                  }}
                >
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="friend">Выберите друга для изучения</label>
                      <div className={styles.radioGroup}>
                        {FRIEND_OPTIONS.map((option) => (
                          <label key={option.value} className={styles.radioLabel}>
                            <input
                              type="radio"
                              name="friend"
                              value={option.value}
                              checked={formState.friend === option.value}
                              onChange={(e) => setFormState((prev) => ({ ...prev, friend: parseInt(e.target.value, 10) }))}
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                      <p className={styles.helperText}>
                        Друг {formState.friend}: +{formState.friend} = +10-{10 - formState.friend}, -{formState.friend} = -10+{10 - formState.friend}
                      </p>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="range">
                        Диапазон чисел <span className={styles.settingValue}>{rangeDescription}</span>
                      </label>
                      <div className={styles.radioGroup}>
                        {RANGE_OPTIONS.map((option) => (
                          <label key={option.key} className={styles.radioLabel}>
                            <input
                              type="radio"
                              name="digitRange"
                              value={option.key}
                              checked={formState.digitRange === option.key}
                              onChange={(e) => setFormState((prev) => ({ ...prev, digitRange: e.target.value }))}
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="count">
                        Количество примеров <span className={styles.settingValue}>{formState.count}</span>
                      </label>
                      <input
                        id="count"
                        type="range"
                        min={2}
                        max={99}
                        value={formState.count}
                        className={styles.slider}
                        onChange={(e) => setFormState((prev) => ({ ...prev, count: parseInt(e.target.value, 10) }))}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="speed">
                        Скорость показа (сек.) <span className={styles.settingValue}>{formState.speed.toFixed(1)} сек</span>
                      </label>
                      <input
                        id="speed"
                        type="range"
                        min={0.5}
                        max={6}
                        step={0.1}
                        value={formState.speed}
                        className={styles.slider}
                        onChange={(e) => setFormState((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button type="submit" className={styles.startButton}>
                      🚀 Начать игру
                    </button>
                  </div>
                </form>
              ) : (
                <div className={styles.panelPlaceholder}>
                  <p>Чтобы изменить параметры, завершите текущую серию или сбросьте тренировку.</p>
                  <button className={styles.secondaryButton} onClick={resetGame}>
                    Сбросить и настроить заново
                  </button>
                </div>
              )}
            </div>
          </div>

          {!isSettingsOnly && (
            <div className={styles.stageColumn}>
              {stage === 'answer' && session && (
                <div className={styles.answerCard}>
                  <h3>Введите сумму всех результатов</h3>
                  <p>Вспомните все числа, которые вы видели, примените к каждому метод выбранного друга и введите общую сумму результатов.</p>
                  <form onSubmit={checkAnswer}>
                    <input
                      type="number"
                      className={styles.answerInput}
                      value={userAnswer}
                      onChange={(event) => setUserAnswer(event.target.value)}
                      placeholder="Например, 42"
                      required
                    />
                    <button type="submit" className={styles.startButton}>
                      Проверить ответ
                    </button>
                  </form>
                </div>
              )}

              {stage === 'result' && session && (
                <div className={styles.resultCard}>
                  <h3>{userIsCorrect ? 'Отлично!' : 'Есть над чем поработать'}</h3>
                  <p>
                    Правильный ответ: <strong>{session.totalSum}</strong>
                  </p>
                  <p>
                    Ваш ответ: <strong>{userAnswer}</strong>
                  </p>
                  <div className={styles.resultActions}>
                    <button className={styles.primaryButton} onClick={resetGame}>
                      Сыграть ещё раз
                    </button>
                    <button className={styles.secondaryButton} onClick={() => setShowBreakdown((prev) => !prev)}>
                      {showBreakdown ? 'Скрыть пример' : 'Показать пример вычислений'}
                    </button>
                  </div>

                  {showBreakdown && (
                    <div className={styles.breakdown}>
                      <h4>Последовательность</h4>
                      <div className={styles.expression}>
                        {session.questions.map((item, idx) => (
                          <span key={idx}>{item.displayNumber}</span>
                        ))}
                        <span className={styles.equals}>=</span>
                        <span className={styles.total}>{session.totalSum}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        {stage === 'countdown' && (
          <div className={styles.fullscreenOverlay}>
            <div className={styles.countdownContent}>
              <div className={styles.countdownEmoji}>
                {countdown === 3 ? '🎯' : countdown === 2 ? '🚀' : '✨'}
              </div>
              <p className={styles.countdownText}>Игра начнётся через</p>
              <span className={`${styles.countdownNumber} ${styles.countdownPulse}`}>{countdown}</span>
              <p className={styles.countdownHint}>
                {countdown === 3 ? 'Приготовься!' : countdown === 2 ? 'Внимание!' : 'Начинаем!'}
              </p>
              <button className={styles.secondaryButton} onClick={resetGame}>
                Выйти
              </button>
            </div>
          </div>
        )}

        {stage === 'play' && session && currentQuestion && (
          <div className={`${styles.fullscreenOverlay} ${styles.numberOverlay}`}>
            <div className={styles.numberContent}>
              <div className={styles.progress}>
                <span>
                  Пример {currentIndex + 1} из {session.questions.length}
                </span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
              <div className={`${styles.currentNumber} ${currentQuestion.originalNumber < 0 ? styles.negativeNumber : styles.positiveNumber}`}>
                {currentQuestion.displayNumber}
              </div>
              <button className={styles.secondaryButton} onClick={resetGame}>
                Выйти из игры
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FriendsTrainer;

