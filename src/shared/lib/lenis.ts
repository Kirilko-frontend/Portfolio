import Lenis from 'lenis';

import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

let lenis: Lenis | null = null;
let isLocked = false;

export const getLenis = () => lenis;

/** Блокирует скролл (например, пока идёт прелоадер или открыто меню). */
export const lockScroll = () => {
  isLocked = true;
  lenis?.stop();
  document.documentElement.style.overflow = 'hidden';
};

export const unlockScroll = () => {
  isLocked = false;
  lenis?.start();
  document.documentElement.style.overflow = '';
};

/**
 * Запускает плавный скролл Lenis и синхронизирует его с ScrollTrigger.
 * Возвращает функцию очистки. При prefers-reduced-motion остаётся нативный скролл.
 */
export const startLenis = () => {
  if (lenis || prefersReducedMotion()) return () => {};

  const instance = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });

  const onTick = (time: number) => instance.raf(time * 1000);

  instance.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  lenis = instance;
  if (isLocked) instance.stop();

  return () => {
    gsap.ticker.remove(onTick);
    instance.destroy();
    lenis = null;
  };
};
