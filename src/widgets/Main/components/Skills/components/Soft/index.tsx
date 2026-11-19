import { useRef, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import { gsap, MEDIA, useGSAP } from '@shared/lib/gsap';
import RevealText from '@shared/ui/RevealText';

import config from './config';

import styles from './styles.module.scss';

/**
 * Soft skills — «стопка карточек»: каждая карточка прилипает к верху,
 * следующая наезжает на неё, а предыдущая уменьшается и темнеет.
 */
const Soft = () => {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        const cards = gsap.utils.toArray<HTMLElement>(`.${styles['soft__card']}`);

        cards.forEach((card, index) => {
          const next = cards[index + 1];
          if (!next) return;

          const depth = cards.length - index;

          gsap
            .timeline({
              scrollTrigger: {
                trigger: next,
                start: 'top bottom',
                end: () => `top ${next.style.top || getComputedStyle(next).top}`,
                scrub: true,
                invalidateOnRefresh: true,
              },
              defaults: { ease: 'none' },
            })
            .to(card, { scale: 1 - depth * 0.025, transformOrigin: '50% 0%' }, 0)
            .to(card.querySelector(`.${styles['soft__shade']}`), { opacity: 0.55 }, 0);
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={styles['soft']}>
      <div className={styles['soft__intro']}>
        <h3 className={styles['soft__title']}>{t('skills.soft-title')}</h3>
        <RevealText text={t('skills.soft-description')} className={styles['soft__description']} />
      </div>

      <ol className={styles['soft__list']}>
        {config.items.map((item, index) => (
          <li
            key={item.title}
            className={styles['soft__card']}
            style={{ '--i': index } as CSSProperties}
          >
            <div className={styles['soft__card-head']}>
              <span className={styles['soft__number']}>{String(index + 1).padStart(2, '0')}</span>
              <h4 className={styles['soft__card-title']}>{t(item.title)}</h4>
            </div>
            <ul className={styles['soft__points']}>
              {item.points.map((point) => (
                <li key={point} className={styles['soft__point']}>
                  {t(point)}
                </li>
              ))}
            </ul>
            <span className={styles['soft__shade']} aria-hidden="true" />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Soft;
