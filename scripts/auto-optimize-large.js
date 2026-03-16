#!/usr/bin/env node
/**
 * Автоматическая оптимизация больших изображений.
 * - Находит файлы в public/img >= thresholdKB
 * - Для SVG: растеризует и сохраняет as _opt.webp (width maxWidth)
 * - Для растровых: ресайз (maxWidth) и конвертирует в webp _opt.webp
 *
 * Usage:
 *   node scripts/auto-optimize-large.js [thresholdKb] [limit]
 *
 * По умолчанию thresholdKb=200, limit=60
 */
import { readdir } from 'fs/promises';
import { stat, mkdir } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const IMG_DIR = join(ROOT, 'public', 'img');

const args = process.argv.slice(2);
const thresholdKb = Number(args[0]) || 200;
const limit = Number(args[1]) || 60;
const maxWidth = 1600;
const QUALITY = 75;

const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg']);

async function walk(dir, list = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      await walk(full, list);
    } else if (e.isFile()) {
      const ext = extname(e.name).toLowerCase();
      if (ALLOWED_EXT.has(ext)) list.push(full);
    }
  }
  return list;
}

async function processFile(file) {
  try {
    const s = await stat(file);
    const kb = s.size / 1024;
    if (kb < thresholdKb) return null;

    const ext = extname(file).toLowerCase();
    const dir = dirname(file);
    const base = basename(file, ext);
    const outPath = join(dir, base + '_opt.webp');
    // skip if exists
    try {
      await stat(outPath);
      console.log(`Skip (exists): ${outPath}`);
      return { file, outPath, skipped: true };
    } catch {}

    console.log(`Optimizing: ${file} → ${outPath}`);
    if (ext === '.svg') {
      // rasterize svg to webp
      await sharp(file)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(outPath);
    } else {
      // raster images: resize and convert to webp
      const img = sharp(file).rotate();
      const meta = await img.metadata();
      if (meta.width && meta.width > maxWidth) {
        await img
          .resize({ width: maxWidth, withoutEnlargement: true })
          .webp({ quality: QUALITY, effort: 6 })
          .toFile(outPath);
      } else {
        await img
          .webp({ quality: QUALITY, effort: 6 })
          .toFile(outPath);
      }
    }

    const newSize = (await stat(outPath)).size;
    return { file, outPath, newSize_kb: Math.round(newSize / 1024 * 10) / 10 };
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
    return { file, error: err.message };
  }
}

async function main() {
  console.log(`Scanning ${IMG_DIR} for images >= ${thresholdKb} KB...`);
  const files = await walk(IMG_DIR, []);
  const withSizes = [];
  for (const f of files) {
    try {
      const s = await stat(f);
      withSizes.push({ path: f, size: s.size });
    } catch {}
  }
  withSizes.sort((a, b) => b.size - a.size);
  const candidates = withSizes.filter(f => f.size / 1024 >= thresholdKb).slice(0, limit);
  console.log(`Found ${candidates.length} candidates (processing up to ${limit})`);

  await mkdir(join(ROOT, 'reports'), { recursive: true });
  const results = [];
  for (const c of candidates) {
    // eslint-disable-next-line no-await-in-loop
    const r = await processFile(c.path);
    results.push(r);
  }

  const report = {
    threshold_kb: thresholdKb,
    processed: results.length,
    results,
  };
  const outReport = join(ROOT, 'reports', 'optimize-large-report.json');
  await import('fs/promises').then(fs => fs.writeFile(outReport, JSON.stringify(report, null, 2), 'utf8'));
  console.log(`\nDone. Report: ${outReport}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

