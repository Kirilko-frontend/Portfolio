import config from './config';

import { useTranslation } from 'react-i18next';

import Skill from './components/Skill';

import styles from './styles.module.scss';

const Hard = () => {
  const { t } = useTranslation();
  return (
    <div className={styles['hard']}>
      <h1 className={styles['hard__title']}>{t('skills.hard-title')}</h1>
      <div className={styles['hard__skills']}>
        {config.skills.map((skill) => (
          <Skill key={skill.id} id={skill.id} title={skill.title} groups={skill.groups} />
        ))}
      </div>
    </div>
  );
};

export default Hard;
