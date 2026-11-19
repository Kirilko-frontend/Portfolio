import { useRef, type ReactElement } from 'react';

import { gsap, useGSAP } from '@shared/lib/gsap';

import styles from './styles.module.scss';

interface IProps {
  children: ReactElement;
  /** Насколько сильно элемент тянется к курсору (0..1) */
  strength?: number;
  className?: string;
}

/**
 * Обёртка «магнит»: дочерний элемент притягивается к курсору при наведении
 * и пружинисто возвращается на место. Только для устройств с мышью.
 */
const Magnetic = ({ children, strength = 0.35, className = '' }: IProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

      const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.35)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.35)' });

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
      };

      const handleLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('mousemove', handleMove);
      el.addEventListener('mouseleave', handleLeave);

      return () => {
        el.removeEventListener('mousemove', handleMove);
        el.removeEventListener('mouseleave', handleLeave);
      };
    },
    { scope: ref, dependencies: [strength] }
  );

  return (
    <span ref={ref} className={`${styles['magnetic']} ${className}`}>
      {children}
    </span>
  );
};

export default Magnetic;
