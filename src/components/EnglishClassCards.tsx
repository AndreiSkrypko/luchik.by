import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EnglishClassCards.module.css';

interface Item {
  id: string;
  title: string;
  meta?: string;
}

interface Category {
  id: string;
  title: string;
  items: Item[];
}

const data: Category[] = [
  {
    id: 'letters',
    title: 'Учим буквы',
    items: [
      { id: 'vowels', title: 'Letter recognition (Vowels)' },
      { id: 'bcd', title: 'Letter recognition (B, C, D, F, G)' },
      { id: 'hjk', title: 'Letters (H, J, K, L)' },
      { id: 'mnp', title: 'Letters (M, N, P, Q)' },
      { id: 'rstv', title: 'Letters (R, S, T, V)' },
      { id: 'wxz', title: 'Letters (W, X, Z)' },
    ],
  },
  {
    id: 'numbers',
    title: 'Учим цифры',
    items: [
      { id: '6-7', title: 'Numbers. 6, 7' },
      { id: '8-9', title: 'Numbers. 8, 9' },
      { id: '10-12', title: 'Numbers. 10, 11, 12' },
      { id: '13-16', title: 'Numbers. 13, 14, 15, 16' },
      { id: '17-20', title: 'Numbers. 17, 18, 19, 20' },
    ],
  },
  {
    id: 'words',
    title: 'Учим слова',
    items: [
      { id: 'instruments', title: 'Musical instruments' },
      { id: 'animals', title: 'Animals (2)' },
      { id: 'big-small', title: 'Big or Small (2)' },
      { id: 'colours', title: 'Colours (3)' },
      { id: 'action-verbs', title: 'Action verbs (2)' },
      { id: 'firm-soft', title: 'Firm or Soft (2)' },
      { id: 'hello', title: 'Hello! How are you? (2)' },
      { id: 'birthday', title: 'My birthday (2)' },
      { id: 'inside-outside', title: 'Inside or Outside' },
    ],
  },
  {
    id: 'dictations',
    title: 'Словарные диктанты',
    items: [
      { id: 'question-words', title: 'Question words. Вопросительные слова' },
      { id: 'rhyming', title: 'Rhyming words' },
      { id: 'shapes', title: 'Shapes' },
      { id: 'in-class-1', title: 'In the classroom (1) Словарный диктант' },
      { id: 'in-class-2', title: 'In the classroom (2) Словарный диктант' },
      { id: 'my-room-1', title: 'My room (1) Словарный диктант' },
      { id: 'my-room-2', title: 'My room (2) Словарный диктант' },
    ],
  },
  {
    id: 'grammar',
    title: 'Понятная грамматика',
    items: [
      { id: 'articles', title: 'Indefinite and Definite article' },
      { id: 'question-words-2', title: 'Question words. Вопросительные слова' },
    ],
  },
  {
    id: 'reading',
    title: 'Читаем правильно',
    items: [
      { id: 'blending-cat', title: 'Blending sounds (c, a, t, p, n).' },
      { id: 'word-family-ap', title: 'Word family (-ap)' },
      { id: 'blending-satp', title: 'Blending sounds (s, a, t, p)' },
      { id: 'blending-setp', title: 'Blending sounds (s, e, t, p, n).' },
      { id: 'wf-ab', title: 'Word family (-ab)' },
      { id: 'wf-ad', title: 'Word family (-ad)' },
      { id: 'wf-ag', title: 'Word family (-ag)' },
      { id: 'wf-all', title: 'Word family (-all)' },
      { id: 'wf-ed', title: 'Word family (-ed)' },
    ],
  },
];

const EnglishClassCards: React.FC = () => {
  const navigate = useNavigate();

  const getBadgeText = (title: string) => {
    // keep only letters and spaces, take first letters of up to 2 words
    const cleaned = title.replace(/[^A-Za-zА-Яа-я\s]/g, '').trim();
    const parts = cleaned.split(/\s+/).filter(Boolean);
    return parts.slice(0, 2).map((w) => w[0].toUpperCase()).join('');
  };

  return (
    <section className={styles.container}>
      <div className={styles.headerRow}>
        <button className={styles.backButton} onClick={() => navigate('/trainers/english')}>
          ← К выбору класса
        </button>
        <h2 className={styles.sectionTitle}>Английский язык — 1 класс</h2>
      </div>

      <div className={styles.categories}>
        {data.map((cat) => (
          <div key={cat.id} className={styles.category}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryTitle}>{cat.title}</h3>
            </div>

            <div className={styles.itemsGrid}>
              {cat.items.map((it) => (
                <article key={it.id} className={styles.itemCard}>
                  <div className={styles.badge} aria-hidden>
                    {getBadgeText(it.title)}
                  </div>
                  <div className={styles.itemInner}>
                    <h4 className={styles.itemTitle}>{it.title}</h4>
                    {it.meta && <div className={styles.itemMeta}>{it.meta}</div>}
                  </div>
                  <button className={styles.openBtn}>Открыть</button>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EnglishClassCards;

