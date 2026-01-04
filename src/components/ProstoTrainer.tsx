import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProstoTrainer.module.css';

type Stage = 'settings' | 'countdown' | 'play' | 'answer' | 'result';

type SimplySettings = {
  range_key: number;
  num_examples: number;
  speed: number;
  max_digit: number;
};

type SimplyNumber = {
  index: number;
  value: number;
};

type SimplySession = {
  settings: SimplySettings;
  numbers: SimplyNumber[];
  total: number;
};

const RANGE_OPTIONS = [
  { key: 1, label: 'от 1 до 10', min: 1, max: 10 },
  { key: 2, label: 'от 10 до 100', min: 10, max: 100 },
  { key: 3, label: 'от 100 до 1000', min: 100, max: 1000 },
  { key: 4, label: 'от 1000 до 10000', min: 1000, max: 10000 },
];

const formatNumber = (value: number) => (value > 0 ? `+${value}` : value.toString());

// Генерация чисел согласно логике абакуса (для однозначных чисел с max_digit >= 5)
const generateAbacusNumbers = (maxDigit: number, numExamples: number): number[] => {
  const numbers: number[] = [];
  let currentSum = 0;
  let positiveCount = 0;
  let negativeCount = 0;
  
  // Состояние абакуса: [есть_ли_пятерка, количество_единиц]
  let abacusState: [boolean, number] = [false, 0];
  
  // Возможные операции согласно правилам абакуса
  const getValidOperations = (currentState: [boolean, number]): Array<['+' | '-', number]> => {
    const operations: Array<['+' | '-', number]> = [];
    const [hasFive, units] = currentState;
    
    // Операции с пятеркой (если max_digit >= 5)
    if (maxDigit >= 5) {
      if (!hasFive) {
        operations.push(['+', 5]);
      } else {
        operations.push(['-', 5]);
      }
    }
    
    // Операции с единицами (от 1 до 4)
    const maxUnits = maxDigit < 5 ? maxDigit : 4;
    for (let i = 1; i <= maxUnits; i++) {
      if (units + i <= 4) {
        operations.push(['+', i]);
      }
      if (units - i >= 0) {
        operations.push(['-', i]);
      }
    }
    
    // Для чисел 6-9 (если max_digit > 5)
    if (maxDigit > 5) {
      operations.push(['+', maxDigit]);
      operations.push(['-', maxDigit]);
    }
    
    // Фильтруем операции, чтобы промежуточный результат был от 0 до 9
    return operations.filter(([sign, value]) => {
      const newSum = currentSum + (sign === '+' ? value : -value);
      return newSum >= 0 && newSum <= 9;
    });
  };
  
  // Генерируем последовательность операций
  for (let i = 0; i < numExamples; i++) {
    const validOps = getValidOperations(abacusState);
    
    if (validOps.length === 0) {
      // Если нет допустимых операций, сбрасываем состояние
      abacusState = [false, 0];
      currentSum = 0;
      const newOps = getValidOperations(abacusState);
      if (newOps.length > 0) {
        const [sign, value] = newOps[Math.floor(Math.random() * newOps.length)];
        const finalNumber = sign === '+' ? value : -value;
        numbers.push(finalNumber);
        currentSum += finalNumber;
        
        // Обновляем состояние абакуса
        if (value === 5) {
          abacusState[0] = sign === '+';
        } else if (value <= 4) {
          abacusState[1] += sign === '+' ? value : -value;
        }
      }
    } else {
      // Взвешиваем операции для более частого использования max_digit
      const weightedOps: Array<['+' | '-', number]> = [];
      validOps.forEach(([sign, value]) => {
        if (value === maxDigit) {
          const weight = maxDigit === 9 ? 6 : maxDigit === 4 ? 5 : 4;
          for (let j = 0; j < weight; j++) {
            weightedOps.push([sign, value]);
          }
        } else if (value === 5 && maxDigit >= 5) {
          for (let j = 0; j < 2; j++) {
            weightedOps.push([sign, value]);
          }
        } else {
          weightedOps.push([sign, value]);
        }
      });
      
      let selectedOp: ['+' | '-', number];
      
      // Гарантируем баланс положительных и отрицательных чисел
      const positiveOps = weightedOps.filter(([sign]) => sign === '+');
      const negativeOps = weightedOps.filter(([sign]) => sign === '-');
      
      if (negativeCount < positiveCount && negativeOps.length > 0) {
        // Предпочитаем отрицательные, если их меньше
        selectedOp = negativeOps[Math.floor(Math.random() * negativeOps.length)];
      } else if (positiveCount < negativeCount && positiveOps.length > 0) {
        // Предпочитаем положительные, если их меньше
        selectedOp = positiveOps[Math.floor(Math.random() * positiveOps.length)];
      } else {
        // Случайный выбор
        selectedOp = weightedOps[Math.floor(Math.random() * weightedOps.length)];
      }
      
      const [sign, value] = selectedOp;
      const finalNumber = sign === '+' ? value : -value;
      numbers.push(finalNumber);
      currentSum += finalNumber;
      if (sign === '+') positiveCount++;
      else negativeCount++;
      
      // Обновляем состояние абакуса
      if (value === 5) {
        abacusState[0] = sign === '+';
      } else if (value <= 4) {
        abacusState[1] += sign === '+' ? value : -value;
      }
    }
  }
  
  // Корректируем итоговую сумму, если она превышает max_digit
  const totalSum = numbers.reduce((sum, num) => sum + num, 0);
  if (totalSum > maxDigit) {
    const correction = maxDigit - totalSum;
    if (correction !== 0) {
      numbers.push(correction);
    }
  }
  
  return numbers;
};

// Генерация чисел для многоразрядных чисел
const generateMultiDigitNumbers = (
  rangeKey: number,
  numExamples: number,
  maxDigit: number
): number[] => {
  const numbers: number[] = [];
  
  // Определяем диапазон и количество разрядов
  let minNum: number, maxNum: number, numDigits: number, maxSum: number;
  
  if (rangeKey === 1) {
    minNum = 1;
    maxNum = 10;
    numDigits = 1;
    maxSum = maxDigit;
  } else if (rangeKey === 2) {
    minNum = 10;
    maxNum = 100;
    numDigits = 2;
    const actualMaxNum = parseInt(String(maxDigit) + String(maxDigit));
    maxNum = Math.min(maxNum, actualMaxNum);
    maxSum = actualMaxNum;
  } else if (rangeKey === 3) {
    minNum = 100;
    maxNum = 1000;
    numDigits = 3;
    const actualMaxNum = parseInt(String(maxDigit) + String(maxDigit) + String(maxDigit));
    maxNum = Math.min(maxNum, actualMaxNum);
    maxSum = actualMaxNum;
  } else if (rangeKey === 4) {
    minNum = 1000;
    maxNum = 10000;
    numDigits = 4;
    const actualMaxNum = parseInt(
      String(maxDigit) + String(maxDigit) + String(maxDigit) + String(maxDigit)
    );
    maxNum = Math.min(maxNum, actualMaxNum);
    maxSum = actualMaxNum;
  } else {
    minNum = 10;
    maxNum = 100;
    numDigits = 2;
    const actualMaxNum = parseInt(String(maxDigit) + String(maxDigit));
    maxNum = Math.min(maxNum, actualMaxNum);
    maxSum = actualMaxNum;
  }
  
  // Генерируем целевую сумму (не в самом начале, чтобы была возможность использовать отрицательные числа)
  const targetSum = Math.floor(Math.random() * (maxSum * 0.7 + 1)); // Ограничиваем целевую сумму
  let currentSum = 0;
  let attempts = 0;
  const maxAttempts = 1000;
  let positiveCount = 0;
  let negativeCount = 0;
  
  for (let i = 0; i < numExamples; i++) {
    attempts = 0;
    let found = false;
    
    while (attempts < maxAttempts && !found) {
      attempts++;
      
      // Генерируем число по разрядам с учетом ограничений max_digit
      let number = 0;
      let validNumber = true;
      
      for (let digitPos = 0; digitPos < numDigits; digitPos++) {
        const availableDigits = Array.from({ length: maxDigit }, (_, i) => i + 1);
        if (availableDigits.length === 0) {
          validNumber = false;
          break;
        }
        const digit = availableDigits[Math.floor(Math.random() * availableDigits.length)];
        number += digit * Math.pow(10, numDigits - 1 - digitPos);
      }
      
      if (!validNumber) continue;
      
      // Проверяем, что число попадает в нужный диапазон
      if (number < minNum || number > maxNum) continue;
      
      const remainingNumbers = numExamples - i - 1;
      
      if (i === numExamples - 1) {
        // Последнее число должно точно дать нужную сумму
        const neededValue = targetSum - currentSum;
        if (Math.abs(neededValue) === number) {
          const sign = neededValue > 0 ? 1 : -1;
          const tempSum = currentSum + number * sign;
          if (tempSum >= 0 && tempSum <= maxSum) {
            const finalNumber = number * sign;
            numbers.push(finalNumber);
            currentSum += finalNumber;
            found = true;
          }
        }
      } else {
        // Для промежуточных чисел выбираем знак
        const possibleSigns: number[] = [];
        
        // Проверяем положительный знак
        const tempSumPos = currentSum + number;
        if (tempSumPos >= 0 && tempSumPos <= maxSum) {
          const remainingRange = remainingNumbers * maxNum;
          if (
            tempSumPos - remainingRange <= targetSum &&
            targetSum <= tempSumPos + remainingRange
          ) {
            possibleSigns.push(1);
          }
        }
        
        // Проверяем отрицательный знак
        const tempSumNeg = currentSum - number;
        if (tempSumNeg >= 0 && tempSumNeg <= maxSum) {
          const remainingRange = remainingNumbers * maxNum;
          if (
            tempSumNeg - remainingRange <= targetSum &&
            targetSum <= tempSumNeg + remainingRange
          ) {
            possibleSigns.push(-1);
          }
        }
        
        if (possibleSigns.length > 0) {
          let sign: number;
          
          // Гарантируем баланс положительных и отрицательных чисел
          // Если отрицательных меньше, предпочитаем отрицательный знак
          if (possibleSigns.includes(-1) && possibleSigns.includes(1)) {
            if (negativeCount < positiveCount || (negativeCount === 0 && i < numExamples - 2)) {
              // Предпочитаем отрицательный знак, если отрицательных меньше
              sign = -1;
            } else if (positiveCount < negativeCount) {
              // Предпочитаем положительный знак, если положительных меньше
              sign = 1;
            } else {
              // Случайный выбор, если баланс примерно равный
              sign = possibleSigns[Math.floor(Math.random() * possibleSigns.length)];
            }
          } else {
            sign = possibleSigns[Math.floor(Math.random() * possibleSigns.length)];
          }
          
          const finalNumber = number * sign;
          numbers.push(finalNumber);
          currentSum += finalNumber;
          if (sign > 0) positiveCount++;
          else negativeCount++;
          found = true;
        }
      }
    }
    
    // Если не удалось найти подходящее число, используем простую генерацию
    if (!found) {
      let number = 0;
      for (let digitPos = 0; digitPos < numDigits; digitPos++) {
        const availableDigits = Array.from({ length: maxDigit }, (_, i) => i + 1);
        const digit = availableDigits.length > 0
          ? availableDigits[Math.floor(Math.random() * availableDigits.length)]
          : 1;
        number += digit * Math.pow(10, numDigits - 1 - digitPos);
      }
      
      number = Math.max(minNum, Math.min(number, maxNum));
      
      const possibleSigns: number[] = [];
      if (currentSum + number <= maxSum) {
        possibleSigns.push(1);
      }
      if (currentSum - number >= 0) {
        possibleSigns.push(-1);
      }
      
      let sign: number;
      if (possibleSigns.length > 0) {
        // Гарантируем баланс положительных и отрицательных чисел
        if (possibleSigns.includes(-1) && possibleSigns.includes(1)) {
          if (negativeCount < positiveCount || (negativeCount === 0 && i < numExamples - 2)) {
            sign = -1;
          } else if (positiveCount < negativeCount) {
            sign = 1;
          } else {
            sign = possibleSigns[Math.floor(Math.random() * possibleSigns.length)];
          }
        } else {
          sign = possibleSigns[Math.floor(Math.random() * possibleSigns.length)];
        }
      } else {
        sign = 1;
      }
      
      let finalNumber = number * sign;
      if (currentSum + finalNumber > maxSum) {
        finalNumber = maxSum - currentSum;
        if (finalNumber < minNum) {
          finalNumber = minNum;
        }
      }
      
      numbers.push(finalNumber);
      currentSum += finalNumber;
      if (sign > 0) positiveCount++;
      else negativeCount++;
      
      if (currentSum < 0) {
        currentSum = 0;
      } else if (currentSum > maxSum) {
        currentSum = maxSum;
      }
    }
  }
  
  return numbers;
};

// Генерация последовательности чисел на фронтенде
const generateSequence = (settings: SimplySettings): SimplySession => {
  let numbers: number[];
  
  // Для однозначных чисел (range_key=1) и max_digit>=5 используем логику абакуса
  if (settings.range_key === 1 && settings.max_digit >= 5) {
    numbers = generateAbacusNumbers(settings.max_digit, settings.num_examples);
  } else {
    numbers = generateMultiDigitNumbers(
      settings.range_key,
      settings.num_examples,
      settings.max_digit
    );
  }
  
  // Вычисляем итоговую сумму
  const total = numbers.reduce((sum, num) => sum + num, 0);
  
  // Преобразуем в формат SimplyNumber
  const simplyNumbers: SimplyNumber[] = numbers.map((value, index) => ({
    index: index + 1,
    value,
  }));
  
  return {
    settings,
    numbers: simplyNumbers,
    total,
  };
};

const ProstoTrainer = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>('settings');
  const [formState, setFormState] = useState({
    range_key: 2,
    num_examples: 10,
    speed: 1.0,
    max_digit: 9,
  });
  const [session, setSession] = useState<SimplySession | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [userIsCorrect, setUserIsCorrect] = useState<boolean | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const timerRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  const currentNumber = session?.numbers[currentIndex];
  const totalNumbers = session?.numbers.length ?? 0;

  const rangeDescription = useMemo(() => {
    const option = RANGE_OPTIONS.find((opt) => opt.key === formState.range_key);
    return option?.label ?? RANGE_OPTIONS[0].label;
  }, [formState.range_key]);

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
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const numberToWords = useCallback((num: number): string => {
    const ones = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    if (num === 0) return 'ноль';
    if (num < 0) return `минус ${numberToWords(Math.abs(num))}`;

    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) {
      return num % 10 === 0 ? tens[Math.floor(num / 10)] : `${tens[Math.floor(num / 10)]} ${ones[num % 10]}`.trim();
    }
    if (num < 1000) {
      const remainder = num % 100;
      return remainder === 0
        ? hundreds[Math.floor(num / 100)]
        : `${hundreds[Math.floor(num / 100)]} ${numberToWords(remainder)}`.trim();
    }
    if (num < 10000) {
      const thousands = Math.floor(num / 1000);
      const tail = num % 1000;
      const thousandsWord =
        thousands === 1
          ? 'одна тысяча'
          : thousands < 5
          ? `${numberToWords(thousands)} тысячи`
          : `${numberToWords(thousands)} тысяч`;
      const tailWord = tail ? ` ${numberToWords(tail)}` : '';
      return `${thousandsWord}${tailWord}`.trim();
    }
    return num.toString();
  }, []);

  const speakNumber = useCallback(
    (value: number, speed?: number) => {
      if (!audioEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
      
      // Не озвучиваем, если скорость быстрее 1.5 секунд
      if (speed !== undefined && speed < 1.5) return;

      const utterance = new SpeechSynthesisUtterance();
      const text = value > 0 ? `плюс ${numberToWords(value)}` : numberToWords(value);
      utterance.text = text;
      utterance.lang = 'ru-RU';
      utterance.rate = 1.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const russianVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith('ru'));
      if (russianVoice) {
        utterance.voice = russianVoice;
      }

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [audioEnabled, numberToWords],
  );

  const handleInputChange = (field: keyof typeof formState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'speed' ? parseFloat(event.target.value) : parseInt(event.target.value, 10);
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const startSession = () => {
    try {
      const newSession = generateSequence(formState);
      setSession(newSession);
      setCountdown(3);
      setStage('countdown');
    } catch (err) {
      console.error('Ошибка при генерации последовательности:', err);
      resetGame();
    }
  };

  const checkAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session) return;

    const numericAnswer = parseInt(userAnswer, 10);
    if (Number.isNaN(numericAnswer)) {
      return;
    }

    setUserIsCorrect(numericAnswer === session.total);
    setStage('result');
  };

  const handleBackClick = useCallback(() => {
    navigate('/trainers/mental-arithmetic');
  }, [navigate]);

  // Обратный отсчет
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

  // Показ чисел
  useEffect(() => {
    if (stage !== 'play' || !session) return undefined;

    setCurrentIndex(0);
    if (session.numbers.length > 0) {
      // Небольшая задержка перед первым числом
      timerRef.current = window.setTimeout(() => {
        speakNumber(session.numbers[0].value, session.settings.speed);
      }, 100);
    }

    const scheduleNext = (index: number) => {
      timerRef.current = window.setTimeout(() => {
        const nextIndex = index + 1;
        if (!session || nextIndex >= session.numbers.length) {
          setStage('answer');
          return;
        }
        setCurrentIndex(nextIndex);
        speakNumber(session.numbers[nextIndex].value, session.settings.speed);
        scheduleNext(nextIndex);
      }, session.settings.speed * 1000);
    };

    scheduleNext(0);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [session, stage, speakNumber]);

  const progressPercent = totalNumbers ? Math.round(((currentIndex + 1) / totalNumbers) * 100) : 0;

  const isSettingsOnly = stage === 'settings';

  return (
    <section className={styles.trainerSection}>
      <div className={styles.trainerContainer}>
        <div className={styles.headerSection}>
          <button className={styles.backButton} onClick={handleBackClick}>
            ← К выбору тренажера
          </button>
          <div className={styles.titleSection}>
            <h2 className={styles.trainerTitle}>Тренажер «Просто»</h2>
            <p className={styles.trainerSubtitle}>
              Запустите последовательность чисел в выбранном диапазоне, удерживайте сумму в голове и введите результат. Режим отлично подходит для разминки перед более сложными заданиями.
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
                      <label htmlFor="range">
                        Сложность <span className={styles.settingValue}>{rangeDescription}</span>
                      </label>
                      <input
                        id="range"
                        type="range"
                        min={1}
                        max={4}
                        step={1}
                        value={formState.range_key}
                        className={styles.slider}
                        onChange={handleInputChange('range_key')}
                      />
                      <div className={styles.sliderLabels}>
                        {RANGE_OPTIONS.map((option) => (
                          <span key={option.key}>{option.label}</span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="examples">
                        Количество примеров <span className={styles.settingValue}>{formState.num_examples}</span>
                      </label>
                      <input
                        id="examples"
                        type="range"
                        min={2}
                        max={99}
                        value={formState.num_examples}
                        className={styles.slider}
                        onChange={handleInputChange('num_examples')}
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
                        onChange={handleInputChange('speed')}
                      />
                      <p className={styles.helperText}>
                        {formState.speed >= 1.5 ? '🔊 Озвучка доступна на этой скорости' : '🔇 Озвучка отключена при скорости ниже 1.5 сек'}
                      </p>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="maxDigit">
                        Максимальная цифра <span className={styles.settingValue}>{formState.max_digit}</span>
                      </label>
                      <input
                        id="maxDigit"
                        type="range"
                        min={2}
                        max={9}
                        value={formState.max_digit}
                        className={styles.slider}
                        onChange={handleInputChange('max_digit')}
                      />
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button
                      type="button"
                      className={audioEnabled ? styles.primaryButton : styles.dangerButton}
                      onClick={() => setAudioEnabled((prev) => !prev)}
                    >
                      {audioEnabled ? '🔊 Озвучка включена' : '🔇 Озвучка выключена'}
                    </button>

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
                  <h3>Введите сумму всех чисел</h3>
                  <p>Вспомните последовательность и укажите конечный результат.</p>
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
                    Правильный ответ: <strong>{session.total}</strong>
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
                        {session.numbers.map((item) => (
                          <span key={item.index}>{formatNumber(item.value)}</span>
                        ))}
                        <span className={styles.equals}>=</span>
                        <span className={styles.total}>{session.total}</span>
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

        {stage === 'play' && session && currentNumber && (
          <div className={`${styles.fullscreenOverlay} ${styles.numberOverlay}`}>
            <div className={styles.numberContent}>
              <div className={styles.progress}>
                <span>
                  Число {currentNumber.index} из {session.numbers.length}
                </span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
              <div className={`${styles.currentNumber} ${currentNumber.value < 0 ? styles.negativeNumber : styles.positiveNumber}`}>
                {formatNumber(currentNumber.value)}
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

export default ProstoTrainer;
