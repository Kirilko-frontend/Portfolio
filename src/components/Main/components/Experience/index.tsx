import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import config from './config';
import Block from './components/Block';

const Experience = () => {
  const { t } = useTranslation();
  return (
    <section className={`${styles['experience']} section`}>
      <h2 className={styles['experience__title']}>{t('experience.title')}</h2>
      <div className={styles['experience__blocks']}>
        {config.experienceBlocks.map((item) => (
          <Block
            key={item.id}
            id={item.id}
            role={item.role}
            company={item.company}
            period={item.period}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
