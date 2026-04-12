import config from './config';

import Skill from './components/Skill';

import styles from './styles.module.scss';

const Hard = () => {
  return (
    <div className={styles['hard']}>
      <div className={styles['hard__skills']}>
        {config.skills.map((skill) => (
          <Skill key={skill.id} id={skill.id} title={skill.title} groups={skill.groups} />
        ))}
      </div>
    </div>
  );
};

export default Hard;
