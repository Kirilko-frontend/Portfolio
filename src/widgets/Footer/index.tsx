import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { socials } from '@shared/config/socials';
import { gsap, MEDIA, useGSAP } from '@shared/lib/gsap';
import { scrollTo } from '@shared/utils/scrollTo';
import Magnetic from '@shared/ui/Magnetic';

import { IconArrow1 } from '@shared/icons';

import headerConfig from '@widgets/Header/config';

import styles from './styles.module.scss';

const TIME_ZONE = 'Europe/Warsaw';

const formatTime = () =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TIME_ZONE,
  }).format(new Date());

const Footer = () => {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState(formatTime);

  // Живые часы (часовой пояс Польши)
  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime()), 15_000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Огромное имя «выезжает» снизу, пока футер появляется
      mm.add(MEDIA.motion, () => {
        gsap.fromTo(
          `.${styles['footer__name']} span`,
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: 'none',
            stagger: 0.04,
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );
      });
    },
    { scope: rootRef }
  );

  const handleNavigate = (e: MouseEvent, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  const handleBackToTop = () => scrollTo(0);

  return (
    <footer ref={rootRef} className={styles['footer']}>
      <div className={`${styles['footer__inner']} container`}>
        <div className={styles['footer__top']}>
          <nav className={styles['footer__col']} aria-label={t('footer.nav')}>
            <p className={styles['footer__caption']}>{t('footer.nav')}</p>
            <ul className={styles['footer__links']}>
              {headerConfig.navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={styles['footer__link']}
                    onClick={(e) => handleNavigate(e, item.href)}
                  >
                    {t(item.name)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles['footer__col']}>
            <p className={styles['footer__caption']}>{t('header.socials')}</p>
            <ul className={styles['footer__links']}>
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['footer__link']}
                  >
                    {social.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles['footer__col']}>
            <p className={styles['footer__caption']}>{t('footer.local-time')}</p>
            <p className={styles['footer__time']}>
              {time} <span>Warsaw, Poland</span>
            </p>
          </div>

          <Magnetic className={styles['footer__top-button-wrap']}>
            <button
              type="button"
              className={styles['footer__top-button']}
              onClick={handleBackToTop}
              aria-label={t('footer.back-to-top')}
            >
              <IconArrow1 className={styles['footer__top-icon']} />
              <span>{t('footer.back-to-top')}</span>
            </button>
          </Magnetic>
        </div>

        <p className={styles['footer__name']} aria-hidden="true">
          {'Kakulia'.split('').map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </p>

        <div className={styles['footer__bottom']}>
          <p>
            © {new Date().getFullYear()} Kyrylo Kakulia. {t('footer.rights')}
          </p>
          <p>{t('footer.made')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
