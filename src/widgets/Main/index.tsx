import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Contact from './components/Contact';

import styles from './styles.module.scss';

const Main = () => {
  return (
    <main className={styles['main']}>
      <Hero />

      {/* «Лист», который при скролле наезжает на закреплённый Hero */}
      <div className={styles['main__sheet']}>
        <About />
        <div className="container">
          <Skills />
          <Portfolio />
          <Experience />
          <Contact />
        </div>
      </div>
    </main>
  );
};

export default Main;
