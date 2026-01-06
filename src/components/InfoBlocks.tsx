import styles from './InfoBlocks.module.css';

const InfoBlocks = () => {
  return (
    <section className={styles.infoBlocksSection} id="about">
      <div className={styles.infoBlocksContainer}>
        <div className={styles.infoBlock}>
          <img
            src="/img/cards/first.svg"
            alt="от 1 года до 12 лет"
            className={styles.infoBlockImage}
          />
        </div>

        <div className={styles.infoBlock}>
          <img
            src="/img/cards/second.svg"
            alt="Педагоги с опытом"
            className={styles.infoBlockImage}
          />
        </div>

        <div className={styles.infoBlock}>
          <img
            src="/img/IMG_20201010_155836_BURST4.jpg"
            alt="Робототехника и программирование"
            className={styles.infoBlockImage}
          />
        </div>

        <div className={styles.infoBlock}>
          <img
            src="/img/cards/fouth.svg"
            alt="Семейная атмосфера"
            className={styles.infoBlockImage}
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBlocks;

