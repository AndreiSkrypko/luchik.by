import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import styles from './ThankYou.module.css';

const ThankYou = () => {
  useEffect(() => {
    // Google Ads conversion tracking
    // Замените 'AW-CONVERSION_ID' и 'CONVERSION_LABEL' на ваши реальные значения из Google Ads
    // Формат: 'AW-XXXXXXXXXX/YYYYYYYYYYYYYYYYYYYYYYYY'
    
    const sendConversion = () => {
      // Проверяем наличие gtag
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
          'value': 1.0,
          'currency': 'BYN'
        });
      } else {
        // Если gtag еще не загружен, ждем немного и пробуем снова
        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'conversion', {
              'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
              'value': 1.0,
              'currency': 'BYN'
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
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ThankYou;
