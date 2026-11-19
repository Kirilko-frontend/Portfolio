import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { gsap, MEDIA, useGSAP } from '@shared/lib/gsap';
import Magnetic from '@shared/ui/Magnetic';
import PillButton from '@shared/ui/PillButton';
import SectionHeading from '@shared/ui/SectionHeading';

import { IconArrow1 } from '@shared/icons';

import config from './config';
import Project from './components/Project';
import VideoModal from './components/VideoModal';

import styles from './styles.module.scss';

const Portfolio = () => {
  const { t } = useTranslation();

  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null);
  const closeModal = useCallback(() => setActiveVideo(null), []);

  const total = config.projects.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Десктоп: секция закрепляется, проекты едут горизонтально
      mm.add(`${MEDIA.desktop} and ${MEDIA.motion}`, () => {
        const track = trackRef.current;
        if (!track) return;

        const cards = gsap.utils.toArray<HTMLElement>('[data-project]');
        const fill = rootRef.current?.querySelector<HTMLElement>(
          `.${styles['portfolio__progress-fill']}`
        );
        const setFill = fill ? gsap.quickSetter(fill, 'scaleX') : null;

        let distance = 0;
        // Центры карточек внутри ленты — считаются один раз на refresh,
        // а не через getBoundingClientRect на каждом кадре
        let centers: number[] = [];
        let currentIndex = -1;

        const measure = () => {
          distance = track.scrollWidth - window.innerWidth;
          centers = cards.map((card) => card.offsetLeft + card.offsetWidth / 2);
        };
        measure();

        // Счётчик (проект ближе всего к центру экрана) и полоса прогресса —
        // в onUpdate одной анимации, DOM трогаем только когда номер меняется
        const update = (progress: number) => {
          setFill?.(progress);

          const center = progress * distance + window.innerWidth / 2;
          let closest = 0;
          centers.forEach((c, i) => {
            if (Math.abs(c - center) < Math.abs(centers[closest] - center)) closest = i;
          });

          if (closest !== currentIndex && counterRef.current) {
            currentIndex = closest;
            counterRef.current.textContent = String(closest + 1).padStart(2, '0');
          }
        };

        // scrub: true — Lenis уже сглаживает скролл, второе сглаживание давало ощутимую задержку
        const horizontal = gsap.to(track, {
          x: () => -distance,
          ease: 'none',
          onUpdate() {
            update(this.progress());
          },
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: () => `+=${distance}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefreshInit: measure,
          },
        });

        // Параллакс видео внутри карточек + лёгкое «приближение» карточки к центру.
        // Двигаем обёртку, а не сам <video>, чтобы не конфликтовать с CSS-hover
        cards.forEach((card) => {
          const parallax = card.querySelector('[data-parallax]');

          gsap.fromTo(
            parallax,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontal,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );

          gsap.fromTo(
            card,
            { scale: 0.92 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontal,
                start: 'left right',
                end: 'center center',
                scrub: true,
              },
            }
          );
        });
      });

      // Мобилка/планшет: видео «раскрывается» маской при появлении
      mm.add(`${MEDIA.mobile} and ${MEDIA.motion}`, () => {
        gsap.utils.toArray<HTMLElement>('[data-project]').forEach((card) => {
          gsap
            .timeline({ scrollTrigger: { trigger: card, start: 'top 85%', once: true } })
            .from(card, { y: 60, autoAlpha: 0, duration: 1, ease: 'expo.out' })
            .from(
              card.querySelector('[data-parallax]'),
              { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.2, duration: 1.4, ease: 'expo.inOut' },
              0
            );
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="portfolio" className={styles['portfolio']}>
      <div ref={pinRef} className={styles['portfolio__pin']}>
        <div className={`${styles['portfolio__head']} container`}>
          <SectionHeading
            index="03"
            label={t('portfolio.eyebrow')}
            title={t('portfolio.heading')}
            className={styles['portfolio__heading']}
          />
          <p className={styles['portfolio__counter']} aria-hidden="true">
            <span ref={counterRef}>01</span>
            <span className={styles['portfolio__counter-total']}>
              /{String(total).padStart(2, '0')}
            </span>
          </p>
        </div>

        <div ref={trackRef} className={styles['portfolio__track']}>
          {config.projects.map((project, index) => (
            <Project
              key={project.id}
              index={index}
              total={total}
              title={project.title}
              date={project.date}
              description={t(`portfolio.project${project.id}-description`)}
              linkGithub={project.linkGithub}
              linkDemo={project.linkDemo}
              preview={project.preview}
              poster={project.poster}
              onOpen={() => setActiveVideo({ src: project.preview, title: project.title })}
            />
          ))}

          <div className={styles['portfolio__more']}>
            <p className={styles['portfolio__more-title']}>{t('portfolio.more-title')}</p>
            <p className={styles['portfolio__more-text']}>{t('portfolio.more-text')}</p>
            <Magnetic>
              <PillButton href={config.githubProfile} external size="lg" icon={<IconArrow1 />}>
                {t('portfolio.more-cta')}
              </PillButton>
            </Magnetic>
          </div>
        </div>

        <div className={`${styles['portfolio__progress']} container`} aria-hidden="true">
          <span className={styles['portfolio__progress-bar']}>
            <span className={styles['portfolio__progress-fill']} />
          </span>
        </div>
      </div>

      <VideoModal
        src={activeVideo?.src ?? null}
        title={activeVideo?.title ?? ''}
        onClose={closeModal}
      />
    </section>
  );
};

export default Portfolio;
