import sharp from 'sharp';
import { writeFile, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '..', 'public');
const imgDir = join(publicDir, 'img');

// Конфигурация оптимизации для каждого изображения
// Создаем оптимизированные версии с суффиксом _opt, затем заменим в коде
const optimizations = [
  {
    input: 'IMG_20201010_155836_BURST4.jpg',
    output: 'IMG_20201010_155836_BURST4_opt.jpg',
    width: 570, // 285 * 2 для Retina
    height: 428, // 214 * 2 для Retina
    quality: 85,
    format: 'jpg'
  },
  {
    input: 'main/sun.webp',
    output: 'main/sun_opt.webp',
    width: 1200, // 600 * 2 для Retina
    height: 1184, // 592 * 2 для Retina
    quality: 85,
    format: 'webp'
  },
  {
    input: 'main/logo.webp',
    output: 'main/logo_opt.webp',
    width: 520, // 260 * 2 для Retina
    height: 138, // 69 * 2 для Retina
    quality: 90,
    format: 'webp'
  },
  {
    input: 'footer/logo.webp',
    output: 'footer/logo_opt.webp',
    width: 480, // 240 * 2 для Retina
    height: 128, // 64 * 2 для Retina
    quality: 90,
    format: 'webp'
  },
  {
    input: 'main/ladybug.webp',
    output: 'main/ladybug_opt.webp',
    width: 144, // 72 * 2 для Retina
    height: 144, // 72 * 2 для Retina
    quality: 90,
    format: 'webp'
  },
  {
    input: 'main/bee.webp',
    output: 'main/bee_opt.webp',
    width: 176, // 88 * 2 для Retina
    height: 186, // 93 * 2 для Retina
    quality: 90,
    format: 'webp'
  },
  {
    input: 'footer/pchela.webp',
    output: 'footer/pchela_opt.webp',
    width: 100, // 50 * 2 для Retina
    height: 80, // 40 * 2 для Retina
    quality: 90,
    format: 'webp'
  }
];

async function optimizeImage(config) {
  const inputPath = join(imgDir, config.input);
  const outputPath = join(imgDir, config.output);
  
  try {
    console.log(`Optimizing ${config.input}...`);
    
    // Получаем размер оригинального файла
    const originalStats = await stat(inputPath);
    const originalSize = originalStats.size;
    
    // Читаем оригинальный файл в буфер
    const inputBuffer = await sharp(inputPath).toBuffer();
    
    let sharpInstance = sharp(inputBuffer);
    
    // Получаем метаданные для сохранения пропорций
    const metadata = await sharpInstance.metadata();
    const aspectRatio = metadata.width / metadata.height;
    
    // Вычисляем размеры с сохранением пропорций
    let finalWidth = config.width;
    let finalHeight = config.height;
    
    if (config.width && config.height) {
      const targetAspectRatio = config.width / config.height;
      if (aspectRatio > targetAspectRatio) {
        // Изображение шире, подгоняем по высоте
        finalHeight = config.height;
        finalWidth = Math.round(finalHeight * aspectRatio);
      } else {
        // Изображение выше, подгоняем по ширине
        finalWidth = config.width;
        finalHeight = Math.round(finalWidth / aspectRatio);
      }
    } else if (config.width) {
      finalHeight = Math.round(config.width / aspectRatio);
    } else if (config.height) {
      finalWidth = Math.round(finalHeight * aspectRatio);
    }
    
    // Применяем ресайз и оптимизацию в буфер
    let outputBuffer;
    if (config.format === 'jpg') {
      outputBuffer = await sharpInstance
        .resize(finalWidth, finalHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ 
          quality: config.quality,
          mozjpeg: true
        })
        .toBuffer();
    } else if (config.format === 'webp') {
      outputBuffer = await sharpInstance
        .resize(finalWidth, finalHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ 
          quality: config.quality,
          effort: 6
        })
        .toBuffer();
    }
    
    // Записываем оптимизированный файл напрямую
    await writeFile(outputPath, outputBuffer);
    
    const newSize = outputBuffer.length;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`  ✓ ${config.input}: ${(originalSize / 1024).toFixed(1)} KB → ${(newSize / 1024).toFixed(1)} KB (${savings}% saved)`);
    
  } catch (error) {
    console.error(`  ✗ Error optimizing ${config.input}:`, error.message);
  }
}

async function main() {
  console.log('Starting image optimization...\n');
  
  for (const config of optimizations) {
    await optimizeImage(config);
  }
  
  console.log('\n✓ Image optimization complete!');
}

main().catch(console.error);
