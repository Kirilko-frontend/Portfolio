import config from './config';

import { useTranslation } from 'react-i18next';

import Project from './components/Project';

import styles from './styles.module.scss';

const Portfolio = () => {
  const { t } = useTranslation();
  return (
    <section className={`${styles['portfolio']} section`} id="portfolio">
      <h1 className={styles['portfolio__title']}>{t('portfolio.title')}</h1>
      <div className={styles['portfolio__line']} />
      <div className={styles['portfolio__projects']}>
        {config.projects.map((project) => (
          <Project key={project.id} {...project} position={project.position as 'left' | 'right'} />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
