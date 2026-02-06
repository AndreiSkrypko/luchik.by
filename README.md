# Руководство: как создать новую страницу (страницу)

Ниже — простое, согласованное правило для команды о том, как добавлять новые страницы в проект. Добавляйте новую страницу по шагам и отмечайте чеклист.

## 1) Где создавать
- Файлы страниц — в `src/pages/`. Каждый файл страницы — отдельный компонент, экспортируемый по умолчанию.

## 2) Быстрый шаблон страницы
Скопируйте существующую страницу (например `Gallery.tsx`) и отредактируйте название/контент. Пример шаблона:

```tsx
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactsPanel from '@/components/ContactsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import EnrollmentCard from '@/components/EnrollmentCard';
import InDevelopment from '@/components/InDevelopment';
import styles from './Gallery.module.css'; // либо ./MyPage.module.css

const MyPage = () => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const toggleContacts = () => setIsContactsOpen(!isContactsOpen);
  const closeContacts = () => setIsContactsOpen(false);

  return (
    <div className={styles.galleryPage}>
      <Header onContactsClick={toggleContacts} />
      <main>
        <div className={styles.galleryMain}>
          <div className={styles.titleSection}>
            <h1 className={styles.galleryTitle}>Заголовок страницы</h1>
            <p className={styles.galleryDescription}>Короткое описание</p>
            <InDevelopment />
          </div>
        </div>
      </main>
      <Footer onContactsClick={toggleContacts} />
      <ContactsPanel isOpen={isContactsOpen} onClose={closeContacts} />
      <ScrollToTop />
      <EnrollmentCard />
    </div>
  );
};

export default MyPage;
```

Совет: если страница похожа на существующую (галерею/тренажёры), можно повторно использовать `Gallery.module.css`. Если стиль уникален — создайте `MyPage.module.css`.

## 3) Зарегистрировать маршрут
Откройте `src/App.tsx`. Добавьте импорт и маршрут выше `*` (catch-all). Пример:

```tsx
// импорт
import MyPage from './pages/MyPage';

// в <Routes>:
<Route path="/trainers/my-page-slug" element={<MyPage />} />
```

Важно: добавляйте новые маршруты выше `Route path="*"` чтобы они срабатывали.

## 4) Структура URL и название
- Для тренажёров используйте URL под `/trainers/*` (например `/trainers/english`).
- Заголовок страницы в компоненте делайте человеко‑читаемым (русский текст внутри `<h1>`).

## 5) Проверка и отладка
1. Запустите dev‑сервер (`npm run dev` или как настроено в проекте).  
2. Откройте URL (например `http://localhost:8080/trainers/english`) и проверьте видимость элементов (Divider, Footer и пр.).  
3. В консоли браузера исправьте возможные ошибки импорта.

## 6) Чеклист перед PR / коммитом
- [ ] Файл `src/pages/MyPage.tsx` создан и экспорт по умолчанию.  
- [ ] Маршрут добавлен в `src/App.tsx` выше `*`.  
- [ ] Стили: использован существующий модуль или добавлен `MyPage.module.css`.  
- [ ] Проверили страницу в dev‑сервере.  
- [ ] Коммит с сообщением: `add: new page /trainers/<slug> — <short reason>`

Если хотите, могу автоматически создать шаблон страницы и добавить маршрут по указанному `slug` — напишите slug и желаемый заголовок.  

