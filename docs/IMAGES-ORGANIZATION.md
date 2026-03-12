# Организация изображений

## Текущее состояние

### Проблемы
1. **Дублирование**: изображения направлений в `src/assets/directions/` (PNG) и `public/img/directions/` (частично)
2. **Форматы**: много PNG и JPG вместо WebP (медленная загрузка)
3. **Разбросано**: файлы в корне `public/img/` (1-5.svg, IMG_*.jpg)
4. **Разные пути**: часть через `/img/`, часть через `@/assets` импорты

---

## Целевая структура

```
public/img/
├── main/                 # Главная: лого, фон, декор
│   ├── logo.webp
│   ├── waves-bg.webp
│   ├── clouds.webp
│   ├── bee.webp
│   ├── ladybug.webp
│   ├── sun.webp
│   └── ...
├── directions/           # Карточки направлений (возраст, карточки)
│   ├── age-1-5.svg
│   ├── age-5-10.svg
│   ├── age-10-17.svg
│   ├── card-base.svg
│   ├── card-1.svg, card-2.svg, card-3.svg
│   ├── romashka.svg
│   └── vzik.svg
├── courses/              # Фото курсов (WebP) — для карточек и страниц
│   ├── mama-malysh.webp
│   ├── lego-razvivayka.webp
│   ├── robotics.webp
│   └── ...
├── trainers/             # Иконки тренажёров (SVG)
│   ├── speed-reading/
│   ├── mental-arithmetic/
│   └── english/
├── cards/                # Иллюстрации карточек «О нас»
│   ├── first.svg
│   ├── second.svg
│   ├── fourth.svg        # исправить опечатку fouth → fourth
│   └── robotics.webp     # фото робототехники (было IMG_*.jpg)
├── footer/
├── map/
├── contacts/
├── socseti/              # Соцсети
└── why_we/

src/assets/
└── (опционально: оставить для импортов или перейти на public)
```

---

## План действий

### 1. Конвертация в WebP

**Скрипт:** `npm run images:convert-webp`

- `src/assets/directions/*.png` → `*.webp` (на месте)
- `public/img/IMG_*.jpg` → `public/img/cards/robotics.webp`
- `public/img/directions/*.png` → `public/img/courses/*.webp` (если есть)

### 2. Реорганизация public/img

| Текущий путь | Новый путь |
|--------------|------------|
| `img/1-5.svg`, `5-10.svg`, `10-17.svg` | `img/directions/1-5.svg`, `5-10.svg`, `10-17.svg` |
| `img/IMG_20201010_155836_BURST4.jpg` | `img/cards/robotics.webp` |
| `img/romashka.svg`, `vzik.svg` | `img/directions/` |
| `img/airplane.svg` | `img/footer/airplane.svg` |
| `img/placeholder.svg` | оставить в `img/` |

### 3. Обновление кода

- Все импорты `@/assets/directions/*.png` → `*.webp`
- Все пути `/img/...` привести к новой структуре
- `directionPrograms.ts`: пути к картинкам курсов

---

## Запуск

```bash
# Конвертация PNG/JPG → WebP
npm run images:convert-webp

# Полная реорганизация (конвертация + перемещение)
npm run images:organize
```

---

## SVG

SVG **не конвертируются** в WebP — векторная графика остаётся в исходном виде (иконки, иллюстрации).
