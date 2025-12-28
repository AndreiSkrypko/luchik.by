import styles from './InfoBlocks.module.css';

const InfoBlocks = () => {
  return (
    <section className={styles.infoBlocksSection} id="about">
      <div className={styles.infoBlocksContainer}>
        <div className={`${styles.infoBlock} ${styles.infoBlockPink}`}>
          <h3 className={styles.infoBlockTitle}>от 1 года до 12 лет</h3>
          <p className={styles.infoBlockText}>
            Комплексные занятия для малышей и школьников, подготовка к школе и интенсивы
          </p>
        </div>

        <div className={`${styles.infoBlock} ${styles.infoBlockGreen}`}>
          <h3 className={styles.infoBlockTitle}>Педагоги с опытом</h3>
          <p className={styles.infoBlockText}>
            Команда логопедов, педагогов раннего развития, наставников по STEM-направлениям
          </p>
        </div>

        <div className={`${styles.infoBlock} ${styles.infoBlockGrey}`}>
          {/* Пустой блок для будущего контента */}
        </div>

        <div className={`${styles.infoBlock} ${styles.infoBlockBlue}`}>
          <h3 className={styles.infoBlockTitle}>Семейная атмосфера</h3>
          <p className={styles.infoBlockText}>
            Теплое пространство, где детям спокойно, интересно и безопасно каждый день
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoBlocks;

