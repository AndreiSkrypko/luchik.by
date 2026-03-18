/**
 * SEO-конфигурация для всех страниц сайта.
 * Используется компонентом SeoHead для динамического обновления meta-тегов.
 */

const SITE_URL = 'https://luchik.by';
const SITE_NAME = 'Детский центр Лучик';
const LOCATION = 'Лида';
const DEFAULT_OG_IMAGE = `${SITE_URL}/img/main/logo.webp`;

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  noindex?: boolean;
  canonical?: string;
}

/** Базовые ключевые слова для всех страниц */
const baseKeywords = 'детский центр Лида, Лучик Лида, развивающие занятия Лида, Гродненская область';

/** SEO по маршрутам */
export const seoConfig: Record<string, SeoConfig> = {
  '/': {
    title: 'Детский центр Лучик в Лиде | Скорочтение, робототехника, программирование для детей',
    description: 'Детский развивающий центр Лучик в Лиде, Гродненская область. Занятия для детей от 1 до 17 лет: скорочтение, ментальная арифметика, подготовка к школе, логопед, робототехника, программирование (Scratch, Python, Roblox). Профессиональные педагоги, адреса: Замковая 4, Кооперативная 36.',
    keywords: `${baseKeywords}, скорочтение Лида, ментальная арифметика Лида, подготовка к школе Лида, логопед Лида, робототехника для детей Лида, программирование для детей Лида`,
    canonical: SITE_URL,
  },

  '/about': {
    title: 'О нас | Детский центр Лучик в Лиде — педагоги, атмосфера, миссия',
    description: 'Узнайте больше о детском центре Лучик в Лиде: наши педагоги, подход к обучению, миссия. Развивающие занятия для детей от 1 до 17 лет. Замковая 4, Кооперативная 36.',
    keywords: `${baseKeywords}, о детском центре Лучик, педагоги Лучик Лида, развивающий центр о нас`,
    canonical: `${SITE_URL}/about`,
  },

  '/gallery': {
    title: 'Галерея | Фото занятий — Детский центр Лучик, Лида',
    description: 'Фотографии занятий и мастер-классов детского центра Лучик в Лиде. Убедитесь в атмосфере и качестве наших программ для детей.',
    keywords: `${baseKeywords}, галерея детского центра, фото занятий Лида, Лучик фото`,
    canonical: `${SITE_URL}/gallery`,
  },

  '/gallery/robotics': {
    title: 'Галерея — Робототехника | Детский центр Лучик, Лида',
    description: 'Фото занятий по робототехнике в детском центре Лучик. Сборка роботов, программирование, Lego WeDo.',
    keywords: `${baseKeywords}, робототехника фото Лида, галерея робототехника Лучик`,
    canonical: `${SITE_URL}/gallery/robotics`,
  },

  '/gallery/programming': {
    title: 'Галерея — Программирование | Детский центр Лучик, Лида',
    description: 'Фото занятий по программированию: Scratch, Python, Roblox. Детский центр Лучик в Лиде.',
    keywords: `${baseKeywords}, программирование фото Лида, галерея программирование Лучик`,
    canonical: `${SITE_URL}/gallery/programming`,
  },

  '/gallery/english': {
    title: 'Галерея — Английский | Детский центр Лучик, Лида',
    description: 'Фото занятий по английскому языку для детей: игровые уроки, разговорная практика и занятия с педагогами.',
    keywords: `${baseKeywords}, английский фото Лида, галерея английский Лучик`,
    canonical: `${SITE_URL}/gallery/english`,
  },

  '/gallery/electronics': {
    title: 'Галерея — Электроника и схемотехника | Детский центр Лучик, Лида',
    description: 'Фото занятий по электронике и схемотехнике в детском центре Лучик. Arduino, пайка, проектирование.',
    keywords: `${baseKeywords}, электроника фото Лида, схемотехника дети Лучик`,
    canonical: `${SITE_URL}/gallery/electronics`,
  },

  '/gallery/lego': {
    title: 'Галерея — Легоконструирование | Детский центр Лучик, Лида',
    description: 'Фото занятий по легоконструированию в детском центре Лучик. Конструирование, развитие моторики.',
    keywords: `${baseKeywords}, лего фото Лида, легоконструирование Лучик`,
    canonical: `${SITE_URL}/gallery/lego`,
  },

  '/gallery/lego-razvivayka': {
    title: 'Галерея — Лего-развивайка | Детский центр Лучик, Лида',
    description: 'Фото занятий Лего-развивайки для детей 2,5–3 лет. Конструирование, мелкая моторика, пространственное мышление.',
    keywords: `${baseKeywords}, лего развивайка фото Лида, лего 2-3 года Лучик`,
    canonical: `${SITE_URL}/gallery/lego-razvivayka`,
  },

  '/gallery/chess': {
    title: 'Галерея — Шахматы | Детский центр Лучик, Лида',
    description: 'Фото занятий по шахматам в детском центре Лучик. Развитие логики, памяти и стратегического мышления.',
    keywords: `${baseKeywords}, шахматы фото Лида, галерея шахматы Лучик`,
    canonical: `${SITE_URL}/gallery/chess`,
  },

  '/gallery/lego-matematika': {
    title: 'Галерея — Лего-математика | Детский центр Лучик, Лида',
    description: 'Фото занятий по Лего-математике для детей 5–7 лет. Числа, форма, логика через Lego.',
    keywords: `${baseKeywords}, лего математика фото Лида, галерея Лучик`,
    canonical: `${SITE_URL}/gallery/lego-matematika`,
  },

  '/gallery/3d-modeling': {
    title: 'Галерея — 3D-моделирование | Детский центр Лучик, Лида',
    description: 'Фото занятий по 3D-моделированию: Tinkercad, Blender. Создание моделей, основы цифрового дизайна.',
    keywords: `${baseKeywords}, 3D моделирование фото Лида, Tinkercad Blender Лучик`,
    canonical: `${SITE_URL}/gallery/3d-modeling`,
  },

  '/gallery/programming-vr': {
    title: 'Галерея — Программирование VR-игр | Детский центр Лучик, Лида',
    description: 'Фото занятий по программированию VR-игр. Создание игр для шлемов виртуальной реальности.',
    keywords: `${baseKeywords}, VR программирование фото Лида, виртуальная реальность дети Лучик`,
    canonical: `${SITE_URL}/gallery/programming-vr`,
  },

  '/gallery/masterclass': {
    title: 'Галерея — Мастер-классы | Детский центр Лучик, Лида',
    description: 'Фото мастер-классов детского центра Лучик: творчество, конструирование, эксперименты для детей.',
    keywords: `${baseKeywords}, мастер-классы фото Лида, галерея Лучик`,
    canonical: `${SITE_URL}/gallery/masterclass`,
  },

  '/gallery/art-studio': {
    title: 'Галерея — Арт-студия | Детский центр Лучик, Лида',
    description: 'Фото занятий в арт-студии детского центра Лучик. Рисование, творчество, развитие воображения.',
    keywords: `${baseKeywords}, арт-студия фото Лида, творческие занятия дети Лучик`,
    canonical: `${SITE_URL}/gallery/art-studio`,
  },

  '/gallery/developing': {
    title: 'Галерея — Развивающие занятия | Детский центр Лучик, Лида',
    description: 'Фото развивающих занятий для детей в детском центре Лучик. Комплексные программы, подготовка к школе.',
    keywords: `${baseKeywords}, развивающие занятия фото Лида, галерея Лучик`,
    canonical: `${SITE_URL}/gallery/developing`,
  },

  '/gallery/prep-school': {
    title: 'Галерея — Подготовка к школе | Детский центр Лучик, Лида',
    description: 'Фото занятий по подготовке к школе в детском центре Лучик. Чтение, счёт, готовность к первому классу.',
    keywords: `${baseKeywords}, подготовка к школе фото Лида, галерея Лучик`,
    canonical: `${SITE_URL}/gallery/prep-school`,
  },

  '/contacts': {
    title: 'Контакты | Детский центр Лучик в Лиде — адреса, телефоны, мессенджеры',
    description: 'Контакты детского центра Лучик в Лиде: Замковая 4, Кооперативная 36. Телефоны, WhatsApp, Telegram, Viber, email. Режим работы Пн-Пт 9:00–20:00.',
    keywords: `${baseKeywords}, контакты Лучик Лида, адрес детского центра Лида, телефон Лучик`,
    canonical: `${SITE_URL}/contacts`,
  },

  '/enrollment': {
    title: 'Запись на подготовку к школе | Детский центр Лучик, Лида',
    description: 'Запишите ребёнка на подготовку к школе в детский центр Лучик (Лида). Интенсивный курс, малые группы, опытные педагоги. Заполните форму — перезвоним в ближайшее время.',
    keywords: `${baseKeywords}, запись подготовка к школе Лида, подготовка к школе запись, Лучик запись`,
    canonical: `${SITE_URL}/enrollment`,
  },

  '/thank-you': {
    title: 'Заявка отправлена | Детский центр Лучик',
    description: 'Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
    keywords: baseKeywords,
    noindex: true,
    canonical: `${SITE_URL}/thank-you`,
  },

  '/age/1-5': {
    title: 'Занятия для детей 1-5 лет | Детский центр Лучик, Лида',
    description: 'Развивающие занятия для малышей 1-5 лет в Лиде: Мама и малыш, Лего-развивайка, комплексные занятия, логопед, арт-студия, подготовка к школе. Детский центр Лучик.',
    keywords: `${baseKeywords}, занятия для детей 1-5 лет Лида, развивающие занятия малыши Лида, детский центр 1-5 лет`,
    canonical: `${SITE_URL}/age/1-5`,
  },

  '/age/5-10': {
    title: 'Занятия для детей 5-10 лет | Детский центр Лучик, Лида',
    description: 'Программы для детей 5-10 лет в Лиде: шахматы, скорочтение, ментальная арифметика, программирование (Scratch, Minecraft, Roblox), робототехника, английский. Детский центр Лучик.',
    keywords: `${baseKeywords}, занятия 5-10 лет Лида, программирование для детей Лида, робототехника дети Лида`,
    canonical: `${SITE_URL}/age/5-10`,
  },

  '/age/10-17': {
    title: 'Занятия для детей 10-17 лет | Детский центр Лучик, Лида',
    description: 'Курсы для подростков в Лиде: Python, JavaScript, веб-разработка, робототехника, Arduino, VR, Blender, искусственный интеллект. Детский центр Лучик.',
    keywords: `${baseKeywords}, программирование для подростков Лида, Python для детей Лида, робототехника подростки Лида`,
    canonical: `${SITE_URL}/age/10-17`,
  },

  // ——— Курсы 1-5 лет ———
  '/course/mama-malysh': {
    title: 'Клуб «Мама и малыш» в Лиде | Детский центр Лучик',
    description: 'Совместные занятия для мамы и ребёнка 1,5–3 года в Лиде. Развитие через игру и общение в детском центре Лучик. Запись на занятие.',
    keywords: `${baseKeywords}, мама и малыш Лида, занятия для мам и детей Лида, раннее развитие Лида`,
    canonical: `${SITE_URL}/course/mama-malysh`,
  },

  '/course/lego-razvivayka': {
    title: 'Лего-развивайка для детей 2,5–3 лет | Детский центр Лучик, Лида',
    description: 'Лего-развивайка в Лиде: конструирование, мелкая моторика, пространственное мышление для малышей. Детский центр Лучик — запись на занятие.',
    keywords: `${baseKeywords}, лего для детей Лида, развивайка лего Лида, конструирование дети Лида`,
    canonical: `${SITE_URL}/course/lego-razvivayka`,
  },

  '/course/complex': {
    title: 'Комплексные развивающие занятия 3–4 года | Детский центр Лучик, Лида',
    description: 'Комплексные занятия для детей 3–4 лет: речь, моторика, мышление, творчество в одном курсе. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, комплексные занятия дети Лида, развивающие занятия 3-4 года Лида`,
    canonical: `${SITE_URL}/course/complex`,
  },

  '/course/logoped': {
    title: 'Логопед для детей в Лиде | Детский центр Лучик',
    description: 'Логопед в Лиде: диагностика и коррекция речи, постановка звуков с 3 лет. Детский центр Лучик — профессиональные логопедические занятия.',
    keywords: `${baseKeywords}, логопед Лида, логопед для детей Лида, коррекция речи Лида`,
    canonical: `${SITE_URL}/course/logoped`,
  },

  '/course/art-studio': {
    title: 'Арт-студия для детей 3–5 лет | Детский центр Лучик, Лида',
    description: 'Арт-студия в Лиде: рисование, лепка, аппликации. Развитие воображения и творческих способностей. Детский центр Лучик.',
    keywords: `${baseKeywords}, арт-студия дети Лида, рисование для детей Лида, творчество дети Лида`,
    canonical: `${SITE_URL}/course/art-studio`,
  },

  '/course/lego-logoped': {
    title: 'Лего с логопедом для детей 3–5 лет | Детский центр Лучик, Лида',
    description: 'Лего с логопедом: конструирование и логопедические упражнения в одном курсе. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, лего логопед Лида, развивающие занятия речь Лида`,
    canonical: `${SITE_URL}/course/lego-logoped`,
  },

  '/course/prep-2year': {
    title: 'Двухгодовой курс подготовки к школе | Детский центр Лучик, Лида',
    description: 'Подготовка к школе за два года: постепенная адаптация 4–5 лет. Детский центр Лучик в Лиде — запись на курс.',
    keywords: `${baseKeywords}, подготовка к школе Лида, двухгодовой курс подготовка Лида`,
    canonical: `${SITE_URL}/course/prep-2year`,
  },

  '/course/prep-school': {
    title: 'Подготовка к школе в Лиде | Детский центр Лучик',
    description: 'Подготовка к школе для детей 5–7 лет: чтение, счёт, усидчивость, готовность к первому классу. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, подготовка к школе Лида, подготовка к 1 классу Лида`,
    canonical: `${SITE_URL}/course/prep-school`,
  },

  '/course/lego-math': {
    title: 'Лего-математика для детей 5–7 лет | Детский центр Лучик, Лида',
    description: 'Математика через Лего: числа, форма, логика для детей 5–7 лет. Детский центр Лучик в Лиде.',
    keywords: `${baseKeywords}, лего математика Лида, математика для детей Лида`,
    canonical: `${SITE_URL}/course/lego-math`,
  },

  // ——— Курсы 5-10 лет ———
  '/course/logic-speed-reading': {
    title: 'Логика и скорочтение для детей | Детский центр Лучик, Лида',
    description: 'Логика и скорочтение для детей в Лиде: техника быстрого чтения, понимание текста, развитие мышления. Детский центр Лучик.',
    keywords: `${baseKeywords}, скорочтение для детей Лида, логика дети Лида, техника чтения Лида`,
    canonical: `${SITE_URL}/course/logic-speed-reading`,
  },

  '/course/english': {
    title: 'Английский язык для детей в Лиде | Детский центр Лучик',
    description: 'Английский язык для детей в игровом формате: словарный запас, чтение, аудирование. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, английский для детей Лида, английский язык дети Лида`,
    canonical: `${SITE_URL}/course/english`,
  },

  '/course/chess': {
    title: 'Шахматы для детей в Лиде | Детский центр Лучик',
    description: 'Курс шахмат для детей 5–10 лет в Лиде. Развитие логики, памяти и стратегического мышления. Детский центр Лучик.',
    keywords: `${baseKeywords}, шахматы для детей Лида, обучение шахматам Лида`,
    canonical: `${SITE_URL}/course/chess`,
  },

  '/course/programming-scratch': {
    title: 'Программирование Scratch для детей | Детский центр Лучик, Лида',
    description: 'Визуальное программирование Scratch для детей в Лиде: создание игр и анимаций. Детский центр Лучик.',
    keywords: `${baseKeywords}, Scratch программирование Лида, программирование для детей Лида`,
    canonical: `${SITE_URL}/course/programming-scratch`,
  },

  '/course/programming-minecraft': {
    title: 'Программирование Minecraft для детей | Детский центр Лучик, Лида',
    description: 'Программирование в Minecraft: логика и креативность для детей в Лиде. Детский центр Лучик.',
    keywords: `${baseKeywords}, программирование Minecraft Лида, Minecraft дети Лида`,
    canonical: `${SITE_URL}/course/programming-minecraft`,
  },

  '/course/programming-roblox': {
    title: 'Программирование Roblox для детей | Детский центр Лучик, Лида',
    description: 'Создание игр в Roblox Studio на Lua. Курс для детей в Лиде. Детский центр Лучик.',
    keywords: `${baseKeywords}, Roblox программирование Лида, создание игр дети Лида`,
    canonical: `${SITE_URL}/course/programming-roblox`,
  },

  '/course/programming-vr': {
    title: 'Программирование VR-игр для детей | Детский центр Лучик, Лида',
    description: 'Создание VR-игр и виртуальной реальности для детей в Лиде. Детский центр Лучик.',
    keywords: `${baseKeywords}, VR программирование дети Лида, виртуальная реальность дети Лида`,
    canonical: `${SITE_URL}/course/programming-vr`,
  },

  '/course/robotics': {
    title: 'Робототехника для детей в Лиде | Детский центр Лучик',
    description: 'Робототехника для детей 5–10 лет: сборка роботов, основы механики и программирования. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, робототехника для детей Лида, Lego робототехника Лида`,
    canonical: `${SITE_URL}/course/robotics`,
  },

  '/course/mental-arithmetic': {
    title: 'Ментальная арифметика для детей в Лиде | Детский центр Лучик',
    description: 'Ментальная арифметика: счёт в уме, развитие памяти и концентрации. Онлайн-тренажёры и офлайн-занятия в Лиде. Детский центр Лучик.',
    keywords: `${baseKeywords}, ментальная арифметика Лида, счёт в уме дети Лида`,
    canonical: `${SITE_URL}/course/mental-arithmetic`,
  },

  '/course/tutor': {
    title: 'Репетитор для детей в Лиде | Детский центр Лучик',
    description: 'Индивидуальные занятия по школьным предметам: помощь с домашними заданиями. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, репетитор Лида, репетитор для детей Лида`,
    canonical: `${SITE_URL}/course/tutor`,
  },

  '/course/3d-modeling': {
    title: '3D-моделирование для детей в Лиде | Детский центр Лучик',
    description: '3D-моделирование для детей: создание моделей, основы цифрового дизайна. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, 3D моделирование дети Лида, цифровой дизайн дети Лида`,
    canonical: `${SITE_URL}/course/3d-modeling`,
  },

  // ——— Курсы 10-17 лет ———
  '/course/robotics-10-17': {
    title: 'Робототехника для подростков в Лиде | Детский центр Лучик',
    description: 'Продвинутая робототехника 10–17 лет: датчики, микроконтроллеры, программирование. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, робототехника подростки Лида, продвинутая робототехника Лида`,
    canonical: `${SITE_URL}/course/robotics-10-17`,
  },

  '/course/arduino-electronics': {
    title: 'Электроника и Arduino для детей в Лиде | Детский центр Лучик',
    description: 'Электроника и Arduino: программирование микроконтроллеров, создание умных устройств. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, Arduino для детей Лида, электроника дети Лида`,
    canonical: `${SITE_URL}/course/arduino-electronics`,
  },

  '/course/programming-python': {
    title: 'Программирование Python для детей в Лиде | Детский центр Лучик',
    description: 'Python для детей: синтаксис, алгоритмы, практические проекты. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, Python для детей Лида, программирование Python Лида`,
    canonical: `${SITE_URL}/course/programming-python`,
  },

  '/course/programming-javascript': {
    title: 'Программирование JavaScript для детей в Лиде | Детский центр Лучик',
    description: 'JavaScript для детей: интерактивность, логика приложений, основы фреймворков. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, JavaScript для детей Лида, программирование дети Лида`,
    canonical: `${SITE_URL}/course/programming-javascript`,
  },

  '/course/web-development': {
    title: 'Веб-разработка для детей в Лиде | Детский центр Лучик',
    description: 'Веб-разработка для детей: HTML, CSS, JavaScript, создание сайтов. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, веб-разработка дети Лида, создание сайтов дети Лида`,
    canonical: `${SITE_URL}/course/web-development`,
  },

  '/course/3d-blender': {
    title: '3D-моделирование в Blender для детей | Детский центр Лучик, Лида',
    description: 'Blender для детей: 3D-моделирование, анимация, рендеринг. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, Blender для детей Лида, 3D моделирование Blender Лида`,
    canonical: `${SITE_URL}/course/3d-blender`,
  },

  '/course/programming-vr-10-17': {
    title: 'Разработка VR-игр для подростков | Детский центр Лучик, Лида',
    description: 'Создание VR-приложений для подростков 10–17 лет. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, VR разработка дети Лида, виртуальная реальность разработка Лида`,
    canonical: `${SITE_URL}/course/programming-vr-10-17`,
  },

  '/course/programming-roblox-10-17': {
    title: 'Разработка игр в Roblox для подростков | Детский центр Лучик, Лида',
    description: 'Roblox Studio и Lua: создание многопользовательских игр. Курс для подростков в Лиде. Детский центр Лучик.',
    keywords: `${baseKeywords}, Roblox разработка Лида, создание игр Roblox Лида`,
    canonical: `${SITE_URL}/course/programming-roblox-10-17`,
  },

  '/course/circuit-design': {
    title: 'Схемотехника для детей в Лиде | Детский центр Лучик',
    description: 'Схемотехника: чтение схем, пайка, проектирование электронных устройств. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, схемотехника дети Лида, электроника курс Лида`,
    canonical: `${SITE_URL}/course/circuit-design`,
  },

  '/course/artificial-intelligence': {
    title: 'Искусственный интеллект для детей в Лиде | Детский центр Лучик',
    description: 'Основы ИИ и машинного обучения для детей: нейросети, работа с данными. Детский центр Лучик, Лида.',
    keywords: `${baseKeywords}, искусственный интеллект дети Лида, нейросети дети Лида`,
    canonical: `${SITE_URL}/course/artificial-intelligence`,
  },
};

/** Конфиг по умолчанию для неизвестных страниц (404 и т.д.) */
export const defaultSeo: SeoConfig = {
  title: `${SITE_NAME} в ${LOCATION}`,
  description: `Детский развивающий центр Лучик в ${LOCATION}. Занятия для детей от 1 до 17 лет.`,
  keywords: baseKeywords,
  canonical: SITE_URL,
};

/** 404 — не индексировать */
export const notFoundSeo: SeoConfig = {
  title: 'Страница не найдена | Детский центр Лучик',
  description: 'Запрашиваемая страница не найдена. Вернитесь на главную страницу детского центра Лучик.',
  keywords: baseKeywords,
  noindex: true,
  canonical: SITE_URL,
};

/** Соответствие курса возрастной категории для BreadcrumbList */
export const courseToAge: Record<string, { range: string; title: string }> = {
  'mama-malysh': { range: '1-5', title: 'Программы для детей 1-5 лет' },
  'lego-razvivayka': { range: '1-5', title: 'Программы для детей 1-5 лет' },
  complex: { range: '1-5', title: 'Программы для детей 1-5 лет' },
  logoped: { range: '1-5', title: 'Программы для детей 1-5 лет' },
  'art-studio': { range: '1-5', title: 'Программы для детей 1-5 лет' },
  'lego-logoped': { range: '1-5', title: 'Программы для детей 1-5 лет' },
  'prep-2year': { range: '1-5', title: 'Программы для детей 1-5 лет' },
  'prep-school': { range: '1-5', title: 'Программы для детей 1-5 лет' },
  'lego-math': { range: '1-5', title: 'Программы для детей 1-5 лет' },
  'logic-speed-reading': { range: '5-10', title: 'Программы для детей 5-10 лет' },
  english: { range: '5-10', title: 'Программы для детей 5-10 лет' },
  chess: { range: '5-10', title: 'Программы для детей 5-10 лет' },
  'programming-scratch': { range: '5-10', title: 'Программы для детей 5-10 лет' },
  'programming-minecraft': { range: '5-10', title: 'Программы для детей 5-10 лет' },
  'programming-roblox': { range: '5-10', title: 'Программы для детей 5-10 лет' },
  'programming-vr': { range: '5-10', title: 'Программы для детей 5-10 лет' },
  robotics: { range: '5-10', title: 'Программы для детей 5-10 лет' },
  'mental-arithmetic': { range: '5-10', title: 'Программы для детей 5-10 лет' },
  tutor: { range: '5-10', title: 'Программы для детей 5-10 лет' },
  '3d-modeling': { range: '5-10', title: 'Программы для детей 5-10 лет' },
  'robotics-10-17': { range: '10-17', title: 'Программы для детей 10-17 лет' },
  'arduino-electronics': { range: '10-17', title: 'Программы для детей 10-17 лет' },
  'programming-python': { range: '10-17', title: 'Программы для детей 10-17 лет' },
  'programming-javascript': { range: '10-17', title: 'Программы для детей 10-17 лет' },
  'web-development': { range: '10-17', title: 'Программы для детей 10-17 лет' },
  '3d-blender': { range: '10-17', title: 'Программы для детей 10-17 лет' },
  'programming-vr-10-17': { range: '10-17', title: 'Программы для детей 10-17 лет' },
  'programming-roblox-10-17': { range: '10-17', title: 'Программы для детей 10-17 лет' },
  'circuit-design': { range: '10-17', title: 'Программы для детей 10-17 лет' },
  'artificial-intelligence': { range: '10-17', title: 'Программы для детей 10-17 лет' },
};

export { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE };
