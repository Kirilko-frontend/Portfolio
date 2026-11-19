import { useRef } from 'react';

import { gsap, useGSAP } from '@shared/lib/gsap';

import styles from './styles.module.scss';

/**
 * Полоса прогресса скролла вверху страницы.
 * Обновляется через GSAP (scaleX), без setState — App не перерисовывается на каждом кадре скролла.
 */
const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      }
    );
  });

  return <div ref={barRef} className={styles['progress']} aria-hidden="true" />;
};

export default ScrollProgress;
