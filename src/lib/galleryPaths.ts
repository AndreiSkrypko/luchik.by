/** Пути к webp в стиле `robototehnika_1.webp` для каталога `public/img/gallery/`. */
export function galleryFiles(baseUrl: string, slug: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${baseUrl}/${slug}_${i + 1}.webp`);
}
