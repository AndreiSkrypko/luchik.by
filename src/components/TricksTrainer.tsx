import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TricksTrainer.module.css';

type Stage = 'settings' | 'play' | 'result';

type TricksSettings = {
  numberType: 2 | 3; // 2 = двузначные, 3 = трехзначные
};

type TricksQuestion = {
  first: number;
  second: number;
  correctAnswer: number;
};

const generateQuestion = (numberType: 2 | 3): TricksQuestion => {
  let first: number, second: number;
  
  if (numberType === 2) {
    first = Math.floor(Math.random() * 90) + 10; // 10-99
    second = Math.floor(Math.random() * 90) + 10; // 10-99
  } else {
    first = Math.floor(Math.random() * 900) + 100; // 100-999
    second = Math.floor(Math.random() * 900) + 100; // 100-999
  }
  
  return {
    first,
    second,
    correctAnswer: first * second,
  };
};

const TricksTrainer = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>('settings');
  const [formState, setFormState] = useState<TricksSettings>({
    numberType: 2,
  });
  const [currentQuestion, setCurrentQuestion] = useState<TricksQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const resetGame = useCallback(() => {
    setStage('settings');
    setCurrentQuestion(null);
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
  }, []);

  const startGame = () => {
    const question = generateQuestion(formState.numberType);
    setCurrentQuestion(question);
    setStage('play');
    setUserAnswer('');
    setShowResult(false);
  };

  const handleAnswerSubmit = () => {
    if (!currentQuestion) return;
    
    const answer = parseInt(userAnswer, 10);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    setStage('result');
  };

  const handleNextQuestion = () => {
    const question = generateQuestion(formState.numberType);
    setCurrentQuestion(question);
    setUserAnswer('');
    setShowResult(false);
    setStage('play');
  };

  const handleBackClick = useCallback(() => {
    navigate('/trainers/mental-arithmetic');
  }, [navigate]);

  return (
    <section className={styles.trainerSection}>
      <div className={styles.trainerContainer}>
        <div className={styles.headerSection}>
          <button className={styles.backButton} onClick={handleBackClick}>
            ← К выбору тренажера
          </button>
          <div className={styles.titleSection}>
            <h2 className={styles.trainerTitle}>Тренажер «Хитрости»</h2>
            <p className={styles.trainerSubtitle}>
              Умножение с использованием математических хитростей. Тренируемся умножать двузначные и трёхзначные числа, применяя специальные техники для быстрого счёта.
            </p>
          </div>
        </div>

        {stage === 'settings' && (
          <div className={styles.settingsPanel}>
            <form
              className={styles.settingsForm}
              onSubmit={(e) => {
                e.preventDefault();
                startGame();
              }}
            >
              <div className={styles.formGroup}>
                <label>Выберите тип чисел:</label>
                <div className={styles.radioGroup}>
                  <input
                    type="radio"
                    id="two-digit"
                    name="number-type"
                    value="2"
                    checked={formState.numberType === 2}
                    onChange={() => setFormState({ numberType: 2 })}
                  />
                  <label htmlFor="two-digit">Двузначные</label>

                  <input
                    type="radio"
                    id="three-digit"
                    name="number-type"
                    value="3"
                    checked={formState.numberType === 3}
                    onChange={() => setFormState({ numberType: 3 })}
                  />
                  <label htmlFor="three-digit">Трёхзначные</label>
                </div>
              </div>

              <button type="submit" className={styles.startButton}>
                🚀 Начать тренировку
              </button>
            </form>
          </div>
        )}

        {stage === 'play' && currentQuestion && (
          <div className={styles.gamePanel}>
            <div className={styles.questionBox}>
              <div className={styles.questionText}>
                <span className={currentQuestion.first > 0 ? styles.positiveNumber : styles.negativeNumber}>
                  {currentQuestion.first > 0 ? `+${currentQuestion.first}` : currentQuestion.first}
                </span>
                {' × '}
                <span className={currentQuestion.second > 0 ? styles.positiveNumber : styles.negativeNumber}>
                  {currentQuestion.second > 0 ? `+${currentQuestion.second}` : currentQuestion.second}
                </span>
                {' = ?'}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAnswerSubmit();
                }}
              >
                <input
                  type="number"
                  className={styles.answerInput}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Введите ответ"
                  required
                />
                <button type="submit" className={styles.checkButton}>
                  Проверить
                </button>
              </form>
            </div>
          </div>
        )}

        {stage === 'result' && currentQuestion && showResult && (
          <div className={styles.resultPanel}>
            <div className={styles.resultBox}>
              <div className={`${styles.resultMessage} ${isCorrect ? styles.correct : styles.incorrect}`}>
                {isCorrect ? '✓ Правильно! 🎉' : '✗ Неправильно'}
              </div>
              <div className={styles.resultDetails}>
                <p>Ваш ответ: {userAnswer || '—'}</p>
                <p>Правильный ответ: {currentQuestion.correctAnswer}</p>
              </div>
              <div className={styles.resultActions}>
                <button className={styles.primaryButton} onClick={handleNextQuestion}>
                  Следующий пример
                </button>
                <button className={styles.secondaryButton} onClick={resetGame}>
                  Начать заново
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TricksTrainer;

