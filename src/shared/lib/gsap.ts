import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

// Регистрируем плагины один раз для всего приложения
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

gsap.defaults({ ease: 'power3.out', duration: 1 });

// Общие медиа-условия для gsap.matchMedia()
export const MEDIA = {
  desktop: '(min-width: 1024px)',
  mobile: '(max-width: 1023.98px)',
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
} as const;

export const prefersReducedMotion = () => window.matchMedia(MEDIA.reduce).matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };
