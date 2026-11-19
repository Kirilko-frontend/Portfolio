import { getLenis } from '@shared/lib/lenis';

/**
 * Плавный скролл к селектору/элементу/координате.
 * Использует Lenis, если он запущен, иначе — нативный scrollTo.
 */
export const scrollTo = (target: string | number | HTMLElement, offset = 0) => {
  const lenis = getLenis();

  if (lenis) {
    lenis.scrollTo(target, {
      offset,
      duration: 1.6,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    });
    return;
  }

  let y = 0;

  if (typeof target === 'number') {
    y = target;
  } else {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    y = element.getBoundingClientRect().top + window.scrollY;
  }

  window.scrollTo({ top: y + offset, behavior: 'smooth' });
};
