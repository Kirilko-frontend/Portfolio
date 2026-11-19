import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { socials } from '@shared/config/socials';
import { gsap, MEDIA, useGSAP } from '@shared/lib/gsap';

import { IconVerified1 } from '@shared/icons';

import config from './config';

import styles from './styles.module.scss';

interface IProps {
  className?: string;
}

const splitRow = (row: string) => {
  const index = row.indexOf(':');
  if (index === -1) return { label: '', value: row };
  return { label: row.slice(0, index).trim(), value: row.slice(index + 1).trim() };
};

/**
 * Карточка разработчика в виде бейджа-пропуска.
 * Наклоняется за курсором (3D tilt + блик), переворачивается по клику.
 */
const Card = ({ className = '' }: IProps) => {
  const { t } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Появление карточки при скролле
      mm.add(MEDIA.motion, () => {
        gsap.from(tiltRef.current, {
          yPercent: 15,
          rotateX: 25,
          rotateZ: -6,
          scale: 0.9,
          autoAlpha: 0,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 85%', once: true },
        });
      });

      // 3D-наклон за курсором
      mm.add(`${MEDIA.motion} and (hover: hover) and (pointer: fine)`, () => {
        const root = rootRef.current;
        const tilt = tiltRef.current;
        if (!root || !tilt) return;

        const rotateX = gsap.quickTo(tilt, 'rotationX', { duration: 0.6, ease: 'power3.out' });
        const rotateY = gsap.quickTo(tilt, 'rotationY', { duration: 0.6, ease: 'power3.out' });

        const handleMove = (e: MouseEvent) => {
          const rect = root.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;

          rotateY((x - 0.5) * 16);
          rotateX((0.5 - y) * 16);
          tilt.style.setProperty('--glare-x', `${x * 100}%`);
          tilt.style.setProperty('--glare-y', `${y * 100}%`);
        };

        const handleLeave = () => {
          rotateX(0);
          rotateY(0);
        };

        root.addEventListener('mousemove', handleMove);
        root.addEventListener('mouseleave', handleLeave);

        return () => {
          root.removeEventListener('mousemove', handleMove);
          root.removeEventListener('mouseleave', handleLeave);
        };
      });
    },
    { scope: rootRef }
  );

  const toggleFlip = () => setIsFlipped((prev) => !prev);

  return (
    <div ref={rootRef} className={`${styles['card']} ${className}`}>
      <div ref={tiltRef} className={styles['card__tilt']}>
        <div
          className={`${styles['card__inner']} ${isFlipped ? styles['card__inner--flipped'] : ''}`}
        >
          {/* FRONT */}
          <article
            className={`${styles['card__face']} ${styles['card__front']}`}
            aria-hidden={isFlipped}
          >
            <header className={styles['card__top']}>
              <span className={styles['card__chip']}>{t('about.card-id')} · #0216</span>
              <IconVerified1 className={styles['card__verified']} />
            </header>

            <div className={styles['card__profile']}>
              <div className={styles['card__avatar']}>
                <img src={config.avatar} alt={t('about.card-name')} loading="lazy" />
              </div>
              <div>
                <h3 className={styles['card__name']}>{t('about.card-name')}</h3>
                <p className={styles['card__role']}>{t('about.card-role')}</p>
              </div>
            </div>

            <dl className={styles['card__rows']}>
              {config.cardItems.map((key) => {
                const { label, value } = splitRow(t(key));
                return (
                  <div key={key} className={styles['card__row']}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                );
              })}
            </dl>

            <footer className={styles['card__bottom']}>
              <span className={styles['card__barcode']} aria-hidden="true" />
              <button
                type="button"
                className={styles['card__flip']}
                onClick={toggleFlip}
                tabIndex={isFlipped ? -1 : 0}
              >
                {t('about.card-button')} ↻
              </button>
            </footer>

            <span className={styles['card__glare']} aria-hidden="true" />
          </article>

          {/* BACK */}
          <article
            className={`${styles['card__face']} ${styles['card__back']}`}
            aria-hidden={!isFlipped}
          >
            <header className={styles['card__top']}>
              <span className={styles['card__chip']}>{t('about.card-back-title')}</span>
            </header>

            <img src={config.monkeyGif} alt="" className={styles['card__monkey']} loading="lazy" />

            <div>
              <p className={styles['card__back-text']}>{t('about.card-back-text')}</p>
              <ul className={styles['card__socials']}>
                {socials.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles['card__social']}
                      tabIndex={isFlipped ? 0 : -1}
                    >
                      <social.icon className={styles['card__social-icon']} />
                      <span>{social.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <footer className={styles['card__bottom']}>
              <span className={styles['card__barcode']} aria-hidden="true" />
              <button
                type="button"
                className={styles['card__flip']}
                onClick={toggleFlip}
                tabIndex={isFlipped ? 0 : -1}
              >
                {t('about.card-button')} ↻
              </button>
            </footer>

            <span className={styles['card__glare']} aria-hidden="true" />
          </article>
        </div>
      </div>
    </div>
  );
};

export default Card;
