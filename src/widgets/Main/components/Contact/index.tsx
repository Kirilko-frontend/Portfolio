import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EMAIL, socials } from '@shared/config/socials';
import { gsap, MEDIA, ScrollTrigger, useGSAP } from '@shared/lib/gsap';
import Magnetic from '@shared/ui/Magnetic';
import RevealText from '@shared/ui/RevealText';

import config from './config';
import Terminal from './components/Terminal';

import styles from './styles.module.scss';

const emailLink = socials.find((social) => social.id === 'email')?.href ?? `mailto:${EMAIL}`;
const socialButtons = socials.filter((social) => social.id !== 'email');

const Contact = () => {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);

  const [isTerminalStarted, setIsTerminalStarted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useGSAP(
    () => {
      // Терминал начинает печатать, когда попадает в экран
      ScrollTrigger.create({
        trigger: `.${styles['contact__terminal']}`,
        start: 'top 85%',
        once: true,
        onEnter: () => setIsTerminalStarted(true),
      });

      const mm = gsap.matchMedia();

      mm.add(MEDIA.reduce, () => setIsTerminalStarted(true));

      // Две строки заголовка «съезжаются» с разных сторон по мере скролла
      mm.add(MEDIA.motion, () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: `.${styles['contact__title']}`,
              start: 'top bottom',
              end: 'center 55%',
              scrub: 1,
            },
            defaults: { ease: 'none' },
          })
          .fromTo(
            `.${styles['contact__title-line']}:first-child`,
            { xPercent: -25 },
            { xPercent: 0 },
            0
          )
          .fromTo(
            `.${styles['contact__title-line']}:last-child`,
            { xPercent: 25 },
            { xPercent: 0 },
            0
          )
          .fromTo(
            `.${styles['contact__title']}`,
            { scale: 0.85, opacity: 0.2 },
            { scale: 1, opacity: 1 },
            0
          );

        gsap.from(`.${styles['contact__info']} > *`, {
          y: 40,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: `.${styles['contact__grid']}`, start: 'top 80%', once: true },
        });

        gsap.from(`.${styles['contact__terminal']}`, {
          y: 80,
          rotateX: 20,
          autoAlpha: 0,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: `.${styles['contact__grid']}`, start: 'top 80%', once: true },
        });
      });
    },
    { scope: rootRef }
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section ref={rootRef} id="contact" className={`${styles['contact']} section`}>
      <div className="container">
        <p className={styles['contact__eyebrow']}>
          <span>(05)</span> {t('contact.eyebrow')}
        </p>

        <h2 className={styles['contact__title']}>
          <span className={styles['contact__title-line']}>{t('contact.heading-1')}</span>
          <span
            className={`${styles['contact__title-line']} ${styles['contact__title-line--accent']}`}
          >
            {t('contact.heading-2')}
          </span>
        </h2>

        <div className={styles['contact__grid']}>
          <div className={styles['contact__info']}>
            <RevealText
              text={t('contact.description')}
              className={styles['contact__description']}
            />

            <div className={styles['contact__email-block']}>
              <p className={styles['contact__label']}>{t('contact.email-label')}</p>
              <div className={styles['contact__email-row']}>
                <a
                  href={emailLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['contact__email']}
                >
                  {EMAIL}
                </a>
                <button type="button" className={styles['contact__copy']} onClick={handleCopy}>
                  {isCopied ? t('contact.copied') : t('contact.copy')}
                </button>
              </div>
            </div>

            <ul className={styles['contact__socials']}>
              {socialButtons.map((social) => (
                <li key={social.id}>
                  <Magnetic strength={0.4}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles['contact__social']}
                    >
                      <social.icon className={styles['contact__social-icon']} />
                      {social.title}
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles['contact__terminal']}>
            <Terminal lines={config.lines} methods={config.methods} start={isTerminalStarted} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
