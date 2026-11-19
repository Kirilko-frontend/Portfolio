import { useRef, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { useIntroDone } from '@shared/context/IntroContext';
import { gsap, MEDIA, ScrollTrigger, SplitText, useGSAP } from '@shared/lib/gsap';
import { scrollTo } from '@shared/utils/scrollTo';
import Magnetic from '@shared/ui/Magnetic';
import PillButton from '@shared/ui/PillButton';

import { IconArrow1 } from '@shared/icons';

import avatar from '/avatar/avatar.png';

import styles from './styles.module.scss';

const Hero = () => {
  const { t } = useTranslation();
  const isIntroDone = useIntroDone();

  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  // Входная анимация после прелоадера
  useGSAP(
    () => {
      if (!isIntroDone || !titleRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA.reduce, () => {
        gsap.set(`.${styles['hero__content']}`, { autoAlpha: 1 });
      });

      mm.add(MEDIA.motion, () => {
        const split = SplitText.create(`.${styles['hero__word--split']}`, {
          type: 'chars',
          mask: 'chars',
        });

        gsap.set(`.${styles['hero__content']}`, { autoAlpha: 1 });

        gsap
          // Маски SplitText слегка подрезают буквы из-за отрицательного трекинга —
          // после анимации возвращаем исходный текст
          .timeline({ defaults: { ease: 'expo.out' }, onComplete: () => split.revert() })
          .from(split.chars, {
            yPercent: 115,
            rotate: 8,
            duration: 1.4,
            stagger: 0.035,
          })
          .fromTo(
            `.${styles['hero__word--accent']}`,
            { yPercent: 105, clipPath: 'inset(0% 100% 0% 0%)' },
            { yPercent: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' },
            0.15
          )
          .from(
            `.${styles['hero__avatar']}`,
            { scale: 0, rotate: -25, duration: 1.2, ease: 'back.out(1.6)' },
            0.45
          )
          .from(
            `.${styles['hero__meta']} > *`,
            { yPercent: 100, autoAlpha: 0, duration: 1, stagger: 0.08 },
            0.3
          )
          .from(
            `.${styles['hero__bottom']} > *`,
            { y: 40, autoAlpha: 0, duration: 1.2, stagger: 0.1 },
            0.6
          )
          .from(orbRef.current, { scale: 0.4, autoAlpha: 0, duration: 2.4, ease: 'power2.out' }, 0);

        return () => split.revert();
      });
    },
    { scope: rootRef, dependencies: [isIntroDone] }
  );

  // Сцена при скролле: Hero закрепляется, уменьшается и уходит «в глубину»,
  // а следующая секция наезжает поверх него
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        ScrollTrigger.create({
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
            defaults: { ease: 'none' },
          })
          .to(`.${styles['hero__inner']}`, { scale: 0.9, yPercent: -6 }, 0)
          .to(`.${styles['hero__dim']}`, { opacity: 0.85 }, 0)
          .to(orbRef.current, { yPercent: 30 }, 0);
      });

      // Орб слегка следует за мышью
      mm.add(`${MEDIA.motion} and (hover: hover) and (pointer: fine)`, () => {
        const xTo = gsap.quickTo(orbRef.current, 'x', { duration: 2, ease: 'power3.out' });
        const yTo = gsap.quickTo(orbRef.current, 'y', { duration: 2, ease: 'power3.out' });

        const handleMove = (e: globalThis.MouseEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * 160);
          yTo((e.clientY / window.innerHeight - 0.5) * 120);
        };

        window.addEventListener('mousemove', handleMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMove);
      });
    },
    { scope: rootRef }
  );

  const handleNavigate = (e: MouseEvent, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <section ref={rootRef} id="hero" className={styles['hero']}>
      <div className={styles['hero__bg']} aria-hidden="true">
        <div ref={orbRef} className={styles['hero__orb']} />
        <div className={styles['hero__grid']} />
      </div>

      <div className={`${styles['hero__inner']} container`}>
        <div className={styles['hero__content']}>
          <div className={styles['hero__meta']}>
            <p className={styles['hero__status']}>
              <span className={styles['hero__status-dot']} aria-hidden="true" />
              {t('hero.status')}
            </p>
            <p className={styles['hero__location']}>{t('hero.location')}</p>
          </div>

          <h1 ref={titleRef} className={styles['hero__title']}>
            <span className={styles['hero__line']}>
              <span className={`${styles['hero__word']} ${styles['hero__word--split']}`}>
                Frontend
              </span>
            </span>
            <span className={styles['hero__line']}>
              <span className={styles['hero__avatar']} aria-hidden="true">
                <img src={avatar} alt="" />
              </span>
              <span className={styles['hero__mask']}>
                <span className={`${styles['hero__word']} ${styles['hero__word--accent']}`}>
                  Developer
                </span>
              </span>
            </span>
          </h1>

          <div className={styles['hero__bottom']}>
            <p className={styles['hero__description']}>{t('hero.description')}</p>

            <div className={styles['hero__actions']}>
              <Magnetic>
                <PillButton
                  href="#portfolio"
                  size="lg"
                  icon={<IconArrow1 />}
                  onClick={(e) => handleNavigate(e, '#portfolio')}
                >
                  {t('hero.cta-projects')}
                </PillButton>
              </Magnetic>
              <Magnetic>
                <PillButton
                  href="#contact"
                  size="lg"
                  variant="ghost"
                  onClick={(e) => handleNavigate(e, '#contact')}
                >
                  {t('hero.cta-contact')}
                </PillButton>
              </Magnetic>
            </div>

            <a
              href="#about"
              className={styles['hero__scroll']}
              onClick={(e) => handleNavigate(e, '#about')}
            >
              <span>{t('hero.scroll')}</span>
              <span className={styles['hero__scroll-line']} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className={styles['hero__dim']} aria-hidden="true" />
    </section>
  );
};

export default Hero;
