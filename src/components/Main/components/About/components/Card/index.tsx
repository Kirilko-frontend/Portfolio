import { useTranslation } from 'react-i18next';

import config from './config';

import { IconPushpin1, IconVerified1 } from '@icons';

import styles from './styles.module.scss';

const Card = () => {
  const { t } = useTranslation();
  return (
    <div className={styles['card-container']}>
      <div className={styles['card']}>
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
        </div>
        <div className={styles['card__back']}>
          <p className={styles['card__back-text']}>Frontend card ID</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
