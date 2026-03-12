/**
 * Реорганизация изображений: конвертация в WebP + приведение структуры
 *
 * 1. Конвертирует PNG/JPG → WebP
 * 2. Перемещает файлы из корня img/ в логичные папки
 * 3. Переименовывает (IMG_*.jpg → robotics.webp, fouth → fourth)
 *
 * npm run images:organize
 */

import sharp from 'sharp';
import { readdir, stat, unlink, writeFile, mkdir, rename } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __scriptDir = dirname(__filename);
const ROOT = join(__scriptDir, '..');
const PUBLIC_IMG = join(ROOT, 'public', 'img');
const ASSETS_DIRECTIONS = join(ROOT, 'src', 'assets', 'directions');

const WEBP_QUALITY = 85;

// Перемещения: [файл в корне img/] → новый путь в папке
const MOVES = [
  ['IMG_20201010_155836_BURST4.jpg', 'cards/robotics.webp'],
  ['1-5.svg', 'directions/1-5.svg'],
  ['5-10.svg', 'directions/5-10.svg'],
  ['10-17.svg', 'directions/10-17.svg'],
  ['romashka.svg', 'directions/romashka.svg'],
  ['vzik.svg', 'directions/vzik.svg'],
  ['airplane.svg', 'map/airplane.svg'],
];
// Исправление опечатки
const RENAME = [['cards/fouth.svg', 'cards/fourth.svg']];

async function ensureDir(p) {
  if (!existsSync(p)) await mkdir(p, { recursive: true });
}

async function convertToWebp(inputPath, outputPath) {
  const buf = await sharp(inputPath)
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toBuffer();
  await ensureDir(dirname(outputPath));
  await writeFile(outputPath, buf);
  return buf.length;
}

async function main() {
  console.log('=== Организация изображений ===\n');

  // 1. Конвертация src/assets/directions/*.png → .webp
  if (existsSync(ASSETS_DIRECTIONS)) {
    const files = await readdir(ASSETS_DIRECTIONS);
    const pngs = files.filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
    console.log('1. Конвертация курсов (src/assets/directions):');
    for (const f of pngs) {
      const input = join(ASSETS_DIRECTIONS, f);
      const base = basename(f, extname(f));
      const output = join(ASSETS_DIRECTIONS, base + '.webp');
      await convertToWebp(input, output);
      await unlink(input);
      console.log(`   ✓ ${f} → ${base}.webp`);
    }
  }

  // 2. Перемещение и конвертация в public/img
  console.log('\n2. public/img:');
  for (const [from, to] of MOVES) {
    const src = join(PUBLIC_IMG, from);
    const dest = join(PUBLIC_IMG, to);
    if (!existsSync(src)) continue;
    const ext = extname(from).toLowerCase();
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      await convertToWebp(src, dest);
      await unlink(src);
      console.log(`   ✓ ${from} → ${to}`);
    } else {
      await ensureDir(dirname(dest));
      await rename(src, dest);
      console.log(`   ✓ ${from} → ${to} (перемещено)`);
    }
  }

  // 3. Исправление опечатки fouth → fourth
  for (const [from, to] of RENAME) {
    const src = join(PUBLIC_IMG, from);
    const dest = join(PUBLIC_IMG, to);
    if (existsSync(src)) {
      await rename(src, dest);
      console.log(`   ✓ ${from} → ${to}`);
    }
  }

  // 4. Конвертация оставшихся PNG в public/img
  async function convertDir(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = join(dir, e.name);
      if (e.isDirectory()) await convertDir(full);
      else if (/\.(png|jpg|jpeg)$/i.test(e.name)) {
        const base = basename(full, extname(full));
        const outPath = join(dir, base + '.webp');
        await convertToWebp(full, outPath);
        await unlink(full);
        console.log(`   ✓ ${full.replace(PUBLIC_IMG, '').replace(/\\/g, '/')} → .webp`);
      }
    }
  }
  if (existsSync(PUBLIC_IMG)) {
    console.log('\n3. Остальные PNG/JPG в public/img:');
    await convertDir(PUBLIC_IMG);
  }

  console.log('\n=== Готово ===');
  console.log('\nОбновите в коде:');
  console.log('  - импорты: .png → .webp');
  console.log('  - InfoBlocks: /img/cards/fouth.svg → /img/cards/fourth.svg');
  console.log('  - InfoBlocks: /img/IMG_*.jpg → /img/cards/robotics.webp');
  console.log('  - DirectionsSection: /img/1-5.svg → /img/directions/1-5.svg (и 5-10, 10-17)');
  console.log('  - MapSection: /img/airplane.svg → /img/map/airplane.svg');
}

main().catch(console.error);
