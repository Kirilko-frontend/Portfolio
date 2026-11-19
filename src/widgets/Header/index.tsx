import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import config from './config';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useLanguage } from '@shared/hooks/useLanguage';
import { useIntroDone } from '@shared/context/IntroContext';
import { socials } from '@shared/config/socials';
import { gsap, ScrollTrigger, useGSAP } from '@shared/lib/gsap';
import { lockScroll, unlockScroll } from '@shared/lib/lenis';
import { scrollTo } from '@shared/utils/scrollTo';
import Magnetic from '@shared/ui/Magnetic';
import PillButton from '@shared/ui/PillButton';

import { IconArrow1, Logo } from '@shared/icons';

import styles from './styles.module.scss';

const Header = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const isIntroDone = useIntroDone();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);
  const isMenuOpenRef = useRef(false);

  // Прячем хедер при скролле вниз, показываем при скролле вверх + подсветка активной секции
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      const toggle = gsap
        .to(header, { yPercent: -110, duration: 0.5, ease: 'power3.inOut', paused: true })
        .reverse();

      // Активная секция — та, что пересекает середину экрана.
      // Производительность: границы секций считаются только при refresh (загрузка/ресайз),
      // а на скролле сравниваются числа — без getBoundingClientRect на каждом кадре.
      let ranges: { href: string; top: number; bottom: number }[] = [];
      let current = '';

      const measureSections = () => {
        ranges = config.navItems.flatMap((item) => {
          const rect = document.querySelector(item.href)?.getBoundingClientRect();
          if (!rect) return [];
          return [
            {
              href: item.href,
              top: rect.top + window.scrollY,
              bottom: rect.bottom + window.scrollY,
            },
          ];
        });
      };

      const updateActiveSection = (scroll: number) => {
        const middle = scroll + window.innerHeight / 2;
        const next =
          ranges.find((range) => range.top <= middle && range.bottom >= middle)?.href ?? '';
        if (next === current) return;
        current = next;
        setActiveSection(next);
      };

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        refreshPriority: -1,
        onRefresh: (self) => {
          measureSections();
          updateActiveSection(self.scroll());
        },
        onUpdate: (self) => {
          updateActiveSection(self.scroll());
          header.classList.toggle(styles['header--scrolled'], self.scroll() > 40);
          if (isMenuOpenRef.current) return;

          const shouldHide = self.direction === 1 && self.scroll() > 300;
          toggle.reversed(!shouldHide);
        },
      });
    },
    { scope: rootRef }
  );

  // Появление хедера после прелоадера
  useGSAP(
    () => {
      if (!isIntroDone) return;

      gsap.from(`.${styles['header__inner']} > *`, {
        yPercent: -150,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        delay: 0.3,
      });
    },
    { scope: rootRef, dependencies: [isIntroDone] }
  );

  // Полноэкранное мобильное меню: раскрывается кругом из угла с бургером
  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;

      menuTimeline.current = gsap
        .timeline({ paused: true })
        .set(menu, { visibility: 'visible' })
        .fromTo(
          menu,
          { clipPath: 'circle(0% at calc(100% - 2.75rem) 2.5rem)' },
          {
            clipPath: 'circle(150% at calc(100% - 2.75rem) 2.5rem)',
            duration: 0.9,
            ease: 'expo.inOut',
          }
        )
        .from(
          `.${styles['menu__link-text']}`,
          { yPercent: 120, rotate: 4, duration: 0.8, stagger: 0.06, ease: 'expo.out' },
          '-=0.45'
        )
        .from(
          `.${styles['menu__footer']} > *`,
          { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
          '-=0.6'
        );
    },
    { scope: rootRef }
  );

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
    const tl = menuTimeline.current;
    if (!tl) return;

    if (isMenuOpen) {
      lockScroll();
      tl.timeScale(1).play();
    } else if (tl.progress() > 0) {
      unlockScroll();
      tl.timeScale(1.6).reverse();
    }
  }, [isMenuOpen]);

  // Закрываем меню при переходе на десктоп
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const handleChange = () => media.matches && setIsMenuOpen(false);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const handleNavigate = (e: MouseEvent, href: string) => {
    e.preventDefault();

    if (isMenuOpen) {
      setIsMenuOpen(false);
      gsap.delayedCall(0.55, () => scrollTo(href));
      return;
    }

    scrollTo(href);
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
    scrollTo(0);
  };

  const languageSwitcher = (className?: string) => (
    <LanguageSwitcher
      languages={config.languages}
      activeLanguage={language}
      onSelect={changeLanguage}
      className={className}
    />
  );

  return (
    <div ref={rootRef}>
      <header
        ref={headerRef}
        className={`${styles['header']} ${isMenuOpen ? styles['header--menu-open'] : ''}`}
      >
        <div className={`${styles['header__inner']} container`}>
          {/* LOGO */}
          <a
            href="/"
            className={styles['header__logo-link']}
            onClick={handleLogoClick}
            aria-label="Go to top"
          >
            <Logo className={styles['header__logo']} />
            <span className={styles['header__logo-text']}>
              Kyrylo
              <br />
              Kakulia
            </span>
          </a>

          {/* DESKTOP NAV */}
          <nav className={styles['header__nav']} aria-label="Main">
            <ul className={styles['header__nav-list']}>
              {config.navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`${styles['header__nav-link']} ${activeSection === item.href ? styles['header__nav-link--active'] : ''}`}
                    onClick={(e) => handleNavigate(e, item.href)}
                  >
                    <span className={styles['roll']} data-text={t(item.name)}>
                      <span>{t(item.name)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className={styles['header__actions']}>
            {languageSwitcher()}
            <Magnetic>
              <PillButton
                href="#contact"
                onClick={(e) => handleNavigate(e, '#contact')}
                icon={<IconArrow1 />}
              >
                {t('header.cta')}
              </PillButton>
            </Magnetic>
          </div>

          {/* BURGER */}
          <button
            type="button"
            className={styles['header__burger']}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? t('header.close') : t('header.menu')}
          >
            <span className={styles['header__burger-label']}>
              {isMenuOpen ? t('header.close') : t('header.menu')}
            </span>
            <span className={styles['header__burger-lines']} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU — вне <header>, потому что у хедера есть transform */}
      <div ref={menuRef} id="mobile-menu" className={styles['menu']} aria-hidden={!isMenuOpen}>
        <nav className={styles['menu__nav']} aria-label="Mobile">
          <ul className={styles['menu__list']}>
            {config.navItems.map((item, index) => (
              <li key={item.id} className={styles['menu__item']}>
                <a
                  href={item.href}
                  className={styles['menu__link']}
                  onClick={(e) => handleNavigate(e, item.href)}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <span className={styles['menu__link-text']}>
                    <sup>{String(index + 1).padStart(2, '0')}</sup>
                    {t(item.name)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles['menu__footer']}>
          <div className={styles['menu__group']}>
            <p className={styles['menu__caption']}>{t('header.language')}</p>
            {languageSwitcher()}
          </div>
          <div className={styles['menu__group']}>
            <p className={styles['menu__caption']}>{t('header.socials')}</p>
            <ul className={styles['menu__socials']}>
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['menu__social']}
                    aria-label={social.title}
                    tabIndex={isMenuOpen ? 0 : -1}
                  >
                    <social.icon className={styles['menu__social-icon']} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
