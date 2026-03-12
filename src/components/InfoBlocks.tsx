import styles from './InfoBlocks.module.css';

const InfoBlocks = () => {
  return (
    <section className={styles.infoBlocksSection} id="about">
      <div className={styles.infoBlocksContainer}>
        <div className={styles.infoBlock}>
          <img
            src="/img/cards/first.svg"
            alt="Детский центр Лучик — занятия от 1 до 17 лет в Лиде"
            className={styles.infoBlockImage}
          />
        </div>

        <div className={styles.infoBlock}>
          <img
            src="/img/cards/second.svg"
            alt="Педагоги с опытом — детский центр Лучик в Лиде"
            className={styles.infoBlockImage}
          />
        </div>

        <div className={styles.infoBlock}>
          <img
            src="/img/cards/robotics.webp"
            alt="Робототехника и программирование в детском центре Лучик, Лида"
            className={styles.infoBlockImage}
            width={570}
            height={428}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className={styles.infoBlock}>
          <img
            src="/img/cards/fourth.svg"
            alt="Семейная атмосфера в детском центре Лучик, Лида"
            className={styles.infoBlockImage}
          />
        </div>
      </div>
      {/* Mobile thesis-style list */}
      <div className={styles.mobileTheses} role="list">
        <ul>
          <li className={styles.thesisPink}>Для детей от 1 до 17 лет — комплексные занятия и подготовка к школе</li>
          <li className={styles.thesisGreen}>Опытные педагоги — логопеды и наставники по STEM-направлениям</li>
          <li className={styles.thesisOrange}>Индивидуальный подход — программы под потребности ребёнка</li>
          <li className={styles.thesisBlue}>Тёплая семейная атмосфера — безопасное и интересное пространство</li>
        </ul>
      </div>
    </section>
  );
};

export default InfoBlocks;

