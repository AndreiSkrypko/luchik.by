import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import EnrollmentCard from '@/components/EnrollmentCard';
import styles from './ThankYou.module.css';

const ThankYou = () => {
  useEffect(() => {
    // Event snippet for «Просмотр страницы (1)» conversion page
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
              Ваша заявка на подготовку к школе успешно отправлена. 
              Мы свяжемся с вами в ближайшее время для уточнения деталей.
            </p>

            <div className={styles.infoBox}>
              <p className={styles.infoText}>
                📞 Если у вас есть срочные вопросы, вы можете связаться с нами по телефону
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
      {/* Скрытая форма для Google Ads - автоматическое определение конверсии */}
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
