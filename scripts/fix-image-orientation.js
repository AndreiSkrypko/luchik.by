/**
 * Исправляет ориентацию в WebP — применяет EXIF rotate.
 * Запускать для папок с "лежащими" вертикальными фото.
 * node scripts/fix-image-orientation.js gallery/robotics
 */

import sharp from 'sharp';
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __scriptDir = dirname(__filename);
const ROOT = join(__scriptDir, '..');

async function main() {
  const relPath = process.argv[2] || 'gallery/robotics';
  const targetDir = join(ROOT, 'public', 'img', relPath);

  const files = await readdir(targetDir);
  const webpFiles = files.filter((f) => f.toLowerCase().endsWith('.webp'));

  console.log(`Обработка ориентации ${webpFiles.length} файлов в ${relPath}\n`);

  let fixed = 0;
  for (const f of webpFiles) {
    const inputPath = join(targetDir, f);
    try {
      const inputBuffer = await readFile(inputPath);
      const outputBuffer = await sharp(inputBuffer)
        .rotate()
        .webp({ quality: 85 })
        .toBuffer();
      await writeFile(inputPath, outputBuffer);
      fixed++;
      console.log(`✓ ${f}`);
    } catch (err) {
      console.error(`✗ ${f}:`, err.message);
    }
  }

  console.log(`\nГотово: ${fixed} файлов обработано.`);
}

main().catch(console.error);
