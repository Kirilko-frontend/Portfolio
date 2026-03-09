import About from './components/About';
import Skills from './components/Skills';

import styles from './styles.module.scss';

const Main = () => {
  return (
    <main className={`${styles['main']} container bottom-divider`}>
      <About />
      <Skills />
    </main>
  );
};

export default Main;
