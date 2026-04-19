import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import config from './config';
import { useLanguage } from '../../hooks/useLanguage';
import { scrollTo } from '../../utils/scrollTo';

import { IconBurgeMenu1, IconCross1, Logo } from '@icons';
import Button from '../../ui/Button';

import styles from './styles.module.scss';

const Header = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  const [activeLanguage, setActiveLanguage] = useState(language);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClickButton = (lang: string) => {
    setActiveLanguage(lang);
    changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const closeMenu = () => setIsOpenMenu(false);

  return (
    <header className={`${styles['header']} section bottom-divider`}>
      <div className={`${styles['header__container']} container`}>
        {/* LOGO */}
        <div className={styles['header__logo-wrapper']}>
          <a href="/">
            <Logo className={styles['header__logo']} />
          </a>
          <div className={styles['header__logo-glow']} />
        </div>

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
          <div className={styles['header__language-switcher']}>
            <Button
              onClick={() => handleClickButton('ru')}
              size="small"
              active={activeLanguage === 'ru'}
            >
              RU
            </Button>
            <Button
              onClick={() => handleClickButton('en')}
              size="small"
              active={activeLanguage === 'en'}
            >
              EN
            </Button>
            <Button
              onClick={() => handleClickButton('ua')}
              size="small"
              active={activeLanguage === 'ua'}
            >
              UA
            </Button>
            <Button
              onClick={() => handleClickButton('pl')}
              size="small"
              active={activeLanguage === 'pl'}
            >
              PL
            </Button>
          </div>
        </nav>

        {/* DESKTOP LANGUAGE */}
        <div className={styles['header__languageDesktop']}>
          <Button
            onClick={() => handleClickButton('ru')}
            size="small"
            active={activeLanguage === 'ru'}
          >
            RU
          </Button>
          <Button
            onClick={() => handleClickButton('en')}
            size="small"
            active={activeLanguage === 'en'}
          >
            EN
          </Button>
          <Button
            onClick={() => handleClickButton('ua')}
            size="small"
            active={activeLanguage === 'ua'}
          >
            UA
          </Button>
          <Button
            onClick={() => handleClickButton('pl')}
            size="small"
            active={activeLanguage === 'pl'}
          >
            PL
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
