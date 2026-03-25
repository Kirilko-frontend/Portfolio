import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import config from './config';

import { IconPushpin1, IconVerified1 } from '@icons';

import styles from './styles.module.scss';

const Card = () => {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={styles['card-container']}>
      <div className={`${styles['card']} ${flipped ? styles['card--flipped'] : ''}`}>
        <div className={styles['card__front']}>
          <IconPushpin1 className={styles['card__avatar-icon-pushpin']} />
          <IconVerified1 className={styles['card__avatar-icon-verified']} />
          <div className={styles['card__avatar']}>
            <img src={config.avatar} alt="avatar" className={styles['card__avatar-image']} />
          </div>
          <div className={styles['card__info']}>
            <h1 className={styles['card__info-title']}>{t('about.card-title')}</h1>
            <ul className={styles['card__info-list']}>
              {config.cardItems.map((item) => (
                <li key={item.id} className={styles['card__info-item']}>
                  {t(item.title)}
                </li>
              ))}
            </ul>
          </div>
          <button className={styles['card__front-button']} onClick={handleClick}>
            {t('about.card-button')}
          </button>
        </div>
        <div className={styles['card__back']}>
          <div className={styles['card__back-wrapper']}>
            <h1 className={styles['card__back-title']}>{t('about.card-back-title')}</h1>
            <p className={styles['card__back-text']}>{t('about.card-back-text')}</p>
            <div className={styles['card__back-links']}>
              {config.links.map((link) => (
                <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer">
                  <link.icon className={styles['card__back-link-icon']} />
                </a>
              ))}
            </div>
          </div>
          <img src={config.monkeyGif} alt="monkey" className={styles['card__back-monkey']} />
          <button className={styles['card__back-button']} onClick={handleClick}>
            {t('about.card-button')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
