import { useEffect } from 'react';
import styles from './ContactsPanel.module.css';

interface ContactsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactsPanel = ({ isOpen, onClose }: ContactsPanelProps) => {
  // Предзагрузка SVG изображений при открытии панели
  useEffect(() => {
    if (isOpen) {
      const svgImages = [
        '/img/socseti/inst.svg',
        '/img/socseti/vk.svg',
        '/img/socseti/ok.svg'
      ];
      
      svgImages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    console.error('Failed to load image:', img.src);
    console.error('Image natural dimensions:', img.naturalWidth, 'x', img.naturalHeight);
    console.error('Image complete:', img.complete);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log('Successfully loaded image:', e.currentTarget.src);
  };

  return (
    <>
      <div className={styles.contactsOverlay} onClick={onClose} />
      <div className={styles.contactsPanel}>
        <div className={styles.contactsPanelHeader}>
          <div className={styles.contactsCloudContainer}>
            <img
              src="/img/main/cloud-white.webp"
              alt="Облако"
              width={250}
              height={125}
              className={styles.contactsCloud}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            <div className={styles.contactsCloudTitle}>Контакты</div>
            <img
              src="/img/main/cloud-1.webp"
              alt="Белое облако"
              width={70}
              height={55}
              className={styles.contactsWhiteCloud}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        <div className={styles.contactsPanelContent}>
          <div className={styles.contactsFrame}>
            <svg
              width="291"
              height="225"
              viewBox="0 0 291 225"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.contactsFrameImage}
            >
              <rect opacity="0.65" width="291" height="225" rx="22" fill="white" />
            </svg>
            <img
              src="/img/contacts/cow.webp"
              alt="Коровка"
              width={78}
              height={78}
              className={styles.contactsCow}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            <div className={styles.contactsContent}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <img
                    src="/img/contacts/adress2.webp"
                    alt="Адрес"
                    width={20}
                    height={26}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className={styles.contactInfo}>
                  <svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.contactSvgText}>
                    <text x="0" y="20" fill="#777777" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="500">Замковая, 4</text>
                    <text x="0" y="40" fill="#777777" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="500">+445523267</text>
                  </svg>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <img
                    src="/img/contacts/adress2.webp"
                    alt="Адрес"
                    width={20}
                    height={26}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className={styles.contactInfo}>
                  <svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.contactSvgText}>
                    <text x="0" y="20" fill="#777777" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="500">Кооперативная, 56</text>
                    <text x="0" y="40" fill="#777777" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="500">298667663</text>
                  </svg>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <img
                    src="/img/contacts/mail.webp"
                    alt="Email"
                    width={25}
                    height={25}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className={styles.contactInfo}>
                  <svg width="200" height="32" viewBox="0 0 200 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.contactSvgText}>
                    <text x="0" y="24" fill="#777777" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="500">luchik@.com</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/img/contacts/leaf1.webp"
          alt="Листик"
          width={61}
          height={75}
          className={styles.contactsLeaf}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        <div className={styles.contactsSocialsTitle}>Мы в соцсетях</div>
        <div className={styles.contactsSocials}>
          <div className={styles.contactsSocialItem}>
            <div className={styles.contactsSocialIconContainer}>
              <a
                href="https://instagram.com/lu4ik_lida"
                target="_blank"
                rel="noreferrer"
                className={styles.contactsSocialIconLink}
                aria-label="Instagram"
              >
                <img
                  src="/img/socseti/inst.svg"
                  alt="Instagram"
                  width={32}
                  height={32}
                  className={styles.contactsSocialIcon}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </a>
            </div>
            <div className={styles.contactsSocialUsername}>lu4ik_lida</div>
          </div>
          <div className={styles.contactsSocialItem}>
            <div className={styles.contactsSocialIconContainer}>
              <a
                href="https://vk.com/luchiklida"
                target="_blank"
                rel="noreferrer"
                className={styles.contactsSocialIconLink}
                aria-label="VK"
              >
                <img
                  src="/img/socseti/vk.svg"
                  alt="ВКонтакте"
                  width={32}
                  height={32}
                  className={styles.contactsSocialIcon}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </a>
              <a
                href="https://ok.ru/luchiklida"
                target="_blank"
                rel="noreferrer"
                className={styles.contactsSocialIconLink}
                aria-label="Odnoklassniki"
              >
                <img
                  src="/img/socseti/ok.svg"
                  alt="Одноклассники"
                  width={32}
                  height={32}
                  className={styles.contactsSocialIcon}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </a>
            </div>
            <div className={styles.contactsSocialUsername}>luchiklida</div>
          </div>
        </div>
        <div className={styles.contactsScheduleFrame}>
          <div className={styles.contactsScheduleFrameWrapper}>
            <svg
              width="291"
              height="83"
              viewBox="0 0 291 83"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.contactsScheduleFrameBg}
            >
              <rect x="1" y="1" width="289" height="81" rx="40.5" stroke="#777777" strokeWidth="2" />
            </svg>
            <div className={styles.contactsScheduleText}>
              <div className={styles.contactsScheduleLine}>Пн-Пт с 9.00 до 20.00</div>
              <div className={styles.contactsScheduleLine}>Сб,Вс с 10.00 до 18.00</div>
            </div>
            <img
              src="/img/contacts/leaf2.webp"
              alt="Лист"
              width={78}
              height={68}
              className={styles.contactsScheduleLeaf}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactsPanel;

