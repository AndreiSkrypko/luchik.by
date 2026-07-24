export interface CourseNavItem {
  id: string;
  path: string;
  title: string;
}

export const courseOrder: CourseNavItem[] = [
  { id: 'mama-malysh', path: '/course/mama-malysh', title: 'Клуб «Мама и малыш»' },
  { id: 'lego-razvivayka', path: '/course/lego-razvivayka', title: 'Лего-развивайка' },
  { id: 'complex', path: '/course/complex', title: 'Комплексные развивающие занятия' },
  { id: 'logoped', path: '/course/logoped', title: 'Логопед' },
  { id: 'art-studio', path: '/course/art-studio', title: 'Арт-студия' },
  { id: 'lego-logoped', path: '/course/lego-logoped', title: 'Лего с логопедом' },
  { id: 'prep-2year', path: '/course/prep-2year', title: 'Двухгодовой курс подготовки к школе' },
  { id: 'lego-math', path: '/course/lego-math', title: 'Лего-математика' },
];

export const relatedCourses: Record<string, string[]> = {
  'mama-malysh': ['lego-razvivayka', 'complex'],
  'lego-razvivayka': ['mama-malysh', 'lego-logoped', 'lego-math'],
  'complex': ['mama-malysh', 'art-studio', 'prep-2year'],
  'logoped': ['lego-logoped', 'complex'],
  'art-studio': ['complex', 'lego-logoped'],
  'lego-logoped': ['lego-razvivayka', 'logoped', 'lego-math'],
  'prep-2year': ['complex', 'lego-math'],
  'lego-math': ['lego-razvivayka', 'lego-logoped', 'prep-2year'],
};

export const courseOrder5_10: CourseNavItem[] = [
  { id: 'prep-school', path: '/course/prep-school', title: 'Годовой курс подготовки к школе' },
  { id: 'prep-express', path: '/course/prep-express', title: 'Экспресс-курс подготовки к школе' },
  { id: 'logic-speed-reading', path: '/course/logic-speed-reading', title: 'Логика и скорочтение' },
  { id: 'english', path: '/course/english', title: 'Английский язык' },
  { id: 'chess', path: '/course/chess', title: 'Шахматы' },
  { id: 'programming-scratch', path: '/course/programming-scratch', title: 'Программирование Scratch' },
  { id: 'programming-minecraft', path: '/course/programming-minecraft', title: 'Программирование Minecraft' },
  { id: 'programming-roblox', path: '/course/programming-roblox', title: 'Программирование Roblox' },
  { id: 'programming-vr', path: '/course/programming-vr', title: 'Программирование VR-игр' },
  { id: 'robotics', path: '/course/robotics', title: 'Робототехника' },
  { id: 'mental-arithmetic', path: '/course/mental-arithmetic', title: 'Ментальная арифметика' },
  { id: 'tutor', path: '/course/tutor', title: 'Репетитор' },
  { id: '3d-modeling', path: '/course/3d-modeling', title: '3D-моделирование' },
];

export const relatedCourses5_10: Record<string, string[]> = {
  'prep-school': ['prep-express', 'logic-speed-reading', 'mental-arithmetic'],
  'prep-express': ['prep-school', 'logic-speed-reading', 'mental-arithmetic'],
  'logic-speed-reading': ['prep-school', 'mental-arithmetic', 'chess'],
  'english': ['chess', 'programming-scratch'],
  'chess': ['logic-speed-reading', 'mental-arithmetic'],
  'programming-scratch': ['programming-minecraft', 'robotics', 'english'],
  'programming-minecraft': ['programming-scratch', 'programming-roblox'],
  'programming-roblox': ['programming-minecraft', 'programming-vr'],
  'programming-vr': ['programming-roblox', '3d-modeling'],
  'robotics': ['programming-scratch', '3d-modeling'],
  'mental-arithmetic': ['prep-school', 'logic-speed-reading', 'chess'],
  'tutor': ['mental-arithmetic', 'logic-speed-reading'],
  '3d-modeling': ['programming-vr', 'robotics'],
};

export const courseOrder10_17: CourseNavItem[] = [
  { id: 'robotics-10-17', path: '/course/robotics-10-17', title: 'Робототехника' },
  { id: 'arduino-electronics', path: '/course/arduino-electronics', title: 'Электроника и Arduino' },
  { id: 'programming-python', path: '/course/programming-python', title: 'Программирование на Python' },
  { id: 'programming-javascript', path: '/course/programming-javascript', title: 'Программирование на JavaScript' },
  { id: 'web-development', path: '/course/web-development', title: 'Веб-разработка' },
  { id: '3d-blender', path: '/course/3d-blender', title: '3D-моделирование в Blender' },
  { id: 'programming-vr-10-17', path: '/course/programming-vr-10-17', title: 'Разработка VR-игр' },
  { id: 'programming-roblox-10-17', path: '/course/programming-roblox-10-17', title: 'Разработка игр в Roblox' },
  { id: 'circuit-design', path: '/course/circuit-design', title: 'Схемотехника' },
  { id: 'artificial-intelligence', path: '/course/artificial-intelligence', title: 'Искусственный интеллект' },
];

export const relatedCourses10_17: Record<string, string[]> = {
  'robotics-10-17': ['arduino-electronics', 'circuit-design'],
  'arduino-electronics': ['robotics-10-17', 'circuit-design', 'programming-python'],
  'programming-python': ['programming-javascript', 'artificial-intelligence'],
  'programming-javascript': ['web-development', 'programming-python'],
  'web-development': ['programming-javascript', 'programming-python'],
  '3d-blender': ['programming-vr-10-17', 'artificial-intelligence'],
  'programming-vr-10-17': ['3d-blender', 'programming-roblox-10-17'],
  'programming-roblox-10-17': ['programming-vr-10-17', 'programming-python'],
  'circuit-design': ['arduino-electronics', 'robotics-10-17'],
  'artificial-intelligence': ['programming-python', '3d-blender'],
};
