import { readdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __scriptDir = dirname(__filename);
const ROOT = join(__scriptDir, '..');
const dir = join(ROOT, 'public', 'img', 'gallery', 'masterclass');

const files = await readdir(dir);
const webp = files.filter((f) => f.endsWith('.webp')).sort();

await writeFile(join(ROOT, 'src', 'data', 'masterclass-photos.json'), JSON.stringify(webp, null, 2), 'utf8');
