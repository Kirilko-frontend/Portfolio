import Hard from './components/Hard';
import Soft from './components/Soft';

import styles from './styles.module.scss';

const Skills = () => {
  return (
    <section id="skills" className={`${styles['skills']} section`}>
      <Hard />
      <Soft />
    </section>
  );
};

export default Skills;
