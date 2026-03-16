/**
 * Конвертация JPG/PNG в WebP для одной папки
 * node scripts/convert-folder-to-webp.js gallery/masterclass
 */

import sharp from 'sharp';
import { readdir, stat, unlink, writeFile } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __scriptDir = dirname(__filename);
const ROOT = join(__scriptDir, '..');

const CONVERT_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const WEBP_QUALITY = 85;

async function main() {
  const relPath = process.argv[2] || 'gallery/masterclass';
  const targetDir = join(ROOT, 'public', 'img', relPath);

  const files = await readdir(targetDir);
  const toConvert = files.filter((f) =>
    CONVERT_EXTENSIONS.includes(extname(f).toLowerCase())
  );

  console.log(`Конвертация ${toConvert.length} файлов в ${relPath}\n`);

  for (const f of toConvert) {
    const inputPath = join(targetDir, f);
    const baseName = basename(f, extname(f));
    const outputPath = join(targetDir, baseName + '.webp');

    try {
      const buf = await sharp(inputPath)
        .rotate()
        .webp({ quality: WEBP_QUALITY, effort: 6 })
        .toBuffer();
      await writeFile(outputPath, buf);
      await unlink(inputPath);
      console.log(`✓ ${f} → ${baseName}.webp`);
    } catch (err) {
      console.error(`✗ ${f}:`, err.message);
    }
  }

  console.log(`\nГотово.`);
}

main().catch(console.error);
