/**
 * Контактные данные детского центра Лучик
 */

const PHONE_A1 = '+375445523267';
const PHONE_MTS = '+375298667663';
const MESSENGER_DIGITS = '375291210908'; // для Telegram, Viber, WhatsApp

export const contacts = {
  email: 'robotlida2025@gmail.com',
  city: 'Лида',
  region: 'Гродненская область',
  /** Основной номер A1 — для кнопки звонка на мобильных */
  phoneA1: {
    number: PHONE_A1,
    display: '+375 44 552-32-67',
    displayCompact: '+37544 552-32-67',
  },
  phones: [
    {
      number: PHONE_A1,
      display: '+375 44 552-32-67',
      displayCompact: '+37544 552-32-67',
      operator: 'a1' as const,
    },
    {
      number: PHONE_MTS,
      display: '+375 29 866-76-63',
      displayCompact: '+37529 866-76-63',
      operator: 'mts' as const,
    },
  ],
  addresses: [
    { street: 'Замковая, 4', phone: PHONE_A1 },
    { street: 'Кооперативная, 36', phone: PHONE_MTS },
  ],
  messengers: [
    {
      id: 'telegram',
      name: 'Telegram',
      href: `https://t.me/${MESSENGER_DIGITS}`,
      ariaLabel: 'Написать в Telegram',
    },
    {
      id: 'viber',
      name: 'Viber',
      href: `https://viber.click/${MESSENGER_DIGITS}`,
      ariaLabel: 'Написать в Viber',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      href: `https://wa.me/${MESSENGER_DIGITS}`,
      ariaLabel: 'Написать в WhatsApp',
    },
  ],
  socials: [
    {
      id: 'instagram',
      name: 'Instagram',
      href: 'https://instagram.com/lu4ik_lida',
      username: 'lu4ik_lida',
      icon: '/img/socseti/inst.svg',
    },
    {
      id: 'vk',
      name: 'VK',
      href: 'https://vk.com/luchiklida',
      username: 'luchiklida',
      icon: '/img/socseti/vk.svg',
    },
    {
      id: 'ok',
      name: 'Одноклассники',
      href: 'https://ok.ru/luchiklida',
      username: 'luchiklida',
      icon: '/img/socseti/ok.svg',
    },
  ],
  schedule: {
    weekdays: 'Пн-Пт с 9.00 до 20.00',
    weekend: 'Сб, Вс с 10.00 до 18.00',
  },
} as const;
