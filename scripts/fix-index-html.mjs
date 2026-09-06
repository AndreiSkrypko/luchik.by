import fs from 'fs';

const path = 'index.html';
let html = fs.readFileSync(path, 'utf8');

const start = html.indexOf('    <!-- Structured Data (JSON-LD) -->');
const endMarker = '  </head>';
const end = html.indexOf(endMarker, start);
if (start === -1 || end === -1) {
  console.error('markers not found', start, end);
  process.exit(1);
}
html = html.slice(0, start) + html.slice(end);

html = html.replace(
  '<meta property="og:image" content="https://luchik.by/img/main/logo.webp" />',
  '<meta property="og:image" content="https://luchik.by/img/og-share.webp" />'
);
html = html.replace(
  '<meta name="twitter:image" content="https://luchik.by/img/main/logo.webp" />',
  '<meta name="twitter:image" content="https://luchik.by/img/og-share.webp" />'
);

html = html.replace(
  /\s*<!-- Performance optimizations -->[\s\S]*?<noscript>[\s\S]*?<\/noscript>\s*/,
  '\n\n    '
);

html = html.replace(
  /\s*<link rel="preload" href="\/img\/main\/clouds\.webp"[^>]*>\s*/,
  '\n'
);

fs.writeFileSync(path, html);
console.log({
  dupSchema: html.includes('Structured Data (JSON-LD)'),
  googleFonts: html.includes('fonts.googleapis'),
  ogShare: html.includes('og-share.webp'),
  newSchema: html.includes('branch-zamkovaya'),
});
