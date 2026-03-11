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
        id: 'mental-arithmetic',
        title: 'Ментальная арифметика',
        lead: 'Счёт в уме, развитие памяти и концентрации. Онлайн-тренажёры и офлайн-занятия',
        image: '/img/trainers/mental-arithmetic/prosto.svg',
        linkTo: '/trainers/mental-arithmetic',
        accentColor: '#FF6B35',
      },
      {
        id: 'speed-reading',
        title: 'Скорочтение',
        lead: 'Упражнения на скорость чтения, техника и понимание текста',
        image: '/img/trainers/speed-reading/fading-text.svg',
        linkTo: '/trainers/speed-reading',
        accentColor: '#FF6B35',
      },
      {
        id: 'english',
        title: 'Английский язык',
        lead: 'Развитие словарного запаса, чтения и аудирования в игровом формате',
        image: '/img/trainers/english/english.svg',
        linkTo: '/trainers/english',
        accentColor: '#4B9CF5',
      },
      {
        id: 'robotics',
        title: 'Робототехника',
        lead: 'Сборка роботов, основы механики и программирования',
        image: '/img/IMG_20201010_155836_BURST4.jpg',
        accentColor: '#2C3E50',
      },
      {
        id: 'creativity',
        title: 'Творчество',
        lead: 'Рисование, конструирование, проектная деятельность',
        image: '/img/cards/third.svg',
        accentColor: '#27AE60',
      },
    ],
  },
  '10-17': {
    title: 'Программы для детей 10-17 лет',
    description: 'Развивающие занятия для подростков',
    mascot: 'vzik',
    programs: [
      {
        id: 'speed-reading',
        title: 'Скорочтение',
        lead: 'Техника быстрого чтения, развитие внимания и работы с текстом',
        image: '/img/trainers/speed-reading/fading-text.svg',
        linkTo: '/trainers/speed-reading',
        accentColor: '#FF6B35',
      },
      {
        id: 'mental-arithmetic',
        title: 'Ментальная арифметика',
        lead: 'Сложные вычисления в уме, подготовка к олимпиадам',
        image: '/img/trainers/mental-arithmetic/prosto.svg',
        linkTo: '/trainers/mental-arithmetic',
        accentColor: '#FF6B35',
      },
      {
        id: 'english',
        title: 'Английский язык',
        lead: 'Подготовка к экзаменам, разговорная практика, грамматика',
        image: '/img/trainers/english/english.svg',
        linkTo: '/trainers/english',
        accentColor: '#4B9CF5',
      },
      {
        id: 'programming',
        title: 'Программирование',
        lead: 'Языки программирования, алгоритмы, создание своих проектов',
        image: '/img/cards/second.svg',
        accentColor: '#2C3E50',
      },
      {
        id: 'robotics',
        title: 'Робототехника',
        lead: 'Продвинутые проекты, Arduino, 3D-печать',
        image: '/img/IMG_20201010_155836_BURST4.jpg',
        accentColor: '#2C3E50',
      },
    ],
  },
};
