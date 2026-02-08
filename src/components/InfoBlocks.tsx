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
            width={570}
            height={428}
            loading="lazy"
            decoding="async"
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
      {/* Mobile thesis-style list */}
      <div className={styles.mobileTheses} role="list">
        <ul>
          <li className={styles.thesisPink}>Для детей 1–12 лет — комплексные занятия и подготовка к школе</li>
          <li className={styles.thesisGreen}>Опытные педагоги — логопеды и наставники по STEM-направлениям</li>
          <li className={styles.thesisOrange}>Индивидуальный подход — программы под потребности ребёнка</li>
          <li className={styles.thesisBlue}>Тёплая семейная атмосфера — безопасное и интересное пространство</li>
        </ul>
      </div>
    </section>
  );
};

export default InfoBlocks;

