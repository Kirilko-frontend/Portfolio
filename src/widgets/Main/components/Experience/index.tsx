import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { gsap, MEDIA, ScrollTrigger, useGSAP } from '@shared/lib/gsap';
import SectionHeading from '@shared/ui/SectionHeading';

import config from './config';
import Block from './components/Block';

import styles from './styles.module.scss';

const Experience = () => {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        // Линия таймлайна заполняется синхронно со скроллом
        gsap.fromTo(
          `.${styles['experience__line-fill']}`,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 55%',
              end: 'bottom 55%',
              scrub: true,
            },
          }
        );

        gsap.utils.toArray<HTMLElement>('[data-timeline-item]').forEach((item) => {
          const node = item.querySelector('[data-timeline-node]');
          const card = item.querySelector('[data-timeline-card]');
          const points = item.querySelectorAll('[data-timeline-point]');

          // Точка загорается, когда до неё доходит линия
          ScrollTrigger.create({
            trigger: item,
            start: 'top 55%',
            onEnter: () => node?.classList.add('is-active'),
            onLeaveBack: () => node?.classList.remove('is-active'),
          });

          gsap
            .timeline({ scrollTrigger: { trigger: item, start: 'top 80%', once: true } })
            .from(card, { x: 60, autoAlpha: 0, duration: 1.2, ease: 'expo.out' })
            .from(
              points,
              { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' },
              0.3
            );
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="experience" className={`${styles['experience']} section`}>
      <div className="container">
        <SectionHeading
          index="04"
          label={t('experience.eyebrow')}
          title={t('experience.heading')}
        />

        <div className={styles['experience__timeline']}>
          <span className={styles['experience__line']} aria-hidden="true">
            <span className={styles['experience__line-fill']} />
          </span>

          <ol ref={listRef} className={styles['experience__list']}>
            {config.experienceBlocks.map((item, index) => (
              <Block
                key={item.id}
                index={index}
                role={item.role}
                company={item.company}
                period={item.period}
                stack={item.stack}
                description={item.description}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
