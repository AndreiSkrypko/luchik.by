/**
 * Конвертация HEIC в WebP для папки robotics
 * heic-convert (HEIC→JPEG) + sharp (JPEG→WebP)
 */

import { readFile, writeFile, unlink } from 'fs/promises';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const convert = require('heic-convert');
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __scriptDir = dirname(__filename);
const ROOT = join(__scriptDir, '..');

async function convertHeicToWebp(heicPath, targetDir) {
  const baseName = basename(heicPath, '.HEIC').replace(/\.heic$/i, '');
  const webpPath = join(targetDir, `${baseName}.webp`);

  const inputBuffer = await readFile(heicPath);
  const jpegBuffer = await convert({
    buffer: inputBuffer,
    format: 'JPEG',
    quality: 0.95,
  });

  const webpBuffer = await sharp(jpegBuffer)
    .rotate()
    .webp({ quality: 85 })
    .toBuffer();

  await writeFile(webpPath, webpBuffer);
  await unlink(heicPath);

  return baseName + '.webp';
}

async function main() {
  const folder = process.argv[2] || 'robotics';
  const galleryDir = join(ROOT, 'public', 'img', 'gallery', folder);

  const { readdir } = await import('fs/promises');
  const files = await readdir(galleryDir);
  const heicFiles = files.filter((f) => f.toLowerCase().endsWith('.heic'));
  const converted = [];

  for (const f of heicFiles) {
    const full = join(galleryDir, f);
    try {
      const out = await convertHeicToWebp(full, galleryDir);
      converted.push(out);
      console.log(`✓ ${f} → ${out}`);
    } catch (err) {
      console.error(`✗ ${f}:`, err.message);
    }
  }

  console.log(`\nГотово: ${converted.length} файлов.`);
  return converted;
}

main().catch(console.error);
