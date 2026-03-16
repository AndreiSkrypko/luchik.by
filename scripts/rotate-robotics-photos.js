/**
 * Поворот указанных фото робототехники на 90° по часовой стрелке.
 * node scripts/rotate-robotics-photos.js
 */

import sharp from 'sharp';
import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __scriptDir = dirname(__filename);
const ROOT = join(__scriptDir, '..');
const BASE = join(ROOT, 'public', 'img', 'gallery', 'robotics');

const FILES = [
  '20240217_174710.webp',
  '20240217_174745.webp',
  '20240224_164125.webp',
  '20250709_101910.webp',
  '20250710_124818.webp',
];

async function main() {
  for (const f of FILES) {
    const path = join(BASE, f);
    try {
      const buf = await readFile(path);
      const out = await sharp(buf).rotate(90).webp({ quality: 85 }).toBuffer();
      await writeFile(path, out);
      console.log('✓', f);
    } catch (err) {
      console.error('✗', f, err.message);
    }
  }
  console.log('Готово.');
}

main().catch(console.error);
