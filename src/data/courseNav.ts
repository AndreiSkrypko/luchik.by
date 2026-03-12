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
  { id: 'prep-school', path: '/course/prep-school', title: 'Подготовка к школе' },
  { id: 'lego-math', path: '/course/lego-math', title: 'Лего-математика' },
];

export const relatedCourses: Record<string, string[]> = {
  'mama-malysh': ['lego-razvivayka', 'complex'],
  'lego-razvivayka': ['mama-malysh', 'lego-logoped', 'lego-math'],
  'complex': ['mama-malysh', 'art-studio', 'prep-2year'],
  'logoped': ['lego-logoped', 'complex'],
  'art-studio': ['complex', 'lego-logoped'],
  'lego-logoped': ['lego-razvivayka', 'logoped', 'lego-math'],
  'prep-2year': ['complex', 'prep-school'],
  'prep-school': ['prep-2year', 'lego-math'],
  'lego-math': ['lego-razvivayka', 'lego-logoped', 'prep-school'],
};
