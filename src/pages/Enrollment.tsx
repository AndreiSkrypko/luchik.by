import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import EnrollmentForm from '@/components/EnrollmentForm';
import styles from './Enrollment.module.css';

const Enrollment = () => {
  const [searchParams] = useSearchParams();
  const courseFromQuery = searchParams.get('course')?.trim();
  const courseName = courseFromQuery || 'занятие в центре Лучик';
  const isPrepSchool = !courseFromQuery || /подготовк/i.test(courseFromQuery);
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  const toggleContacts = () => {
    setIsContactsOpen(!isContactsOpen);
  };

  const closeContacts = () => {
    setIsContactsOpen(false);
  };

  const handleTitleClick = () => {
    if (window.innerWidth <= 768) {
      const formElement = document.getElementById('enrollment-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className={styles.enrollmentPage}>
      <Header onContactsClick={toggleContacts} />
      <main>
        <div className={styles.enrollmentMain}>
          <div className={styles.contentWrapper}>
            <div className={styles.infoColumn}>
              <div className={styles.titleSection} onClick={handleTitleClick}>
                <h1 className={styles.enrollmentTitle}>
                  {isPrepSchool ? 'Запись на подготовку к школе' : `Запись на «${courseName}»`}
                </h1>
              </div>

              <div className={styles.persuasiveContent}>
                <div className={styles.textContent}>
                  {isPrepSchool ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <p className={styles.textParagraph}>
                        <strong>👥 Малые группы</strong> — внимание к каждому ребёнку и комфортный темп занятий.
                      </p>
                      <p className={styles.textParagraph}>
                        <strong>⭐ Опытные педагоги</strong> — практики с детьми и понятная обратная связь родителям.
                      </p>
                      <p className={styles.textParagraph}>
                        <strong>💝 Интересный формат</strong> — живые занятия без скуки, с понятным прогрессом.
                      </p>
                      <p className={styles.textParagraph}>
                        <strong>📍 Два адреса в Лиде</strong> — Замковая, 4 и Кооперативная, 36.
                      </p>
                      <p className={styles.textHighlight}>
                        <strong>Готовы начать?</strong> Оставьте заявку на «{courseName}» — мы перезвоним и подберём удобное время.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.formColumn}>
              <div className={styles.formSection} id="enrollment-form">
                <EnrollmentForm courseName={courseName} />
              </div>
            </div>
          </div>

          <div className={styles.fullWidthSections}>
            {isPrepSchool ? (
              <>
                <section className={styles.programSection}>
                  <h2 className={styles.sectionTitle}>✨ В программе курса</h2>
                  <p className={styles.sectionSubtitle}>Всё, что нужно для уверенного старта школьной жизни</p>

                  <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                      <div className={`${styles.featureIcon} ${styles.iconCandy}`}>📚</div>
                      <h3 className={styles.featureTitle}>Развитие речи и чтение</h3>
                      <p className={styles.featureDescription}>
                        Учим читать, правильно произносить звуки и строить предложения
                      </p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={`${styles.featureIcon} ${styles.iconMint}`}>🔢</div>
                      <h3 className={styles.featureTitle}>Счёт, логика и внимание</h3>
                      <p className={styles.featureDescription}>
                        Знакомство с числами, основы математики и логические задачки
                      </p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={`${styles.featureIcon} ${styles.iconSunshine}`}>🎨</div>
                      <h3 className={styles.featureTitle}>Творчество и моторика</h3>
                      <p className={styles.featureDescription}>
                        Развитие мелкой моторики через рисование, лепку и поделки
                      </p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={`${styles.featureIcon} ${styles.iconSky}`}>🧠</div>
                      <h3 className={styles.featureTitle}>Память и усидчивость</h3>
                      <p className={styles.featureDescription}>
                        Игры на развитие памяти, концентрации и самостоятельности
                      </p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={`${styles.featureIcon} ${styles.iconCandy}`}>💬</div>
                      <h3 className={styles.featureTitle}>Навыки общения</h3>
                      <p className={styles.featureDescription}>
                        Работа в группе и общение — как в настоящем классе!
                      </p>
                    </div>
                    <div className={styles.featureCard}>
                      <div className={`${styles.featureIcon} ${styles.iconMint}`}>👥</div>
                      <h3 className={styles.featureTitle}>Адаптация к школе</h3>
                      <p className={styles.featureDescription}>
                        Знакомство со структурой уроков и школьным ритмом
                      </p>
                    </div>
                  </div>
                </section>

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
                    <p className={styles.infoBoxText}>💬 «Готовность к школе — это уверенность ребёнка»</p>
                  </div>
                </section>

                <section className={styles.formatSection}>
                  <div className={styles.formatBox}>
                    <h3 className={styles.formatTitle}>📅 Интенсив стартует уже скоро!</h3>
                    <p className={styles.formatText}>
                      <strong>Формат:</strong> небольшие группы, увлекательные занятия без стресса и скуки
                    </p>
                    <p className={styles.formatLocation}>📍 г. Лида • Детский центр «Лучик»</p>
                  </div>
                </section>
              </>
            ) : (
              <>
                <section className={styles.whyImportantSection}>
                  <h2 className={styles.sectionTitle}>Почему родители выбирают «Лучик»</h2>
                  <p className={styles.sectionSubtitle}>
                    Заявка на «{courseName}» — первый шаг. Дальше мы уточним группу, время и ответим на вопросы.
                  </p>
                  <div className={styles.benefitsList}>
                    <div className={styles.benefitItem}>
                      <div className={styles.benefitCheck}>✓</div>
                      <p className={styles.benefitText}>Понятная программа и живые занятия</p>
                    </div>
                    <div className={styles.benefitItem}>
                      <div className={styles.benefitCheck}>✓</div>
                      <p className={styles.benefitText}>Малые группы и внимание к ребёнку</p>
                    </div>
                    <div className={styles.benefitItem}>
                      <div className={styles.benefitCheck}>✓</div>
                      <p className={styles.benefitText}>Два удобных адреса в центре Лиды</p>
                    </div>
                    <div className={styles.benefitItem}>
                      <div className={styles.benefitCheck}>✓</div>
                      <p className={styles.benefitText}>Быстрая обратная связь после заявки</p>
                    </div>
                  </div>
                </section>

                <section className={styles.formatSection}>
                  <div className={styles.formatBox}>
                    <h3 className={styles.formatTitle}>📅 Набор в группы открыт</h3>
                    <p className={styles.formatText}>
                      <strong>Курс:</strong> {courseName}
                    </p>
                    <p className={styles.formatLocation}>📍 г. Лида • Детский центр «Лучик»</p>
                  </div>
                </section>
              </>
            )}

            <section className={styles.ctaSection}>
              <div className={styles.ctaBox}>
                <h2 className={styles.ctaTitle}>
                  {isPrepSchool ? 'Готовы записать ребёнка на курс?' : `Готовы записаться на «${courseName}»?`}
                </h2>
                <p className={styles.ctaText}>
                  Заполните форму выше — мы свяжемся с вами для уточнения деталей и ответим на все вопросы
                </p>
                <a href="#enrollment-form" className={styles.ctaButton}>
                  Записаться
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer onContactsClick={toggleContacts} />
      <ContactsPanel isOpen={isContactsOpen} onClose={closeContacts} />
    </div>
  );
};

export default Enrollment;
