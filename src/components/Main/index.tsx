import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';

import styles from './styles.module.scss';

const Main = () => {
  return (
    <main className={`${styles['main']} container bottom-divider`}>
      <About />
      <Skills />
      <Portfolio />
    </main>
  );
};

export default Main;
