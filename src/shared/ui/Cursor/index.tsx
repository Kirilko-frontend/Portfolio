import { useRef, useState } from 'react';

import { gsap, useGSAP } from '@shared/lib/gsap';

import styles from './styles.module.scss';

const INTERACTIVE = 'a, button, [data-cursor]';

/**
 * Кастомный курсор: точка + кольцо с инерцией.
 * На ссылках/кнопках кольцо увеличивается, у элементов с data-cursor="Текст" показывает подпись.
 * Работает только на устройствах с мышью.
 */
const Cursor = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [isEnabled] = useState(
    () => window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  useGSAP(
    () => {
      if (!isEnabled) return;

      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;

      gsap.set([ring, dot], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

      // Кольцо догоняет мышь с лёгкой инерцией, точка следует мгновенно — курсор не «отстаёт»
      const ringX = gsap.quickTo(ring, 'x', { duration: 0.25, ease: 'power3.out' });
      const ringY = gsap.quickTo(ring, 'y', { duration: 0.25, ease: 'power3.out' });
      const dotX = gsap.quickSetter(dot, 'x', 'px');
      const dotY = gsap.quickSetter(dot, 'y', 'px');

      let isVisible = false;

      const handleMove = (e: MouseEvent) => {
        if (!isVisible) {
          isVisible = true;
          gsap.set([ring, dot], { x: e.clientX, y: e.clientY });
          gsap.to([ring, dot], { autoAlpha: 1, duration: 0.3 });
        }
        ringX(e.clientX);
        ringY(e.clientY);
        dotX(e.clientX);
        dotY(e.clientY);
      };

      const handleOver = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest<HTMLElement>(INTERACTIVE);
        if (!target) return;

        const text = target.dataset.cursor ?? '';
        setLabel(text);

        gsap.to(ring, {
          scale: text ? 3.2 : 1.8,
          backgroundColor: text ? 'rgba(139, 92, 246, 0.9)' : 'rgba(139, 92, 246, 0.15)',
          borderColor: text ? 'rgba(139, 92, 246, 0)' : 'rgba(196, 181, 253, 0.8)',
          duration: 0.4,
          ease: 'power3.out',
        });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      };

      const handleOut = (e: MouseEvent) => {
        const from = (e.target as HTMLElement).closest(INTERACTIVE);
        const to = (e.relatedTarget as HTMLElement | null)?.closest?.(INTERACTIVE);
        if (!from || from === to) return;

        setLabel('');
        gsap.to(ring, {
          scale: 1,
          backgroundColor: 'rgba(139, 92, 246, 0)',
          borderColor: 'rgba(244, 242, 250, 0.5)',
          duration: 0.4,
          ease: 'power3.out',
        });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      };

      const handleDown = () => gsap.to(ring, { scale: '-=0.25', duration: 0.15 });
      const handleUp = () => gsap.to(ring, { scale: '+=0.25', duration: 0.25 });

      const handleLeave = () => {
        isVisible = false;
        gsap.to([ring, dot], { autoAlpha: 0, duration: 0.3 });
      };

      window.addEventListener('mousemove', handleMove, { passive: true });
      document.addEventListener('mouseover', handleOver);
      document.addEventListener('mouseout', handleOut);
      window.addEventListener('mousedown', handleDown);
      window.addEventListener('mouseup', handleUp);
      document.documentElement.addEventListener('mouseleave', handleLeave);

      return () => {
        window.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseover', handleOver);
        document.removeEventListener('mouseout', handleOut);
        window.removeEventListener('mousedown', handleDown);
        window.removeEventListener('mouseup', handleUp);
        document.documentElement.removeEventListener('mouseleave', handleLeave);
      };
    },
    { scope: rootRef, dependencies: [isEnabled] }
  );

  if (!isEnabled) return null;

  return (
    <div ref={rootRef} className={styles['cursor']} aria-hidden="true">
      <div ref={ringRef} className={styles['cursor__ring']}>
        <span
          className={`${styles['cursor__label']} ${label ? styles['cursor__label--visible'] : ''}`}
        >
          {label}
        </span>
      </div>
      <div ref={dotRef} className={styles['cursor__dot']} />
    </div>
  );
};

export default Cursor;
