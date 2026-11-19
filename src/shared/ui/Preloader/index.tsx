import { useRef, useState } from 'react';

import { gsap, useGSAP, prefersReducedMotion } from '@shared/lib/gsap';
import { lockScroll, unlockScroll } from '@shared/lib/lenis';

import styles from './styles.module.scss';

interface IProps {
  /** Вызывается, когда шторка начинает уезжать — пора запускать анимацию Hero */
  onReveal: () => void;
}

const WORDS = ['Design', 'Code', 'Motion', 'Kyrylo'];

const Preloader = ({ onReveal }: IProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isHidden, setIsHidden] = useState(false);

  useGSAP(
    () => {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
      lockScroll();

      const finish = () => {
        unlockScroll();
        setIsHidden(true);
      };

      if (prefersReducedMotion()) {
        onReveal();
        gsap.to(rootRef.current, { autoAlpha: 0, duration: 0.4, onComplete: finish });
        return;
      }

      const counter = { value: 0 };
      const words = gsap.utils.toArray<HTMLElement>(`.${styles['preloader__word']}`);
      gsap.set(words, { yPercent: 110 });

      const intro = gsap.timeline();

      intro
        .from(`.${styles['preloader__meta']} span`, {
          yPercent: 110,
          duration: 0.8,
          stagger: 0.08,
          ease: 'expo.out',
        })
        .to(
          counter,
          {
            value: 100,
            duration: 2.2,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0');
              }
            },
          },
          0
        )
        .fromTo(
          `.${styles['preloader__line-fill']}`,
          { scaleX: 0 },
          { scaleX: 1, duration: 2.2, ease: 'power2.inOut' },
          0
        );

      // Слова сменяют друг друга по центру
      words.forEach((word, index) => {
        const at = 0.15 + index * 0.5;
        intro.fromTo(word, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: 'expo.out' }, at);
        if (index < words.length - 1) {
          intro.to(word, { yPercent: -110, duration: 0.22, ease: 'power3.in' }, at + 0.28);
        }
      });

      const fontsReady = document.fonts?.ready ?? Promise.resolve();

      let isCancelled = false;

      Promise.all([fontsReady, intro.then()]).then(() => {
        if (isCancelled) return;

        gsap
          .timeline({ onComplete: finish })
          .to(`.${styles['preloader__mask']} > *`, {
            yPercent: -110,
            duration: 0.6,
            stagger: 0.04,
            ease: 'expo.in',
          })
          .to(
            rootRef.current,
            {
              clipPath: 'inset(0% 0% 100% 0%)',
              duration: 1.1,
              ease: 'expo.inOut',
            },
            '-=0.15'
          )
          .call(onReveal, [], '-=0.6');
      });

      return () => {
        isCancelled = true;
      };
    },
    { scope: rootRef }
  );

  if (isHidden) return null;

  return (
    <div ref={rootRef} className={styles['preloader']} aria-hidden="true">
      <div className={styles['preloader__top']}>
        <div className={`${styles['preloader__meta']} ${styles['preloader__mask']}`}>
          <span>Kyrylo Kakulia</span>
        </div>
        <div className={`${styles['preloader__meta']} ${styles['preloader__mask']}`}>
          <span>Portfolio ©{new Date().getFullYear()}</span>
        </div>
      </div>

      <div className={`${styles['preloader__words']} ${styles['preloader__mask']}`}>
        {WORDS.map((word) => (
          <span key={word} className={styles['preloader__word']}>
            {word}
          </span>
        ))}
      </div>

      <div className={styles['preloader__bottom']}>
        <div className={styles['preloader__line']}>
          <span className={styles['preloader__line-fill']} />
        </div>
        <div className={`${styles['preloader__counter']} ${styles['preloader__mask']}`}>
          <span ref={counterRef}>000</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
