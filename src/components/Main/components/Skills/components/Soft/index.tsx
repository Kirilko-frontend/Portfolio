import config from './config';

import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

const Soft = () => {
  const { t } = useTranslation();
  return (
    <div className={styles['soft']}>
      <h1 className={styles['soft__title']}>{t('skills.soft-title')}</h1>
      <div
        className={styles['soft__items']}
        style={{
          gridTemplateColumns: `repeat(${config.grid.columns}, 1fr)`,
          gridTemplateRows: `repeat(${config.grid.rows}, 1fr)`,
        }}
      >
        {config.items.map((skill) => (
          <div
            key={skill.title}
            className={styles['skill']}
            style={{
              gridColumn: skill.grid?.col,
              gridRow: skill.grid?.row,
            }}
          >
            <h3 className={styles['skill__title']}>{t(skill.title)}</h3>

            <ul className={styles['skill__points']}>
              {skill.points.map((point) => (
                <li key={point} className={styles['skill__point']}>
                  {t(point)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Soft;
