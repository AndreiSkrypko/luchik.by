import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');
const svgPath = join(publicDir, 'favicon.svg');

// Размеры для разных платформ
const sizes = {
  // Стандартные размеры
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'favicon-96x96.png': 96,
  
  // Apple Touch Icons
  'apple-touch-icon-57x57.png': 57,
  'apple-touch-icon-60x60.png': 60,
  'apple-touch-icon-72x72.png': 72,
  'apple-touch-icon-76x76.png': 76,
  'apple-touch-icon-114x114.png': 114,
  'apple-touch-icon-120x120.png': 120,
  'apple-touch-icon-144x144.png': 144,
  'apple-touch-icon-152x152.png': 152,
  'apple-touch-icon-180x180.png': 180,
  
  // Android Chrome
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
  
  // Microsoft Tiles
  'mstile-144x144.png': 144,
};

async function generateFavicons() {
  try {
    console.log('Чтение SVG файла...');
    const svgBuffer = readFileSync(svgPath);
    
    console.log('Генерация PNG файлов...');
    for (const [filename, size] of Object.entries(sizes)) {
      const outputPath = join(publicDir, filename);
      await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      console.log(`✓ Создан ${filename} (${size}x${size})`);
    }
    
    // Создаем favicon.ico (16x16 и 32x32 в одном файле)
    console.log('Генерация favicon.ico...');
    const favicon16 = await sharp(svgBuffer)
      .resize(16, 16, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toBuffer();
    
    const favicon32 = await sharp(svgBuffer)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toBuffer();
    
    // Для простоты создаем ICO как PNG (большинство браузеров это поддерживают)
    // Или можно использовать библиотеку для создания настоящего ICO
    writeFileSync(join(publicDir, 'favicon.ico'), favicon32);
    console.log('✓ Создан favicon.ico');
    
    // Создаем site.webmanifest
    const manifest = {
      "name": "Детский центр Лучик",
      "short_name": "Лучик",
      "icons": [
        {
          "src": "/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
      "theme_color": "#FFC107",
      "background_color": "#ffffff",
      "display": "standalone"
    };
    
    writeFileSync(
      join(publicDir, 'site.webmanifest'),
      JSON.stringify(manifest, null, 2)
    );
    console.log('✓ Создан site.webmanifest');
    
    console.log('\n✅ Все фавиконки успешно созданы!');
  } catch (error) {
    console.error('Ошибка при создании фавиконок:', error);
    process.exit(1);
  }
}

generateFavicons();

