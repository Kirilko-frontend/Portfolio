import { useEffect, useState, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import config from './config';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useLanguage } from '@shared/hooks/useLanguage';
import { scrollTo } from '@shared/utils/scrollTo';

import { IconBurgeMenu1, IconCross1, Logo } from '@shared/icons';

import styles from './styles.module.scss';

const Header = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  const [activeLanguage, setActiveLanguage] = useState(language);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClickButton = (lang: string) => {
    setActiveLanguage(lang);
    changeLanguage(lang);
  };

  const closeMenu = () => setIsOpenMenu(false);

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`${styles['header']} ${isScrolled ? styles['header--scrolled'] : ''} section bottom-divider`}
    >
      <div className={`${styles['header__container']} container`}>
        {/* LOGO */}
        <a href="/" className={styles['header__logo-link']} onClick={handleLogoClick} aria-label="Go to top">
          <Logo className={styles['header__logo']} />
        </a>
        <div className={styles['header__logo-glow']} />

        {/* BURGER */}
        <button className={styles['header__burger']} onClick={() => setIsOpenMenu((prev) => !prev)}>
          {isOpenMenu ? (
            <IconCross1 className={styles['header__burger-icon']} />
          ) : (
            <IconBurgeMenu1 className={styles['header__burger-icon']} />
          )}
        </button>

        {/* OVERLAY */}
        {isOpenMenu && <div className={styles['header__overlay']} onClick={closeMenu} />}

        {/* NAV DRAWER */}
        <nav
          className={`${styles['header__nav']} ${isOpenMenu ? styles['header__nav--open'] : ''}`}
        >
          <ul className={styles['header__nav-list']}>
            {config.navItems.map((item) => (
              <li key={item.id} className={styles['header__nav-item']}>
                <a
                  href={item.href}
                  className={styles['header__nav-link']}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                    closeMenu();
                  }}
                >
                  {t(item.name)}
                </a>
              </li>
            ))}
          </ul>

          {/* language inside mobile menu */}
          <div className={styles['header__language-mobile']}>
            <LanguageSwitcher
              languages={config.languages}
              activeLanguage={activeLanguage}
              onSelect={handleClickButton}
            />
          </div>
        </nav>

        {/* DESKTOP LANGUAGE */}
        <div className={styles['header__language-desktop']}>
          <LanguageSwitcher
            languages={config.languages}
            activeLanguage={activeLanguage}
            onSelect={handleClickButton}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
