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
            <img
              src="/img/main/word-contacts.webp"
              alt="Контакты"
              width={122}
              height={23}
              className={styles.contactsPanelTitle}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            <img
              src="/img/main/small-cloud.webp"
              alt="Малое облако"
              width={110}
              height={60}
              className={styles.smallCloud}
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
        <svg width="193" height="28" viewBox="0 0 193 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.contactsTextRight}>
          <path d="M3.43202 23.661H1.96099e-05L4.62002 1.04904e-05L12.276 17.094L19.998 1.04904e-05L24.156 23.661H20.724L18.48 10.395L12.078 24.684L5.74202 10.362L3.43202 23.661ZM28.0026 23.661V9.76801H31.2366V14.685H33.0846C33.6786 14.685 34.1626 14.707 34.5366 14.751C34.9106 14.773 35.3616 14.894 35.8896 15.114C36.4176 15.334 36.8796 15.664 37.2756 16.104C38.0016 16.918 38.3646 17.93 38.3646 19.14C38.3646 20.526 37.9466 21.637 37.1106 22.473C36.7366 22.847 36.2856 23.133 35.7576 23.331C35.2516 23.507 34.8226 23.606 34.4706 23.628C34.1406 23.65 33.6676 23.661 33.0516 23.661H28.0026ZM31.2366 20.889H32.7216C33.5136 20.889 34.0746 20.79 34.4046 20.592C34.8886 20.24 35.1306 19.767 35.1306 19.173C35.1306 18.557 34.8996 18.095 34.4376 17.787C34.0856 17.567 33.5246 17.457 32.7546 17.457H31.2366V20.889ZM39.8166 23.661V9.76801H43.0506V23.661H39.8166ZM54.5173 9.76801H59.9623C61.3483 9.76801 62.4043 10.043 63.1303 10.593C63.9883 11.275 64.4173 12.166 64.4173 13.266C64.4173 14.52 63.8673 15.422 62.7673 15.972C63.4713 16.104 64.0983 16.412 64.6483 16.896C65.3743 17.556 65.7373 18.447 65.7373 19.569C65.7373 20.911 65.2313 21.967 64.2193 22.737C63.3833 23.353 62.3163 23.661 61.0183 23.661H54.5173V9.76801ZM57.7513 15.18H59.4013C59.9733 15.18 60.4023 15.081 60.6883 14.883C61.1063 14.619 61.3153 14.245 61.3153 13.761C61.3153 13.299 61.1283 12.936 60.7543 12.672C60.4903 12.496 60.0173 12.408 59.3353 12.408H57.7513V15.18ZM57.7513 21.021H60.1603C60.8863 21.021 61.4473 20.889 61.8433 20.625C62.2833 20.339 62.5033 19.932 62.5033 19.404C62.5033 18.832 62.2943 18.425 61.8763 18.183C61.5023 17.941 60.9633 17.82 60.2593 17.82H57.7513V21.021ZM87.2461 10.395V14.025C86.0801 12.881 84.7711 12.309 83.3191 12.309C82.0871 12.309 81.0641 12.716 80.2501 13.53C79.4581 14.322 79.0621 15.389 79.0621 16.731C79.0621 18.117 79.4801 19.228 80.3161 20.064C81.1081 20.812 82.0871 21.186 83.2531 21.186C84.8591 21.186 86.1901 20.592 87.2461 19.404V23.001C86.0801 23.727 84.6721 24.09 83.0221 24.09C80.8001 24.09 79.0401 23.408 77.7421 22.044C76.4221 20.68 75.7621 18.942 75.7621 16.83C75.7621 14.652 76.4661 12.859 77.8741 11.451C79.2381 10.087 81.0971 9.40501 83.4511 9.40501C84.7931 9.40501 86.0581 9.73501 87.2461 10.395ZM91.5665 11.484C92.9965 10.098 94.7675 9.40501 96.8795 9.40501C98.9915 9.40501 100.752 10.098 102.16 11.484C103.59 12.848 104.305 14.597 104.305 16.731C104.305 18.843 103.59 20.603 102.16 22.011C100.752 23.397 98.9915 24.09 96.8795 24.09C94.7675 24.09 92.9965 23.397 91.5665 22.011C90.1585 20.603 89.4545 18.843 89.4545 16.731C89.4545 14.597 90.1585 12.848 91.5665 11.484ZM93.8765 19.998C94.6245 20.79 95.6255 21.186 96.8795 21.186C98.1335 21.186 99.1345 20.79 99.8825 19.998C100.631 19.184 101.005 18.106 101.005 16.764C101.005 15.29 100.598 14.179 99.7835 13.431C98.9915 12.683 98.0235 12.309 96.8795 12.309C95.7355 12.309 94.7565 12.683 93.9425 13.431C93.1505 14.179 92.7545 15.29 92.7545 16.764C92.7545 18.106 93.1285 19.184 93.8765 19.998ZM107.515 23.661V9.76801H110.749V20.691H116.227V9.76801H119.461V20.691H121.771V27.621H118.801V23.661H107.515ZM134.672 10.395V14.025C133.506 12.881 132.197 12.309 130.745 12.309C129.513 12.309 128.49 12.716 127.676 13.53C126.884 14.322 126.488 15.389 126.488 16.731C126.488 18.117 126.906 19.228 127.742 20.064C128.534 20.812 129.513 21.186 130.679 21.186C132.285 21.186 133.616 20.592 134.672 19.404V23.001C133.506 23.727 132.098 24.09 130.448 24.09C128.226 24.09 126.466 23.408 125.168 22.044C123.848 20.68 123.188 18.942 123.188 16.83C123.188 14.652 123.892 12.859 125.3 11.451C126.664 10.087 128.523 9.40501 130.877 9.40501C132.219 9.40501 133.484 9.73501 134.672 10.395ZM147.341 18.975L150.047 20.493C149.431 21.593 148.65 22.44 147.704 23.034C146.626 23.738 145.262 24.09 143.612 24.09C141.676 24.09 140.114 23.496 138.926 22.308C137.562 20.944 136.88 19.173 136.88 16.995C136.88 14.707 137.617 12.804 139.091 11.286C140.345 10.032 141.896 9.40501 143.744 9.40501C145.548 9.40501 147.033 10.01 148.199 11.22C149.497 12.562 150.146 14.52 150.146 17.094V17.49H140.18C140.268 18.656 140.664 19.591 141.368 20.295C141.962 20.889 142.787 21.186 143.843 21.186C144.701 21.186 145.438 20.955 146.054 20.493C146.56 20.097 146.989 19.591 147.341 18.975ZM140.411 14.85H146.846C146.714 14.08 146.384 13.453 145.856 12.969C145.284 12.441 144.558 12.177 143.678 12.177C142.754 12.177 141.995 12.474 141.401 13.068C140.917 13.508 140.587 14.102 140.411 14.85ZM162.931 12.738H158.872V23.661H155.638V12.738H151.579V9.76801H162.931V12.738ZM163.306 23.661L167.662 18.15C166.804 18.018 166.067 17.666 165.451 17.094C164.681 16.346 164.296 15.389 164.296 14.223C164.296 12.903 164.725 11.836 165.583 11.022C166.463 10.186 167.805 9.76801 169.609 9.76801H174.79V23.661H171.556V18.546H170.896L167.101 23.661H163.306ZM171.556 15.906V12.54H169.675C168.905 12.54 168.344 12.639 167.992 12.837C167.464 13.167 167.2 13.629 167.2 14.223C167.2 14.817 167.42 15.268 167.86 15.576C168.19 15.796 168.784 15.906 169.642 15.906H171.556ZM176.868 23.661L183.006 16.137L178.056 9.76801H181.884L184.953 13.827L188.055 9.76801H192.015L186.9 16.137L192.84 23.661H188.946L184.953 18.48L180.828 23.661H176.868Z" fill="#777777" />
        </svg>
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

