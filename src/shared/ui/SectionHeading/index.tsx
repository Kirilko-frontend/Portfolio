import { useRef } from 'react';

import { gsap, MEDIA, useGSAP } from '@shared/lib/gsap';
import RevealText from '@shared/ui/RevealText';

import styles from './styles.module.scss';

interface IProps {
  index: string;
  label: string;
  title: string;
  className?: string;
  align?: 'left' | 'center';
}

/**
 * Заголовок секции: «(01) — Label» + крупный заголовок, строки которого выезжают из-под маски.
 */
const SectionHeading = ({ index, label, title, className = '', align = 'left' }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } })
          .from(`.${styles['heading__eyebrow']} > span`, {
            yPercent: 100,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'expo.out',
          })
          .from(`.${styles['heading__line']}`, { scaleX: 0, duration: 1.2, ease: 'expo.inOut' }, 0);
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`${styles['heading']} ${align === 'center' ? styles['heading--center'] : ''} ${className}`}
    >
      <p className={styles['heading__eyebrow']}>
        <span className={styles['heading__index']}>({index})</span>
        <span>{label}</span>
        <span className={styles['heading__line']} aria-hidden="true" />
      </p>
      <RevealText as="h2" text={title} className={styles['heading__title']} />
    </div>
  );
};

export default SectionHeading;
