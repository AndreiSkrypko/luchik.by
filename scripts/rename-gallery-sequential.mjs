/**
 * Переименование фото галереи в формат slug_1.webp, slug_2.webp…
 * Пары *_opt.webp переименовываются вместе.
 *
 * node scripts/rename-gallery-sequential.mjs
 */
import { readFileSync, renameSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const GAL = join(ROOT, 'public', 'img', 'gallery');
const MC_JSON = join(ROOT, 'src', 'data', 'masterclass-photos.json');

function renFolder(relDir, slug, oldBasenames) {
  const dir = join(GAL, relDir);
  for (let i = 0; i < oldBasenames.length; i++) {
    const oldBase = oldBasenames[i];
    const newBase = `${slug}_${i + 1}.webp`;
    const from = join(dir, oldBase);
    const to = join(dir, newBase);
    if (existsSync(from)) {
      renameSync(from, to);
      console.log(`${relDir}: ${oldBase} -> ${newBase}`);
    } else {
      console.warn(`SKIP (нет файла): ${from}`);
    }
    const oldOpt = oldBase.replace(/\.webp$/i, '_opt.webp');
    const newOpt = `${slug}_${i + 1}_opt.webp`;
    const fromOpt = join(dir, oldOpt);
    const toOpt = join(dir, newOpt);
    if (existsSync(fromOpt)) {
      renameSync(fromOpt, toOpt);
      console.log(`  opt: ${oldOpt} -> ${newOpt}`);
    }
  }
}

const DEVELOPING = [
  '1.webp',
  '2.webp',
  '3.webp',
  '4.webp',
  '5.webp',
  '6.webp',
  '7.webp',
  '8.webp',
  '9.webp',
  '10.webp',
  '12.webp',
  '13.webp',
  '14.webp',
  '15.webp',
  '16.webp',
  '17.webp',
  '18.webp',
  '19.webp',
  '20.webp',
  '21.webp',
  '22.webp',
  '23.webp',
  '24.webp',
  '25.webp',
  '26.webp',
  '27.webp',
  'photo_2026-03-17_06-38-08.webp',
  'photo_2026-03-17_06-38-12.webp',
  'photo_2026-03-17_06-38-15.webp',
  'photo_2026-03-17_06-38-18.webp',
  'photo_2026-03-17_06-38-22.webp',
  'photo_2026-03-17_06-38-25.webp',
  'photo_2026-03-17_06-38-28.webp',
  'photo_2026-03-17_06-38-31.webp',
  'photo_2026-03-17_06-38-34.webp',
  'photo_2026-03-17_06-38-38.webp',
  'photo_2026-03-17_06-38-41.webp',
  'photo_2026-03-24_20-08-02.webp',
];

const ROBOTICS = [
  'IMG_4011.webp',
  'IMG_4018.webp',
  'photo_2026-03-16_08-45-47.webp',
  'photo_2026-03-16_08-45-54.webp',
  'IMG_1995.webp',
  'IMG_1996.webp',
  'IMG_2120.webp',
  'IMG_5125.webp',
  '20240217_174710.webp',
  '20240217_174745.webp',
  '20240224_164125.webp',
  '20250709_101910.webp',
  '20250709_102010.webp',
  '20250710_124818.webp',
  'IMG_20250730_183443_868.webp',
  'IMG_20250730_183456_834.webp',
  'photo_23_2025-03-18_19-28-04.webp',
  'photo_2026-03-16_20-30-27.webp',
  'photo_2026-03-16_20-30-42.webp',
  'photo_2026-03-16_20-30-47.webp',
  'photo_2026-03-16_20-31-08.webp',
  'photo_2026-03-16_20-31-13.webp',
  'photo_2026-03-16_20-31-16.webp',
  'photo_2026-03-17_06-34-01.webp',
  'photo_2026-03-17_06-34-06.webp',
  'photo_2026-03-17_06-34-10.webp',
  'photo_2026-03-17_06-37-22.webp',
  'photo_2026-03-17_06-37-26.webp',
  'photo_2026-03-17_06-37-30.webp',
  'photo_2026-03-17_06-37-34.webp',
  'photo_2026-03-17_06-37-37.webp',
  'photo_2026-03-17_06-37-40.webp',
  'photo_2026-03-17_06-37-43.webp',
  'photo_2026-03-21_13-24-43.webp',
  'photo_2026-03-21_13-24-42-2.webp',
];

const PREP = [
  'photo_2026-03-16_18-36-11.webp',
  'photo_2026-03-16_18-36-17.webp',
  'photo_2026-03-16_18-36-20.webp',
  'photo_2026-03-16_18-36-25.webp',
  'photo_2026-03-16_18-36-29.webp',
  'photo_2026-03-16_18-36-32.webp',
  'photo_2026-03-16_18-36-36.webp',
  'photo_2026-03-16_18-36-39.webp',
  'photo_2026-03-16_18-36-42.webp',
  'photo_2026-03-17_06-39-27.webp',
  'photo_2026-03-17_06-39-29.webp',
  'photo_2026-03-17_06-39-33.webp',
  'photo_2026-03-24_20-08-17.webp',
  'photo_2026-03-24_20-08-28.webp',
];

const PROG = [
  'IMG_3940.webp',
  'IMG_3986.webp',
  'IMG_3989.webp',
  'photo_2026-03-16_20-31-31.webp',
  'photo_2026-03-21_09-50-23.webp',
  'photo_2026-03-21_09-50-23-2.webp',
  'photo_2026-03-21_09-50-23-3.webp',
];

const VR = [
  'photo_2026-03-16_20-08-21.webp',
  'photo_2026-03-16_20-08-27.webp',
  'photo_2026-03-16_20-08-30.webp',
  'photo_2026-03-16_20-08-33.webp',
  'photo_2026-03-16_20-08-38.webp',
  'photo_2026-03-16_20-08-41.webp',
  'photo_2026-03-16_20-08-45.webp',
  'photo_2026-03-21_13-24-42.webp',
];

const EN = [
  'photo_2026-03-16_20-05-26.webp',
  'photo_2026-03-16_20-11-41.webp',
  'photo_2026-03-16_20-22-47.webp',
  'photo_2026-03-16_20-22-51.webp',
  'photo_2026-03-16_20-22-54.webp',
  'photo_2026-03-16_20-22-58.webp',
  'photo_2026-03-16_20-23-01.webp',
  'photo_2026-03-16_20-23-04.webp',
  'photo_2026-03-16_20-23-07.webp',
  'photo_2026-03-16_20-23-11.webp',
  'photo_2026-03-16_20-23-15.webp',
  'photo_2026-03-16_20-23-18.webp',
  'photo_2026-03-16_20-23-22.webp',
  'photo_2026-03-16_20-23-25.webp',
  'photo_2026-03-16_20-23-29.webp',
  'photo_2026-03-16_20-23-32.webp',
  'photo_2026-03-16_20-23-35.webp',
];

const ART = [
  'photo_2026-03-18_12-00-45.webp',
  'photo_2026-03-18_12-00-35.webp',
  'photo_2026-03-18_12-00-38.webp',
  'photo_2026-03-18_12-00-43.webp',
  'photo_2026-03-18_12-00-49.webp',
  'photo_2026-03-18_12-00-51.webp',
  'photo_2026-03-18_12-00-53.webp',
  'photo_2026-03-18_12-00-56.webp',
  'photo_2026-03-18_12-00-58.webp',
  'photo_2026-03-18_12-01-01.webp',
  'photo_2026-03-18_12-01-03.webp',
  'photo_2026-03-18_12-01-06.webp',
  'photo_2026-03-18_12-01-08.webp',
  'photo_2026-03-18_12-01-10.webp',
  'photo_2026-03-18_12-01-13.webp',
  'photo_2026-03-18_12-01-15.webp',
  'photo_2026-03-18_12-01-18.webp',
  'photo_2026-03-18_12-01-20.webp',
  'photo_2026-03-18_12-01-23.webp',
];

const EL = [
  'IMG_2016.webp',
  'IMG_2020.webp',
  'IMG_2023.webp',
  'IMG_2024.webp',
  'IMG_2059.webp',
  'IMG_2062.webp',
  'IMG_2063.webp',
  'IMG_2064.webp',
  'IMG_2066.webp',
  'IMG_2080.webp',
  '20250412_095608.webp',
  'photo_17_2025-03-18_19-28-04.webp',
  'photo_21_2025-03-18_19-28-04.webp',
  'photo_2026-03-16_20-31-22.webp',
  'photo_2026-03-16_20-31-36.webp',
  'photo_2026-03-17_06-36-10.webp',
];

const CHESS = [
  'IMG_2095.webp',
  'IMG_2097.webp',
  'IMG_2108.webp',
  'IMG_2109.webp',
  'IMG_2111.webp',
  'IMG_20191005_130245.webp',
  'photo_2026-03-16_20-30-51.webp',
  'photo_2026-03-16_20-30-55.webp',
];

const LEGO_K = [
  '20211112_174826.webp',
  '20211112_194859.webp',
  '20211112_194929.webp',
  '20211126_185507.webp',
  '20230203_181415.webp',
  '20230203_182451.webp',
  '20230217_175510.webp',
  '20230325_110808.webp',
  '20230407_175725.webp',
  '20230408_112912.webp',
  'IMG_20181116_192921.webp',
  'IMG_20190704_165505.webp',
  'IMG_20190928_143607.webp',
  'IMG_20191012_143441.webp',
  'IMG_20191025_182258.webp',
  'IMG_20191026_143653.webp',
  'IMG_20191026_154336.webp',
  'IMG_20191207_172241.webp',
  'IMG_20191213_182825.webp',
  'IMG_20200110_182103.webp',
  'IMG_20211211_154826.webp',
  'photo_2026-03-16_20-30-32.webp',
  'photo_2026-03-16_20-30-35.webp',
  'photo_2026-03-16_20-31-00.webp',
  'photo_2026-03-17_06-36-13.webp',
  'photo_2026-03-17_06-36-59.webp',
  'photo_2026-03-17_06-37-03.webp',
];

const LEGO_R = [
  'IMG_1818.webp',
  'IMG_1822.webp',
  'IMG_1824.webp',
  'IMG_1826.webp',
  'IMG_1829.webp',
  'IMG_1833.webp',
  'IMG_1835.webp',
  'IMG_1837.webp',
  'IMG_1838.webp',
  'IMG_1841.webp',
  'IMG_1971.webp',
  'IMG_8303.webp',
  'IMG_8310.webp',
  'IMG_8312.webp',
  'photo_2026-03-16_18-14-48.webp',
  'photo_2026-03-16_18-14-52.webp',
  'photo_2026-03-16_18-14-56.webp',
  'photo_2026-03-16_18-14-59.webp',
  'photo_2026-03-16_18-15-03.webp',
  'photo_2026-03-16_18-15-06.webp',
  'photo_2026-03-16_18-15-10.webp',
  'photo_2026-03-16_18-15-13.webp',
  'photo_2026-03-16_18-15-16.webp',
  'photo_2026-03-16_18-15-19.webp',
  'photo_2026-03-16_18-15-25.webp',
  'photo_2026-03-16_18-15-39.webp',
  'photo_2026-03-16_18-15-42.webp',
  'photo_2026-03-17_06-35-13.webp',
  'photo_2026-03-24_18-25-36.webp',
  'photo_2026-03-24_18-25-37.webp',
  'photo_2026-03-24_18-25-38.webp',
  'photo_2026-03-24_18-25-39.webp',
];

const LM = [
  'IMG_1969.webp',
  'IMG_1970.webp',
  'IMG_1971.webp',
  'IMG_1974.webp',
  'IMG_1976.webp',
  'IMG_1978.webp',
  'IMG_1979.webp',
  'IMG_1990.webp',
  '20211126_182350.webp',
  '20211126_182433.webp',
  '20211126_182610.webp',
  '20230121_135002.webp',
  'photo_2026-03-17_06-35-31.webp',
  'photo_2026-03-17_06-35-35.webp',
  'photo_2026-03-17_06-35-38.webp',
  'photo_2026-03-17_06-35-42.webp',
];

const D3 = [
  'IMG_5054.webp',
  'IMG_5059.webp',
  'IMG_5065.webp',
  'IMG_5067.webp',
  'IMG_5068.webp',
  'photo_2026-03-16_18-52-19.webp',
  'photo_2026-03-16_18-52-23.webp',
  'photo_2026-03-16_18-52-26.webp',
];

console.log('Переименование галереи…\n');

renFolder('developing', 'razvivayka', DEVELOPING);
renFolder('robotics', 'robototehnika', ROBOTICS);
renFolder('prep-school', 'podgotovka_k_shkole', PREP);
renFolder('programming', 'programmirovanie', PROG);
renFolder('vr', 'vr_igry', VR);
renFolder('english', 'anglijskij', EN);
renFolder('artstudio', 'artstudiya', ART);
renFolder('elektronika_shemotehnika', 'elektronika', EL);
renFolder('chess', 'shahmaty', CHESS);
renFolder('legokonstruirovanie', 'lego_konstr', LEGO_K);
renFolder('legorazvivaika', 'lego_razvivajka', LEGO_R);
renFolder('legomatematika', 'lego_matematika', LM);
renFolder('3dmodelirovanie', 'modelirovanie_3d', D3);

// Мастер-классы: порядок как в masterclass-photos.json
const mcRaw = readFileSync(MC_JSON, 'utf8');
const mcList = JSON.parse(mcRaw);
if (!Array.isArray(mcList)) throw new Error('masterclass-photos.json не массив');
renFolder('masterclass', 'masterklass', mcList);

const mcNew = mcList.map((_, i) => `masterklass_${i + 1}.webp`);
writeFileSync(MC_JSON, `${JSON.stringify(mcNew, null, 2)}\n`, 'utf8');
console.log(`\nОбновлён ${MC_JSON} (${mcNew.length} файлов)`);
console.log('\nГотово.');
