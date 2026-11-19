import { useRef } from 'react';

import { gsap, MEDIA, ScrollTrigger, useGSAP } from '@shared/lib/gsap';

import styles from './styles.module.scss';

interface IProps {
  rows: string[][];
}

/**
 * Бесконечные бегущие строки. Скорость зависит от скорости скролла,
 * а при скролле вверх направление разворачивается.
 *
 * Производительность: анимация стоит на паузе, пока лента вне экрана,
 * а скорость меняется через один плавный tween (без создания новых tween на каждый скролл).
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
            { xPercent: isReversed ? 0 : -50, duration: 40, ease: 'none', repeat: -1, paused: true }
          );
        });

        // Общая скорость всех лент: 1 — базовая, со знаком направления
        const speed = { value: 1 };
        const applySpeed = () => loops.forEach((loop) => loop.timeScale(speed.value));

        let direction = 1;
        let speedTween: gsap.core.Timeline | null = null;

        ScrollTrigger.create({
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => loops.forEach((loop) => (self.isActive ? loop.play() : loop.pause())),
          onUpdate: (self) => {
            direction = self.direction;
            const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 500);

            speedTween?.kill();
            speedTween = gsap
              .timeline()
              .to(speed, { value: boost * direction, duration: 0.25, onUpdate: applySpeed })
              .to(speed, {
                value: direction,
                duration: 1.2,
                ease: 'power2.out',
                onUpdate: applySpeed,
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
