/**
 * Сжимает номера razvivayka_N / shahmaty_N без дыр (после SKIP при переименовании).
 * node scripts/compact-gallery-numbers.mjs
 */
import { readdirSync, renameSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GAL = join(__dirname, '..', 'public', 'img', 'gallery');

function compactDir(rel, slug) {
  const dir = join(GAL, rel);
  const re = new RegExp(`^${slug}_(\\d+)\\.webp$`);
  const files = readdirSync(dir)
    .filter((f) => re.test(f))
    .map((f) => {
      const m = f.match(re);
      return { f, n: Number(m[1]) };
    })
    .sort((a, b) => a.n - b.n);

  const tmp = files.map((_, i) => join(dir, `__tmp_compact_${i}.webp`));
  files.forEach((x, i) => renameSync(join(dir, x.f), tmp[i]));
  files.forEach((_, i) => renameSync(tmp[i], join(dir, `${slug}_${i + 1}.webp`)));
  console.log(`${rel}: ${files.length} файлов -> ${slug}_1..${slug}_${files.length}.webp`);
}

compactDir('developing', 'razvivayka');
compactDir('chess', 'shahmaty');
