import { useRef } from 'react';

import { gsap, MEDIA, ScrollTrigger, useGSAP } from '@shared/lib/gsap';

import styles from './styles.module.scss';

interface IProps {
  rows: string[][];
}

/**
 * Бесконечные бегущие строки. Скорость зависит от скорости скролла,
 * а при скролле вверх направление разворачивается.
 */
const Marquee = ({ rows }: IProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        const tracks = gsap.utils.toArray<HTMLElement>(`.${styles['marquee__track']}`);

        const loops = tracks.map((track, index) => {
          const isReversed = index % 2 === 1;
          return gsap.fromTo(
            track,
            { xPercent: isReversed ? -50 : 0 },
            { xPercent: isReversed ? 0 : -50, duration: 40, ease: 'none', repeat: -1 }
          );
        });

        let direction = 1;

        ScrollTrigger.create({
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            direction = self.direction;
            const boost = gsap.utils.clamp(1, 8, 1 + Math.abs(self.getVelocity()) / 400);

            loops.forEach((loop) => {
              gsap.to(loop, {
                timeScale: boost * direction,
                duration: 0.2,
                overwrite: true,
                onComplete: () => {
                  gsap.to(loop, { timeScale: direction, duration: 1.2, ease: 'power2.out' });
                },
              });
            });
          },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={styles['marquee']} aria-hidden="true">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles['marquee__row']}>
          <div className={styles['marquee__track']}>
            {/* Контент дублируется, чтобы цикл был бесшовным */}
            {[0, 1].map((copy) => (
              <div key={copy} className={styles['marquee__group']}>
                {row.map((item, index) => (
                  <span
                    key={item}
                    className={`${styles['marquee__item']} ${(index + rowIndex) % 2 ? styles['marquee__item--muted'] : ''}`}
                  >
                    {item}
                    <span className={styles['marquee__star']}>✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Marquee;
