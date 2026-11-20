#!/usr/bin/env node
/**
 * Rasterize huge direction card SVGs to webp (sharp fails on XML limit).
 * Uses resvg-js if available; otherwise extracts embedded raster from SVG.
 */
import { readFile, writeFile, stat } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

const DIR = join(process.cwd(), 'public', 'img', 'directions');
const CARDS = ['card-1', 'card-2', 'card-3'];
const WIDTH = 696; // 348 * 2 retina
const QUALITY = 82;

async function tryResvg(svgPath, outPath) {
  let resvg;
  try {
    resvg = await import('@resvg/resvg-js');
  } catch {
    return false;
  }
  const svg = await readFile(svgPath);
  const r = new resvg.Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } });
  const png = r.render().asPng();
  await sharp(png).webp({ quality: QUALITY, effort: 6 }).toFile(outPath);
  return true;
}

async function extractDataImage(svg, outPath) {
  const hrefMatch = svg.match(
    /(?:xlink:href|href)="(data:image\/(?:png|jpeg|webp);base64,[^"]+)"/i
  );
  if (!hrefMatch) return false;
  const dataUrl = hrefMatch[1];
  const base64 = dataUrl.split(',')[1];
  const buf = Buffer.from(base64, 'base64');
  await sharp(buf)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outPath);
  return true;
}

async function processCard(name) {
  const svgPath = join(DIR, `${name}.svg`);
  const outPath = join(DIR, `${name}_opt.webp`);
  try {
    await stat(outPath);
    const kb = (await stat(outPath)).size / 1024;
    if (kb > 5) {
      console.log(`Skip ${name}: ${outPath} already exists (${kb.toFixed(1)} KB)`);
      return { name, outPath, skipped: true, kb };
    }
  } catch {
    /* create */
  }

  console.log(`Processing ${name}...`);
  if (await tryResvg(svgPath, outPath)) {
    const kb = (await stat(outPath)).size / 1024;
    console.log(`  resvg → ${kb.toFixed(1)} KB`);
    return { name, outPath, kb, method: 'resvg' };
  }

  const svg = await readFile(svgPath, 'utf8');
  if (await extractDataImage(svg, outPath)) {
    const kb = (await stat(outPath)).size / 1024;
    console.log(`  embedded raster → ${kb.toFixed(1)} KB`);
    return { name, outPath, kb, method: 'data-url' };
  }

  console.error(`  FAILED: install @resvg/resvg-js or provide smaller source for ${name}`);
  return { name, error: 'no method' };
}

async function main() {
  for (const name of CARDS) {
    await processCard(name);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});