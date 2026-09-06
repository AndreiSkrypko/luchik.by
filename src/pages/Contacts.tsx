import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MapSection from '@/components/MapSection';
import ScrollToTop from '@/components/ScrollToTop';
import EnrollmentCard from '@/components/EnrollmentCard';
import EnrollmentForm from '@/components/EnrollmentForm';
import { contacts } from '@/data/contacts';
import modalStyles from '@/components/EnrollmentModal.module.css';
import styles from './Contacts.module.css';

const messengerColors: Record<string, { from: string; to: string; shadow: string }> = {
  telegram: { from: '#0088cc', to: '#00aaff', shadow: 'rgba(0,136,204,0.35)' },
  viber:    { from: '#7360f2', to: '#8b7cf5', shadow: 'rgba(115,96,242,0.35)' },
  whatsapp: { from: '#25d366', to: '#34e076', shadow: 'rgba(37,211,102,0.35)' },
};

const Contacts = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const phoneNumber = e.currentTarget.getAttribute('href')?.replace('tel:', '') || 'unknown';
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18090541332',
        'event_category': 'phone',
        'event_label': 'phone_click',
        'phone_number': phoneNumber,
        'value': 1.0,
        'currency': 'BYN',
      });
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
  };

  return (
    <div className={styles.contactsPage}>
      <Header />
      <main>
        <div className={styles.contactsMain}>

          {/* ───── Заголовок ───── */}
          <div className={styles.titleSection}>
            <h1 className={styles.pageTitle}>Контакты</h1>
            <p className={styles.pageDescription}>
              Свяжитесь с нами удобным способом — позвоните, напишите<br className={styles.desktopBr} /> в мессенджер или оставьте заявку
            </p>
          </div>

          {/* ───── Адреса ───── */}
          <section className={styles.section}>
            <div className={styles.addressGrid}>
              {contacts.addresses.map((addr, i) => {
                const phone = contacts.phones.find(p => p.number === addr.phone);
                return (
                  <div key={i} className={styles.addressCard}>
                    <div className={styles.addressCardTop}>
                      <div className={styles.addressIconWrap}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.addressSvg}>
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div>
                        <div className={styles.addressLabel}>г. Лида</div>
                        <div className={styles.addressStreet}>{addr.street}</div>
                      </div>
                    </div>
                    <a href={`tel:${addr.phone}`} className={styles.addressPhone} onClick={handlePhoneClick}>
                      {phone?.display ?? addr.phone}
                    </a>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ───── Контактная информация + мессенджеры ───── */}
          <section className={styles.section}>
            <div className={styles.infoRow}>

              {/* Email */}
              <div className={styles.infoCard}>
                <div className={styles.infoCardIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.infoSvg}>
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                  </svg>
                </div>
                <div className={styles.infoCardBody}>
                  <div className={styles.infoCardLabel}>Электронная почта</div>
                  <a href={`mailto:${contacts.email}`} className={styles.infoCardValue}>{contacts.email}</a>
                </div>
              </div>

              {/* Режим работы */}
              <div className={styles.infoCard}>
                <div className={styles.infoCardIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.infoSvg}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z" fill="currentColor"/>
                  </svg>
                </div>
                <div className={styles.infoCardBody}>
                  <div className={styles.infoCardLabel}>Режим работы</div>
                  <div className={styles.scheduleLines}>
                    <span className={styles.scheduleLine}>{contacts.schedule.weekdays}</span>
                    <span className={styles.scheduleLine}>{contacts.schedule.weekend}</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ───── Мессенджеры ───── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Написать нам</h2>
            <div className={styles.messengersGrid}>
              {contacts.messengers.map((m) => {
                const c = messengerColors[m.id];
                return (
                  <a
                    key={m.id}
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.messengerCard}
                    aria-label={m.ariaLabel}
                    style={{
                      '--m-from': c.from,
                      '--m-to': c.to,
                      '--m-shadow': c.shadow,
                    } as React.CSSProperties}
                  >
                    <div className={styles.messengerIconWrap}>
                      <img src={`/img/contacts/${m.id}.svg`} alt="" width={32} height={32} aria-hidden />
                    </div>
                    <div className={styles.messengerCardBody}>
                      <span className={styles.messengerName}>{m.name}</span>
                      <span className={styles.messengerHint}>Написать сообщение →</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>

          {/* ───── Соцсети ───── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Мы в соцсетях</h2>
            <div className={styles.socialsGrid}>
              {contacts.socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialCard}
                  aria-label={`${s.name}: ${s.username}`}
                >
                  <img
                    src={`/img/socseti/${s.id === 'instagram' ? 'inst' : s.id}.svg`}
                    alt=""
                    width={44}
                    height={44}
                    className={styles.socialIcon}
                    aria-hidden
                  />
                  <div className={styles.socialCardBody}>
                    <span className={styles.socialName}>{s.name}</span>
                    <span className={styles.socialUsername}>@{s.username}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* ───── CTA ───── */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaText}>
                <h2 className={styles.ctaTitle}>Запишите ребёнка на занятие</h2>
                <p className={styles.ctaSubtitle}>Оставьте заявку — мы свяжемся с вами в ближайшее время и подберём подходящую программу</p>
              </div>
              <div className={styles.ctaButtons}>
                <button type="button" className={styles.ctaButtonPrimary} onClick={() => setIsFormOpen(true)}>
                  Оставить заявку
                </button>
                <Link to="/#directions" className={styles.ctaButtonSecondary}>
                  Выбрать направление
                </Link>
              </div>
            </div>
          </section>

          <MapSection />
        </div>
      </main>

      <Footer />
      <ScrollToTop />
      <EnrollmentCard />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className={modalStyles.content}>
          <DialogHeader className={modalStyles.header}>
            <DialogTitle className={modalStyles.title}>Оставить заявку</DialogTitle>
            <DialogDescription className={modalStyles.description}>
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>
          <EnrollmentForm onSuccess={handleFormSuccess} courseName="занятия в детском центре" compact />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contacts;
