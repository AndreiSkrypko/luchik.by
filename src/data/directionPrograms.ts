export interface DirectionProgram {
  id: string;
  title: string;
  lead: string;
  image: string;
  linkTo?: string; // e.g. /trainers/mental-arithmetic
  accentColor?: string;
}

export interface DirectionConfig {
  title: string;
  description: string;
  mascot: 'cloud' | 'romashka' | 'vzik';
  programs: DirectionProgram[];
}

export const directionPrograms: Record<string, DirectionConfig> = {
  '1-5': {
    title: 'Программы для детей 1-5 лет',
    description: 'Развивающие занятия для самых маленьких',
    mascot: 'cloud',
    programs: [
      {
        id: 'mama-malysh',
        title: 'Клуб «Мама и малыш»',
        lead: '1,5–3 года. Совместные занятия для мамы и ребёнка — развитие через игру и общение',
        image: '/img/directions/mama-malysh.png',
        accentColor: '#FF6B35',
      },
      {
        id: 'lego-razvivayka',
        title: 'Лего-развивайка',
        lead: '2,5–3 года. Конструирование, развитие мелкой моторики и пространственного мышления',
        image: '/img/directions/lego-razvivayka.png',
        accentColor: '#4B9CF5',
      },
      {
        id: 'complex',
        title: 'Комплексные развивающие занятия',
        lead: '3–4 года. Речь, моторика, мышление, творчество — всё в одном курсе',
        image: '/img/directions/complex.png',
        accentColor: '#27AE60',
      },
      {
        id: 'logoped',
        title: 'Логопед',
        lead: 'С 3 лет. Диагностика и коррекция речи, постановка звуков',
        image: '/img/directions/logoped.png',
        accentColor: '#9B59B6',
      },
      {
        id: 'art-studio',
        title: 'Арт-студия',
        lead: '3–5 лет. Рисование, лепка, аппликации — развитие воображения и творческих способностей',
        image: '/img/directions/art-studio.png',
        accentColor: '#E74C3C',
      },
      {
        id: 'lego-logoped',
        title: 'Лего с логопедом',
        lead: '3–5 лет. Конструирование в сочетании с логопедическими упражнениями',
        image: '/img/directions/lego-logoped.png',
        accentColor: '#2C3E50',
      },
      {
        id: 'prep-2year',
        title: 'Двухгодовой курс подготовки к школе',
        lead: '4–5 лет. Постепенная адаптация к учебному процессу за два года до школы',
        image: '/img/directions/prep-2year.png',
        accentColor: '#4B9CF5',
      },
      {
        id: 'prep-school',
        title: 'Подготовка к школе',
        lead: '5–7 лет. Чтение, счёт, развитие усидчивости и готовности к первому классу',
        image: '/img/directions/prep-school.png',
        accentColor: '#FF6B35',
      },
      {
        id: 'lego-math',
        title: 'Лего-математика',
        lead: '5–7 лет. Математика через конструирование — числа, форма, логика',
        image: '/img/directions/lego-math.png',
        accentColor: '#2C3E50',
      },
    ],
  },
  '5-10': {
    title: 'Программы для детей 5-10 лет',
    description: 'Развивающие занятия для младших школьников',
    mascot: 'romashka',
    programs: [
      {
        id: 'logic-speed-reading',
        title: 'Логика и скорочтение',
        lead: 'Развитие логического мышления, техника быстрого чтения и понимание текста',
        image: '/img/directions/logic-speed-reading.png',
        linkTo: '/trainers/speed-reading',
        accentColor: '#FF6B35',
      },
      {
        id: 'english',
        title: 'Английский язык',
        lead: 'Развитие словарного запаса, чтения и аудирования в игровом формате',
        image: '/img/directions/english.png',
        linkTo: '/trainers/english',
        accentColor: '#4B9CF5',
      },
      {
        id: 'chess',
        title: 'Шахматы',
        lead: 'Развитие стратегического мышления, памяти и концентрации через игру',
        image: '/img/directions/chess.png',
        accentColor: '#2C3E50',
      },
      {
        id: 'programming-scratch',
        title: 'Программирование Scratch',
        lead: 'Визуальное программирование для начинающих — создание игр и анимаций',
        image: '/img/directions/programming-scratch.png',
        accentColor: '#FF6B35',
      },
      {
        id: 'programming-minecraft',
        title: 'Программирование Minecraft',
        lead: 'Программирование в популярной игровой среде — логика и креативность',
        image: '/img/directions/programming-minecraft.png',
        accentColor: '#27AE60',
      },
      {
        id: 'programming-roblox',
        title: 'Программирование Roblox',
        lead: 'Создание своих игр в Roblox Studio на языке Lua',
        image: '/img/directions/programming-roblox.png',
        accentColor: '#9B59B6',
      },
      {
        id: 'programming-vr',
        title: 'Программирование VR-игр',
        lead: 'Создание виртуальной реальности — 3D-мир и интерактивные игры',
        image: '/img/directions/programming-vr.png',
        accentColor: '#4B9CF5',
      },
      {
        id: 'robotics',
        title: 'Робототехника',
        lead: 'Сборка роботов, основы механики и программирования',
        image: '/img/directions/robotics.png',
        accentColor: '#2C3E50',
      },
      {
        id: 'mental-arithmetic',
        title: 'Ментальная арифметика',
        lead: 'Счёт в уме, развитие памяти и концентрации. Онлайн-тренажёры и офлайн-занятия',
        image: '/img/directions/mental-arithmetic.png',
        linkTo: '/trainers/mental-arithmetic',
        accentColor: '#FF6B35',
      },
      {
        id: 'tutor',
        title: 'Репетитор',
        lead: 'Индивидуальные занятия по школьным предметам — помощь с домашними заданиями',
        image: '/img/directions/tutor.png',
        accentColor: '#27AE60',
      },
      {
        id: '3d-modeling',
        title: '3D-моделирование',
        lead: 'Создание трёхмерных моделей, основы цифрового дизайна и печати',
        image: '/img/directions/3d-modeling.png',
        accentColor: '#E74C3C',
      },
    ],
  },
  '10-17': {
    title: 'Программы для детей 10-17 лет',
    description: 'Развивающие занятия для подростков',
    mascot: 'vzik',
    programs: [
      {
        id: 'robotics-10-17',
        title: 'Робототехника',
        lead: 'Продвинутые проекты: сборка роботов, датчики, программирование микроконтроллеров',
        image: '/img/directions/robotics-10-17.png',
        accentColor: '#2C3E50',
      },
      {
        id: 'arduino-electronics',
        title: 'Электроника и Arduino',
        lead: 'Основы электроники, программирование микроконтроллеров, создание умных устройств',
        image: '/img/directions/arduino-electronics.png',
        accentColor: '#27AE60',
      },
      {
        id: 'programming-python',
        title: 'Программирование на Python',
        lead: 'Синтаксис, алгоритмы, работа с данными — от основ до практических проектов',
        image: '/img/directions/programming-python.png',
        accentColor: '#4B9CF5',
      },
      {
        id: 'programming-javascript',
        title: 'Программирование на JavaScript',
        lead: 'Интерактивность на веб-страницах, логика приложений, основы фреймворков',
        image: '/img/directions/programming-javascript.png',
        accentColor: '#F39C12',
      },
      {
        id: 'web-development',
        title: 'Веб-разработка',
        lead: 'HTML, CSS, JavaScript — создание сайтов с нуля, верстка и фронтенд',
        image: '/img/directions/web-development.png',
        accentColor: '#E74C3C',
      },
      {
        id: '3d-blender',
        title: '3D-моделирование в Blender',
        lead: 'Создание трёхмерных моделей, анимация, рендеринг и основы визуализации',
        image: '/img/directions/3d-blender.png',
        accentColor: '#F39C12',
      },
      {
        id: 'programming-vr-10-17',
        title: 'Разработка VR-игр',
        lead: 'Создание приложений виртуальной реальности — 3D-мир и интерактив',
        image: '/img/directions/programming-vr-10-17.png',
        accentColor: '#4B9CF5',
      },
      {
        id: 'programming-roblox-10-17',
        title: 'Разработка игр в Roblox',
        lead: 'Roblox Studio и Lua — создание многопользовательских игр и механик',
        image: '/img/directions/programming-roblox-10-17.png',
        accentColor: '#9B59B6',
      },
      {
        id: 'circuit-design',
        title: 'Схемотехника',
        lead: 'Чтение принципиальных схем, пайка, проектирование электронных устройств',
        image: '/img/directions/circuit-design.png',
        accentColor: '#2C3E50',
      },
      {
        id: 'artificial-intelligence',
        title: 'Искусственный интеллект',
        lead: 'Основы машинного обучения, нейросети, работа с данными и AI-инструментами',
        image: '/img/directions/artificial-intelligence.png',
        accentColor: '#9B59B6',
      },
    ],
  },
};
