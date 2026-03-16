#!/usr/bin/env node
/**
 * Скрипт: отчёт по большим изображениям в public/img
 * Выдаёт JSON-отчёт в reports/large-images.json и печатает сводку.
 *
 * Запуск:
 *   node scripts/report-large-images.js [size-kb]
 *
 * По умолчанию порог 200 (KB).
 */
import { readdir, stat, mkdir, writeFile } from 'fs/promises';
import { join, extname } from 'path';

const ROOT = new URL('../', import.meta.url).pathname;
const IMG_DIR = join(ROOT, 'public', 'img');
const REPORTS_DIR = join(ROOT, 'reports');

const args = process.argv.slice(2);
const thresholdKb = Number(args[0]) || 200;

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

async function main() {
  try {
    console.log(`Scanning ${IMG_DIR} for files > ${thresholdKb} KB...`);
    const files = await walk(IMG_DIR, []);
    const large = [];
    let totalSize = 0;
    for (const f of files) {
      try {
        const s = await stat(f);
        totalSize += s.size;
        const kb = Math.round(s.size / 1024);
        if (kb >= thresholdKb) {
          large.push({ path: f.replace(ROOT, ''), size_kb: kb });
        }
      } catch (err) {
        // ignore single-file errors
      }
    }

    await mkdir(REPORTS_DIR, { recursive: true });
    const outPath = join(REPORTS_DIR, 'large-images.json');
    await writeFile(outPath, JSON.stringify({ threshold_kb: thresholdKb, total_images_checked: files.length, total_size_kb: Math.round(totalSize/1024), large }, null, 2), 'utf8');

    console.log(`Checked ${files.length} images, total ${(totalSize/1024).toFixed(1)} KB.`);
    console.log(`Found ${large.length} images >= ${thresholdKb} KB. Report: ${outPath}`);
    if (large.length > 0) {
      console.table(large.map(p => ({ path: p.path, size_kb: p.size_kb })));
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();

