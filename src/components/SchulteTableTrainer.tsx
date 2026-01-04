import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SchulteTableTrainer.module.css';

type GameState = 'idle' | 'running' | 'completed';

interface SchulteSession {
  grid_size: number;
  numbers: number[];
}

const SchulteTableTrainer = () => {
  const navigate = useNavigate();
  const [gridSize, setGridSize] = useState<number>(4);
  const [session, setSession] = useState<SchulteSession | null>(null);
  const [nextNumber, setNextNumber] = useState<number>(1);
  const [clickedNumbers, setClickedNumbers] = useState<Set<number>>(new Set());
  const [mistakes, setMistakes] = useState<number>(0);
  const [state, setState] = useState<GameState>('idle');
  const [elapsed, setElapsed] = useState<number>(0);
  const timerRef = useRef<number | null>(null);
  const startTimestampRef = useRef<number | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);

  const totalCells = useMemo(() => {
    return (session?.grid_size ?? gridSize) ** 2;
  }, [session, gridSize]);

  useEffect(() => {
    if (state !== 'running') {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const updateTimer = (timestamp: number) => {
      if (startTimestampRef.current != null) {
        setElapsed(timestamp - startTimestampRef.current);
      }
      timerRef.current = requestAnimationFrame(updateTimer);
    };

    timerRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [state]);

  useEffect(() => {
    if (state === 'running' || state === 'completed') {
      boardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [state, session]);

  useEffect(() => {
    if (state !== 'running') {
      return;
    }

    const handleResize = () => {
      if (boardRef.current) {
        boardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [state]);

  const formattedTime = useMemo(() => {
    const milliseconds = Math.floor(elapsed % 1000);
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor(elapsed / 1000 / 60);
    const parts = [
      minutes > 0 ? `${minutes.toString().padStart(2, '0')}:` : '',
      `${seconds.toString().padStart(2, '0')}`,
      '.',
      milliseconds.toString().padStart(3, '0'),
    ];
    return parts.join('');
  }, [elapsed]);

  const generateSession = (size: number): SchulteSession => {
    const numbers = Array.from({ length: size * size }, (_, i) => i + 1);
    // Перемешиваем массив
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return {
      grid_size: size,
      numbers,
    };
  };

  const handleStart = () => {
    const size = Math.min(8, Math.max(2, gridSize));
    setGridSize(size);
    const newSession = generateSession(size);
    setSession(newSession);
    setNextNumber(1);
    setClickedNumbers(new Set());
    setMistakes(0);
    setElapsed(0);
    startTimestampRef.current = performance.now();
    setState('running');
  };

  const handleCellClick = (value: number) => {
    if (state !== 'running' || !session) {
      return;
    }

    if (value !== nextNumber) {
      setMistakes((prev) => prev + 1);
      return;
    }

    const updated = new Set(clickedNumbers);
    updated.add(value);
    setClickedNumbers(updated);
    const next = value + 1;
    if (next > session.grid_size * session.grid_size) {
      setState('completed');
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }
    }
    setNextNumber(next);
  };

  const handleReset = () => {
    setSession(null);
    setClickedNumbers(new Set());
    setNextNumber(1);
    setMistakes(0);
    setElapsed(0);
    setState('idle');
  };

  const handleBackClick = () => {
    navigate('/trainers/speed-reading');
  };

  const numbers = session?.numbers ?? [];
  const averageTimePerNumber = useMemo(() => {
    if (state !== 'completed' || totalCells === 0) {
      return null;
    }
    return (elapsed / totalCells) / 1000;
  }, [elapsed, state, totalCells]);

  const averageDisplay = averageTimePerNumber != null ? averageTimePerNumber.toFixed(2) : null;

  const performanceLabel = useMemo(() => {
    if (averageTimePerNumber == null) {
      return null;
    }

    if (averageTimePerNumber <= 1) {
      return 'Профессионал';
    }
    if (averageTimePerNumber <= 1.5) {
      return 'Эксперт';
    }
    if (averageTimePerNumber <= 2) {
      return 'Продвинутый';
    }
    if (averageTimePerNumber <= 3) {
      return 'Уверенный пользователь';
    }
    return 'Новичок';
  }, [averageTimePerNumber]);

  return (
    <section className={styles.trainerSection}>
      <div className={styles.trainerContainer}>
        <div className={styles.headerSection}>
          <button className={styles.backButton} onClick={handleBackClick}>
            ← К выбору тренажера
          </button>
          <div className={styles.titleSection}>
            <h2 className={styles.trainerTitle}>Тренажер «Таблица Шульте»</h2>
            <p className={styles.trainerSubtitle}>
              Выберите размер сетки и постарайтесь нажать на числа по порядку как можно быстрее. Тренируйте внимание и скорость восприятия.
            </p>
          </div>
        </div>

        <section className={styles.controls}>
          <div className={styles.sizeSelector}>
            <label htmlFor="grid-size">Размер таблицы:</label>
            <input
              id="grid-size"
              type="range"
              min={2}
              max={8}
              value={gridSize}
              disabled={state === 'running'}
              onChange={(event) => setGridSize(Number(event.target.value))}
            />
            <span className={styles.sizeValue}>
              {gridSize} × {gridSize}
            </span>
          </div>

          <div className={styles.actions}>
            {state !== 'running' ? (
              <button type="button" className={styles.primaryButton} onClick={handleStart}>
                {state === 'completed' ? 'Ещё раз' : 'Начать'}
              </button>
            ) : (
              <button type="button" className={styles.secondaryButton} onClick={handleReset}>
                Сбросить
              </button>
            )}
          </div>
        </section>

        <section
          ref={boardRef}
          className={`${styles.boardSection} ${state === 'running' ? styles.boardFocused : ''}`}
        >
          <div className={`${styles.boardWrapper} ${state !== 'idle' ? styles.boardWrapperActive : ''}`}>
            {session ? (
              <div
                className={styles.board}
                style={{
                  gridTemplateColumns: `repeat(${session.grid_size}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${session.grid_size}, minmax(0, 1fr))`,
                }}
              >
                {numbers.map((value) => {
                  const isClicked = clickedNumbers.has(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      className={`${styles.cell} ${isClicked ? styles.cellClicked : ''}`}
                      onClick={() => handleCellClick(value)}
                      disabled={isClicked || state !== 'running'}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className={styles.placeholder}>
                <p>Выберите размер таблицы и нажмите «Начать», чтобы начать тренировку.</p>
              </div>
            )}

            {(state === 'running' || state === 'completed') && (
              <aside className={styles.infoPanel}>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Время</span>
                  <span className={styles.infoValue}>{formattedTime}</span>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Ошибки</span>
                  <span className={styles.infoValue}>{mistakes}</span>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Следующее число</span>
                  <span className={styles.infoValue}>{nextNumber <= totalCells ? nextNumber : 'Готово!'}</span>
                </div>
                {state === 'completed' && averageDisplay && (
                  <div className={styles.infoBlock}>
                    <span className={styles.infoLabel}>Среднее на число</span>
                    <span className={styles.infoValue}>{averageDisplay} сек.</span>
                  </div>
                )}
                {state === 'completed' && performanceLabel && (
                  <div className={styles.performanceBox}>
                    <span className={styles.performanceLabel}>Категория</span>
                    <span className={styles.performanceValue}>{performanceLabel}</span>
                  </div>
                )}
              </aside>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default SchulteTableTrainer;

