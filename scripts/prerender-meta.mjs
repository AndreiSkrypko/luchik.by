/**
 * Post-build: static HTML per SEO route + sitemap.xml
 * Bots get correct title/description/canonical/og without executing JS.
 */
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const cacheFile = path.join(__dirname, '.cache-seo.mjs');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const replaceMeta = (html, { title, description, keywords, canonical, ogImage, pathname }) => {
  const url = `https://luchik.by${pathname === '/' ? '/' : pathname}`;
  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);

  const setName = (name, content) => {
    const re = new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*/?>`, 'i');
    const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`;
    if (re.test(out)) out = out.replace(re, tag);
    else out = out.replace('</head>', `    ${tag}\n  </head>`);
  };

  const setProp = (property, content) => {
    const re = new RegExp(`<meta\\s+property="${property}"\\s+content="[^"]*"\\s*/?>`, 'i');
    const tag = `<meta property="${property}" content="${escapeHtml(content)}" />`;
    if (re.test(out)) out = out.replace(re, tag);
    else out = out.replace('</head>', `    ${tag}\n  </head>`);
  };

  setName('title', title);
  setName('description', description);
  setName('keywords', keywords);
  setProp('og:title', title);
  setProp('og:description', description);
  setProp('og:image', ogImage);
  setProp('og:url', url);
  setName('twitter:title', title);
  setName('twitter:description', description);
  setName('twitter:image', ogImage);
  setName('twitter:url', url);

  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`
  );

  // Crawlable fallback: page-specific H1 + description for bots that skip JS
  const fallback = `
      <noscript>
        <div style="padding: 24px; max-width: 720px; margin: 0 auto; font-family: Nunito, sans-serif; color: #4665a1;">
          <h1 style="font-size: 1.75rem; line-height: 1.3;">${escapeHtml(title)}</h1>
          <p style="font-size: 1rem; line-height: 1.5; color: #334155;">${escapeHtml(description)}</p>
          <p><a href="https://luchik.by/enrollment">Записаться</a> · <a href="https://luchik.by/contacts">Контакты</a></p>
        </div>
      </noscript>
      <div data-prerender-seo style="padding: 20px; max-width: 720px; margin: 0 auto; font-family: Nunito, sans-serif; color: #4665a1;">
        <h1 style="font-size: clamp(1.5rem, 4vw, 2rem); line-height: 1.3; margin: 0 0 12px;">${escapeHtml(title)}</h1>
        <p style="font-size: 1rem; line-height: 1.5; color: #334155; margin: 0 0 16px;">${escapeHtml(description)}</p>
        <p style="margin: 0;"><a href="/enrollment">Записаться</a> · <a href="/contacts">Контакты</a></p>
      </div>`;

  out = out.replace(
    /<div id="root">[\s\S]*?<\/div>\s*<script>/,
    `<div id="root">${fallback}\n    </div>\n    <script>`
  );

  return out;
};

const priorityFor = (pathname) => {
  if (pathname === '/') return '1.0';
  if (pathname.startsWith('/age/')) return '0.95';
  if (pathname === '/enrollment') return '0.95';
  if (pathname.startsWith('/course/')) return '0.9';
  if (pathname === '/about' || pathname === '/contacts') return '0.9';
  if (pathname.startsWith('/gallery/')) return '0.75';
  if (pathname === '/gallery') return '0.8';
  return '0.7';
};

const changefreqFor = (pathname) => {
  if (pathname === '/' || pathname.startsWith('/age/') || pathname.startsWith('/gallery')) return 'weekly';
  return 'monthly';
};

const main = async () => {
  if (!fs.existsSync(distDir)) {
    throw new Error('dist/ not found — run vite build first');
  }

  await esbuild.build({
    entryPoints: [path.join(root, 'src/data/seo.ts')],
    bundle: true,
    write: true,
    format: 'esm',
    platform: 'node',
    outfile: cacheFile,
    logLevel: 'silent',
  });

  const mod = await import(pathToFileURL(cacheFile).href + `?t=${Date.now()}`);
  const { seoConfig, SITE_URL, DEFAULT_OG_IMAGE } = mod;

  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  const lastmod = new Date().toISOString().slice(0, 10);
  const routes = Object.keys(seoConfig).filter((p) => !seoConfig[p].noindex);

  let written = 0;
  for (const pathname of routes) {
    const seo = seoConfig[pathname];
    const canonical =
      seo.canonical?.startsWith('http')
        ? seo.canonical
        : `${SITE_URL}${pathname === '/' ? '' : pathname}`;
    const ogImage = seo.ogImage || DEFAULT_OG_IMAGE;
    const html = replaceMeta(template, {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      canonical,
      ogImage,
      pathname,
    });

    if (pathname === '/') {
      fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
    } else {
      const dir = path.join(distDir, pathname.replace(/^\//, ''));
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
    }
    written += 1;
  }

  const urls = routes
    .map((pathname) => {
      const loc = pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreqFor(pathname)}</changefreq>
    <priority>${priorityFor(pathname)}</priority>
  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
  fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap, 'utf8');

  try {
    fs.unlinkSync(cacheFile);
  } catch {
    /* ignore */
  }

  console.log(`Prerendered ${written} routes + sitemap (lastmod ${lastmod})`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
