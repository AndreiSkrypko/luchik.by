/** Путь к webp-версии с суффиксом _opt (оригинал остаётся запасным). */
export function optimizedImageSrc(src: string): string {
  return src.replace(/\.[^/.]+$/, '_opt.webp');
}

export function fallbackOnOptimizedImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  originalSrc: string,
): void {
  const img = e.currentTarget;
  if (img.dataset.fallbackTried === '1') return;
  img.dataset.fallbackTried = '1';
  img.src = originalSrc;
}