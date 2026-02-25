import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import config from './config';
import { useLanguage } from '../../hooks/useLanguage';

import { Logo } from '../../icons';
import Button from '../../ui/Button';

import styles from './styles.module.scss';

const Header = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  const [activeLanguage, setActiveLanguage] = useState<string>(language);
  const [isActiveButton, setIsActiveButton] = useState<boolean>(false);

  const handleClickButton = (language: string) => {
    setActiveLanguage(language);
    changeLanguage(language);
    setIsActiveButton(true);
    localStorage.setItem('language', language);
  };

  return (
    <header className={`${styles['header']} section bottom-divider`}>
      <div className={styles['header__logo-wrapper']}>
        <a href="/">
          <Logo className={styles['header__logo']} />
        </a>
        <div className={styles['header__logo-glow']} />
      </div>
      <nav className={styles['header__nav']}>
        <ul className={styles['header__nav-list']}>
          {config.navItems.map((item) => (
            <li key={item.id} className={styles['header__nav-item']}>
              <a href={item.href} className={styles['header__nav-link']}>
                {t(item.name)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
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
    </header>
  );
};

export default Header;
