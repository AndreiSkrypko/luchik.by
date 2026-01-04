import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FlashcardsTrainer.module.css';

type Stage = 'settings' | 'play' | 'result';

type FlashcardsSettings = {
  operation: '+' | '-' | '×' | '÷';
  maxNumber: number;
  num_examples: number;
};

type FlashcardsQuestion = {
  first: number;
  second: number;
  operation: '+' | '-' | '×' | '÷';
  correctAnswer: number;
};

const generateQuestion = (settings: FlashcardsSettings): FlashcardsQuestion => {
  const first = Math.floor(Math.random() * settings.maxNumber) + 1;
  const second = Math.floor(Math.random() * settings.maxNumber) + 1;
  
  let correctAnswer: number;
  switch (settings.operation) {
    case '+':
      correctAnswer = first + second;
      break;
    case '-':
      correctAnswer = first - second;
      break;
    case '×':
      correctAnswer = first * second;
      break;
    case '÷':
      // Для деления генерируем пример так, чтобы результат был целым
      const divisor = second;
      const dividend = first * divisor;
      return {
        first: dividend,
        second: divisor,
        operation: '÷',
        correctAnswer: first,
      };
    default:
      correctAnswer = first + second;
  }
  
  return {
    first,
    second,
    operation: settings.operation,
    correctAnswer,
  };
};

const FlashcardsTrainer = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>('settings');
  const [formState, setFormState] = useState<FlashcardsSettings>({
    operation: '+',
    maxNumber: 20,
    num_examples: 10,
  });
  const [currentQuestion, setCurrentQuestion] = useState<FlashcardsQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const resetGame = useCallback(() => {
    setStage('settings');
    setCurrentQuestion(null);
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setQuestionCount(0);
    setCorrectCount(0);
  }, []);

  const startGame = () => {
    const question = generateQuestion(formState);
    setCurrentQuestion(question);
    setStage('play');
    setUserAnswer('');
    setShowResult(false);
    setQuestionCount(0);
    setCorrectCount(0);
  };

  const handleAnswerSubmit = () => {
    if (!currentQuestion) return;
    
    const answer = parseFloat(userAnswer);
    const correct = Math.abs(answer - currentQuestion.correctAnswer) < 0.01;
    setIsCorrect(correct);
    setShowResult(true);
    setStage('result');
    setQuestionCount(prev => prev + 1);
    if (correct) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (questionCount >= formState.num_examples) {
      resetGame();
      return;
    }
    
    const question = generateQuestion(formState);
    setCurrentQuestion(question);
    setUserAnswer('');
    setShowResult(false);
    setStage('play');
  };

  const handleBackClick = useCallback(() => {
    navigate('/trainers/mental-arithmetic');
  }, [navigate]);

  const getOperationSymbol = (op: '+' | '-' | '×' | '÷') => {
    return op;
  };

  return (
    <section className={styles.trainerSection}>
      <div className={styles.trainerContainer}>
        <div className={styles.headerSection}>
          <button className={styles.backButton} onClick={handleBackClick}>
            ← К выбору тренажера
          </button>
          <div className={styles.titleSection}>
            <h2 className={styles.trainerTitle}>Тренажер «Флэшкарты»</h2>
            <p className={styles.trainerSubtitle}>
              Быстрая тренировка арифметических операций. Показываются примеры на сложение, вычитание, умножение или деление. Отлично подходит для закрепления базовых навыков счёта.
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
                <label>Выберите операцию:</label>
                <div className={styles.radioGroup}>
                  <input
                    type="radio"
                    id="add"
                    name="operation"
                    value="+"
                    checked={formState.operation === '+'}
                    onChange={() => setFormState((prev) => ({ ...prev, operation: '+' }))}
                  />
                  <label htmlFor="add">Сложение (+)</label>

                  <input
                    type="radio"
                    id="subtract"
                    name="operation"
                    value="-"
                    checked={formState.operation === '-'}
                    onChange={() => setFormState((prev) => ({ ...prev, operation: '-' }))}
                  />
                  <label htmlFor="subtract">Вычитание (-)</label>

                  <input
                    type="radio"
                    id="multiply"
                    name="operation"
                    value="×"
                    checked={formState.operation === '×'}
                    onChange={() => setFormState((prev) => ({ ...prev, operation: '×' }))}
                  />
                  <label htmlFor="multiply">Умножение (×)</label>

                  <input
                    type="radio"
                    id="divide"
                    name="operation"
                    value="÷"
                    checked={formState.operation === '÷'}
                    onChange={() => setFormState((prev) => ({ ...prev, operation: '÷' }))}
                  />
                  <label htmlFor="divide">Деление (÷)</label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="maxNumber">
                  Максимальное число <span className={styles.settingValue}>{formState.maxNumber}</span>
                </label>
                <input
                  id="maxNumber"
                  type="range"
                  min={5}
                  max={100}
                  step={1}
                  value={formState.maxNumber}
                  className={styles.slider}
                  onChange={(e) => setFormState((prev) => ({ ...prev, maxNumber: parseInt(e.target.value, 10) }))}
                />
              </div>

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

              <button type="submit" className={styles.startButton}>
                🚀 Начать тренировку
              </button>
            </form>
          </div>
        )}

        {stage === 'play' && currentQuestion && (
          <div className={styles.gamePanel}>
            <div className={styles.questionBox}>
              <div className={styles.progressInfo}>
                Пример {questionCount + 1} из {formState.num_examples}
              </div>
              <div className={styles.questionText}>
                {currentQuestion.first} {getOperationSymbol(currentQuestion.operation)} {currentQuestion.second} = ?
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAnswerSubmit();
                }}
              >
                <input
                  type="number"
                  step="any"
                  className={styles.answerInput}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Введите ответ"
                  required
                  autoFocus
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
                <p className={styles.stats}>
                  Правильных: {correctCount} из {questionCount}
                </p>
              </div>
              <div className={styles.resultActions}>
                {questionCount < formState.num_examples ? (
                  <button className={styles.primaryButton} onClick={handleNextQuestion}>
                    Следующий пример
                  </button>
                ) : (
                  <div className={styles.finalStats}>
                    <p className={styles.finalMessage}>
                      Тренировка завершена! Правильных ответов: {correctCount} из {formState.num_examples}
                    </p>
                    <button className={styles.primaryButton} onClick={resetGame}>
                      Начать заново
                    </button>
                  </div>
                )}
                <button className={styles.secondaryButton} onClick={resetGame}>
                  Выйти
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FlashcardsTrainer;

