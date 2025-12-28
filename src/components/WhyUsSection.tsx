import styles from './WhyUsSection.module.css';

const WhyUsSection = () => {
  return (
    <section className={styles.whyUsSection}>
      <div className={styles.whyUsContainer}>
        <div className={styles.whyUsContent}>
          <div className={styles.whyUsText}>
            <h2 className={styles.whyUsTitle}>Почему мы?</h2>
            <div className={styles.whyUsParagraphs}>
              <p className={styles.whyUsParagraph}>
                <img
                  src="/img/main/ladybug.webp"
                  alt="Божья коровка"
                  className={styles.ladybugIcon}
                />
                Комплексные развивающие занятия, мини-сад, творческие студии и современные технологии для детей.
              </p>
              <p className={styles.whyUsParagraph}>
                Забота, внимание и тёплая атмосфера каждый день.
              </p>
            </div>
            <button className={styles.ctaButton} type="button">
              ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ
            </button>
          </div>
          <div className={styles.whyUsImage}>
            <img
              src="/img/main/child-placeholder.webp"
              alt="Счастливый ребенок"
              className={styles.childImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;

