import styles from './InDevelopment.module.css';

const InDevelopment = () => {
  return (
    <div className={styles.inDevelopmentContainer}>
      <div className={styles.inDevelopmentContent}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>🚧</span>
        </div>
        <h2 className={styles.title}>Страница в разработке</h2>
        <p className={styles.description}>
          Мы активно работаем над наполнением этого раздела. 
          Скоро здесь появится полезная и интересная информация!
        </p>
        <div className={styles.decorativeElements}>
          <span className={styles.decorativeDot}>✨</span>
          <span className={styles.decorativeDot}>💫</span>
          <span className={styles.decorativeDot}>⭐</span>
        </div>
        <p className={styles.subtext}>
          А пока вы можете ознакомиться с другими разделами сайта или 
          связаться с нами для получения дополнительной информации.
        </p>
      </div>
    </div>
  );
};

export default InDevelopment;
