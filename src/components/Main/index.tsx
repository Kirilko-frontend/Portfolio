import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Contact from './components/Contact';

import styles from './styles.module.scss';

const Main = () => {
  return (
    <main className={`${styles['main']} container bottom-divider`}>
      <About />
      <Skills />
      {/* <Portfolio /> */}
      {/* <Experience /> */}
      {/* <Contact /> */}
    </main>
  );
};

export default Main;
