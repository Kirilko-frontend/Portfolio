import { useRef, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { gsap, MEDIA, useGSAP } from '@shared/lib/gsap';

import config from './config';

import styles from './styles.module.scss';

const Hard = () => {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        gsap.utils.toArray<HTMLElement>(`.${styles['hard__card']}`).forEach((card) => {
          gsap
            .timeline({ scrollTrigger: { trigger: card, start: 'top 88%', once: true } })
            .from(card, { y: 60, autoAlpha: 0, duration: 1.2, ease: 'expo.out' })
            .from(
              card.querySelectorAll(`.${styles['hard__chip']}`),
              {
                y: 16,
                scale: 0.85,
                autoAlpha: 0,
                duration: 0.6,
                stagger: 0.025,
                ease: 'back.out(2)',
              },
              0.25
            );
        });
      });
    },
    { scope: rootRef }
  );

  // «Прожектор»: подсветка карточки следует за курсором
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const cards = rootRef.current?.querySelectorAll<HTMLElement>(`.${styles['hard__card']}`);
    cards?.forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
    });
  };

  return (
    <div ref={rootRef} className={styles['hard']} onMouseMove={handleMouseMove}>
      {config.skills.map((skill, index) => {
        const total = skill.groups.reduce((sum, group) => sum + group.items.length, 0);

        return (
          <article
            key={skill.id}
            className={[
              styles['hard__card'],
              index === 0 ? styles['hard__card--wide'] : '',
              index === config.skills.length - 1 ? styles['hard__card--full'] : '',
            ].join(' ')}
          >
            <header className={styles['hard__header']}>
              <span className={styles['hard__index']}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles['hard__title']}>{skill.title}</h3>
              <span className={styles['hard__count']}>
                {total} {t('skills.items')}
              </span>
            </header>

            <div className={styles['hard__groups']}>
              {skill.groups.map((group) => (
                <div key={group.title} className={styles['hard__group']}>
                  <p className={styles['hard__group-title']}>{group.title}</p>
                  <ul className={styles['hard__chips']}>
                    {group.items.map((item) => (
                      <li key={item.name} className={styles['hard__chip']}>
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Hard;
