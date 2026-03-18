/** Цена и ссылка на галерею для страниц курсов */
export interface CourseMeta {
  price: string;
  /** Кастомный текст цены (например "13 руб за занятие в абонементе/мес"). Если задан — используется вместо "X руб/мес" */
  priceDisplay?: string;
  galleryPath: string;
}

const DEFAULT_PRICE = '85';
const DEFAULT_GALLERY = '/gallery';

export const courseMeta: Record<string, CourseMeta> = {
  'mama-malysh': { price: DEFAULT_PRICE, galleryPath: '/gallery/developing' },
  'lego-razvivayka': { price: DEFAULT_PRICE, galleryPath: '/gallery/lego-razvivayka' },
  'complex': { price: DEFAULT_PRICE, galleryPath: '/gallery/developing' },
  'logoped': { price: DEFAULT_PRICE, galleryPath: '/gallery/developing' },
  'art-studio': { price: DEFAULT_PRICE, galleryPath: '/gallery/art-studio' },
  'lego-logoped': { price: DEFAULT_PRICE, galleryPath: '/gallery/lego-razvivayka' },
  'prep-2year': { price: DEFAULT_PRICE, galleryPath: '/gallery/developing' },
  'prep-school': { price: DEFAULT_PRICE, priceDisplay: '13 руб за занятие в абонементе/мес', galleryPath: '/gallery/prep-school' },
  'lego-math': { price: DEFAULT_PRICE, galleryPath: '/gallery/lego-matematika' },
  'logic-speed-reading': { price: DEFAULT_PRICE, galleryPath: DEFAULT_GALLERY },
  'english': { price: DEFAULT_PRICE, galleryPath: '/gallery/english' },
  'chess': { price: DEFAULT_PRICE, galleryPath: '/gallery/chess' },
  'programming-scratch': { price: DEFAULT_PRICE, galleryPath: '/gallery/programming' },
  'programming-minecraft': { price: DEFAULT_PRICE, galleryPath: '/gallery/programming' },
  'programming-roblox': { price: DEFAULT_PRICE, galleryPath: '/gallery/programming' },
  'programming-vr': { price: DEFAULT_PRICE, galleryPath: '/gallery/programming-vr' },
  'robotics': { price: DEFAULT_PRICE, galleryPath: '/gallery/robotics' },
  'mental-arithmetic': { price: DEFAULT_PRICE, galleryPath: DEFAULT_GALLERY },
  'tutor': { price: DEFAULT_PRICE, galleryPath: DEFAULT_GALLERY },
  '3d-modeling': { price: DEFAULT_PRICE, galleryPath: '/gallery/3d-modeling' },
  'robotics-10-17': { price: DEFAULT_PRICE, galleryPath: '/gallery/robotics' },
  'arduino-electronics': { price: DEFAULT_PRICE, galleryPath: '/gallery/electronics' },
  'programming-python': { price: DEFAULT_PRICE, galleryPath: '/gallery/programming' },
  'programming-javascript': { price: DEFAULT_PRICE, galleryPath: '/gallery/programming' },
  'web-development': { price: DEFAULT_PRICE, galleryPath: '/gallery/programming' },
  '3d-blender': { price: DEFAULT_PRICE, galleryPath: '/gallery/3d-modeling' },
  'programming-vr-10-17': { price: DEFAULT_PRICE, galleryPath: '/gallery/programming-vr' },
  'programming-roblox-10-17': { price: DEFAULT_PRICE, galleryPath: '/gallery/programming' },
  'circuit-design': { price: DEFAULT_PRICE, galleryPath: '/gallery/electronics' },
  'artificial-intelligence': { price: DEFAULT_PRICE, galleryPath: '/gallery/programming' },
};
