import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { gsap, MEDIA, useGSAP } from '@shared/lib/gsap';
import RevealText from '@shared/ui/RevealText';
import SectionHeading from '@shared/ui/SectionHeading';

import Card from './components/Card';

import styles from './styles.module.scss';

const stats = [
  { value: 100, suffix: '+', label: 'about.stat-sites' },
  { value: 30, suffix: '+', label: 'about.stat-tech' },
  { value: 4, suffix: '', label: 'about.stat-languages' },
];

const About = () => {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        // Счётчики «набегают» от нуля
        gsap.utils.toArray<HTMLElement>(`.${styles['about__stat-number']}`).forEach((el) => {
          const target = Number(el.dataset.value);
          const counter = { value: 0 };

          gsap.to(counter, {
            value: target,
            duration: 2,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(counter.value));
            },
          });
        });

        gsap.from(`.${styles['about__stat']}`, {
          y: 40,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: { trigger: `.${styles['about__stats']}`, start: 'top 90%', once: true },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="about" className={`${styles['about']} section`}>
      <div className="container">
        <SectionHeading index="01" label={t('about.eyebrow')} title={t('about.heading')} />

        <div className={styles['about__grid']}>
          <div className={styles['about__card-col']}>
            <Card className={styles['about__card']} />
          </div>

          <div className={styles['about__text-col']}>
            <RevealText
              variant="scrub"
              text={t('about.manifesto')}
              className={styles['about__manifesto']}
            />

            <div className={styles['about__bio']}>
              <RevealText text={t('about.title2')} />
              <RevealText text={t('about.title3')} delay={0.1} />
            </div>

            <ul className={styles['about__stats']}>
              {stats.map((stat) => (
                <li key={stat.label} className={styles['about__stat']}>
                  <p className={styles['about__stat-value']}>
                    <span className={styles['about__stat-number']} data-value={stat.value}>
                      {stat.value}
                    </span>
                    <span className={styles['about__stat-suffix']}>{stat.suffix}</span>
                  </p>
                  <p className={styles['about__stat-label']}>{t(stat.label)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
