import type { Plugin } from 'vite';

export function asyncCss(): Plugin {
  return {
    name: 'async-css',
    transformIndexHtml(html) {
      // Заменяем синхронную загрузку CSS на асинхронную используя media trick
      return html.replace(
        /<link\s+rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/g,
        (match, href) => {
          // Извлекаем все атрибуты из оригинального тега
          const crossorigin = match.includes('crossorigin') ? ' crossorigin' : '';
          
          // Добавляем preload для раннего начала загрузки (не блокирует рендеринг)
          const preloadLink = `<link rel="preload" href="${href}" as="style"${crossorigin}>`;
          
          // Используем media="print" trick для асинхронной загрузки
          // Это работает во всех браузерах и не блокирует рендеринг
          const asyncLink = match.replace(
            /rel="stylesheet"/,
            'rel="stylesheet" media="print" onload="this.media=\'all\'; this.onload=null"'
          );
          
          return `${preloadLink}
    ${asyncLink}
    <noscript>${match}</noscript>`;
        }
      );
    },
  };
}
