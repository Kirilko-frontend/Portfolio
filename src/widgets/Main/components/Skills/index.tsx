import { useTranslation } from 'react-i18next';

import useReveal from '@shared/hooks/useReveal';

import Hard from './components/Hard';
import Soft from './components/Soft';

import styles from './styles.module.scss';

const Skills = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useReveal();
  return (
    <section
      id="skills"
      className={`${styles['skills']} section reveal ${isVisible ? 'reveal--visible' : ''}`}
      ref={ref}
    >
      <div className={styles['skills__content']}>
        <div className={styles['skills__column']}>
          <h1 className={styles['skill__title']}>{t('skills.hard-title')}</h1>
          <Hard />
        </div>

        <div className={styles['skills__column']}>
          <h1 className={styles['skill__title']}>{t('skills.soft-title')}</h1>
          <Soft />
        </div>
      </div>
    </section>
  );
};

export default Skills;
