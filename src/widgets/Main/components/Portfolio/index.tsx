import config from './config';

import { useTranslation } from 'react-i18next';
import useReveal from '@shared/hooks/useReveal';

import Project from './components/Project';

import styles from './styles.module.scss';

const Portfolio = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useReveal();

  return (
    <section
      id="portfolio"
      className={`${styles['portfolio']} section reveal ${isVisible ? 'reveal--visible' : ''}`}
      ref={ref}
    >
      <h2 className={`${styles['portfolio__title']} glow-title`}>{t('portfolio.title')}</h2>
      <div className={styles['portfolio__line']} />
      <div className={styles['portfolio__projects']}>
        {config.projects.map((project, index) => (
          <Project
            key={project.id}
            {...project}
            position={project.position as 'left' | 'right'}
            delay={index + 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
