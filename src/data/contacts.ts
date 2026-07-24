/**
 * Контактные данные детского центра Лучик
 */

const PHONE_A1 = '+375445523267';
const PHONE_2 = '+375298667663';
const MESSENGER_DIGITS = '375291210908'; // для Telegram, Viber, WhatsApp

export const contacts = {
  email: 'robotlida2025@gmail.com',
  /** Основной номер A1 — для кнопки звонка на мобильных */
  phoneA1: { number: PHONE_A1, display: '+375 44 552-32-67' },
  phones: [
    { number: PHONE_A1, display: '+375 44 552-32-67' },
    { number: PHONE_2, display: '+375 29 866-76-63' },
  ],
  addresses: [
    { street: 'Замковая, 4', phone: PHONE_A1 },
    { street: 'Кооперативная, 36', phone: PHONE_2 },
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
    { id: 'instagram', name: 'Instagram', href: 'https://instagram.com/lu4ik_lida', username: 'lu4ik_lida' },
    { id: 'vk', name: 'VK', href: 'https://vk.com/luchiklida', username: 'luchiklida' },
    { id: 'ok', name: 'Одноклассники', href: 'https://ok.ru/luchiklida', username: 'luchiklida' },
  ],
  schedule: {
    weekdays: 'Пн-Пт с 9.00 до 20.00',
    weekend: 'Сб, Вс с 10.00 до 18.00',
  },
} as const;
