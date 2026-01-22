import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import EnrollmentForm from '@/components/EnrollmentForm';
import styles from './Enrollment.module.css';

const Enrollment = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.enrollmentPage}>
      <Header />
      <main>
        <div className={styles.enrollmentMain}>
          {/* Контейнер с двумя колонками */}
          <div className={styles.contentWrapper}>
            {/* Левая колонка - информация о курсе */}
            <div className={styles.infoColumn}>
              <div className={styles.titleSection}>
                <h1 className={styles.enrollmentTitle}>Запись на подготовку к школе</h1>
              </div>

              {/* Убедительный контент для заполнения пространства */}
              <div className={styles.persuasiveContent}>
                <div className={styles.textContent}>
                  <p className={styles.textParagraph}>
                    <strong>🎯 Быстрый результат</strong> — интенсивный формат позволяет за короткое время подготовить ребёнка к школе.
                  </p>
                  
                  <p className={styles.textParagraph}>
                    <strong>👥 Малые группы</strong> — индивидуальный подход к каждому ребёнку и внимание к его потребностям.
                  </p>
                  
                  <p className={styles.textParagraph}>
                    <strong>💝 Без стресса</strong> — игровая форма обучения создаёт комфортную атмосферу и интерес к учёбе.
                  </p>
                  
                  <p className={styles.textParagraph}>
                    <strong>⭐ Опытные педагоги</strong> — профессиональные преподаватели с многолетним опытом работы с детьми.
                  </p>
                  
                  <p className={styles.textHighlight}>
                    <strong>⏰ Важно:</strong> Чем раньше ребёнок начнёт подготовку, тем увереннее он войдёт в школьную жизнь. 
                    Заполните форму справа — мы свяжемся с вами в ближайшее время!
                  </p>
                  
                  <div className={styles.textFeatures}>
                    <span>Бесплатная консультация</span>
                    <span>•</span>
                    <span>Гибкий график</span>
                    <span>•</span>
                    <span>Доступные цены</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка - форма */}
            <div className={styles.formColumn}>
              <div className={styles.formSection} id="enrollment-form">
                <EnrollmentForm />
              </div>
            </div>
          </div>

          {/* Секции на всю ширину страницы */}
          <div className={styles.fullWidthSections}>
            {/* Программа курса */}
            <section className={styles.programSection}>
              <h2 className={styles.sectionTitle}>✨ В программе курса</h2>
              <p className={styles.sectionSubtitle}>Всё, что нужно для уверенного старта школьной жизни</p>
              
              <div className={styles.featuresGrid}>
                <div className={styles.featureCard}>
                  <div className={`${styles.featureIcon} ${styles.iconCandy}`}>
                    📚
                  </div>
                  <h3 className={styles.featureTitle}>Развитие речи и чтение</h3>
                  <p className={styles.featureDescription}>
                    Учим читать, правильно произносить звуки и строить предложения
                  </p>
                </div>

                <div className={styles.featureCard}>
                  <div className={`${styles.featureIcon} ${styles.iconMint}`}>
                    🔢
                  </div>
                  <h3 className={styles.featureTitle}>Счёт, логика и внимание</h3>
                  <p className={styles.featureDescription}>
                    Знакомство с числами, основы математики и логические задачки
                  </p>
                </div>

                <div className={styles.featureCard}>
                  <div className={`${styles.featureIcon} ${styles.iconSunshine}`}>
                    🎨
                  </div>
                  <h3 className={styles.featureTitle}>Творчество и моторика</h3>
                  <p className={styles.featureDescription}>
                    Развитие мелкой моторики через рисование, лепку и поделки
                  </p>
                </div>

                <div className={styles.featureCard}>
                  <div className={`${styles.featureIcon} ${styles.iconSky}`}>
                    🧠
                  </div>
                  <h3 className={styles.featureTitle}>Память и усидчивость</h3>
                  <p className={styles.featureDescription}>
                    Игры на развитие памяти, концентрации и самостоятельности
                  </p>
                </div>

                <div className={styles.featureCard}>
                  <div className={`${styles.featureIcon} ${styles.iconCandy}`}>
                    💬
                  </div>
                  <h3 className={styles.featureTitle}>Навыки общения</h3>
                  <p className={styles.featureDescription}>
                    Работа в группе и общение — как в настоящем классе!
                  </p>
                </div>

                <div className={styles.featureCard}>
                  <div className={`${styles.featureIcon} ${styles.iconMint}`}>
                    👥
                  </div>
                  <h3 className={styles.featureTitle}>Адаптация к школе</h3>
                  <p className={styles.featureDescription}>
                    Знакомство со структурой уроков и школьным ритмом
                  </p>
                </div>
              </div>
            </section>

            {/* Почему это важно */}
            <section className={styles.whyImportantSection}>
              <h2 className={styles.sectionTitle}>🎯 Почему это важно?</h2>
              <p className={styles.sectionSubtitle}>
                Первые месяцы в школе — это не только буквы и цифры. Это <strong>адаптация, уверенность, внимание</strong> и привычка учиться.
              </p>

              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitCheck}>✓</div>
                  <p className={styles.benefitText}>Ребёнку легче влиться в школьный ритм</p>
                </div>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitCheck}>✓</div>
                  <p className={styles.benefitText}>Меньше стресса — больше уверенности</p>
                </div>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitCheck}>✓</div>
                  <p className={styles.benefitText}>Радость от учёбы с первых дней</p>
                </div>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitCheck}>✓</div>
                  <p className={styles.benefitText}>Готовность к новым знаниям и друзьям</p>
                </div>
              </div>

              <div className={styles.infoBox}>
                <p className={styles.infoBoxText}>
                  💬 "Готовность к школе — это уверенность ребёнка"
                </p>
              </div>
            </section>

            {/* Формат и место */}
            <section className={styles.formatSection}>
              <div className={styles.formatBox}>
                <h3 className={styles.formatTitle}>📅 Интенсив стартует уже скоро!</h3>
                <p className={styles.formatText}>
                  <strong>Формат:</strong> небольшие группы, увлекательные занятия без стресса и скуки
                </p>
                <p className={styles.formatLocation}>
                  📍 г. Лида • Детский центр "Лучик"
                </p>
              </div>
            </section>

            {/* Призыв к действию */}
            <section className={styles.ctaSection}>
              <div className={styles.ctaBox}>
                <h2 className={styles.ctaTitle}>Готовы записать ребёнка на курс?</h2>
                <p className={styles.ctaText}>
                  Заполните форму выше, и мы свяжемся с вами для уточнения деталей и ответим на все вопросы
                </p>
                <a href="#enrollment-form" className={styles.ctaButton}>
                  Записаться на курс
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Enrollment;
