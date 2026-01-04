import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Multiplication20Trainer.module.css';

type Stage = 'settings' | 'countdown' | 'play' | 'answer' | 'result';

type Multiplication20Settings = {
  num_examples: number;
  speed: number;
};

type Multiplication20Question = {
  index: number;
  first: number;
  second: number;
  correctAnswer: number;
  displayText: string;
};

type Multiplication20Session = {
  settings: Multiplication20Settings;
  questions: Multiplication20Question[];
};

const generateQuestions = (settings: Multiplication20Settings): Multiplication20Question[] => {
  const questions: Multiplication20Question[] = [];
  
  for (let i = 0; i < settings.num_examples; i++) {
    const first = Math.floor(Math.random() * 20) + 1;
    const second = Math.floor(Math.random() * 20) + 1;
    const correctAnswer = first * second;
    
    questions.push({
      index: i + 1,
      first,
      second,
      correctAnswer,
      displayText: `${first} × ${second}`,
    });
  }
  
  return questions;
};

const Multiplication20Trainer = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>('settings');
  const [formState, setFormState] = useState<Multiplication20Settings>({
    num_examples: 10,
    speed: 1.5,
  });
  const [session, setSession] = useState<Multiplication20Session | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const timerRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  const currentQuestion = session?.questions[currentIndex];
  const totalQuestions = session?.questions.length ?? 0;

  const resetGame = useCallback(() => {
    setStage('settings');
    setSession(null);
    setCurrentIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setCorrectCount(0);
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
    const questions = generateQuestions(formState);
    setSession({ settings: formState, questions });
    setCountdown(3);
    setStage('countdown');
  };

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const checkAnswers = () => {
    if (!session) return;
    
    let correct = 0;
    session.questions.forEach((question) => {
      const userAnswer = parseInt(userAnswers[question.index] || '', 10);
      if (userAnswer === question.correctAnswer) {
        correct++;
      }
    });
    
    setCorrectCount(correct);
    setShowResults(true);
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
            <h2 className={styles.trainerTitle}>Тренажер «Умножение до 20»</h2>
            <p className={styles.trainerSubtitle}>
              Особый тренажёр на быстрый счёт в пределах двадцати. Помогает уверенно переходить к большим числам и развивает точность вычислений в базовом диапазоне.
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
                      <label htmlFor="examples">
                        Количество примеров <span className={styles.settingValue}>{formState.num_examples}</span>
                      </label>
                      <input
                        id="examples"
                        type="range"
                        min={5}
                        max={50}
                        value={formState.num_examples}
                        className={styles.slider}
                        onChange={(e) => setFormState((prev) => ({ ...prev, num_examples: parseInt(e.target.value, 10) }))}
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
                  <h3>Введите ответы на все примеры</h3>
                  <p>Вспомните все примеры, которые вы видели, и введите правильные ответы.</p>
                  <div className={styles.answersGrid}>
                    {session.questions.map((question) => (
                      <div key={question.index} className={styles.answerRow}>
                        <span className={styles.questionText}>{question.displayText} =</span>
                        <input
                          type="number"
                          className={styles.answerInput}
                          value={userAnswers[question.index] || ''}
                          onChange={(e) => handleAnswerChange(question.index, e.target.value)}
                          placeholder="?"
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <button type="button" className={styles.startButton} onClick={checkAnswers}>
                    Проверить ответы
                  </button>
                </div>
              )}

              {stage === 'result' && session && showResults && (
                <div className={styles.resultCard}>
                  <h3>
                    {correctCount === totalQuestions
                      ? 'Отлично! Все ответы правильные! 🎉'
                      : `Правильных ответов: ${correctCount} из ${totalQuestions}`}
                  </h3>
                  <div className={styles.resultsGrid}>
                    {session.questions.map((question) => {
                      const userAnswer = parseInt(userAnswers[question.index] || '', 10);
                      const isCorrect = userAnswer === question.correctAnswer;
                      return (
                        <div
                          key={question.index}
                          className={`${styles.resultRow} ${isCorrect ? styles.correct : styles.incorrect}`}
                        >
                          <span className={styles.questionText}>{question.displayText} =</span>
                          <span className={styles.userAnswer}>{userAnswer || '—'}</span>
                          {!isCorrect && (
                            <span className={styles.correctAnswer}>✓ {question.correctAnswer}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.resultActions}>
                    <button className={styles.primaryButton} onClick={resetGame}>
                      Сыграть ещё раз
                    </button>
                  </div>
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
                  Пример {currentQuestion.index} из {session.questions.length}
                </span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
              <div className={styles.currentNumber}>
                {currentQuestion.displayText}
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

export default Multiplication20Trainer;

