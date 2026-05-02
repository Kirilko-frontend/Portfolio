import { useTranslation } from 'react-i18next';

import config from './config';

import useReveal from '@shared/hooks/useReveal';

import Block from './components/Block';

import styles from './styles.module.scss';

const Experience = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useReveal();
  return (
    <section
      id="experience"
      className={`${styles['experience']} section reveal ${isVisible ? 'reveal--visible' : ''}`}
      ref={ref}
    >
      <h2 className={styles['experience__title']}>{t('experience.title')}</h2>
      <div className={styles['experience__blocks']}>
        {config.experienceBlocks.map((item) => (
          <Block
            key={item.id}
            id={item.id}
            role={item.role}
            company={item.company}
            period={item.period}
            stack={item.stack}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
