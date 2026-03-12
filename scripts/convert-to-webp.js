/**
 * Конвертация PNG и JPG в WebP
 * Сохраняет в те же папки, заменяет расширение на .webp
 * 
 * npm run images:convert-webp
 */

import sharp from 'sharp';
import { readdir, stat, unlink, writeFile } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __scriptDir = dirname(__filename);

const ROOT = join(__scriptDir, '..');

const CONVERT_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const WEBP_QUALITY = 85;

async function findRasterImages(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules') {
      await findRasterImages(full, files);
    } else if (e.isFile() && CONVERT_EXTENSIONS.includes(extname(e.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function convertToWebp(inputPath) {
  const parsed = join(
    join(inputPath, '..'),
    basename(inputPath, extname(inputPath)) + '.webp'
  );
  const outputPath = parsed;

  try {
    const buf = await sharp(inputPath)
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toBuffer();

    const origStat = await stat(inputPath);
    await writeFile(outputPath, buf);
    const newStat = await stat(outputPath);
    const savings = ((1 - newStat.size / origStat.size) * 100).toFixed(1);

    await unlink(inputPath);
    const rel = inputPath.replace(ROOT, '').replace(/\\/g, '/');
    console.log(`  ✓ ${rel} → .webp (${savings}% меньше)`);
    return true;
  } catch (err) {
    console.error(`  ✗ ${inputPath}:`, err.message);
    return false;
  }
}

async function main() {
  console.log('Конвертация PNG/JPG → WebP\n');

  const targets = [
    join(ROOT, 'src', 'assets', 'directions'),
    join(ROOT, 'public', 'img'),
  ];

  let total = 0;
  for (const dir of targets) {
    if (!existsSync(dir)) continue;
    const files = await findRasterImages(dir);
    if (files.length === 0) continue;
    console.log(`Папка: ${dir.replace(ROOT, '')}`);
    for (const f of files) {
      await convertToWebp(f);
      total++;
    }
    console.log('');
  }

  console.log(`Готово: ${total} файлов конвертировано.`);
  console.log('\n⚠️  Обновите импорты в коде: .png/.jpg → .webp');
}

main().catch(console.error);
