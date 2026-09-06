import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import EnrollmentCard from '@/components/EnrollmentCard';
import { contacts } from '@/data/contacts';
import styles from './ThankYou.module.css';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const courseName = searchParams.get('course')?.trim() || '';

  useEffect(() => {
    const sendConversion = () => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          send_to: 'AW-18090541332/BGf0CJz26cIcEJSCn7JD',
          value: 1.0,
          currency: 'USD',
        });
      } else {
        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'conversion', {
              send_to: 'AW-18090541332/BGf0CJz26cIcEJSCn7JD',
              value: 1.0,
              currency: 'USD',
            });
          }
        }, 1000);
      }
    };

    sendConversion();
  }, []);

  return (
    <div className={styles.thankYouPage}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.iconWrapper}>
              <div className={styles.checkIcon}>✓</div>
            </div>

            <h1 className={styles.title}>Спасибо за вашу заявку!</h1>

            <p className={styles.message}>
              {courseName
                ? <>Ваша заявка на «{courseName}» успешно отправлена. Мы свяжемся с вами в ближайшее время для уточнения деталей.</>
                : <>Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время для уточнения деталей.</>}
            </p>

            <div className={styles.infoBox}>
              <p className={styles.infoText}>
                📞 Срочные вопросы —{' '}
                <a href={`tel:${contacts.phoneA1.number}`}>{contacts.phoneA1.display}</a>
              </p>
            </div>

            <div className={styles.actions}>
              <Link to="/" className={styles.homeButton}>
                Вернуться на главную
              </Link>
            </div>
          </div>
        </div>
      </main>
      <form style={{ display: 'none' }} id="thank-you-form" aria-hidden="true">
        <input type="hidden" name="conversion" value="thank-you-page" />
      </form>
      <Footer />
      <ScrollToTop />
      <EnrollmentCard />
    </div>
  );
};

export default ThankYou;
